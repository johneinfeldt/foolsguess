"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Question } from "@/lib/types";
import { checkGuess } from "@/lib/matching";
import { useLang, t } from "@/lib/i18n";
import { AvatarConfig } from "@/lib/avatars";
import AvatarDisplay from "@/components/AvatarDisplay";
import AnswerSlot from "../daily/AnswerSlot";
import StrikeCounter from "../daily/StrikeCounter";
import Timer from "../daily/Timer";
import ScoreBar from "../daily/ScoreBar";

interface FeedEvent {
  id: string;
  playerId: string;
  playerName: string;
  playerAvatar: AvatarConfig;
  type: "found" | "strike";
  answerIndex?: number;
  timestamp: number;
}

interface OnlineBoardProps {
  question: Question;
  roundNumber: number;
  totalRounds: number;
  myName: string;
  myAvatar: AvatarConfig;
  feedEvents: FeedEvent[];
  onFoundAnswer: (answerIndex: number, points: number) => void;
  onWrongGuess: () => void;
  onTurnComplete: (score: number, answersFound: boolean[], strikes: number) => void;
}

export default function OnlineBoard({
  question,
  roundNumber,
  totalRounds,
  myName,
  myAvatar,
  feedEvents,
  onFoundAnswer,
  onWrongGuess,
  onTurnComplete,
}: OnlineBoardProps) {
  const lang = useLang();
  const [input, setInput] = useState("");
  const [shaking, setShaking] = useState(false);
  const [correctFlash, setCorrectFlash] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<boolean[]>(
    () => question.answers.map(() => false)
  );
  const [strikes, setStrikes] = useState(0);
  const [score, setScore] = useState(0);
  const [justRevealedIndex, setJustRevealedIndex] = useState<number | null>(null);
  const [turnOver, setTurnOver] = useState(false);
  const [doneSent, setDoneSent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const color = "#6C5CE7"; // accent color for own name

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Send TURN_COMPLETE when turn is over
  useEffect(() => {
    if (turnOver && !doneSent) {
      setDoneSent(true);
      // Small delay so last animation plays
      const timer = setTimeout(() => {
        onTurnComplete(score, revealedAnswers, strikes);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [turnOver, doneSent, score, revealedAnswers, strikes, onTurnComplete]);

  // Clear just-revealed animation
  useEffect(() => {
    if (justRevealedIndex !== null) {
      setCorrectFlash(true);
      const t1 = setTimeout(() => setCorrectFlash(false), 500);
      const t2 = setTimeout(() => setJustRevealedIndex(null), 500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [justRevealedIndex]);

  const handleTimeUp = useCallback(() => {
    setTurnOver(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || turnOver) return;

    const result = checkGuess(input, question.answers, revealedAnswers);

    if (result.matched) {
      const newRevealed = [...revealedAnswers];
      newRevealed[result.answerIndex] = true;
      setRevealedAnswers(newRevealed);
      setScore((s) => s + result.points);
      setJustRevealedIndex(result.answerIndex);
      onFoundAnswer(result.answerIndex, result.points);

      if (newRevealed.every(Boolean)) {
        setTurnOver(true);
      }
    } else {
      const newStrikes = strikes + 1;
      setStrikes(newStrikes);
      onWrongGuess();
      setShaking(true);
      setTimeout(() => setShaking(false), 400);

      if (newStrikes >= 3) {
        setTurnOver(true);
      }
    }

    setInput("");
    inputRef.current?.focus();
  };

  const foundCount = revealedAnswers.filter(Boolean).length;
  const recentFeed = feedEvents.slice(-4);

  return (
    <div className={`flex min-h-[80vh] flex-col px-4 py-6 sm:px-6 ${correctFlash ? "animate-correct-flash" : ""}`}>
      {/* Top bar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AvatarDisplay avatar={myAvatar} size={28} />
          <span className="text-sm font-bold" style={{ color }}>
            {myName}
          </span>
          <span className="text-xs text-text-dim">
            R{roundNumber}/{totalRounds}
          </span>
        </div>
        <ScoreBar score={score} />
      </div>

      {/* Timer */}
      <div className="mb-4">
        <Timer
          isActive={!turnOver}
          onTimeUp={handleTimeUp}
          questionIndex={roundNumber}
        />
      </div>

      {/* Question */}
      <div className="card mb-4 p-5 text-center">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-accent">
          {question.category}
        </p>
        <h2 className="text-xl font-extrabold sm:text-2xl">{question.question}</h2>
        <p className="mt-2 text-xs text-text-dim">
          {foundCount}/6 {t("game.found", lang)}
        </p>
      </div>

      {/* Answer Board */}
      <div className={`mb-4 flex flex-col gap-2.5 ${shaking ? "animate-shake" : ""}`}>
        {question.answers.map((answer, i) => (
          <AnswerSlot
            key={i}
            rank={i + 1}
            answer={answer}
            revealed={revealedAnswers[i]}
            justRevealed={justRevealedIndex === i}
            missed={turnOver && !revealedAnswers[i]}
          />
        ))}
      </div>

      {/* Strikes */}
      <div className="mb-4">
        <StrikeCounter strikes={strikes} />
      </div>

      {/* Live feed from other players */}
      {recentFeed.length > 0 && (
        <div className="mb-4 rounded-xl border border-border bg-surface-alt px-3 py-2">
          {recentFeed.map((event) => (
            <div key={event.id} className="flex items-center gap-2 py-1 text-xs">
              <AvatarDisplay avatar={event.playerAvatar} size={16} />
              <span className="font-semibold">{event.playerName}</span>
              <span className="text-text-dim">
                {event.type === "found"
                  ? t("online.foundAnswer", lang)
                  : `Strike ${event.type}`}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      {turnOver ? (
        <div className="card flex flex-col items-center gap-3 p-6 text-center">
          <div className="text-3xl">
            {score >= 80 ? "\u2B50" : score >= 50 ? "\u{1F44F}" : "\u{1F44D}"}
          </div>
          <p className="text-lg font-extrabold">
            {score} {t("game.score", lang).toLowerCase()}
          </p>
          <p className="text-sm text-text-dim">{t("online.everyoneDone", lang)}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("game.typeAnswer", lang)}
            className="flex-1 rounded-xl border-2 border-border bg-surface px-4 py-3 text-text placeholder-text-dim outline-none transition-all focus:border-accent"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="press-effect rounded-xl bg-accent px-6 py-3 font-bold text-white transition-colors hover:bg-accent-light disabled:opacity-50"
          >
            {t("game.guess", lang)}
          </button>
        </form>
      )}
    </div>
  );
}
