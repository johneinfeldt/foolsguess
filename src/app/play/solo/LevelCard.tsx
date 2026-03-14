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
  levelIndex,
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
      className={`rounded-2xl border p-5 transition-colors ${
        !unlocked
          ? "border-border bg-surface/50 opacity-60"
          : complete
          ? "border-neon-green/20 bg-surface"
          : "border-border bg-surface hover:border-electric/20"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold">
          Level {level.levelNumber}
          {complete && <span className="ml-2 text-neon-green">&#10003;</span>}
          {!unlocked && <span className="ml-2 text-xs text-text-dim">&#128274;</span>}
        </h3>
        <span className="text-xs text-text-dim">
          {level.questionIds.length} questions
        </span>
      </div>

      <div className="mb-3">
        <XPBar current={levelXP} threshold={xpThreshold} />
      </div>

      <div className="flex flex-wrap gap-2">
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
