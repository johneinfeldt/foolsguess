"use client";

import { useEffect, useRef, useState } from "react";
import { Question, QuestionResult } from "@/lib/types";
import { getDailyQuestions } from "@/lib/daily";
import { useGameState, GameMode } from "./useGameState";
import { updateStreak } from "@/lib/journeyStorage";
import { useAuth } from "@/lib/authContext";
import { uploadDailyScore, uploadStreak } from "@/lib/syncService";
import { useLang, t } from "@/lib/i18n";
import { loadQuestions } from "@/lib/questionsLoader";
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
  allQuestionsEn: Question[];
}

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function DailyGame({ allQuestionsEn }: DailyGameProps) {
  const lang = useLang();
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>(allQuestionsEn);
  const { state, dispatch, currentQuestion } = useGameState(questions);
  const playDateRef = useRef<string>(getTodayString());

  // Load translated questions when language changes
  useEffect(() => {
    loadQuestions(lang, allQuestionsEn).then(setAllQuestions);
  }, [lang, allQuestionsEn]);

  // Select today's questions client-side for determinism
  useEffect(() => {
    if (allQuestions.length === 0) return;
    const today = new Date();
    // Always use English for index selection (deterministic across languages)
    const dailyEnQs = getDailyQuestions(today, allQuestionsEn);
    const dailyQs = dailyEnQs.map((enQ) => {
      const idx = allQuestionsEn.indexOf(enQ);
      return allQuestions[idx] || enQ;
    });
    setQuestions(dailyQs);
  }, [allQuestions, allQuestionsEn]);

  // Check localStorage on mount
  useEffect(() => {
    if (questions.length === 0) return;
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
  }, [dispatch, questions]);

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
        const streak = updateStreak();
        // Sync to server if logged in
        if (user) {
          uploadDailyScore(user.id, data.date, data.mode, data.score, data.questionResults);
          uploadStreak(user.id, streak);
        }
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [state.phase, state.mode, state.score, state.questionResults, user]);

  const handleModeSelect = (mode: GameMode) => {
    playDateRef.current = getTodayString();
    dispatch({ type: "SELECT_MODE", mode });
  };

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-md">
        <a href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Fools</span>Guess
        </a>
        {state.phase === "playing" && (
          <span className="text-sm font-medium text-text-muted">
            {t("daily.title", lang)}
          </span>
        )}
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-lg">
        {state.phase === "mode_select" && (
          <ModeSelect onSelect={handleModeSelect} />
        )}

        {state.phase === "playing" && state.mode && currentQuestion && (
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
