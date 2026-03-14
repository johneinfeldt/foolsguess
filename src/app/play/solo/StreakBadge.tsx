"use client";

interface StreakBadgeProps {
  streak: number;
}

export default function StreakBadge({ streak }: StreakBadgeProps) {
  if (streak <= 0) return null;

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 game-shadow">
      <span className={`text-base ${streak >= 7 ? "animate-float" : ""}`}>
        &#128293;
      </span>
      <span className="text-xs font-extrabold text-gradient-fire">{streak}</span>
    </div>
  );
}
