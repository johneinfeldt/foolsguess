"use client";

import { useLang, t } from "@/lib/i18n";

interface StrikeCounterProps {
  strikes: number;
}

export default function StrikeCounter({ strikes }: StrikeCounterProps) {
  const lang = useLang();

  return (
    <div className="flex items-center justify-center gap-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-base font-bold transition-all ${
            i < strikes
              ? "animate-strike-pop border-wrong bg-wrong/10 text-wrong"
              : "border-border bg-surface text-text-dim"
          }`}
        >
          {i < strikes ? "\u2715" : "\u2022"}
        </div>
      ))}
      <span className="ml-2 text-xs font-bold text-text-dim">
        {3 - strikes} {t("game.left", lang)}
      </span>
    </div>
  );
}
