"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Lang, type Translation } from "@/lib/translations";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("tr");

  // İlk yüklemede tarayıcı/önceki tercihi uygula (statik export ile uyumlu).
  useEffect(() => {
    const saved = window.localStorage.getItem("lang") as Lang | null;
    if (saved === "tr" || saved === "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- statik export'ta hydration uyumu için ilk render sonrası okunmalı
      setLang(saved);
    } else if (navigator.language.startsWith("en")) {
      setLang("en");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value: LanguageContextValue = {
    lang,
    setLang,
    toggle: () => setLang(lang === "tr" ? "en" : "tr"),
    t: translations[lang],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage, LanguageProvider içinde kullanılmalıdır");
  }
  return ctx;
}
