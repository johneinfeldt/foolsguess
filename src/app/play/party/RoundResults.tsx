"use client";

import { useLang, t } from "@/lib/i18n";
import { Answer } from "@/lib/types";
import { Player, PlayerScore, ROUNDS_PER_GAME } from "./usePartyState";
import { COLOR_HEX } from "@/lib/avatars";
import AvatarDisplay from "@/components/AvatarDisplay";

interface RoundResultsProps {
  players: Player[];
  roundScores: PlayerScore[];
  roundNumber: number;
  questionText: string;
  answers: Answer[];
  onNext: () => void;
  isLastRound: boolean;
  isOnline?: boolean;
  isHost?: boolean;
}

export default function RoundResults({ players, roundScores, roundNumber, questionText, answers, onNext, isLastRound, isOnline, isHost }: RoundResultsProps) {
  const lang = useLang();

  // Sort players by score for this round
  const ranked = players
    .map((player, i) => ({ player, score: roundScores[i]?.pointsEarned || 0, index: i }))
    .sort((a, b) => b.score - a.score);

  const showNextButton = !isOnline || isHost;

  return (
    <div className="flex min-h-[80vh] flex-col items-center px-4 py-8">
      <p className="mb-2 text-sm font-bold text-text-muted">
        {t("party.round", lang)} {roundNumber}/{ROUNDS_PER_GAME}
      </p>

      <h2 className="mb-1 text-center text-xl font-extrabold">{t("party.roundComplete", lang)}</h2>
      <p className="mb-6 max-w-sm text-center text-sm text-text-muted">{questionText}</p>

      {/* Answer reveal */}
      <div className="mb-6 w-full max-w-sm">
        <h3 className="mb-3 text-sm font-bold text-text-muted">{t("party.answers", lang)}</h3>
        <div className="flex flex-col gap-2">
          {answers.map((answer, ansIdx) => (
            <div key={ansIdx} className="card flex items-center gap-3 p-3">
              <span className="w-8 text-right text-sm font-extrabold text-accent">
                {answer.points}
              </span>
              <span className="flex-1 font-semibold">{answer.text}</span>
              <div className="flex gap-1">
                {players.map((player, pi) => {
                  const found = roundScores[pi]?.answersFound[ansIdx];
                  return (
                    <div
                      key={pi}
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        found ? "" : "bg-border"
                      }`}
                      title={player.name}
                    >
                      {found ? (
                        <AvatarDisplay avatar={player.avatar} size={24} />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Player scores */}
      <div className="mb-6 flex w-full max-w-sm flex-col gap-3">
        {ranked.map((entry, rank) => {
          const color = COLOR_HEX[entry.player.avatar.color];
          return (
            <div
              key={entry.index}
              className={`card flex items-center gap-4 p-4 ${rank === 0 ? "ring-2 ring-gold" : ""}`}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-alt text-sm font-bold">
                {rank === 0 ? "\u{1F451}" : `#${rank + 1}`}
              </div>
              <AvatarDisplay avatar={entry.player.avatar} size={32} />
              <span className="flex-1 font-bold">{entry.player.name}</span>
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold" style={{ color }}>
                  {entry.score}
                </span>
                <span className="text-xs text-text-dim">/100</span>
              </div>
            </div>
          );
        })}
      </div>

      {showNextButton ? (
        <button
          onClick={onNext}
          className="press-effect rounded-full bg-accent px-10 py-3.5 text-lg font-bold text-white transition-colors hover:bg-accent-light"
        >
          {isLastRound ? t("party.finalResults", lang) : `${t("party.nextRound", lang)} \u2192`}
        </button>
      ) : (
        <p className="text-sm text-text-muted">
          {t("online.waiting", lang)}
        </p>
      )}
    </div>
  );
}
