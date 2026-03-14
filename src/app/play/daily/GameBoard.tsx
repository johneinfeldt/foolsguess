"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Question } from "@/lib/types";
import { checkGuess } from "@/lib/matching";
import { GameState, GameAction, GameMode } from "./useGameState";
import { useLang, t } from "@/lib/i18n";
import AnswerSlot from "./AnswerSlot";
import StrikeCounter from "./StrikeCounter";
import Timer from "./Timer";
import ScoreBar from "./ScoreBar";
import QuestionIndicator from "./QuestionIndicator";

interface GameBoardProps {
  question: Question;
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  mode: GameMode;
}

export default function GameBoard({ question, state, dispatch, mode }: GameBoardProps) {
  const lang = useLang();
  const [input, setInput] = useState("");
  const [shaking, setShaking] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [correctFlash, setCorrectFlash] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [state.currentQuestionIndex]);

  useEffect(() => {
    if (state.justRevealedIndex !== null) {
      setCorrectFlash(true);
      const timer1 = setTimeout(() => setCorrectFlash(false), 500);
      const timer2 = setTimeout(() => dispatch({ type: "CLEAR_JUST_REVEALED" }), 500);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }
  }, [state.justRevealedIndex, dispatch]);

  useEffect(() => {
    if (state.questionOver && !showTransition) {
      dispatch({ type: "END_QUESTION" });
      const timer = setTimeout(() => setShowTransition(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [state.questionOver, showTransition, dispatch]);

  const handleTimeUp = useCallback(() => {
    dispatch({ type: "TIME_UP" });
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || state.questionOver) return;

    const result = checkGuess(input, question.answers, state.revealedAnswers);

    if (result.matched) {
      dispatch({
        type: "CORRECT_GUESS",
        answerIndex: result.answerIndex,
        points: result.points,
      });
    } else {
      dispatch({ type: "WRONG_GUESS" });
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    }

    setInput("");
    inputRef.current?.focus();
  };

  const handleNextQuestion = () => {
    setShowTransition(false);
    dispatch({ type: "NEXT_QUESTION" });
  };

  const foundCount = state.revealedAnswers.filter(Boolean).length;

  return (
    <div className={`flex min-h-[80vh] flex-col px-4 py-6 sm:px-6 ${correctFlash ? "animate-correct-flash" : ""}`}>
      {/* Top bar */}
      <div className="mb-4 flex items-center justify-between">
        <QuestionIndicator current={state.currentQuestionIndex} total={3} />
        <ScoreBar score={state.score} />
      </div>

      {/* Timer (ranked only) */}
      {mode === "ranked" && (
        <div className="mb-4">
          <Timer
            isActive={!state.questionOver}
            onTimeUp={handleTimeUp}
            questionIndex={state.currentQuestionIndex}
          />
        </div>
      )}

      {/* Question */}
      <div className="card mb-6 p-5 text-center">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-accent">
          {question.category}
        </p>
        <h2 className="text-xl font-extrabold sm:text-2xl">{question.question}</h2>
        <p className="mt-2 text-xs text-text-dim">
          {foundCount}/6 {t("game.found", lang)}
        </p>
      </div>

      {/* Answer Board */}
      <div className={`mb-6 flex flex-col gap-2.5 ${shaking ? "animate-shake" : ""}`}>
        {question.answers.map((answer, i) => (
          <AnswerSlot
            key={i}
            rank={i + 1}
            answer={answer}
            revealed={state.revealedAnswers[i]}
            justRevealed={state.justRevealedIndex === i}
            missed={state.questionOver && !state.revealedAnswers[i]}
          />
        ))}
      </div>

      {/* Strikes */}
      <div className="mb-6">
        <StrikeCounter strikes={state.strikes} />
      </div>

      {/* Input or Transition */}
      {showTransition ? (
        <div className="card animate-slide-up-fade flex flex-col items-center gap-4 p-8">
          <div className="text-3xl">
            {state.currentQuestionScore >= 80 ? "\u2B50" : state.currentQuestionScore >= 50 ? "\u{1F44F}" : "\u{1F44D}"}
          </div>
          <p className="text-lg font-extrabold">
            {t("game.complete", lang)}
          </p>
          <p className="text-text-muted">
            {t("game.score", lang)}{" "}
            <span className="text-2xl font-extrabold text-accent">
              {state.currentQuestionScore}
            </span>{" "}
            / 100
          </p>
          <button
            onClick={handleNextQuestion}
            className="press-effect mt-2 rounded-full bg-accent px-8 py-3 font-bold text-white transition-colors hover:bg-accent-light"
          >
            {state.currentQuestionIndex >= 2 ? t("game.seeResults", lang) : `${t("game.nextQuestion", lang)} \u2192`}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={state.questionOver ? t("game.questionOver", lang) : t("game.typeAnswer", lang)}
            disabled={state.questionOver}
            className="flex-1 rounded-xl border-2 border-border bg-surface px-4 py-3 text-text placeholder-text-dim outline-none transition-all focus:border-accent disabled:opacity-50"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={state.questionOver || !input.trim()}
            className="press-effect rounded-xl bg-accent px-6 py-3 font-bold text-white transition-colors hover:bg-accent-light disabled:opacity-50 disabled:hover:bg-accent"
          >
            {t("game.guess", lang)}
          </button>
        </form>
      )}
    </div>
  );
}
