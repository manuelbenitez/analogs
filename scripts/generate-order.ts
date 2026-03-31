/**
 * Generate initial _order.json files for all albums.
 * Fetches current image list from the worker and uploads the order to R2.
 *
 * Usage:
 *   R2_ACCOUNT_ID=xxx R2_ACCESS_KEY_ID=xxx R2_SECRET_ACCESS_KEY=xxx \
 *     pnpm tsx scripts/generate-order.ts
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const IMAGE_BASE = "https://img.mbdev.to";

const ALBUMS = [
  "japan",
  "new-zealand",
  "austria",
  "argentina",
  "france",
  "espana",
  "andorra",
  "indonesia",
  "random",
  "home",
];

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
  console.error("Missing R2 credentials. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY.");
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

async function generateOrder(album: string) {
  const res = await fetch(`${IMAGE_BASE}/api/list/${album}`);
  if (!res.ok) {
    console.error(`  Failed to fetch ${album}: ${res.status}`);
    return;
  }

  const keys = (await res.json()) as string[];
  const imageKeys = keys.filter((k) => !k.endsWith("/") && !k.endsWith("_order.json"));

  await s3.send(
    new PutObjectCommand({
      Bucket: "analogs-images",
      Key: `${album}/_order.json`,
      Body: JSON.stringify(imageKeys),
      ContentType: "application/json",
    }),
  );

  console.log(`  ${album}: ${imageKeys.length} images ordered`);
}

async function main() {
  console.log("Generating _order.json files...\n");

  for (const album of ALBUMS) {
    await generateOrder(album);
  }

  console.log("\nDone!");
}

void main();
