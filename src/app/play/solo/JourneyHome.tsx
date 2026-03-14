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
import { useLang, t } from "@/lib/i18n";
import { loadQuestions } from "@/lib/questionsLoader";
import JesterMascot from "@/components/JesterMascot";
import DivisionTab from "./DivisionTab";
import LevelCard from "./LevelCard";
import EnergyBar from "./EnergyBar";
import StreakBadge from "./StreakBadge";
import JourneyGame from "./JourneyGame";

interface JourneyHomeProps {
  allQuestionsEn: Question[];
}

export default function JourneyHome({ allQuestionsEn }: JourneyHomeProps) {
  const lang = useLang();
  const [allQuestions, setAllQuestions] = useState<Question[]>(allQuestionsEn);

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

  // Load translated questions when language changes
  useEffect(() => {
    loadQuestions(lang, allQuestionsEn).then(setAllQuestions);
  }, [lang, allQuestionsEn]);

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
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="animate-float">
          <JesterMascot size={64} mood="thinking" />
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
    <div className="min-h-screen bg-bg font-sans text-text">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-md">
        <a href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Fools</span>Guess
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
        <div className="card mb-6 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-extrabold">{currentDiv.name}</h2>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
              {divProgress.completedLevels}/{divProgress.totalLevels} levels
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-surface-alt">
            <div
              className="h-full rounded-full bg-accent transition-all duration-700"
              style={{
                width: `${(divProgress.completedLevels / divProgress.totalLevels) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* No Energy Warning */}
        {noEnergyFlash && (
          <div className="animate-shake mb-4 rounded-xl border border-wrong/20 bg-wrong/5 p-4 text-center">
            <p className="text-sm font-bold text-wrong">
              {t("solo.noEnergy", lang)}
            </p>
          </div>
        )}

        {/* Pro + Hints CTAs */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <button className="card card-hover press-effect flex items-center gap-2.5 px-4 py-3">
            <span className="text-xl">&#11088;</span>
            <div className="text-left">
              <p className="text-xs font-bold text-accent">{t("solo.goPro", lang)}</p>
              <p className="text-[10px] text-text-dim">{t("solo.unlimitedEnergy", lang)}</p>
            </div>
          </button>

          <button className="card card-hover press-effect flex items-center gap-2.5 px-4 py-3">
            <span className="text-xl">&#128161;</span>
            <div className="text-left">
              <p className="text-xs font-bold text-accent">{t("solo.hints", lang)}</p>
              <p className="text-[10px] text-text-dim">{t("solo.revealAnswers", lang)}</p>
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
