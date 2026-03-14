"use client";

import JesterMascot from "@/components/JesterMascot";
import Confetti from "@/components/Confetti";

interface LevelUpOverlayProps {
  levelNumber: number;
  divisionName: string;
  onContinue: () => void;
}

export default function LevelUpOverlay({
  levelNumber,
  divisionName,
  onContinue,
}: LevelUpOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/90 backdrop-blur-md">
      <Confetti active count={60} />
      <div className="animate-bounce-in relative flex flex-col items-center gap-5 rounded-2xl border border-gold/30 bg-gradient-to-br from-surface to-surface-light p-12 text-center game-shadow-lg">
        {/* Glow ring */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <div className="animate-pulse-ring absolute inset-0 h-20 w-20 rounded-full bg-gold/20" />
          <div className="animate-level-up-glow relative">
            <JesterMascot size={80} mood="excited" />
          </div>
        </div>

        <div className="mt-12" />
        <h2 className="text-3xl font-extrabold text-gradient-gold">Level Up!</h2>
        <p className="text-lg text-text-muted">
          {divisionName} — Level {levelNumber} complete
        </p>

        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className="animate-bounce-in text-2xl"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              &#11088;
            </span>
          ))}
        </div>

        <button
          onClick={onContinue}
          className="press-effect mt-2 rounded-full bg-gradient-to-r from-gold to-gold-bright px-10 py-3.5 font-bold text-midnight shadow-lg shadow-gold/20 transition-all hover:scale-105"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
