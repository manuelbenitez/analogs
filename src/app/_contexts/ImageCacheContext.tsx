"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

const IMAGE_BASE = "https://img.mbdev.to";

interface GalleryImage {
  src: string;
  thumbnail: string;
}

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

// Module-level caches — survive re-renders and navigation
const cache = new Map<string, GalleryImage[]>();
const homeCache: { images: string[] | null } = { images: null };
let prefetchStarted = false;

async function fetchAlbumImages(album: string): Promise<GalleryImage[]> {
  const cached = cache.get(album);
  if (cached) return cached;

  const res = await fetch(`${IMAGE_BASE}/api/list/${album}`);
  if (!res.ok) return [];

  const keys = (await res.json()) as string[];
  const images = keys
    .filter((key) => !key.endsWith("/"))
    .map((key) => ({
      src: `${IMAGE_BASE}/${key}`,
      thumbnail: `/_next/image?url=${encodeURIComponent(`${IMAGE_BASE}/${key}`)}&w=384&q=75`,
    }));

  cache.set(album, images);
  return images;
}

async function fetchHomeImages(): Promise<string[]> {
  if (homeCache.images) return homeCache.images;

  const res = await fetch(`${IMAGE_BASE}/api/list/home`);
  if (!res.ok) return [];

  const keys = (await res.json()) as string[];
  const images = keys
    .filter((key) => key !== "home/")
    .map((key) => `${IMAGE_BASE}/${key}`);

  homeCache.images = images;
  return images;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function prefetchAll() {
  await sleep(3000);
  for (const album of ALBUMS) {
    await fetchAlbumImages(album);
    await sleep(500);
  }
}

interface ImageCacheContextValue {
  getAlbumImages: (album: string) => Promise<GalleryImage[]>;
  getHomeImages: () => Promise<string[]>;
}

const ImageCacheContext = createContext<ImageCacheContextValue>({
  getAlbumImages: () => Promise.resolve([]),
  getHomeImages: () => Promise.resolve([]),
});

export function ImageCacheProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefetchStarted) return;
    prefetchStarted = true;
    void prefetchAll();
  }, []);

  return (
    <ImageCacheContext.Provider value={{ getAlbumImages: fetchAlbumImages, getHomeImages: fetchHomeImages }}>
      {children}
    </ImageCacheContext.Provider>
  );
}

export function useImageCache() {
  return useContext(ImageCacheContext);
}
