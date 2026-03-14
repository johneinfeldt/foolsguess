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
      <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-surface-light">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            isComplete
              ? "bg-neon-green"
              : "bg-gradient-to-r from-electric to-electric-bright"
          } ${animate ? "animate-xp-fill" : ""}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="min-w-[4rem] text-right text-xs font-bold text-text-muted">
        {current}/{threshold} XP
      </span>
    </div>
  );
}
