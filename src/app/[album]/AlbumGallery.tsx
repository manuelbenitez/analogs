"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [direction, setDirection] = useState(0);

  const navigate = useCallback(
    (newIndex: number, dir: number) => {
      setDirection(dir);
      onNavigate(newIndex);
    },
    [onNavigate],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        navigate((index + 1) % images.length, 1);
      if (e.key === "ArrowLeft")
        navigate((index - 1 + images.length) % images.length, -1);
    },
    [index, images.length, onClose, navigate],
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
          navigate((index - 1 + images.length) % images.length, -1);
        }}
      >
        &#8249;
      </button>

      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.img
          key={index}
          src={images[index]!.src}
          alt=""
          custom={direction}
          initial={{ opacity: 0, x: direction * 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -80 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="max-h-[90vh] max-w-[90vw] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      <button
        className="absolute right-4 z-10 cursor-pointer text-4xl text-white/50 transition-colors hover:text-white"
        onClick={(e) => {
          e.stopPropagation();
          navigate((index + 1) % images.length, 1);
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
      <div className="group/grid grid grid-cols-2 gap-1 px-4 pt-20 pb-4 sm:grid-cols-3 sm:gap-2 sm:px-8 lg:grid-cols-4">
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
