import { useReducer } from "react";
import { QuestionProgress } from "@/lib/types";

export interface JourneyGameState {
  phase: "playing" | "result";
  revealedAnswers: boolean[];
  strikes: number;
  pointsThisPlay: number;
  questionOver: boolean;
  justRevealedIndex: number | null;
  preRevealed: boolean[];
}

export type JourneyGameAction =
  | { type: "CORRECT_GUESS"; answerIndex: number; points: number }
  | { type: "WRONG_GUESS" }
  | { type: "END_QUESTION" }
  | { type: "CLEAR_JUST_REVEALED" };

function createInitialState(existingProgress?: QuestionProgress): JourneyGameState {
  const preRevealed = existingProgress?.answersFound ?? [false, false, false, false, false, false];
  return {
    phase: "playing",
    revealedAnswers: [...preRevealed],
    strikes: 0,
    pointsThisPlay: 0,
    questionOver: false,
    justRevealedIndex: null,
    preRevealed: [...preRevealed],
  };
}

function journeyGameReducer(state: JourneyGameState, action: JourneyGameAction): JourneyGameState {
  switch (action.type) {
    case "CORRECT_GUESS": {
      const newRevealed = [...state.revealedAnswers];
      newRevealed[action.answerIndex] = true;
      const allFound = newRevealed.every(Boolean);
      return {
        ...state,
        revealedAnswers: newRevealed,
        pointsThisPlay: state.pointsThisPlay + action.points,
        justRevealedIndex: action.answerIndex,
        questionOver: allFound,
      };
    }

    case "WRONG_GUESS": {
      const newStrikes = state.strikes + 1;
      return {
        ...state,
        strikes: newStrikes,
        questionOver: newStrikes >= 3,
      };
    }

    case "END_QUESTION":
      return {
        ...state,
        phase: "result",
      };

    case "CLEAR_JUST_REVEALED":
      return { ...state, justRevealedIndex: null };

    default:
      return state;
  }
}

export function useJourneyGame(existingProgress?: QuestionProgress) {
  const [state, dispatch] = useReducer(
    journeyGameReducer,
    existingProgress,
    createInitialState
  );
  return { state, dispatch };
}
