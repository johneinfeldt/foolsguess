"use client";

import { Lang, useLang, useSetLang } from "@/lib/i18n";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "es", label: "ES" },
];

export default function LanguageSelector() {
  const lang = useLang();
  const setLang = useSetLang();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-surface px-1 py-1">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`press-effect rounded-full px-3 py-1 text-xs font-bold transition-all ${
            lang === code
              ? "bg-accent text-white"
              : "text-text-muted hover:text-text"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
