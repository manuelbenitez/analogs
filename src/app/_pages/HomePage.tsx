"use client";

import React, { useState, useEffect } from "react";
import { useLang } from "../_contexts/LangContext";

export const HomePage = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { lang } = useLang();

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative flex min-h-screen min-w-screen flex-col items-center justify-center px-4 py-16">
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: i === currentIndex ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-black/30" />
      <h1 className="relative z-10 text-center text-5xl leading-normal tracking-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.5)] sm:text-[5rem]">
        {lang === "es"
          ? "Colección Digital de Fotos Analógicas"
          : "Digital Scrapbook of Analog Pictures"}
      </h1>
    </div>
  );
};
