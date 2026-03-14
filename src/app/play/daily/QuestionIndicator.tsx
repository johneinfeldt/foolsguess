"use client";

interface QuestionIndicatorProps {
  current: number;
  total: number;
}

export default function QuestionIndicator({ current, total }: QuestionIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-8 rounded-full transition-all ${
            i < current
              ? "bg-neon-green"
              : i === current
              ? "bg-electric"
              : "bg-surface-light"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-text-muted">
        {current + 1}/{total}
      </span>
    </div>
  );
}
