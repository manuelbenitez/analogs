import { AlbumGallery } from "./AlbumGallery";

const IMAGE_BASE = "https://img.mbdev.to";

async function getAlbumImages(album: string) {
  const res = await fetch(`${IMAGE_BASE}/api/list/${album}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const keys = (await res.json()) as string[];

  return keys.map((key) => ({
    src: `${IMAGE_BASE}/${key}`,
    thumbnail: `/_next/image?url=${encodeURIComponent(`${IMAGE_BASE}/${key}`)}&w=384&q=75`,
  }));
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ album: string }>;
}) {
  const { album } = await params;
  const images = await getAlbumImages(album);

  if (images.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-white">No images found for this album.</p>
      </div>
    );
  }

  return <AlbumGallery images={images} />;
}
