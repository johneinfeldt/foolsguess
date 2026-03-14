"use client";

import { GameMode } from "./useGameState";
import { useLang, t } from "@/lib/i18n";
import JesterMascot from "@/components/JesterMascot";

interface ModeSelectProps {
  onSelect: (mode: GameMode) => void;
}

export default function ModeSelect({ onSelect }: ModeSelectProps) {
  const lang = useLang();

  const today = new Date().toLocaleDateString(
    lang === "de" ? "de-DE" : lang === "es" ? "es-ES" : "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6">
      <div className="animate-float mb-2">
        <JesterMascot size={80} mood="excited" />
      </div>
      <h1 className="mb-1 text-3xl font-extrabold">{t("daily.title", lang)}</h1>
      <p className="mb-10 text-sm text-text-muted">{today}</p>

      <div className="flex w-full max-w-md flex-col gap-4">
        <button
          onClick={() => onSelect("relaxed")}
          className="card card-hover press-effect group p-6 text-left transition-all hover:scale-[1.01]"
        >
          <div className="mb-2 text-2xl">&#129496;</div>
          <h3 className="mb-1 text-lg font-bold">{t("daily.relaxed", lang)}</h3>
          <p className="text-sm text-text-muted">
            {t("daily.relaxed.desc", lang)}
          </p>
          <p className="mt-3 text-xs font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
            {t("nav.playNow", lang)} &rarr;
          </p>
        </button>

        <button
          onClick={() => onSelect("ranked")}
          className="card card-hover press-effect group relative p-6 text-left transition-all hover:scale-[1.01]"
        >
          <div className="absolute top-0 right-0 rounded-bl-xl rounded-tr-2xl bg-accent px-3 py-1 text-xs font-bold text-white">
            {t("daily.ranked.label", lang)}
          </div>
          <div className="mb-2 text-2xl">&#9889;</div>
          <h3 className="mb-1 text-lg font-bold">{t("daily.ranked", lang)}</h3>
          <p className="text-sm text-text-muted">
            {t("daily.ranked.desc", lang)}
          </p>
          <p className="mt-3 text-xs font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
            {t("nav.playNow", lang)} &rarr;
          </p>
        </button>
      </div>
    </div>
  );
}
