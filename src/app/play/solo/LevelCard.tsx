"use client";

import { LevelConfig, JourneyProgress, Question } from "@/lib/types";
import { isQuestionComplete, isQuestionPlayed } from "@/lib/journey";
import QuestionNode, { NodeState } from "./QuestionNode";
import XPBar from "./XPBar";

interface LevelCardProps {
  level: LevelConfig;
  levelIndex: number;
  xpThreshold: number;
  levelXP: number;
  unlocked: boolean;
  complete: boolean;
  progress: JourneyProgress;
  allQuestions: Question[];
  onPlayQuestion: (questionId: string) => void;
}

export default function LevelCard({
  level,
  xpThreshold,
  levelXP,
  unlocked,
  complete,
  progress,
  onPlayQuestion,
}: LevelCardProps) {
  function getNodeState(questionId: string): NodeState {
    if (!unlocked) return "locked";
    if (isQuestionComplete(progress, questionId)) return "complete";
    if (isQuestionPlayed(progress, questionId)) return "partial";
    return "playable";
  }

  const borderClass = !unlocked
    ? "border-border"
    : complete
    ? "border-neon-green/20"
    : "border-border hover:border-electric/20";

  return (
    <div
      className={`rounded-2xl border-2 bg-gradient-to-br from-surface to-surface-light p-5 transition-all ${borderClass} ${
        !unlocked ? "opacity-40" : ""
      } game-shadow`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-extrabold ${
            complete
              ? "bg-neon-green/20 text-neon-green"
              : unlocked
              ? "bg-electric/20 text-electric"
              : "bg-surface text-text-dim"
          }`}>
            {complete ? "\u2713" : level.levelNumber}
          </span>
          <h3 className="text-sm font-extrabold">
            Level {level.levelNumber}
          </h3>
        </div>
        {!unlocked && (
          <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-bold text-text-dim">
            &#128274; Locked
          </span>
        )}
      </div>

      <div className="mb-4">
        <XPBar current={levelXP} threshold={xpThreshold} />
      </div>

      <div className="flex flex-wrap gap-2.5">
        {level.questionIds.map((qId, i) => (
          <QuestionNode
            key={qId}
            state={getNodeState(qId)}
            index={i}
            onClick={() => onPlayQuestion(qId)}
          />
        ))}
      </div>
    </div>
  );
}
