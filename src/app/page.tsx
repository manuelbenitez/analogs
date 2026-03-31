"use client";

import { useState, useEffect } from "react";
import { HomePage } from "./_pages/HomePage";
import { useImageCache } from "./_contexts/ImageCacheContext";

export default function Home() {
  const { getHomeImages } = useImageCache();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const imgs = await getHomeImages();
      setImages(imgs);
    };
    void load();
  }, [getHomeImages]);

  return <HomePage images={images} />;
}
