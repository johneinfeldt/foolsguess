"use client";

import JesterMascot from "@/components/JesterMascot";
import Confetti from "@/components/Confetti";
import { useLang, t } from "@/lib/i18n";

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
  const lang = useLang();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 backdrop-blur-md">
      <Confetti active count={60} />
      <div className="card animate-bounce-in relative flex flex-col items-center gap-5 p-12 text-center">
        <JesterMascot size={64} mood="excited" />

        <h2 className="text-3xl font-extrabold text-accent">{t("solo.levelUp", lang)}</h2>
        <p className="text-lg text-text-muted">
          {divisionName} &mdash; Level {levelNumber} {t("solo.levelComplete", lang)}
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
          className="press-effect mt-2 rounded-full bg-accent px-10 py-3.5 font-bold text-white transition-colors hover:bg-accent-light"
        >
          {t("solo.continue", lang)}
        </button>
      </div>
    </div>
  );
}
