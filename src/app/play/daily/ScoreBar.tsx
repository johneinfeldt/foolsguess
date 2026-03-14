"use client";

import { useRef, useEffect, useState } from "react";

interface ScoreBarProps {
  score: number;
}

export default function ScoreBar({ score }: ScoreBarProps) {
  const [popping, setPopping] = useState(false);
  const prevScore = useRef(score);

  useEffect(() => {
    if (score !== prevScore.current) {
      setPopping(true);
      prevScore.current = score;
      const timer = setTimeout(() => setPopping(false), 400);
      return () => clearTimeout(timer);
    }
  }, [score]);

  return (
    <div className="flex items-center gap-2 rounded-full bg-surface px-4 py-2 game-shadow">
      <span className="text-xs font-bold uppercase text-text-dim">Score</span>
      <div
        className={`text-2xl font-extrabold tabular-nums text-gradient-gold ${
          popping ? "animate-score-pop" : ""
        }`}
      >
        {score}
      </div>
    </div>
  );
}
