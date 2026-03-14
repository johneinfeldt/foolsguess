"use client";

interface StreakBadgeProps {
  streak: number;
}

export default function StreakBadge({ streak }: StreakBadgeProps) {
  if (streak <= 0) return null;

  return (
    <div className="flex items-center gap-1 rounded-full bg-coral/10 px-3 py-1">
      <span className="text-sm">&#128293;</span>
      <span className="text-sm font-bold text-coral">{streak}</span>
    </div>
  );
}
