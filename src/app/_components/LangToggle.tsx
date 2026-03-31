"use client";

import { useLang } from "../_contexts/LangContext";

export const LangToggle = () => {
  const { lang, setLang } = useLang();

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded border border-white/10 bg-black/50 px-4 py-2 text-xl">
      <button
        onClick={() => setLang("es")}
        className={`cursor-pointer rounded px-2 py-0.5 transition-all ${lang === "es" ? "bg-accent/20 text-white" : "text-white/40 hover:text-white/70"}`}
      >
        🇦🇷 ES
      </button>
      <span className="text-white/20">|</span>
      <button
        onClick={() => setLang("en")}
        className={`cursor-pointer rounded px-2 py-0.5 transition-all ${lang === "en" ? "bg-accent/20 text-white" : "text-white/40 hover:text-white/70"}`}
      >
        🇺🇸 EN
      </button>
    </div>
  );
};
