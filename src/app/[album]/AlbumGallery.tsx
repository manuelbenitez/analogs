"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface GalleryImage {
  src: string;
  thumbnail: string;
}

function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        onNavigate((index + 1) % images.length);
      if (e.key === "ArrowLeft")
        onNavigate((index - 1 + images.length) % images.length);
    },
    [index, images.length, onClose, onNavigate],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 z-10 cursor-pointer text-3xl text-white/70 transition-colors hover:text-white"
        onClick={onClose}
      >
        &times;
      </button>

      <span className="absolute top-4 left-4 text-sm text-white/50">
        {index + 1} / {images.length}
      </span>

      <button
        className="absolute left-4 z-10 cursor-pointer text-4xl text-white/50 transition-colors hover:text-white"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index - 1 + images.length) % images.length);
        }}
      >
        &#8249;
      </button>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[index]!.src}
        alt=""
        className="max-h-[90vh] max-w-[90vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="absolute right-4 z-10 cursor-pointer text-4xl text-white/50 transition-colors hover:text-white"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index + 1) % images.length);
        }}
      >
        &#8250;
      </button>
    </div>
  );
}

function LazyImage({
  src,
  thumbnail,
  onClick,
}: {
  src: string;
  thumbnail: string;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [fullLoaded, setFullLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Preload full-size image in background once visible
  useEffect(() => {
    if (!isVisible) return;
    const img = new window.Image();
    img.src = src;
    img.onload = () => setFullLoaded(true);
  }, [isVisible, src]);

  return (
    <div
      ref={ref}
      className="aspect-[4/3] cursor-pointer overflow-hidden [&>img]:hover:grayscale-0"
      onClick={onClick}
    >
      {isVisible && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fullLoaded ? src : thumbnail}
          alt=""
          className="h-full w-full object-cover grayscale-[40%] transition-all duration-500"
        />
      )}
    </div>
  );
}

export function AlbumGallery({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="group/grid grid grid-cols-2 gap-1 px-4 pt-14 pb-4 sm:grid-cols-3 sm:gap-2 sm:px-8 lg:grid-cols-4">
        {images.map((img, i) => (
          <LazyImage
            key={img.src}
            src={img.src}
            thumbnail={img.thumbnail}
            onClick={() => setLightboxIndex(i)}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
