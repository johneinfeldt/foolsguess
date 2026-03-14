"use client";

import { GameMode } from "./useGameState";

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
      <div className="animate-float mb-4 text-5xl">🎯</div>
      <h1 className="mb-2 text-3xl font-extrabold">Daily Challenge</h1>
      <p className="mb-10 text-text-muted">{today}</p>

      <div className="flex w-full max-w-md flex-col gap-4">
        <button
          onClick={() => onSelect("relaxed")}
          className="group rounded-2xl border border-border bg-surface p-6 text-left transition-all hover:border-neon-green/30 hover:bg-surface-light hover:scale-[1.02]"
        >
          <div className="mb-2 text-2xl">🧘</div>
          <h3 className="mb-1 text-lg font-bold">Relaxed Mode</h3>
          <p className="text-sm text-text-muted">
            No timer. No pressure. Play at your own pace.
          </p>
          <p className="mt-2 text-xs text-text-dim">
            Score shown but not saved to leaderboard.
          </p>
        </button>

        <button
          onClick={() => onSelect("ranked")}
          className="group relative rounded-2xl border border-border bg-surface p-6 text-left transition-all hover:border-gold/30 hover:bg-surface-light hover:scale-[1.02]"
        >
          <div className="absolute top-0 right-0 rounded-bl-xl rounded-tr-2xl bg-gold/10 px-3 py-1 text-xs font-bold text-gold">
            RANKED
          </div>
          <div className="mb-2 text-2xl">⚡</div>
          <h3 className="mb-1 text-lg font-bold">Ranked Mode</h3>
          <p className="text-sm text-text-muted">
            60 seconds per question. Compete on the leaderboard.
          </p>
          <p className="mt-2 text-xs text-text-dim">
            Account required for leaderboard (coming soon).
          </p>
        </button>
      </div>
    </div>
  );
}
