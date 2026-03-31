"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Lang = "es" | "en";

const LangContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ lang: "es", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
