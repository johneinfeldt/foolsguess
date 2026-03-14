"use client";

import { useEffect, useRef } from "react";
import { Question, QuestionResult } from "@/lib/types";
import { useGameState, GameMode } from "./useGameState";
import ModeSelect from "./ModeSelect";
import GameBoard from "./GameBoard";
import ResultsScreen from "./ResultsScreen";

interface DailyStorage {
  date: string;
  mode: GameMode;
  score: number;
  questionResults: QuestionResult[];
}

interface DailyGameProps {
  questions: Question[];
}

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function DailyGame({ questions }: DailyGameProps) {
  const { state, dispatch, currentQuestion } = useGameState(questions);
  const playDateRef = useRef<string>(getTodayString());

  // Check localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("foolsguess_daily");
      if (stored) {
        const data: DailyStorage = JSON.parse(stored);
        if (data.date === getTodayString()) {
          dispatch({
            type: "RESTORE_RESULTS",
            results: data.questionResults,
            score: data.score,
            mode: data.mode,
          });
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [dispatch]);

  // Save to localStorage when game ends
  useEffect(() => {
    if (state.phase === "results" && state.mode && state.questionResults.length === 3) {
      try {
        const data: DailyStorage = {
          date: playDateRef.current,
          mode: state.mode,
          score: state.score,
          questionResults: state.questionResults,
        };
        localStorage.setItem("foolsguess_daily", JSON.stringify(data));
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [state.phase, state.mode, state.score, state.questionResults]);

  const handleModeSelect = (mode: GameMode) => {
    playDateRef.current = getTodayString();
    dispatch({ type: "SELECT_MODE", mode });
  };

  return (
    <div className="min-h-screen bg-midnight font-sans text-text-primary">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-midnight/80 px-6 py-4 backdrop-blur-md">
        <a href="/" className="text-xl font-bold tracking-tight">
          <span className="text-electric">Fools</span>Guess
        </a>
        {state.phase === "playing" && (
          <span className="text-sm text-text-muted">Daily Challenge</span>
        )}
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-lg">
        {state.phase === "mode_select" && (
          <ModeSelect onSelect={handleModeSelect} />
        )}

        {state.phase === "playing" && state.mode && (
          <GameBoard
            question={currentQuestion}
            state={state}
            dispatch={dispatch}
            mode={state.mode}
          />
        )}

        {state.phase === "results" && (
          <ResultsScreen
            questions={questions}
            questionResults={state.questionResults}
            score={state.score}
            mode={state.mode || "relaxed"}
          />
        )}
      </main>
    </div>
  );
}
