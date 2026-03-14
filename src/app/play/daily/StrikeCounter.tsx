"use client";

interface StrikeCounterProps {
  strikes: number;
}

export default function StrikeCounter({ strikes }: StrikeCounterProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`flex h-11 w-11 items-center justify-center rounded-full border-2 text-lg font-bold transition-all ${
            i < strikes
              ? "animate-strike-pop border-coral bg-gradient-to-br from-coral/30 to-coral/10 text-coral glow-coral"
              : "border-border bg-surface text-text-dim"
          }`}
        >
          {i < strikes ? "\u2715" : "\u2022"}
        </div>
      ))}
      <span className="ml-2 text-xs font-bold text-text-dim">
        {3 - strikes} left
      </span>
    </div>
  );
}
