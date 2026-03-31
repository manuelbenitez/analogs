"use client";

import { useState, useEffect, use } from "react";
import { AlbumGallery } from "./AlbumGallery";
import { useImageCache } from "../_contexts/ImageCacheContext";

interface GalleryImage {
  src: string;
  thumbnail: string;
}

export default function AlbumPage({
  params,
}: {
  params: Promise<{ album: string }>;
}) {
  const { album } = use(params);
  const { getAlbumImages } = useImageCache();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void getAlbumImages(album).then((imgs) => {
      setImages(imgs);
      setLoading(false);
    });
  }, [album, getAlbumImages]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-white/50">Loading...</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-white">No images found for this album.</p>
      </div>
    );
  }

  return <AlbumGallery images={images} />;
}
