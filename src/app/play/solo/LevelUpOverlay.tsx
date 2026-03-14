"use client";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/90 backdrop-blur-sm">
      <div className="animate-slide-up-fade flex flex-col items-center gap-4 rounded-2xl border border-gold/30 bg-surface p-10 text-center shadow-2xl">
        <div className="animate-level-up-glow text-6xl">&#127942;</div>
        <h2 className="text-2xl font-extrabold text-gold">Level Up!</h2>
        <p className="text-text-muted">
          {divisionName} — Level {levelNumber} complete
        </p>
        <button
          onClick={onContinue}
          className="mt-2 rounded-full bg-gold px-8 py-3 font-bold text-midnight transition-all hover:scale-105"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
