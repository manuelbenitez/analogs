import { useEffect } from "react";

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
];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function prefetchAlbum(album: string) {
  const res = await fetch(`${IMAGE_BASE}/api/list/${album}`);
  if (!res.ok) return;

  const keys = (await res.json()) as string[];

  for (const key of keys) {
    if (key.endsWith("/")) continue;
    const img = new Image();
    img.src = `/_next/image?url=${encodeURIComponent(`${IMAGE_BASE}/${key}`)}&w=384&q=75`;
  }
}

async function prefetchAll() {
  // Wait 3 seconds for the homepage to settle
  await sleep(3000);

  for (const album of ALBUMS) {
    await prefetchAlbum(album);
    await sleep(500);
  }
}

export function usePrefetchAlbums() {
  useEffect(() => {
    void prefetchAll();
  }, []);
}
