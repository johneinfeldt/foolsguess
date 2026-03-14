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
      <div className="relative h-3.5 flex-1 overflow-hidden rounded-full bg-surface-light">
        {/* Shimmer background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div
          className={`relative h-full rounded-full transition-all duration-700 ${
            isComplete
              ? "bg-gradient-to-r from-neon-green to-neon-green-bright shadow-[0_0_10px_rgba(0,230,118,0.4)]"
              : "bg-gradient-to-r from-electric to-electric-bright shadow-[0_0_10px_rgba(108,92,231,0.3)]"
          } ${animate ? "animate-xp-fill" : ""}`}
          style={{ width: `${percent}%` }}
        >
          {/* Inner shine */}
          <div className="absolute inset-x-0 top-0 h-1/2 rounded-full bg-white/20" />
        </div>
      </div>
      <span className={`min-w-[4.5rem] text-right text-xs font-extrabold ${
        isComplete ? "text-neon-green" : "text-text-muted"
      }`}>
        {current}/{threshold}
      </span>
    </div>
  );
}
