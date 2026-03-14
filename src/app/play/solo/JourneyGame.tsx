"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Question, JourneyProgress } from "@/lib/types";
import { checkGuess } from "@/lib/matching";
import {
  spendEnergy,
  hasEnergy,
  addBonusEnergy,
  updateStreak,
  saveJourneyProgress,
  getRefreshedEnergy,
} from "@/lib/journeyStorage";
import { calculateReplayXP, isQuestionComplete, getLevelXP } from "@/lib/journey";
import { DIVISIONS } from "@/lib/journeyConfig";
import { useJourneyGame } from "./useJourneyGame";
import AnswerSlot from "../daily/AnswerSlot";
import StrikeCounter from "../daily/StrikeCounter";
import ScoreBar from "../daily/ScoreBar";
import XPBar from "./XPBar";
import EnergyBar from "./EnergyBar";
import LevelUpOverlay from "./LevelUpOverlay";

interface JourneyGameProps {
  question: Question;
  progress: JourneyProgress;
  context: {
    divNumber: number;
    levelNumber: number;
    questionIndex: number;
  };
  onComplete: (updatedProgress: JourneyProgress) => void;
  onBack: () => void;
}

export default function JourneyGame({
  question,
  progress,
  context,
  onComplete,
  onBack,
}: JourneyGameProps) {
  const existingQP = progress.questionProgress[question.id];
  const alreadyComplete = isQuestionComplete(progress, question.id);

  const { state, dispatch } = useJourneyGame(existingQP);
  const [input, setInput] = useState("");
  const [shaking, setShaking] = useState(false);
  const [energySpent, setEnergySpent] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [oldLevelXP, setOldLevelXP] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const division = DIVISIONS.find((d) => d.number === context.divNumber)!;
  const levelIndex = context.levelNumber - 1;

  // Spend energy on mount (unless question is already complete)
  useEffect(() => {
    if (alreadyComplete || energySpent) return;

    if (!hasEnergy(progress)) {
      onBack();
      return;
    }

    const refreshed = { ...progress, energy: getRefreshedEnergy(progress.energy) };
    const afterSpend = spendEnergy(refreshed);
    saveJourneyProgress(afterSpend);
    setEnergySpent(true);

    setOldLevelXP(getLevelXP(progress, division, levelIndex));
  }, []);

  useEffect(() => {
    if (state.phase === "playing") inputRef.current?.focus();
  }, [state.phase]);

  useEffect(() => {
    if (state.justRevealedIndex !== null) {
      const timer = setTimeout(() => dispatch({ type: "CLEAR_JUST_REVEALED" }), 500);
      return () => clearTimeout(timer);
    }
  }, [state.justRevealedIndex, dispatch]);

  useEffect(() => {
    if (state.questionOver && state.phase === "playing") {
      const timer = setTimeout(() => dispatch({ type: "END_QUESTION" }), 1500);
      return () => clearTimeout(timer);
    }
  }, [state.questionOver, state.phase, dispatch]);

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

  const handleFinish = useCallback(() => {
    const { xpEarned: earned, newBestScore, mergedAnswers } = calculateReplayXP(
      existingQP,
      state.revealedAnswers,
      question.answers
    );

    setXpEarned(earned);
    updateStreak();

    let updated: JourneyProgress = {
      ...progress,
      energy: getRefreshedEnergy(progress.energy),
      questionProgress: {
        ...progress.questionProgress,
        [question.id]: {
          bestScore: newBestScore,
          answersFound: mergedAnswers,
          totalXPEarned: (existingQP?.totalXPEarned ?? 0) + earned,
        },
      },
    };

    // Spend energy (refresh first)
    if (!alreadyComplete) {
      updated = { ...updated, energy: spendEnergy(progress).energy };
    }

    // Bonus energy for finding all 6
    const allFound = mergedAnswers.every(Boolean);
    if (allFound && !alreadyComplete) {
      updated = addBonusEnergy(updated);
    }

    // Check level-up
    const newLevelXP = getLevelXP(updated, division, levelIndex);
    const wasComplete = oldLevelXP >= division.xpPerLevel;
    const nowComplete = newLevelXP >= division.xpPerLevel;

    if (nowComplete && !wasComplete) {
      setShowLevelUp(true);
    }

    saveJourneyProgress(updated);
    onComplete(updated);
  }, [
    state.revealedAnswers,
    existingQP,
    question,
    progress,
    alreadyComplete,
    division,
    levelIndex,
    oldLevelXP,
    onComplete,
  ]);

  if (showLevelUp) {
    return (
      <LevelUpOverlay
        levelNumber={context.levelNumber}
        divisionName={division.name}
        onContinue={() => setShowLevelUp(false)}
      />
    );
  }

  const energy = getRefreshedEnergy(progress.energy);

  return (
    <div className="min-h-screen bg-midnight font-sans text-text-primary">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-midnight/80 px-6 py-4 backdrop-blur-md">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-text-primary"
        >
          <span>&larr;</span> Back
        </button>
        <span className="text-sm text-text-muted">
          Level {context.levelNumber} — Q{context.questionIndex + 1}
        </span>
        <EnergyBar energy={energySpent ? Math.max(0, energy.current - 1) : energy.current} />
      </nav>

      <main className="mx-auto max-w-lg">
        <div className="flex min-h-[80vh] flex-col px-4 py-6 sm:px-6">
          {/* Score */}
          <div className="mb-4 flex items-center justify-end">
            <ScoreBar score={state.pointsThisPlay} />
          </div>

          {/* Question */}
          <div className="mb-6 rounded-2xl bg-surface p-5 text-center">
            <p className="mb-1 text-xs font-semibold uppercase text-electric">
              {question.category}
            </p>
            <h2 className="text-xl font-bold sm:text-2xl">{question.question}</h2>
          </div>

          {/* Answer Board */}
          <div className={`mb-6 flex flex-col gap-2 ${shaking ? "animate-shake" : ""}`}>
            {question.answers.map((answer, i) => (
              <AnswerSlot
                key={i}
                rank={i + 1}
                answer={answer}
                revealed={state.revealedAnswers[i]}
                justRevealed={state.justRevealedIndex === i}
                missed={state.phase === "result" && !state.revealedAnswers[i]}
              />
            ))}
          </div>

          {/* Strikes */}
          <div className="mb-6">
            <StrikeCounter strikes={state.strikes} />
          </div>

          {/* Input or Result */}
          {state.phase === "playing" && !state.questionOver ? (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  alreadyComplete ? "All answers found!" : "Type your answer..."
                }
                disabled={alreadyComplete}
                className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-text-primary placeholder-text-dim outline-none transition-colors focus:border-electric disabled:opacity-50"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={alreadyComplete || !input.trim()}
                className="rounded-xl bg-electric px-6 py-3 font-bold text-white transition-all hover:bg-electric-bright disabled:opacity-50"
              >
                Guess
              </button>
            </form>
          ) : state.phase === "playing" && state.questionOver ? (
            <div className="text-center text-sm text-text-dim">Revealing answers...</div>
          ) : (
            <div className="animate-slide-up-fade flex flex-col items-center gap-4 rounded-2xl bg-surface p-6">
              <p className="text-lg font-bold">
                {state.revealedAnswers.filter((r, i) => r && !state.preRevealed[i]).length > 0
                  ? "Nice!"
                  : "Question Over"}
              </p>
              <p className="text-text-muted">
                +<span className="font-bold text-gold">{xpEarned || state.pointsThisPlay}</span> XP
                this play
              </p>

              {/* XP bar for current level */}
              <div className="w-full">
                <XPBar
                  current={oldLevelXP + (xpEarned || state.pointsThisPlay)}
                  threshold={division.xpPerLevel}
                  animate
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleFinish}
                  className="rounded-full bg-electric px-6 py-3 font-bold text-white transition-all hover:bg-electric-bright hover:scale-105"
                >
                  Back to Map
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
