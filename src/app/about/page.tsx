"use client";

import { useLang } from "../_contexts/LangContext";

const IMAGE_BASE = "https://img.mbdev.to";

const content = {
  en: {
    quote: "The lens we use to see the world, distorts our reality.",
    description:
      "All this pictures have been taken with analog cameras, mainly with one that I found on an OP shop gathering dust in Tauranga.",
  },
  es: {
    quote:
      "El lente que usamos para ver el mundo, distorsiona nuestra realidad.",
    description:
      "Todas estas fotos fueron sacadas con cámaras analógicas, principalmente con una que encontré en un OP Shop juntando polvo en Tauranga.",
  },
};

export default function AboutPage() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="flex max-w-3xl flex-col items-center gap-10">
        <div className="ring-accent/30 rounded-full ring-1 ring-offset-4 ring-offset-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${IMAGE_BASE}/about/about.jpg`}
            alt="Profile photo"
            className="h-72 w-72 rounded-full object-cover"
          />
        </div>

        <div className="space-y-6 text-center">
          <h1 className="font-caveat text-4xl text-white/90">
            &ldquo;{t.quote}&rdquo;
          </h1>

          <div className="bg-accent/40 mx-auto h-px w-16" />

          <p className="text-lg leading-relaxed text-white/60">
            {t.description}
          </p>
        </div>
      </div>
    </div>
  );
}
