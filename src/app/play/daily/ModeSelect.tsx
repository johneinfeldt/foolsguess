"use client";

import { GameMode } from "./useGameState";
import JesterMascot from "@/components/JesterMascot";

interface ModeSelectProps {
  onSelect: (mode: GameMode) => void;
}

export default function ModeSelect({ onSelect }: ModeSelectProps) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6">
      <div className="animate-float mb-2">
        <JesterMascot size={100} mood="excited" />
      </div>
      <h1 className="mb-1 text-3xl font-extrabold">Daily Challenge</h1>
      <p className="mb-10 text-sm text-text-muted">{today}</p>

      <div className="flex w-full max-w-md flex-col gap-4">
        <button
          onClick={() => onSelect("relaxed")}
          className="press-effect group rounded-2xl border-2 border-neon-green/20 bg-surface p-6 text-left transition-all hover:border-neon-green/40 hover:bg-surface-light hover:scale-[1.02] game-shadow"
        >
          <div className="mb-2 text-3xl">&#129496;</div>
          <h3 className="mb-1 text-lg font-extrabold">Relaxed Mode</h3>
          <p className="text-sm text-text-muted">
            No timer. No pressure. Play at your own pace.
          </p>
          <p className="mt-3 text-xs font-semibold text-neon-green opacity-0 transition-opacity group-hover:opacity-100">
            Start playing &rarr;
          </p>
        </button>

        <button
          onClick={() => onSelect("ranked")}
          className="press-effect group relative rounded-2xl border-2 border-gold/20 bg-surface p-6 text-left transition-all hover:border-gold/40 hover:bg-surface-light hover:scale-[1.02] game-shadow"
        >
          <div className="absolute top-0 right-0 rounded-bl-xl rounded-tr-2xl bg-gradient-to-r from-gold to-gold-bright px-3 py-1 text-xs font-bold text-midnight">
            RANKED
          </div>
          <div className="mb-2 text-3xl">&#9889;</div>
          <h3 className="mb-1 text-lg font-extrabold">Ranked Mode</h3>
          <p className="text-sm text-text-muted">
            60 seconds per question. Compete on the leaderboard.
          </p>
          <p className="mt-3 text-xs font-semibold text-gold opacity-0 transition-opacity group-hover:opacity-100">
            Start playing &rarr;
          </p>
        </button>
      </div>
    </div>
  );
}
