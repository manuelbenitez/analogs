#!/usr/bin/env node
/**
 * Generate wrangler upload commands for all images
 * This creates a shell script you can review before executing
 * 
 * Usage:
 *   pnpm tsx scripts/generate-upload-commands.ts <images-directory> > upload.sh
 *   chmod +x upload.sh
 *   ./upload.sh
 */

import { readdir } from 'fs/promises';
import { join, relative, extname } from 'path';

const BUCKET_NAME = 'IMAGES';
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.JPG', '.JPEG', '.PNG'];

async function findImages(dir: string): Promise<string[]> {
  const images: string[] = [];
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        const subImages = await findImages(fullPath);
        images.push(...subImages);
      } else if (entry.isFile()) {
        const ext = extname(entry.name);
        if (SUPPORTED_EXTENSIONS.includes(ext)) {
          images.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
  
  return images;
}

async function generateCommands(sourceDir: string) {
  const images = await findImages(sourceDir);
  
  if (images.length === 0) {
    console.error('# No images found!');
    return;
  }
  
  console.log('#!/bin/bash');
  console.log('# Auto-generated upload script');
  console.log(`# Found ${images.length} images to upload\n`);
  console.log('set -e  # Exit on error\n');
  
  for (const imagePath of images) {
    const remotePath = relative(sourceDir, imagePath);
    console.log(`echo "Uploading: ${remotePath}"`);
    console.log(`npx wrangler r2 object put ${BUCKET_NAME}/${remotePath} --file="${imagePath}"`);
    console.log('');
  }
  
  console.log('echo "✨ All images uploaded successfully!"');
}

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error(`
Usage: pnpm tsx scripts/generate-upload-commands.ts <images-directory> > upload.sh

Example:
  pnpm tsx scripts/generate-upload-commands.ts ./my-photos > upload.sh
  chmod +x upload.sh
  ./upload.sh
  `);
  process.exit(1);
}

const sourceDir = args[0];

if (!sourceDir) {
  console.error('Error: No directory specified');
  process.exit(1);
}

void generateCommands(sourceDir);
