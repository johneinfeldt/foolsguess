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

  return (
    <div
      className={`card p-5 transition-all ${!unlocked ? "opacity-40" : ""}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold ${
            complete
              ? "bg-correct/10 text-correct"
              : unlocked
              ? "bg-accent/10 text-accent"
              : "bg-surface-alt text-text-dim"
          }`}>
            {complete ? "\u2713" : level.levelNumber}
          </span>
          <h3 className="text-sm font-bold">
            Level {level.levelNumber}
          </h3>
        </div>
        {!unlocked && (
          <span className="rounded-full bg-surface-alt px-2 py-0.5 text-xs font-bold text-text-dim">
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
