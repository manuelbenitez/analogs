# Image Upload Scripts for Cloudflare R2

These scripts help you bulk upload images to your Cloudflare R2 bucket without having to manually upload each one.

## Prerequisites

1. **Wrangler CLI** installed (already added to devDependencies)
2. **Cloudflare authentication** - Run `npx wrangler login` to authenticate
3. **Your images** organized in a folder structure

## Your Current Setup

- **R2 Bucket**: `IMAGES`
- **Worker**: `r2-image-worker`
- **Domain**: `img.mbdev.to`

## Folder Structure

Organize your images like this:

```
my-photos/
├── japan/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── photo3.jpg
├── new-zealand/
│   ├── photo1.jpg
│   └── photo2.jpg
├── austria/
│   └── photo1.jpg
└── ...
```

The folder structure will be preserved in R2, so:
- `my-photos/japan/photo1.jpg` → `https://img.mbdev.to/japan/photo1.jpg`
- `my-photos/new-zealand/photo1.jpg` → `https://img.mbdev.to/new-zealand/photo1.jpg`

## Method 1: Automatic Upload (Recommended)

This script automatically uploads all images:

```bash
# Upload all images from a directory
pnpm upload:images ./path/to/your/photos
```

Example:
```bash
pnpm upload:images ~/Pictures/analogs-photos
```

The script will:
- ✅ Scan recursively for all images
- ✅ Upload each one to R2
- ✅ Show progress and summary
- ✅ Report any failures

## Method 2: Generate Commands First (Review Before Upload)

If you want to review the upload commands before running them:

```bash
# Generate upload script
pnpm upload:generate ./path/to/your/photos > upload.sh

# Review the generated script
cat upload.sh

# Make it executable and run
chmod +x upload.sh
./upload.sh
```

This is useful if you want to:
- See exactly what will be uploaded
- Modify the commands before running
- Run uploads in batches

## Authentication

Before uploading, authenticate with Cloudflare:

```bash
npx wrangler login
```

This will open a browser window for you to log in.

## Verify Uploads

After uploading, you can:

1. **Check R2 bucket** via Cloudflare dashboard
2. **Test URLs** directly:
   ```
   https://img.mbdev.to/japan/photo1.jpg
   ```

## Supported Image Formats

- `.jpg` / `.JPG`
- `.jpeg` / `.JPEG`
- `.png` / `.PNG`
- `.webp`
- `.gif`

## Troubleshooting

### "Not authenticated"
Run `npx wrangler login` first

### "Bucket not found"
Make sure the bucket name in the script matches your R2 bucket name (currently set to `IMAGES`)

### "Permission denied"
Ensure your Cloudflare account has permission to write to the R2 bucket

## Next Steps

After uploading your images, you'll need to update your Next.js app to use the new URLs:

1. Update image URLs in your components
2. Replace hardcoded URLs with `https://img.mbdev.to/[album]/[filename]`
3. Consider creating a database table to store image metadata

Example:
```typescript
// Before
const image = "https://media.licdn.com/dms/image/...";

// After
const image = "https://img.mbdev.to/japan/F1020001.JPG";
```
