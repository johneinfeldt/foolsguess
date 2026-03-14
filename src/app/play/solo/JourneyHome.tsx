"use client";

import { useState, useEffect, useCallback } from "react";
import { Question, JourneyProgress } from "@/lib/types";
import { DIVISIONS } from "@/lib/journeyConfig";
import {
  loadJourneyProgress,
  saveJourneyProgress,
  loadStreak,
  getRefreshedEnergy,
} from "@/lib/journeyStorage";
import {
  isDivisionUnlocked,
  getLevelXP,
  isLevelComplete,
  isLevelUnlocked,
  getDivisionProgress,
} from "@/lib/journey";
import DivisionTab from "./DivisionTab";
import LevelCard from "./LevelCard";
import EnergyBar from "./EnergyBar";
import StreakBadge from "./StreakBadge";
import JourneyGame from "./JourneyGame";

interface JourneyHomeProps {
  allQuestions: Question[];
}

export default function JourneyHome({ allQuestions }: JourneyHomeProps) {
  const [progress, setProgress] = useState<JourneyProgress | null>(null);
  const [activeDivision, setActiveDivision] = useState(1);
  const [streak, setStreak] = useState(0);
  const [playingQuestionId, setPlayingQuestionId] = useState<string | null>(null);
  const [playingContext, setPlayingContext] = useState<{
    divNumber: number;
    levelNumber: number;
    questionIndex: number;
  } | null>(null);

  useEffect(() => {
    const p = loadJourneyProgress();
    const refreshedEnergy = getRefreshedEnergy(p.energy);
    const refreshed = { ...p, energy: refreshedEnergy };
    setProgress(refreshed);
    setActiveDivision(refreshed.currentDivision);
    setStreak(loadStreak().current);
  }, []);

  const handlePlayQuestion = useCallback(
    (questionId: string) => {
      if (!progress) return;
      const div = DIVISIONS.find((d) => d.number === activeDivision);
      if (!div) return;
      for (const level of div.levels) {
        const qIndex = level.questionIds.indexOf(questionId);
        if (qIndex !== -1) {
          setPlayingContext({
            divNumber: div.number,
            levelNumber: level.levelNumber,
            questionIndex: qIndex,
          });
          break;
        }
      }
      setPlayingQuestionId(questionId);
    },
    [progress, activeDivision]
  );

  const handleGameComplete = useCallback(
    (updatedProgress: JourneyProgress) => {
      setProgress(updatedProgress);
      saveJourneyProgress(updatedProgress);
      setPlayingQuestionId(null);
      setPlayingContext(null);
      setStreak(loadStreak().current);
    },
    []
  );

  const handleBackToMap = useCallback(() => {
    setPlayingQuestionId(null);
    setPlayingContext(null);
  }, []);

  if (!progress) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-midnight">
        <div className="text-text-muted">Loading...</div>
      </div>
    );
  }

  if (playingQuestionId) {
    const question = allQuestions.find((q) => q.id === playingQuestionId);
    if (!question) {
      setPlayingQuestionId(null);
      return null;
    }
    return (
      <JourneyGame
        question={question}
        progress={progress}
        context={playingContext!}
        onComplete={handleGameComplete}
        onBack={handleBackToMap}
      />
    );
  }

  const currentDiv = DIVISIONS.find((d) => d.number === activeDivision);
  if (!currentDiv) return null;

  const divProgress = getDivisionProgress(progress, currentDiv);
  const energy = getRefreshedEnergy(progress.energy);

  return (
    <div className="min-h-screen bg-midnight font-sans text-text-primary">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-midnight/80 px-6 py-4 backdrop-blur-md">
        <a href="/" className="text-xl font-bold tracking-tight">
          <span className="text-electric">Fools</span>Guess
        </a>
        <div className="flex items-center gap-3">
          <StreakBadge streak={streak} />
          <EnergyBar energy={energy.current} />
        </div>
      </nav>

      <main className="mx-auto max-w-lg px-4 py-6 sm:px-6">
        {/* Division Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {DIVISIONS.map((div) => (
            <DivisionTab
              key={div.number}
              number={div.number}
              name={div.name}
              active={activeDivision === div.number}
              locked={!isDivisionUnlocked(progress, div.number)}
              onClick={() => setActiveDivision(div.number)}
            />
          ))}
        </div>

        {/* Division Header */}
        <div className="mb-6 rounded-2xl border border-border bg-surface p-5">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-bold">{currentDiv.name}</h2>
            <span className="text-sm text-text-muted">
              {divProgress.completedLevels}/{divProgress.totalLevels} levels
            </span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full bg-surface-light">
            <div
              className="h-full rounded-full bg-gradient-to-r from-electric to-electric-bright transition-all duration-500"
              style={{
                width: `${(divProgress.completedLevels / divProgress.totalLevels) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Pro CTA Placeholder */}
        <button className="mb-6 flex w-full items-center justify-between rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 transition-colors hover:bg-gold/10">
          <div className="flex items-center gap-2">
            <span className="text-lg">&#11088;</span>
            <div className="text-left">
              <p className="text-sm font-semibold text-gold">
                Get Unlimited Energy
              </p>
              <p className="text-xs text-text-dim">
                Pro — coming soon
              </p>
            </div>
          </div>
          <span className="text-xs text-gold">&#8250;</span>
        </button>

        {/* Coins/Hints Placeholder */}
        <button className="mb-6 flex w-full items-center justify-between rounded-xl border border-cyan/20 bg-cyan/5 px-4 py-3 transition-colors hover:bg-cyan/10">
          <div className="flex items-center gap-2">
            <span className="text-lg">&#128161;</span>
            <div className="text-left">
              <p className="text-sm font-semibold text-cyan">
                Hints &amp; Coins
              </p>
              <p className="text-xs text-text-dim">
                Buy hints to reveal answers — coming soon
              </p>
            </div>
          </div>
          <span className="text-xs text-cyan">&#8250;</span>
        </button>

        {/* Level Cards */}
        <div className="flex flex-col gap-4">
          {currentDiv.levels.map((level, i) => (
            <LevelCard
              key={level.levelNumber}
              level={level}
              levelIndex={i}
              xpThreshold={currentDiv.xpPerLevel}
              levelXP={getLevelXP(progress, currentDiv, i)}
              unlocked={isLevelUnlocked(progress, currentDiv, i)}
              complete={isLevelComplete(progress, currentDiv, i)}
              progress={progress}
              allQuestions={allQuestions}
              onPlayQuestion={handlePlayQuestion}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
