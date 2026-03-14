"use client";

import { useLang, t } from "@/lib/i18n";
import { AvatarConfig, COLOR_HEX } from "@/lib/avatars";
import AvatarDisplay from "@/components/AvatarDisplay";

interface TurnIntroProps {
  playerName: string;
  avatar: AvatarConfig;
  roundNumber: number;
  totalRounds: number;
  onReady: () => void;
}

export default function TurnIntro({ playerName, avatar, roundNumber, totalRounds, onReady }: TurnIntroProps) {
  const lang = useLang();
  const color = COLOR_HEX[avatar.color];

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-8">
      <div className="card animate-bounce-in flex w-full max-w-sm flex-col items-center gap-6 p-8 text-center">
        <AvatarDisplay avatar={avatar} size={80} />

        <p className="text-sm font-bold text-text-muted">
          {t("party.round", lang)} {roundNumber}/{totalRounds}
        </p>

        <h2 className="text-3xl font-extrabold" style={{ color }}>
          {playerName}
        </h2>

        <p className="text-text-muted">
          {t("party.yourTurn", lang)}
        </p>

        <p className="text-xs text-text-dim">
          {t("party.dontPeek", lang)}
        </p>

        <button
          onClick={onReady}
          className="press-effect mt-2 rounded-full px-10 py-3.5 text-lg font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: color }}
        >
          {t("party.ready", lang)}
        </button>
      </div>
    </div>
  );
}
