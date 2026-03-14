"use client";

interface StreakBadgeProps {
  streak: number;
}

export default function StreakBadge({ streak }: StreakBadgeProps) {
  if (streak <= 0) return null;

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5">
      <span className="text-sm">&#128293;</span>
      <span className="text-xs font-bold text-accent">{streak}</span>
    </div>
  );
}
