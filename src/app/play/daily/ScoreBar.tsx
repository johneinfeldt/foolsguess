"use client";

import { useRef, useEffect, useState } from "react";
import { useLang, t } from "@/lib/i18n";

interface ScoreBarProps {
  score: number;
}

export default function ScoreBar({ score }: ScoreBarProps) {
  const lang = useLang();
  const [popping, setPopping] = useState(false);
  const prevScore = useRef(score);

  useEffect(() => {
    if (score !== prevScore.current) {
      setPopping(true);
      prevScore.current = score;
      const timer = setTimeout(() => setPopping(false), 300);
      return () => clearTimeout(timer);
    }
  }, [score]);

  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2">
      <span className="text-xs font-bold uppercase text-text-dim">{t("game.score", lang)}</span>
      <div
        className={`text-xl font-extrabold tabular-nums text-accent ${
          popping ? "animate-score-pop" : ""
        }`}
      >
        {score}
      </div>
    </div>
  );
}
