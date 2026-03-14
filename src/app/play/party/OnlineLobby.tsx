"use client";

import { useState } from "react";
import { useLang, t } from "@/lib/i18n";
import { AvatarConfig, DEFAULT_AVATARS } from "@/lib/avatars";
import AvatarBuilder from "@/components/AvatarBuilder";
import AvatarDisplay from "@/components/AvatarDisplay";

interface PlayerInfo {
  id: string;
  name: string;
  avatar: AvatarConfig;
  connected: boolean;
}

interface OnlineLobbyProps {
  phase: "choose" | "lobby";
  roomCode: string;
  players: PlayerInfo[];
  hostId: string;
  myId: string;
  error: string | null;
  onCreateRoom: (name: string, avatar: AvatarConfig) => void;
  onJoinRoom: (code: string, name: string, avatar: AvatarConfig) => void;
  onStartGame: () => void;
}

export default function OnlineLobby({
  phase,
  roomCode,
  players,
  hostId,
  myId,
  error,
  onCreateRoom,
  onJoinRoom,
  onStartGame,
}: OnlineLobbyProps) {
  const lang = useLang();
  const [view, setView] = useState<"choose" | "create" | "join">("choose");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<AvatarConfig>({ ...DEFAULT_AVATARS[0] });
  const [joinCode, setJoinCode] = useState("");
  const [copied, setCopied] = useState(false);

  const isHost = myId === hostId;
  const connectedCount = players.filter((p) => p.connected).length;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Choose create or join
  if (phase === "choose" && view === "choose") {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-8">
        <h1 className="mb-2 text-3xl font-extrabold">{t("party.online", lang)}</h1>
        <p className="mb-8 text-text-muted">{t("party.chooseMode", lang)}</p>

        <div className="grid w-full max-w-sm gap-4 sm:grid-cols-2">
          <button
            onClick={() => setView("create")}
            className="card card-hover press-effect flex flex-col items-center gap-3 p-6 text-center transition-all hover:scale-[1.02]"
          >
            <div className="text-4xl">&#10133;</div>
            <h3 className="text-lg font-bold">{t("online.createRoom", lang)}</h3>
          </button>

          <button
            onClick={() => setView("join")}
            className="card card-hover press-effect flex flex-col items-center gap-3 p-6 text-center transition-all hover:scale-[1.02]"
          >
            <div className="text-4xl">&#128279;</div>
            <h3 className="text-lg font-bold">{t("online.joinRoom", lang)}</h3>
          </button>
        </div>
      </div>
    );
  }

  // Create or join form
  if (phase === "choose" && (view === "create" || view === "join")) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-8">
        <h2 className="mb-6 text-2xl font-extrabold">
          {view === "create" ? t("online.createRoom", lang) : t("online.joinRoom", lang)}
        </h2>

        <div className="mb-6 w-full max-w-sm">
          <AvatarBuilder value={avatar} onChange={setAvatar} />
        </div>

        <div className="mb-4 w-full max-w-sm">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("online.yourName", lang)}
            maxLength={12}
            className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-center text-text placeholder-text-dim outline-none transition-all focus:border-accent"
          />
        </div>

        {view === "join" && (
          <div className="mb-4 w-full max-w-sm">
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder={t("online.enterCode", lang)}
              maxLength={6}
              className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-center font-mono text-xl tracking-widest text-text placeholder-text-dim outline-none transition-all focus:border-accent"
            />
          </div>
        )}

        {error && (
          <p className="mb-4 text-sm font-semibold text-wrong">{error}</p>
        )}

        <button
          onClick={() => {
            if (!name.trim()) return;
            if (view === "create") {
              onCreateRoom(name.trim(), avatar);
            } else {
              if (joinCode.length < 4) return;
              onJoinRoom(joinCode.trim(), name.trim(), avatar);
            }
          }}
          disabled={!name.trim() || (view === "join" && joinCode.length < 4)}
          className="press-effect rounded-full bg-accent px-10 py-3.5 text-lg font-bold text-white transition-colors hover:bg-accent-light disabled:opacity-40"
        >
          {view === "create" ? t("online.createRoom", lang) : t("online.join", lang)}
        </button>

        <button
          onClick={() => setView("choose")}
          className="mt-4 text-sm text-text-dim transition-colors hover:text-text-muted"
        >
          &larr; {t("game.back", lang)}
        </button>
      </div>
    );
  }

  // Lobby view - connected to room, waiting for players
  return (
    <div className="flex min-h-[80vh] flex-col items-center px-4 py-8">
      <h2 className="mb-2 text-2xl font-extrabold">{t("party.online", lang)}</h2>

      {/* Room code */}
      <p className="mb-2 text-sm text-text-muted">{t("online.shareCode", lang)}</p>
      <button
        onClick={handleCopyCode}
        className="card press-effect mb-6 flex items-center gap-3 px-6 py-3 transition-all hover:scale-105"
      >
        <span className="font-mono text-3xl font-extrabold tracking-[0.3em] text-accent">
          {roomCode}
        </span>
        <span className="text-sm text-text-dim">
          {copied ? t("online.copied", lang) : "&#128203;"}
        </span>
      </button>

      {/* Players list */}
      <div className="mb-6 w-full max-w-sm">
        <h3 className="mb-3 text-sm font-bold text-text-muted">
          {t("online.players", lang)} ({connectedCount}/4)
        </h3>
        <div className="flex flex-col gap-2">
          {players.filter((p) => p.connected).map((player) => (
            <div key={player.id} className="card flex items-center gap-3 p-3">
              <AvatarDisplay avatar={player.avatar} size={36} />
              <span className="flex-1 font-bold">{player.name}</span>
              {player.id === hostId && (
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-bold text-accent">
                  {t("online.host", lang)}
                </span>
              )}
              {player.id === myId && (
                <span className="text-xs text-text-dim">(you)</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Waiting or start */}
      {isHost ? (
        <div className="flex flex-col items-center gap-2">
          {connectedCount < 2 && (
            <p className="mb-2 text-sm text-text-dim">{t("online.needMorePlayers", lang)}</p>
          )}
          <button
            onClick={onStartGame}
            disabled={connectedCount < 2}
            className="press-effect rounded-full bg-accent px-10 py-3.5 text-lg font-bold text-white transition-colors hover:bg-accent-light disabled:opacity-40"
          >
            {t("online.startGame", lang)}
          </button>
        </div>
      ) : (
        <p className="text-sm text-text-muted">{t("online.waitingPlayers", lang)}</p>
      )}
    </div>
  );
}
