import type * as Party from "partykit/server";

// Avatar config type (duplicated from client to avoid cross-bundle imports)
interface AvatarConfig {
  headShape: string;
  color: string;
  accessory: string;
}

interface PlayerInfo {
  id: string;
  name: string;
  avatar: AvatarConfig;
  connected: boolean;
}

interface QuestionData {
  id: string;
  question: string;
  category: string;
  answers: { text: string; aliases: string[]; points: number }[];
}

interface PlayerRoundScore {
  pointsEarned: number;
  answersFound: boolean[];
  strikes: number;
  done: boolean;
}

type RoomPhase = "lobby" | "playing" | "round_results" | "final_results";

interface RoomState {
  phase: RoomPhase;
  roomCode: string;
  hostId: string;
  players: PlayerInfo[];
  questions: QuestionData[];
  currentRound: number;
  roundScores: Record<string, PlayerRoundScore>;
  allScores: Record<string, PlayerRoundScore>[];
  roundsTotal: number;
}

// Client → Server messages
type ClientMessage =
  | { type: "JOIN"; name: string; avatar: AvatarConfig }
  | { type: "START_GAME"; questions: QuestionData[] }
  | { type: "FOUND_ANSWER"; answerIndex: number; points: number }
  | { type: "WRONG_GUESS" }
  | { type: "TURN_COMPLETE"; score: number; answersFound: boolean[]; strikes: number }
  | { type: "NEXT_ROUND" };

// Server → Client messages
type ServerMessage =
  | { type: "ROOM_STATE"; state: RoomState; yourId: string }
  | { type: "PLAYER_JOINED"; player: PlayerInfo }
  | { type: "PLAYER_LEFT"; playerId: string; newHostId: string | null }
  | { type: "GAME_STARTED"; question: QuestionData; roundNumber: number }
  | { type: "PLAYER_FOUND_ANSWER"; playerId: string; playerName: string; answerIndex: number }
  | { type: "PLAYER_STRIKE"; playerId: string; strikes: number }
  | { type: "ROUND_COMPLETE"; scores: Record<string, PlayerRoundScore>; roundNumber: number }
  | { type: "FINAL_RESULTS"; allScores: Record<string, PlayerRoundScore>[] }
  | { type: "ERROR"; message: string };

export default class FoolsGuessServer implements Party.Server {
  state: RoomState;

  constructor(readonly room: Party.Room) {
    this.state = {
      phase: "lobby",
      roomCode: room.id,
      hostId: "",
      players: [],
      questions: [],
      currentRound: 0,
      roundScores: {},
      allScores: [],
      roundsTotal: 5,
    };
  }

  onConnect(conn: Party.Connection) {
    this.send(conn, {
      type: "ROOM_STATE",
      state: this.state,
      yourId: conn.id,
    });
  }

  onClose(conn: Party.Connection) {
    const player = this.state.players.find((p) => p.id === conn.id);
    if (!player) return;

    player.connected = false;

    let newHostId: string | null = null;

    // If host left during lobby, reassign
    if (conn.id === this.state.hostId) {
      const connected = this.state.players.filter((p) => p.connected);
      if (connected.length > 0) {
        this.state.hostId = connected[0].id;
        newHostId = connected[0].id;
      }
    }

    this.broadcast({
      type: "PLAYER_LEFT",
      playerId: conn.id,
      newHostId,
    });

    // During gameplay, check if this completes the round
    if (this.state.phase === "playing") {
      this.checkRoundComplete();
    }
  }

  onMessage(message: string, sender: Party.Connection) {
    let msg: ClientMessage;
    try {
      msg = JSON.parse(message);
    } catch {
      return;
    }

    switch (msg.type) {
      case "JOIN":
        this.handleJoin(msg, sender);
        break;
      case "START_GAME":
        this.handleStartGame(msg, sender);
        break;
      case "FOUND_ANSWER":
        this.handleFoundAnswer(msg, sender);
        break;
      case "WRONG_GUESS":
        this.handleWrongGuess(sender);
        break;
      case "TURN_COMPLETE":
        this.handleTurnComplete(msg, sender);
        break;
      case "NEXT_ROUND":
        this.handleNextRound(sender);
        break;
    }
  }

