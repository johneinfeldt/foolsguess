"use client";

interface QuestionIndicatorProps {
  current: number;
  total: number;
}

export default function QuestionIndicator({ current, total }: QuestionIndicatorProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-7 rounded-full transition-all ${
            i < current
              ? "bg-correct"
              : i === current
              ? "bg-accent"
              : "bg-border"
          }`}
        />
      ))}
      <span className="ml-1 text-xs font-bold text-text-muted">
        {current + 1}/{total}
      </span>
    </div>
  );
}
