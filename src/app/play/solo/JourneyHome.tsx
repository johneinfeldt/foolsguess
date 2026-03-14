"use client";

import { useState, useEffect, useCallback } from "react";
import { Question, JourneyProgress } from "@/lib/types";
import { DIVISIONS } from "@/lib/journeyConfig";
import {
  loadJourneyProgress,
  saveJourneyProgress,
  loadStreak,
  getRefreshedEnergy,
  hasEnergy,
} from "@/lib/journeyStorage";
import {
  isDivisionUnlocked,
  getLevelXP,
  isLevelComplete,
  isLevelUnlocked,
  getDivisionProgress,
} from "@/lib/journey";
import JesterMascot from "@/components/JesterMascot";
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
  const [noEnergyFlash, setNoEnergyFlash] = useState(false);

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

      if (!hasEnergy(progress)) {
        setNoEnergyFlash(true);
        setTimeout(() => setNoEnergyFlash(false), 1500);
        return;
      }

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
        <div className="animate-float">
          <JesterMascot size={80} mood="thinking" />
        </div>
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
          <span className="text-gradient-electric">Fools</span>Guess
        </a>
        <div className="flex items-center gap-2">
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
        <div className="mb-6 rounded-2xl border-2 border-electric/10 bg-gradient-to-br from-surface to-surface-light p-5 game-shadow">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-extrabold">{currentDiv.name}</h2>
            <span className="rounded-full bg-electric/10 px-3 py-1 text-xs font-bold text-electric">
              {divProgress.completedLevels}/{divProgress.totalLevels} levels
            </span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-surface-light">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div
              className="h-full rounded-full bg-gradient-to-r from-electric to-electric-bright shadow-[0_0_10px_rgba(108,92,231,0.3)] transition-all duration-700"
              style={{
                width: `${(divProgress.completedLevels / divProgress.totalLevels) * 100}%`,
              }}
            >
              <div className="absolute inset-x-0 top-0 h-1/2 rounded-full bg-white/20" />
            </div>
          </div>
        </div>

        {/* No Energy Warning */}
        {noEnergyFlash && (
          <div className="animate-shake mb-4 rounded-xl border border-coral/30 bg-coral/10 p-4 text-center">
            <p className="text-sm font-bold text-coral">
              &#9889; No energy left! Come back tomorrow or go Pro.
            </p>
          </div>
        )}

        {/* Pro + Coins CTAs */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <button className="press-effect flex items-center gap-2.5 rounded-xl border-2 border-gold/15 bg-gradient-to-br from-gold/8 to-gold/3 px-4 py-3 transition-all hover:border-gold/30 game-shadow">
            <span className="text-xl">&#11088;</span>
            <div className="text-left">
              <p className="text-xs font-bold text-gold">Go Pro</p>
              <p className="text-[10px] text-text-dim">Unlimited energy</p>
            </div>
          </button>

          <button className="press-effect flex items-center gap-2.5 rounded-xl border-2 border-cyan/15 bg-gradient-to-br from-cyan/8 to-cyan/3 px-4 py-3 transition-all hover:border-cyan/30 game-shadow">
            <span className="text-xl">&#128161;</span>
            <div className="text-left">
              <p className="text-xs font-bold text-cyan">Hints</p>
              <p className="text-[10px] text-text-dim">Reveal answers</p>
            </div>
          </button>
        </div>

        {/* Level Cards */}
        <div className="flex flex-col gap-5">
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
