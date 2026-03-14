"use client";

import { useLang, t } from "@/lib/i18n";
import { PlayerScore, ROUNDS_PER_GAME } from "./usePartyState";

interface RoundResultsProps {
  players: string[];
  roundScores: PlayerScore[];
  roundNumber: number;
  questionText: string;
  onNext: () => void;
  isLastRound: boolean;
}

const COLORS = ["bg-accent", "bg-correct", "bg-gold", "bg-wrong"];
const TEXT_COLORS = ["text-accent", "text-correct", "text-gold", "text-wrong"];

export default function RoundResults({ players, roundScores, roundNumber, questionText, onNext, isLastRound }: RoundResultsProps) {
  const lang = useLang();

  // Sort players by score for this round
  const ranked = players
    .map((name, i) => ({ name, score: roundScores[i]?.pointsEarned || 0, index: i }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="flex min-h-[80vh] flex-col items-center px-4 py-8">
      <p className="mb-2 text-sm font-bold text-text-muted">
        {t("party.round", lang)} {roundNumber}/{ROUNDS_PER_GAME}
      </p>

      <h2 className="mb-1 text-center text-xl font-extrabold">{t("party.roundComplete", lang)}</h2>
      <p className="mb-8 max-w-sm text-center text-sm text-text-muted">{questionText}</p>

      <div className="mb-8 flex w-full max-w-sm flex-col gap-3">
        {ranked.map((player, rank) => (
          <div
            key={player.index}
            className={`card flex items-center gap-4 p-4 ${rank === 0 ? "ring-2 ring-gold" : ""}`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-alt text-sm font-bold">
              {rank === 0 ? "\u{1F451}" : `#${rank + 1}`}
            </div>
            <div className={`h-8 w-8 rounded-full ${COLORS[player.index]} flex items-center justify-center text-sm font-bold text-white`}>
              {player.name[0]}
            </div>
            <span className="flex-1 font-bold">{player.name}</span>
            <div className="flex items-center gap-1">
              <span className={`text-xl font-extrabold ${TEXT_COLORS[player.index]}`}>
                {player.score}
              </span>
              <span className="text-xs text-text-dim">/100</span>
            </div>
          </div>
        ))}
      </div>

      {/* Answers found bar */}
      <div className="mb-8 grid w-full max-w-sm grid-cols-2 gap-2 sm:grid-cols-4">
        {players.map((name, i) => {
          const found = roundScores[i]?.answersFound.filter(Boolean).length || 0;
          return (
            <div key={i} className="card p-2 text-center">
              <p className="text-xs text-text-dim">{name}</p>
              <p className={`text-sm font-bold ${TEXT_COLORS[i]}`}>{found}/6</p>
            </div>
          );
        })}
      </div>

      <button
        onClick={onNext}
        className="press-effect rounded-full bg-accent px-10 py-3.5 text-lg font-bold text-white transition-colors hover:bg-accent-light"
      >
        {isLastRound ? t("party.finalResults", lang) : `${t("party.nextRound", lang)} \u2192`}
      </button>
    </div>
  );
}
