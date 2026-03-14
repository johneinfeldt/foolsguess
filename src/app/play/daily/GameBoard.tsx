"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Question } from "@/lib/types";
import { checkGuess } from "@/lib/matching";
import { GameState, GameAction, GameMode } from "./useGameState";
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
      const timer1 = setTimeout(() => setCorrectFlash(false), 600);
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
      setTimeout(() => setShaking(false), 500);
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
      <div className="mb-6 rounded-2xl border border-electric/20 bg-gradient-to-br from-surface to-surface-light p-5 text-center game-shadow">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-electric">
          {question.category}
        </p>
        <h2 className="text-xl font-extrabold sm:text-2xl">{question.question}</h2>
        <p className="mt-2 text-xs text-text-dim">
          {foundCount}/6 found
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
        <div className="animate-slide-up-fade flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-8 game-shadow">
          <div className="text-4xl">
            {state.currentQuestionScore >= 80 ? "\u2B50" : state.currentQuestionScore >= 50 ? "\u{1F44F}" : "\u{1F44D}"}
          </div>
          <p className="text-lg font-extrabold">
            Question {state.currentQuestionIndex + 1} Complete
          </p>
          <p className="text-text-muted">
            You scored{" "}
            <span className="text-2xl font-extrabold text-gradient-gold">
              {state.currentQuestionScore}
            </span>{" "}
            / 100
          </p>
          <button
            onClick={handleNextQuestion}
            className="press-effect mt-2 rounded-full bg-gradient-to-r from-electric to-electric-bright px-8 py-3 font-bold text-white shadow-lg shadow-electric/20 transition-all hover:scale-105"
          >
            {state.currentQuestionIndex >= 2 ? "See Results" : "Next Question \u2192"}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={state.questionOver ? "Question over..." : "Type your answer..."}
            disabled={state.questionOver}
            className="flex-1 rounded-xl border-2 border-border bg-surface px-4 py-3.5 text-text-primary placeholder-text-dim outline-none transition-all focus:border-electric focus:shadow-lg focus:shadow-electric/10 disabled:opacity-50 game-shadow"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={state.questionOver || !input.trim()}
            className="press-effect rounded-xl bg-gradient-to-r from-electric to-electric-bright px-6 py-3.5 font-bold text-white shadow-lg shadow-electric/20 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            Guess
          </button>
        </form>
      )}
    </div>
  );
}
