"use client";

import { useState } from "react";
import { useLang, t } from "@/lib/i18n";
import { AvatarConfig, DEFAULT_AVATARS } from "@/lib/avatars";
import { Player } from "./usePartyState";
import AvatarDisplay from "@/components/AvatarDisplay";
import AvatarBuilder from "@/components/AvatarBuilder";

interface PlayerSetupProps {
  onStart: (players: Player[]) => void;
}

export default function PlayerSetup({ onStart }: PlayerSetupProps) {
  const lang = useLang();
  const [names, setNames] = useState<string[]>(["", ""]);
  const [avatars, setAvatars] = useState<AvatarConfig[]>([
    { ...DEFAULT_AVATARS[0] },
    { ...DEFAULT_AVATARS[1] },
  ]);
  const [expandedPlayer, setExpandedPlayer] = useState<number | null>(null);

  const addPlayer = () => {
    if (names.length < 4) {
      setNames([...names, ""]);
      setAvatars([...avatars, { ...DEFAULT_AVATARS[names.length] }]);
    }
  };

  const removePlayer = (index: number) => {
    if (names.length > 2) {
      setNames(names.filter((_, i) => i !== index));
      setAvatars(avatars.filter((_, i) => i !== index));
      if (expandedPlayer === index) setExpandedPlayer(null);
      else if (expandedPlayer !== null && expandedPlayer > index) {
        setExpandedPlayer(expandedPlayer - 1);
      }
    }
  };

  const updateName = (index: number, name: string) => {
    const updated = [...names];
    updated[index] = name;
    setNames(updated);
  };

  const updateAvatar = (index: number, avatar: AvatarConfig) => {
    const updated = [...avatars];
    updated[index] = avatar;
    setAvatars(updated);
  };

  const canStart = names.every((p) => p.trim().length > 0);

  const handleStart = () => {
    if (canStart) {
      onStart(
        names.map((name, i) => ({
          name: name.trim(),
          avatar: avatars[i],
        }))
      );
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-8">
      <h1 className="mb-2 text-3xl font-extrabold">
        {t("party.title", lang)}
      </h1>
      <p className="mb-6 text-text-muted">{t("party.addPlayers", lang)}</p>

      <div className="mb-6 flex w-full max-w-sm flex-col gap-3">
        {names.map((name, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="flex items-center gap-2 p-3">
              <button
                type="button"
                onClick={() =>
                  setExpandedPlayer(expandedPlayer === i ? null : i)
                }
                className="shrink-0 rounded-lg p-0.5 transition-all hover:scale-110"
              >
                <AvatarDisplay avatar={avatars[i]} size={36} />
              </button>
              <input
                type="text"
                value={name}
                onChange={(e) => updateName(i, e.target.value)}
                placeholder={`${t("party.player", lang)} ${i + 1}`}
                maxLength={12}
                className="flex-1 rounded-xl border-2 border-border bg-surface px-4 py-2.5 text-text placeholder-text-dim outline-none transition-all focus:border-accent"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleStart();
                }}
              />
              {names.length > 2 && (
                <button
                  onClick={() => removePlayer(i)}
                  className="shrink-0 text-text-dim transition-colors hover:text-wrong"
                >
                  &#10005;
                </button>
              )}
            </div>
            {expandedPlayer === i && (
              <div className="border-t border-border px-3 py-4">
                <AvatarBuilder
                  value={avatars[i]}
                  onChange={(av) => updateAvatar(i, av)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {names.length < 4 && (
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
