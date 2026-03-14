"use client";

interface QuestionIndicatorProps {
  current: number;
  total: number;
}

export default function QuestionIndicator({ current, total }: QuestionIndicatorProps) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-surface px-3 py-2 game-shadow">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2.5 w-8 rounded-full transition-all ${
            i < current
              ? "bg-gradient-to-r from-neon-green to-neon-green-bright shadow-[0_0_6px_rgba(0,230,118,0.4)]"
              : i === current
              ? "bg-gradient-to-r from-electric to-electric-bright shadow-[0_0_6px_rgba(108,92,231,0.4)]"
              : "bg-surface-light"
          }`}
        />
      ))}
      <span className="ml-1 text-xs font-bold text-text-muted">
        {current + 1}/{total}
      </span>
    </div>
  );
}
