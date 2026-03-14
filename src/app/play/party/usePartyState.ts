import { useReducer } from "react";
import { Question } from "@/lib/types";

export interface PlayerScore {
  pointsEarned: number;
  answersFound: boolean[];
  strikes: number;
}

export type PartyPhase = "setup" | "turn_intro" | "playing" | "round_results" | "final_results";

export interface PartyState {
  phase: PartyPhase;
  players: string[];
  questions: Question[];
  currentRound: number;       // 0-indexed, total of ROUNDS_PER_GAME
  currentPlayerIndex: number;  // 0-indexed within players array
  // Per-turn playing state
  strikes: number;
  revealedAnswers: boolean[];
  turnScore: number;
  justRevealedIndex: number | null;
  turnOver: boolean;
  // Score tracking: scores[roundIndex][playerIndex]
  scores: PlayerScore[][];
}

export type PartyAction =
  | { type: "START_GAME"; players: string[]; questions: Question[] }
  | { type: "BEGIN_TURN" }
  | { type: "CORRECT_GUESS"; answerIndex: number; points: number }
  | { type: "WRONG_GUESS" }
  | { type: "TIME_UP" }
  | { type: "END_TURN" }
  | { type: "NEXT_PLAYER" }
  | { type: "NEXT_ROUND" }
  | { type: "SHOW_FINAL" }
  | { type: "CLEAR_JUST_REVEALED" };

export const ROUNDS_PER_GAME = 5;

const initialState: PartyState = {
  phase: "setup",
  players: [],
  questions: [],
  currentRound: 0,
  currentPlayerIndex: 0,
  strikes: 0,
  revealedAnswers: [false, false, false, false, false, false],
  turnScore: 0,
  justRevealedIndex: null,
  turnOver: false,
  scores: [],
};

function partyReducer(state: PartyState, action: PartyAction): PartyState {
  switch (action.type) {
    case "START_GAME": {
      const emptyScores: PlayerScore[][] = [];
      return {
        ...state,
        phase: "turn_intro",
        players: action.players,
        questions: action.questions,
        currentRound: 0,
        currentPlayerIndex: 0,
        scores: emptyScores,
      };
    }

    case "BEGIN_TURN":
      return {
        ...state,
        phase: "playing",
        strikes: 0,
        revealedAnswers: [false, false, false, false, false, false],
        turnScore: 0,
        justRevealedIndex: null,
        turnOver: false,
      };

    case "CORRECT_GUESS": {
      const newRevealed = [...state.revealedAnswers];
      newRevealed[action.answerIndex] = true;
      const newTurnScore = state.turnScore + action.points;
      const allFound = newRevealed.every(Boolean);
      return {
        ...state,
        revealedAnswers: newRevealed,
        turnScore: newTurnScore,
        justRevealedIndex: action.answerIndex,
        turnOver: allFound,
      };
    }

    case "WRONG_GUESS": {
      const newStrikes = state.strikes + 1;
      return {
        ...state,
        strikes: newStrikes,
        turnOver: newStrikes >= 3,
      };
    }

    case "TIME_UP":
      return { ...state, turnOver: true };

    case "END_TURN": {
      const playerScore: PlayerScore = {
        pointsEarned: state.turnScore,
        answersFound: [...state.revealedAnswers],
        strikes: state.strikes,
      };

      const newScores = [...state.scores];
      if (!newScores[state.currentRound]) {
        newScores[state.currentRound] = [];
      }
      newScores[state.currentRound][state.currentPlayerIndex] = playerScore;

      // Check if all players played this round
      const allPlayersPlayed = state.currentPlayerIndex >= state.players.length - 1;

      if (allPlayersPlayed) {
        return {
          ...state,
          scores: newScores,
          revealedAnswers: [true, true, true, true, true, true],
          phase: "round_results",
        };
      }

      return {
        ...state,
        scores: newScores,
        currentPlayerIndex: state.currentPlayerIndex + 1,
        phase: "turn_intro",
      };
    }

    case "NEXT_ROUND": {
      if (state.currentRound >= ROUNDS_PER_GAME - 1) {
        return { ...state, phase: "final_results" };
      }
      return {
        ...state,
        currentRound: state.currentRound + 1,
        currentPlayerIndex: 0,
        phase: "turn_intro",
      };
    }

    case "SHOW_FINAL":
      return { ...state, phase: "final_results" };

    case "CLEAR_JUST_REVEALED":
      return { ...state, justRevealedIndex: null };

    default:
      return state;
  }
}

export function usePartyState() {
  const [state, dispatch] = useReducer(partyReducer, initialState);
  const currentQuestion = state.questions[state.currentRound] || null;
  return { state, dispatch, currentQuestion };
}
