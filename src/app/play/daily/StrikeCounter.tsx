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
          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg font-bold transition-all ${
            i < strikes
              ? "animate-strike-pop border-coral bg-coral/20 text-coral"
              : "border-border text-text-dim"
          }`}
        >
          {i < strikes ? "✕" : ""}
        </div>
      ))}
    </div>
  );
}
