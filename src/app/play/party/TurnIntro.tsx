"use client";

import { useLang, t } from "@/lib/i18n";
import JesterMascot from "@/components/JesterMascot";

interface TurnIntroProps {
  playerName: string;
  playerIndex: number;
  roundNumber: number;
  totalRounds: number;
  onReady: () => void;
}

const COLORS = ["text-accent", "text-correct", "text-gold", "text-wrong"];
const BG_COLORS = ["bg-accent", "bg-correct", "bg-gold", "bg-wrong"];

export default function TurnIntro({ playerName, playerIndex, roundNumber, totalRounds, onReady }: TurnIntroProps) {
  const lang = useLang();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-8">
      <div className="card animate-bounce-in flex w-full max-w-sm flex-col items-center gap-6 p-8 text-center">
        <JesterMascot size={64} mood="thinking" />

        <p className="text-sm font-bold text-text-muted">
          {t("party.round", lang)} {roundNumber}/{totalRounds}
        </p>

        <h2 className={`text-3xl font-extrabold ${COLORS[playerIndex]}`}>
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
          className={`press-effect mt-2 rounded-full ${BG_COLORS[playerIndex]} px-10 py-3.5 text-lg font-bold text-white transition-opacity hover:opacity-90`}
        >
          {t("party.ready", lang)}
        </button>
      </div>
    </div>
  );
}
