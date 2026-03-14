"use client";

import { useLang, t } from "@/lib/i18n";
import { PlayerScore, ROUNDS_PER_GAME } from "./usePartyState";
import JesterMascot from "@/components/JesterMascot";
import Confetti from "@/components/Confetti";

interface FinalResultsProps {
  players: string[];
  scores: PlayerScore[][];
  onPlayAgain: () => void;
}

const COLORS = ["bg-accent", "bg-correct", "bg-gold", "bg-wrong"];
const TEXT_COLORS = ["text-accent", "text-correct", "text-gold", "text-wrong"];

export default function FinalResults({ players, scores, onPlayAgain }: FinalResultsProps) {
  const lang = useLang();

  // Calculate total scores per player
  const totals = players.map((name, playerIndex) => {
    let total = 0;
    for (let round = 0; round < scores.length; round++) {
      total += scores[round]?.[playerIndex]?.pointsEarned || 0;
    }
    return { name, total, index: playerIndex };
  });

  const ranked = [...totals].sort((a, b) => b.total - a.total);
  const winner = ranked[0];
  const maxPossible = ROUNDS_PER_GAME * 100;

  return (
    <div className="flex min-h-[80vh] flex-col items-center px-4 py-8">
      <Confetti active={true} />

      <JesterMascot size={80} mood="excited" />

      <h1 className="mb-2 mt-4 text-3xl font-extrabold">{t("party.gameOver", lang)}</h1>

      {/* Winner */}
      <div className="card mb-8 w-full max-w-sm p-6 text-center ring-2 ring-gold">
        <p className="mb-1 text-sm text-text-muted">{t("party.winner", lang)}</p>
        <div className="mb-2 text-4xl">{"\u{1F451}"}</div>
        <h2 className={`text-2xl font-extrabold ${TEXT_COLORS[winner.index]}`}>
          {winner.name}
        </h2>
        <p className="mt-1 text-lg">
          <span className="text-3xl font-extrabold text-gold">{winner.total}</span>
          <span className="text-text-dim"> / {maxPossible}</span>
        </p>
      </div>

      {/* Full leaderboard */}
      <div className="mb-6 w-full max-w-sm">
        <h3 className="mb-3 text-sm font-bold text-text-muted">{t("party.leaderboard", lang)}</h3>
        <div className="flex flex-col gap-2">
          {ranked.map((player, rank) => (
            <div
              key={player.index}
              className={`card flex items-center gap-3 p-3 ${rank === 0 ? "ring-1 ring-gold" : ""}`}
            >
              <span className="w-6 text-center text-sm font-bold text-text-dim">
                {rank + 1}.
              </span>
              <div className={`h-8 w-8 rounded-full ${COLORS[player.index]} flex items-center justify-center text-sm font-bold text-white`}>
                {player.name[0]}
              </div>
              <span className="flex-1 font-bold">{player.name}</span>
              <span className={`text-lg font-extrabold ${TEXT_COLORS[player.index]}`}>
                {player.total}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Round breakdown */}
      <div className="mb-8 w-full max-w-sm">
        <h3 className="mb-3 text-sm font-bold text-text-muted">{t("party.roundBreakdown", lang)}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 text-left text-text-dim"></th>
                {players.map((name, i) => (
                  <th key={i} className={`py-2 text-center font-bold ${TEXT_COLORS[i]}`}>
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: ROUNDS_PER_GAME }).map((_, round) => (
                <tr key={round} className="border-b border-border/50">
                  <td className="py-2 text-text-dim">R{round + 1}</td>
                  {players.map((_, pi) => (
                    <td key={pi} className="py-2 text-center font-semibold">
                      {scores[round]?.[pi]?.pointsEarned ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="font-bold">
                <td className="py-2 text-text-dim">{t("party.total", lang)}</td>
                {totals.map((player) => (
                  <td key={player.index} className={`py-2 text-center ${TEXT_COLORS[player.index]}`}>
                    {player.total}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={onPlayAgain}
          className="press-effect rounded-full bg-accent px-8 py-3 font-bold text-white transition-colors hover:bg-accent-light"
        >
          {t("party.playAgain", lang)}
        </button>
        <a
          href="/"
          className="press-effect rounded-full border-2 border-accent/30 px-8 py-3 font-bold text-accent transition-all hover:border-accent hover:bg-accent/5"
        >
          {t("game.back", lang)}
        </a>
      </div>
    </div>
  );
}
