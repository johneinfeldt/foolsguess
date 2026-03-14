import { useReducer } from "react";
import { Question, QuestionResult } from "@/lib/types";

export type GamePhase = "mode_select" | "playing" | "results";
export type GameMode = "relaxed" | "ranked";

export interface GameState {
  phase: GamePhase;
  mode: GameMode | null;
  currentQuestionIndex: number;
  strikes: number;
  revealedAnswers: boolean[];
  score: number;
  currentQuestionScore: number;
  questionResults: QuestionResult[];
  justRevealedIndex: number | null;
  questionOver: boolean;
}

export type GameAction =
  | { type: "SELECT_MODE"; mode: GameMode }
  | { type: "CORRECT_GUESS"; answerIndex: number; points: number }
  | { type: "WRONG_GUESS" }
  | { type: "TIME_UP" }
  | { type: "END_QUESTION" }
  | { type: "NEXT_QUESTION" }
  | { type: "CLEAR_JUST_REVEALED" }
  | { type: "RESTORE_RESULTS"; results: QuestionResult[]; score: number; mode: GameMode };

const initialState: GameState = {
  phase: "mode_select",
  mode: null,
  currentQuestionIndex: 0,
  strikes: 0,
  revealedAnswers: [false, false, false, false, false, false],
  score: 0,
  currentQuestionScore: 0,
  questionResults: [],
  justRevealedIndex: null,
  questionOver: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SELECT_MODE":
      return { ...state, phase: "playing", mode: action.mode };

    case "CORRECT_GUESS": {
      const newRevealed = [...state.revealedAnswers];
      newRevealed[action.answerIndex] = true;
      const newScore = state.score + action.points;
      const newQuestionScore = state.currentQuestionScore + action.points;
      const allFound = newRevealed.every(Boolean);
      return {
        ...state,
        revealedAnswers: newRevealed,
        score: newScore,
        currentQuestionScore: newQuestionScore,
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

    case "TIME_UP":
      return { ...state, questionOver: true };

    case "END_QUESTION": {
      const result: QuestionResult = {
        questionId: "",
        pointsEarned: state.currentQuestionScore,
        answersFound: [...state.revealedAnswers],
        strikes: state.strikes,
        timedOut: false,
      };
      return {
        ...state,
        questionResults: [...state.questionResults, result],
        revealedAnswers: [true, true, true, true, true, true],
      };
    }

    case "NEXT_QUESTION": {
      if (state.currentQuestionIndex >= 2) {
        return { ...state, phase: "results" };
      }
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        strikes: 0,
        revealedAnswers: [false, false, false, false, false, false],
        currentQuestionScore: 0,
        justRevealedIndex: null,
        questionOver: false,
      };
    }

    case "CLEAR_JUST_REVEALED":
      return { ...state, justRevealedIndex: null };

    case "RESTORE_RESULTS":
      return {
        ...state,
        phase: "results",
        mode: action.mode,
        score: action.score,
        questionResults: action.results,
      };

    default:
      return state;
  }
}

export function useGameState(questions: Question[]) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const currentQuestion = questions[state.currentQuestionIndex];
  return { state, dispatch, currentQuestion };
}
