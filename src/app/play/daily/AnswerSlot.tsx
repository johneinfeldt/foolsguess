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
      <div className="flex h-14 items-center rounded-xl border border-border bg-surface-light px-4">
        <span className="w-8 text-lg font-bold text-text-dim">{rank}</span>
        <div className="flex-1">
          <div className="h-4 rounded bg-border" />
        </div>
      </div>
    );
  }

  const bgClass = missed
    ? "bg-coral/10 border-coral/30"
    : justRevealed
    ? "bg-neon-green/20 border-neon-green/40"
    : "bg-electric/10 border-electric/30";

  const textClass = missed ? "text-coral" : "text-neon-green";

  return (
    <div className={`flex h-14 items-center rounded-xl border px-4 ${bgClass} ${justRevealed ? "animate-flip-reveal" : ""}`}>
      <span className="w-8 text-lg font-bold text-text-dim">{rank}</span>
      <span className="flex-1 font-semibold">{answer.text}</span>
      <span className={`font-bold ${textClass}`}>{answer.points}</span>
    </div>
  );
}
