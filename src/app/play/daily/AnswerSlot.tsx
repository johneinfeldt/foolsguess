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
      <div className="flex h-14 items-center rounded-xl border border-border bg-surface-light px-4 game-shadow transition-colors">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-sm font-bold text-text-dim">
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
    ? "border-coral/40 bg-gradient-to-r from-coral/15 to-coral/5 glow-coral"
    : justRevealed
    ? "border-neon-green/50 bg-gradient-to-r from-neon-green/20 to-neon-green/5 glow-green"
    : "border-electric/30 bg-gradient-to-r from-electric/10 to-electric/5";

  const rankBg = missed
    ? "bg-coral/20 text-coral"
    : justRevealed
    ? "bg-neon-green/20 text-neon-green"
    : "bg-electric/20 text-electric";

  const pointsClass = missed ? "text-coral" : justRevealed ? "text-neon-green" : "text-electric-bright";

  return (
    <div className={`flex h-14 items-center rounded-xl border px-4 ${bgClass} ${justRevealed ? "animate-flip-reveal" : ""} transition-colors`}>
      <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${rankBg}`}>
        {rank}
      </span>
      <span className="ml-3 flex-1 font-semibold tracking-wide">{answer.text}</span>
      <span className={`font-extrabold tabular-nums ${pointsClass}`}>{answer.points}</span>
    </div>
  );
}
