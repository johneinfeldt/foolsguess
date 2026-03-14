"use client";

import { useLang, t } from "@/lib/i18n";
import { Player, PlayerScore, ROUNDS_PER_GAME } from "./usePartyState";
import { PLAYER_GAME_COLORS } from "@/lib/avatars";
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
  const maxPossible = ROUNDS_PER_GAME * 100;
  const top3 = ranked.slice(0, 3);

  return (
    <div className="flex min-h-[80vh] flex-col items-center px-4 py-8">
      <Confetti active={true} />

      <h1 className="mb-6 mt-4 text-3xl font-extrabold">{t("party.gameOver", lang)}</h1>

      {/* Top 3 Podium */}
      <div className="mb-8 flex w-full max-w-sm items-end justify-center gap-3">
        {/* 2nd place (left) */}
        {top3[1] && (
          <div className="flex flex-1 flex-col items-center">
            <AvatarDisplay avatar={top3[1].player.avatar} size={56} />
            <p
              className="mt-1 text-sm font-bold truncate max-w-[80px] text-center"
              style={{ color: PLAYER_GAME_COLORS[top3[1].index % PLAYER_GAME_COLORS.length] }}
            >
              {top3[1].player.name}
            </p>
            <div className="mt-1 flex w-full flex-col items-center rounded-t-xl bg-surface-alt pt-3 pb-2" style={{ minHeight: "80px" }}>
              <span className="text-lg font-bold text-text-dim">2</span>
              <span className="text-xl font-extrabold" style={{ color: PLAYER_GAME_COLORS[top3[1].index % PLAYER_GAME_COLORS.length] }}>
                {top3[1].total}
              </span>
            </div>
          </div>
        )}

        {/* 1st place (center, tallest) */}
        {top3[0] && (
          <div className="flex flex-1 flex-col items-center">
            <div className="text-2xl">{"\u{1F451}"}</div>
            <AvatarDisplay avatar={top3[0].player.avatar} size={72} />
            <p
              className="mt-1 text-base font-extrabold truncate max-w-[100px] text-center"
              style={{ color: PLAYER_GAME_COLORS[top3[0].index % PLAYER_GAME_COLORS.length] }}
            >
              {top3[0].player.name}
            </p>
            <div className="mt-1 flex w-full flex-col items-center rounded-t-xl bg-gold/10 ring-2 ring-gold pt-3 pb-2" style={{ minHeight: "110px" }}>
              <span className="text-lg font-bold text-gold">1</span>
              <span className="text-3xl font-extrabold text-gold">
                {top3[0].total}
              </span>
              <span className="text-xs text-text-dim">/ {maxPossible}</span>
            </div>
          </div>
        )}

        {/* 3rd place (right) */}
        {top3[2] && (
          <div className="flex flex-1 flex-col items-center">
            <AvatarDisplay avatar={top3[2].player.avatar} size={48} />
            <p
              className="mt-1 text-sm font-bold truncate max-w-[80px] text-center"
              style={{ color: PLAYER_GAME_COLORS[top3[2].index % PLAYER_GAME_COLORS.length] }}
            >
              {top3[2].player.name}
            </p>
            <div className="mt-1 flex w-full flex-col items-center rounded-t-xl bg-surface-alt pt-3 pb-2" style={{ minHeight: "60px" }}>
              <span className="text-lg font-bold text-text-dim">3</span>
              <span className="text-xl font-extrabold" style={{ color: PLAYER_GAME_COLORS[top3[2].index % PLAYER_GAME_COLORS.length] }}>
                {top3[2].total}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Full leaderboard (if more than 3 players) */}
      {ranked.length > 3 && (
        <div className="mb-6 w-full max-w-sm">
          <h3 className="mb-3 text-sm font-bold text-text-muted">{t("party.leaderboard", lang)}</h3>
          <div className="flex flex-col gap-2">
            {ranked.slice(3).map((entry, i) => (
              <div key={entry.index} className="card flex items-center gap-3 p-3">
                <span className="w-6 text-center text-sm font-bold text-text-dim">
                  {i + 4}.
                </span>
                <AvatarDisplay avatar={entry.player.avatar} size={32} />
                <span className="flex-1 font-bold">{entry.player.name}</span>
                <span
                  className="text-lg font-extrabold"
                  style={{ color: PLAYER_GAME_COLORS[entry.index % PLAYER_GAME_COLORS.length] }}
                >
                  {entry.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

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
                    style={{ color: PLAYER_GAME_COLORS[i % PLAYER_GAME_COLORS.length] }}
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
                    style={{ color: PLAYER_GAME_COLORS[entry.index % PLAYER_GAME_COLORS.length] }}
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
          {t("party.newGame", lang)}
        </button>
        <a
          href="/"
          className="press-effect rounded-full border-2 border-accent/30 px-8 py-3 font-bold text-accent transition-all hover:border-accent hover:bg-accent/5"
        >
          {t("party.mainMenu", lang)}
        </a>
      </div>
    </div>
  );
}
