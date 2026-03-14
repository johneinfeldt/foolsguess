"use client";

import { useState, useCallback, useRef } from "react";
import { Question } from "@/lib/types";
import { AvatarConfig } from "@/lib/avatars";
import { Player, PlayerScore, ROUNDS_PER_GAME } from "./usePartyState";
import { pickRandomQuestions } from "./PartyGame";
import usePartySocket from "partysocket/react";
import OnlineLobby from "./OnlineLobby";
import OnlineBoard from "./OnlineBoard";
import RoundResults from "./RoundResults";
import FinalResults from "./FinalResults";

interface PlayerInfo {
  id: string;
  name: string;
  avatar: AvatarConfig;
  connected: boolean;
}

interface PlayerRoundScore {
  pointsEarned: number;
  answersFound: boolean[];
  strikes: number;
  done: boolean;
}

interface FeedEvent {
  id: string;
  playerId: string;
  playerName: string;
  playerAvatar: AvatarConfig;
  type: "found" | "strike";
  answerIndex?: number;
  timestamp: number;
}

interface OnlineGameProps {
  allQuestions: Question[];
}

function generateRoomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export default function OnlineGame({ allQuestions }: OnlineGameProps) {
  const [lobbyPhase, setLobbyPhase] = useState<"choose" | "lobby">("choose");
  const [roomCode, setRoomCode] = useState("");
  const [gamePhase, setGamePhase] = useState<"lobby" | "playing" | "round_results" | "final_results">("lobby");
  const [players, setPlayers] = useState<PlayerInfo[]>([]);
  const [hostId, setHostId] = useState("");
  const [myId, setMyId] = useState("");
  const [myName, setMyName] = useState("");
  const [myAvatar, setMyAvatar] = useState<AvatarConfig>({ headShape: "short", color: "light", accessory: "none" });
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [roundNumber, setRoundNumber] = useState(0);
  const [roundScores, setRoundScores] = useState<Record<string, PlayerRoundScore>>({});
  const [allScores, setAllScores] = useState<Record<string, PlayerRoundScore>[]>([]);
  const [feedEvents, setFeedEvents] = useState<FeedEvent[]>([]);
  const [connected, setConnected] = useState(false);

  const pendingJoinRef = useRef<{ name: string; avatar: AvatarConfig } | null>(null);

  const ws = usePartySocket({
    host: process.env.NEXT_PUBLIC_PARTYKIT_HOST || "localhost:1999",
    room: roomCode || "___placeholder___",
    startClosed: !roomCode,

    onOpen() {
      setConnected(true);
      // Send JOIN if we have pending join data
      if (pendingJoinRef.current && ws) {
        ws.send(JSON.stringify({
          type: "JOIN",
          name: pendingJoinRef.current.name,
          avatar: pendingJoinRef.current.avatar,
        }));
        pendingJoinRef.current = null;
      }
    },

    onClose() {
      setConnected(false);
    },

    onMessage(event) {
      const msg = JSON.parse(event.data);

      switch (msg.type) {
        case "ROOM_STATE": {
          setPlayers(msg.state.players);
          setHostId(msg.state.hostId);
          setMyId(msg.yourId);
          if (msg.state.phase === "lobby") {
            setGamePhase("lobby");
            setLobbyPhase("lobby");
          }
          break;
        }

        case "PLAYER_JOINED": {
          setPlayers((prev) => {
            const existing = prev.find((p) => p.id === msg.player.id);
            if (existing) {
              return prev.map((p) =>
                p.id === msg.player.id ? msg.player : p
              );
            }
            return [...prev, msg.player];
          });
          break;
        }

        case "PLAYER_LEFT": {
          setPlayers((prev) =>
            prev.map((p) =>
              p.id === msg.playerId ? { ...p, connected: false } : p
            )
          );
          if (msg.newHostId) {
            setHostId(msg.newHostId);
          }
          break;
        }

        case "GAME_STARTED": {
          setCurrentQuestion(msg.question);
          setRoundNumber(msg.roundNumber);
          setGamePhase("playing");
          setFeedEvents([]);
          break;
        }

        case "PLAYER_FOUND_ANSWER": {
          if (msg.playerId !== myId) {
            const player = players.find((p) => p.id === msg.playerId);
            setFeedEvents((prev) => [
              ...prev,
              {
                id: `${msg.playerId}-${msg.answerIndex}-${Date.now()}`,
                playerId: msg.playerId,
                playerName: msg.playerName,
                playerAvatar: player?.avatar || { headShape: "short", color: "light", accessory: "none" },
                type: "found",
                answerIndex: msg.answerIndex,
                timestamp: Date.now(),
              },
            ]);
          }
          break;
        }

        case "PLAYER_STRIKE": {
          if (msg.playerId !== myId) {
            const player = players.find((p) => p.id === msg.playerId);
            setFeedEvents((prev) => [
              ...prev,
              {
                id: `${msg.playerId}-strike-${Date.now()}`,
                playerId: msg.playerId,
                playerName: player?.name || "",
                playerAvatar: player?.avatar || { headShape: "short", color: "light", accessory: "none" },
                type: "strike",
                timestamp: Date.now(),
              },
            ]);
          }
          break;
        }

        case "ROUND_COMPLETE": {
          setRoundScores(msg.scores);
          setGamePhase("round_results");
          break;
        }

        case "FINAL_RESULTS": {
          setAllScores(msg.allScores);
          setGamePhase("final_results");
          break;
        }

        case "ERROR": {
          setError(msg.message);
          break;
        }
      }
    },
  });

  const handleCreateRoom = useCallback((name: string, avatar: AvatarConfig) => {
    const code = generateRoomCode();
    setRoomCode(code);
    setMyName(name);
    setMyAvatar(avatar);
    pendingJoinRef.current = { name, avatar };
    setError(null);
    // The ws will reconnect with new room code and send JOIN in onOpen
  }, []);

  const handleJoinRoom = useCallback((code: string, name: string, avatar: AvatarConfig) => {
    setRoomCode(code.toUpperCase());
    setMyName(name);
    setMyAvatar(avatar);
    pendingJoinRef.current = { name, avatar };
    setError(null);
  }, []);

  const handleStartGame = useCallback(() => {
    if (!ws) return;
    const questions = pickRandomQuestions(allQuestions, ROUNDS_PER_GAME);
    ws.send(JSON.stringify({ type: "START_GAME", questions }));
  }, [ws, allQuestions]);

  const handleFoundAnswer = useCallback((answerIndex: number, points: number) => {
    ws?.send(JSON.stringify({ type: "FOUND_ANSWER", answerIndex, points }));
  }, [ws]);

  const handleWrongGuess = useCallback(() => {
    ws?.send(JSON.stringify({ type: "WRONG_GUESS" }));
  }, [ws]);

  const handleTurnComplete = useCallback((score: number, answersFound: boolean[], strikes: number) => {
    ws?.send(JSON.stringify({ type: "TURN_COMPLETE", score, answersFound, strikes }));
  }, [ws]);

  const handleNextRound = useCallback(() => {
    ws?.send(JSON.stringify({ type: "NEXT_ROUND" }));
  }, [ws]);

  const handlePlayAgain = useCallback(() => {
    window.location.reload();
  }, []);

  // Convert server scores to component-compatible format
  const connectedPlayers = players.filter((p) => p.connected);

  // Build Player[] for RoundResults/FinalResults
  const playersForResults: Player[] = connectedPlayers.map((p) => ({
    name: p.name,
    avatar: p.avatar,
  }));

  // Build PlayerScore[] for current round (indexed by position in connectedPlayers)
  const roundScoresForResults: PlayerScore[] = connectedPlayers.map((p) => ({
    pointsEarned: roundScores[p.id]?.pointsEarned || 0,
    answersFound: roundScores[p.id]?.answersFound || [false, false, false, false, false, false],
    strikes: roundScores[p.id]?.strikes || 0,
  }));

  // Build PlayerScore[][] for all rounds
  const allScoresForResults: PlayerScore[][] = allScores.map((roundMap) =>
    connectedPlayers.map((p) => ({
      pointsEarned: roundMap[p.id]?.pointsEarned || 0,
      answersFound: roundMap[p.id]?.answersFound || [false, false, false, false, false, false],
      strikes: roundMap[p.id]?.strikes || 0,
    }))
  );

  const isHost = myId === hostId;

  // Lobby phase
  if (gamePhase === "lobby") {
    return (
      <OnlineLobby
        phase={lobbyPhase}
        roomCode={roomCode}
        players={players}
        hostId={hostId}
        myId={myId}
        error={error}
        onCreateRoom={handleCreateRoom}
        onJoinRoom={handleJoinRoom}
        onStartGame={handleStartGame}
      />
    );
  }

  // Playing phase
  if (gamePhase === "playing" && currentQuestion) {
    return (
      <OnlineBoard
        key={roundNumber}
        question={currentQuestion}
        roundNumber={roundNumber}
        totalRounds={ROUNDS_PER_GAME}
        myName={myName}
        myAvatar={myAvatar}
        feedEvents={feedEvents}
        onFoundAnswer={handleFoundAnswer}
        onWrongGuess={handleWrongGuess}
        onTurnComplete={handleTurnComplete}
      />
    );
  }

  // Round results
  if (gamePhase === "round_results" && currentQuestion) {
    return (
      <RoundResults
        players={playersForResults}
        roundScores={roundScoresForResults}
        roundNumber={roundNumber}
        questionText={currentQuestion.question}
        answers={currentQuestion.answers}
        onNext={handleNextRound}
        isLastRound={roundNumber >= ROUNDS_PER_GAME}
        isOnline={true}
        isHost={isHost}
      />
    );
  }

  // Final results
  if (gamePhase === "final_results") {
    return (
      <FinalResults
        players={playersForResults}
        scores={allScoresForResults}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  return null;
}
