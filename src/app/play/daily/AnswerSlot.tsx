"use client";

import { Answer } from "@/lib/types";

interface AnswerSlotProps {
  rank: number;
  answer: Answer;
  revealed: boolean;
  justRevealed: boolean;
  missed: boolean;
}

export default function AnswerSlot({ rank, answer, revealed, justRevealed, missed }: AnswerSlotProps) {
  if (!revealed) {
    return (
      <div className="flex h-13 items-center rounded-xl border border-border bg-surface-alt px-4 transition-colors">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-border text-sm font-bold text-text-dim">
          {rank}
        </span>
        <div className="ml-3 flex-1">
          <div className="h-3 w-3/4 rounded-full bg-border" />
        </div>
        <div className="h-3 w-8 rounded-full bg-border" />
      </div>
    );
  }

  const bgClass = missed
    ? "border-wrong/30 bg-wrong/5"
    : justRevealed
    ? "border-correct/40 bg-correct/5"
    : "border-accent/20 bg-accent/5";

  const rankBg = missed
    ? "bg-wrong/10 text-wrong"
    : justRevealed
    ? "bg-correct/10 text-correct"
    : "bg-accent/10 text-accent";

  const pointsClass = missed ? "text-wrong" : justRevealed ? "text-correct" : "text-accent";

  return (
    <div className={`flex h-13 items-center rounded-xl border px-4 ${bgClass} ${justRevealed ? "animate-flip-reveal" : ""} transition-colors`}>
      <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold ${rankBg}`}>
        {rank}
      </span>
      <span className="ml-3 flex-1 font-semibold tracking-wide">{answer.text}</span>
      <span className={`font-bold tabular-nums ${pointsClass}`}>{answer.points}</span>
    </div>
  );
}
