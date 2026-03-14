"use client";

import { useState } from "react";
import { useLang, t } from "@/lib/i18n";
import JesterMascot from "@/components/JesterMascot";

interface PlayerSetupProps {
  onStart: (players: string[]) => void;
}

const COLORS = ["bg-accent", "bg-correct", "bg-gold", "bg-wrong"];

export default function PlayerSetup({ onStart }: PlayerSetupProps) {
  const lang = useLang();
  const [players, setPlayers] = useState<string[]>(["", ""]);

  const addPlayer = () => {
    if (players.length < 4) {
      setPlayers([...players, ""]);
    }
  };

  const removePlayer = (index: number) => {
    if (players.length > 2) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const updatePlayer = (index: number, name: string) => {
    const updated = [...players];
    updated[index] = name;
    setPlayers(updated);
  };

  const canStart = players.every((p) => p.trim().length > 0);

  const handleStart = () => {
    if (canStart) {
      onStart(players.map((p) => p.trim()));
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-8">
      <div className="animate-float mb-6">
        <JesterMascot size={80} mood="excited" />
      </div>

      <h1 className="mb-2 text-3xl font-extrabold">
        {t("party.title", lang)}
      </h1>
      <p className="mb-8 text-text-muted">{t("party.addPlayers", lang)}</p>

      <div className="mb-6 flex w-full max-w-sm flex-col gap-3">
        {players.map((name, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`h-8 w-8 shrink-0 rounded-full ${COLORS[i]} flex items-center justify-center text-sm font-bold text-white`}>
              {i + 1}
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => updatePlayer(i, e.target.value)}
              placeholder={`${t("party.player", lang)} ${i + 1}`}
              maxLength={12}
              className="flex-1 rounded-xl border-2 border-border bg-surface px-4 py-2.5 text-text placeholder-text-dim outline-none transition-all focus:border-accent"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleStart();
              }}
            />
            {players.length > 2 && (
              <button
                onClick={() => removePlayer(i)}
                className="shrink-0 text-text-dim transition-colors hover:text-wrong"
              >
                &#10005;
              </button>
            )}
          </div>
        ))}
      </div>

      {players.length < 4 && (
        <button
          onClick={addPlayer}
          className="mb-6 text-sm font-semibold text-accent transition-colors hover:text-accent-light"
        >
          + {t("party.addPlayer", lang)}
        </button>
      )}

      <button
        onClick={handleStart}
        disabled={!canStart}
        className="press-effect rounded-full bg-accent px-10 py-3.5 text-lg font-bold text-white transition-colors hover:bg-accent-light disabled:opacity-40"
      >
        {t("party.start", lang)}
      </button>

      <p className="mt-4 text-xs text-text-dim">
        {t("party.rounds", lang)}
      </p>
    </div>
  );
}
