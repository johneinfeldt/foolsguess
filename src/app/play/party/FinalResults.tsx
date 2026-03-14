"use client";

import { useLang, t } from "@/lib/i18n";
import { Player, PlayerScore, ROUNDS_PER_GAME } from "./usePartyState";
import { COLOR_HEX } from "@/lib/avatars";
import AvatarDisplay from "@/components/AvatarDisplay";
import Confetti from "@/components/Confetti";

interface FinalResultsProps {
  players: Player[];
  scores: PlayerScore[][];
  onPlayAgain: () => void;
}

export default function FinalResults({ players, scores, onPlayAgain }: FinalResultsProps) {
  const lang = useLang();

  // Calculate total scores per player
  const totals = players.map((player, playerIndex) => {
    let total = 0;
    for (let round = 0; round < scores.length; round++) {
      total += scores[round]?.[playerIndex]?.pointsEarned || 0;
    }
    return { player, total, index: playerIndex };
  });

  const ranked = [...totals].sort((a, b) => b.total - a.total);
  const winner = ranked[0];
  const maxPossible = ROUNDS_PER_GAME * 100;

  return (
    <div className="flex min-h-[80vh] flex-col items-center px-4 py-8">
      <Confetti active={true} />

      <h1 className="mb-2 mt-4 text-3xl font-extrabold">{t("party.gameOver", lang)}</h1>

      {/* Winner */}
      <div className="card mb-8 w-full max-w-sm p-6 text-center ring-2 ring-gold">
        <p className="mb-1 text-sm text-text-muted">{t("party.winner", lang)}</p>
        <div className="mb-2 flex justify-center">
          <AvatarDisplay avatar={winner.player.avatar} size={80} />
        </div>
        <div className="mb-2 text-2xl">{"\u{1F451}"}</div>
        <h2
          className="text-2xl font-extrabold"
          style={{ color: COLOR_HEX[winner.player.avatar.color] }}
        >
          {winner.player.name}
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
          {ranked.map((entry, rank) => (
            <div
              key={entry.index}
              className={`card flex items-center gap-3 p-3 ${rank === 0 ? "ring-1 ring-gold" : ""}`}
            >
              <span className="w-6 text-center text-sm font-bold text-text-dim">
                {rank + 1}.
              </span>
              <AvatarDisplay avatar={entry.player.avatar} size={32} />
              <span className="flex-1 font-bold">{entry.player.name}</span>
              <span
                className="text-lg font-extrabold"
                style={{ color: COLOR_HEX[entry.player.avatar.color] }}
              >
                {entry.total}
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
                {players.map((player, i) => (
                  <th
                    key={i}
                    className="py-2 text-center font-bold"
                    style={{ color: COLOR_HEX[player.avatar.color] }}
                  >
                    {player.name}
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
                {totals.map((entry) => (
                  <td
                    key={entry.index}
                    className="py-2 text-center"
                    style={{ color: COLOR_HEX[entry.player.avatar.color] }}
                  >
                    {entry.total}
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