  handleJoin(msg: { name: string; avatar: AvatarConfig }, sender: Party.Connection) {
    if (this.state.phase !== "lobby") {
      this.send(sender, { type: "ERROR", message: "Game already in progress" });
      return;
    }

    // Check if this connection already joined (reconnect)
    const existing = this.state.players.find((p) => p.id === sender.id);
    if (existing) {
      existing.connected = true;
      existing.name = msg.name;
      existing.avatar = msg.avatar;
      this.broadcastState();
      return;
    }

    if (this.state.players.length >= 4) {
      this.send(sender, { type: "ERROR", message: "Room is full" });
      return;
    }

    const player: PlayerInfo = {
      id: sender.id,
      name: msg.name,
      avatar: msg.avatar,
      connected: true,
    };

    this.state.players.push(player);

    if (this.state.players.length === 1) {
      this.state.hostId = sender.id;
    }

    this.broadcast({ type: "PLAYER_JOINED", player });
    this.broadcastState();
  }

  handleStartGame(msg: { questions: QuestionData[] }, sender: Party.Connection) {
    if (sender.id !== this.state.hostId) return;
    const connectedPlayers = this.state.players.filter((p) => p.connected);
    if (connectedPlayers.length < 2) return;

    this.state.questions = msg.questions;
    this.state.phase = "playing";
    this.state.currentRound = 0;
    this.state.roundScores = {};
    this.state.allScores = [];

    // Initialize round scores for all connected players
    for (const p of connectedPlayers) {
      this.state.roundScores[p.id] = {
        pointsEarned: 0,
        answersFound: [false, false, false, false, false, false],
        strikes: 0,
        done: false,
      };
    }

    this.broadcast({
      type: "GAME_STARTED",
      question: this.state.questions[0],
      roundNumber: 1,
    });
  }

  handleFoundAnswer(msg: { answerIndex: number; points: number }, sender: Party.Connection) {
    if (this.state.phase !== "playing") return;

    const score = this.state.roundScores[sender.id];
    if (score) {
      score.answersFound[msg.answerIndex] = true;
      score.pointsEarned += msg.points;
    }

    const player = this.state.players.find((p) => p.id === sender.id);
    this.broadcast({
      type: "PLAYER_FOUND_ANSWER",
      playerId: sender.id,
      playerName: player?.name || "",
      answerIndex: msg.answerIndex,
    });
  }

  handleWrongGuess(sender: Party.Connection) {
    if (this.state.phase !== "playing") return;

    const score = this.state.roundScores[sender.id];
    if (score) {
      score.strikes++;
      this.broadcast({
        type: "PLAYER_STRIKE",
        playerId: sender.id,
        strikes: score.strikes,
      });
    }
  }

  handleTurnComplete(msg: { score: number; answersFound: boolean[]; strikes: number }, sender: Party.Connection) {
    if (this.state.phase !== "playing") return;

    this.state.roundScores[sender.id] = {
      pointsEarned: msg.score,
      answersFound: msg.answersFound,
      strikes: msg.strikes,
      done: true,
    };

    this.checkRoundComplete();
  }

  handleNextRound(sender: Party.Connection) {
    if (sender.id !== this.state.hostId) return;
    if (this.state.phase !== "round_results") return;

    if (this.state.currentRound >= this.state.roundsTotal - 1) {
      this.state.phase = "final_results";
      this.broadcast({
        type: "FINAL_RESULTS",
        allScores: this.state.allScores,
      });
    } else {
      this.state.currentRound++;
      this.state.phase = "playing";

      // Initialize round scores
      const connectedPlayers = this.state.players.filter((p) => p.connected);
      this.state.roundScores = {};
      for (const p of connectedPlayers) {
        this.state.roundScores[p.id] = {
          pointsEarned: 0,
          answersFound: [false, false, false, false, false, false],
          strikes: 0,
          done: false,
        };
      }

      this.broadcast({
        type: "GAME_STARTED",
        question: this.state.questions[this.state.currentRound],
        roundNumber: this.state.currentRound + 1,
      });
    }
  }

  checkRoundComplete() {
    const connectedPlayers = this.state.players.filter((p) => p.connected);
    const allDone = connectedPlayers.every((p) => this.state.roundScores[p.id]?.done);

    if (allDone && connectedPlayers.length > 0) {
      this.state.allScores.push({ ...this.state.roundScores });
      this.state.phase = "round_results";
      this.broadcast({
        type: "ROUND_COMPLETE",
        scores: this.state.roundScores,
        roundNumber: this.state.currentRound + 1,
      });
    }
  }

  broadcast(msg: ServerMessage) {
    const data = JSON.stringify(msg);
    for (const conn of this.room.getConnections()) {
      conn.send(data);
    }
  }

  broadcastState() {
    for (const conn of this.room.getConnections()) {
      conn.send(
        JSON.stringify({
          type: "ROOM_STATE",
          state: this.state,
          yourId: conn.id,
        })
      );
    }
  }

  send(conn: Party.Connection, msg: ServerMessage) {
    conn.send(JSON.stringify(msg));
  }
}
