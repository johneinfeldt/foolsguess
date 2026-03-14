"use client";

interface XPBarProps {
  current: number;
  threshold: number;
  animate?: boolean;
}

export default function XPBar({ current, threshold, animate }: XPBarProps) {
  const percent = Math.min((current / threshold) * 100, 100);
  const isComplete = current >= threshold;

  return (
    <div className="flex items-center gap-3">
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-alt">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            isComplete ? "bg-correct" : "bg-accent"
          } ${animate ? "animate-xp-fill" : ""}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className={`min-w-[4rem] text-right text-xs font-bold ${
        isComplete ? "text-correct" : "text-text-muted"
      }`}>
        {current}/{threshold}
      </span>
    </div>
  );
}
