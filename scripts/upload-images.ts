#!/usr/bin/env node
/**
 * Bulk upload images to Cloudflare R2 via S3-compatible API
 *
 * Usage:
 *   R2_ACCOUNT_ID=xxx R2_ACCESS_KEY_ID=xxx R2_SECRET_ACCESS_KEY=xxx \
 *     pnpm tsx scripts/upload-images.ts /home/manuel/Pictures/Website
 *
 * Features:
 *   - 10 concurrent uploads
 *   - Skips files that already exist in R2 (idempotent re-runs)
 *   - Sets correct Content-Type per file
 *   - Shows progress
 */

import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import pLimit from "p-limit";
import { readdir, stat, readFile } from "fs/promises";
import { join, relative, extname } from "path";

// --- Config ---
const BUCKET_NAME = "analogs-images";
const CONCURRENCY = 10;
const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

// --- Environment ---
const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
  console.error(
    "Missing env vars. Required: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY\n" +
      "Create an R2 API token at: Cloudflare Dashboard → R2 → Manage R2 API Tokens",
  );
  process.exit(1);
}

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

// --- Helpers ---

async function findImages(dir: string): Promise<string[]> {
  const images: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      images.push(...(await findImages(fullPath)));
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTENSIONS.has(ext)) {
        images.push(fullPath);
      }
    }
  }

  return images;
}

async function existsInR2(key: string): Promise<boolean> {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function uploadFile(
  localPath: string,
  key: string,
  index: number,
  total: number,
): Promise<{ key: string; skipped: boolean; error?: string }> {
  try {
    if (await existsInR2(key)) {
      console.log(`[${index}/${total}] SKIP (exists): ${key}`);
      return { key, skipped: true };
    }

    const body = await readFile(localPath);
    const ext = extname(localPath).toLowerCase();
    const contentType = CONTENT_TYPES[ext] ?? "application/octet-stream";

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );

    console.log(`[${index}/${total}] OK: ${key}`);
    return { key, skipped: false };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[${index}/${total}] FAIL: ${key} — ${msg}`);
    return { key, skipped: false, error: msg };
  }
}

// --- Main ---

async function main() {
  const sourceDir = process.argv[2];
  if (!sourceDir) {
    console.error("Usage: pnpm tsx scripts/upload-images.ts <images-directory>");
    process.exit(1);
  }

  const stats = await stat(sourceDir);
  if (!stats.isDirectory()) {
    console.error(`Not a directory: ${sourceDir}`);
    process.exit(1);
  }

  console.log(`Scanning ${sourceDir} ...\n`);
  const images = await findImages(sourceDir);
  console.log(`Found ${images.length} images. Uploading with concurrency ${CONCURRENCY}...\n`);

  const limit = pLimit(CONCURRENCY);
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  const tasks = images.map((localPath, i) => {
    const key = relative(sourceDir, localPath);
    return limit(async () => {
      const result = await uploadFile(localPath, key, i + 1, images.length);
      if (result.error) failed++;
      else if (result.skipped) skipped++;
      else uploaded++;
    });
  });

  await Promise.all(tasks);

  console.log("\n--- Summary ---");
  console.log(`Uploaded: ${uploaded}`);
  console.log(`Skipped:  ${skipped}`);
  console.log(`Failed:   ${failed}`);
  console.log(`Total:    ${images.length}`);
}

void main();
