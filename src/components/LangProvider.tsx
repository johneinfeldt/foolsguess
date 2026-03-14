"use client";

import { useState, useEffect, useMemo } from "react";
import { Lang, LangContext, loadLang, saveLang } from "@/lib/i18n";

export default function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(loadLang());
  }, []);

  const setLang = useMemo(() => (newLang: Lang) => {
    saveLang(newLang);
    setLangState(newLang);
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  );
}
