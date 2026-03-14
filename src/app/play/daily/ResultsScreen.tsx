"use client";

import { useState, useEffect } from "react";
import { Question, QuestionResult } from "@/lib/types";
import { generateShareText } from "@/lib/daily";
import JesterMascot from "@/components/JesterMascot";
import Confetti from "@/components/Confetti";

interface ResultsScreenProps {
  questions: Question[];
  questionResults: QuestionResult[];
  score: number;
  mode: string;
}

export default function ResultsScreen({ questions, questionResults, score, mode }: ResultsScreenProps) {
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (score >= 200) setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, [score]);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = async () => {
    const text = generateShareText(questionResults, new Date(), score);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const mascotMood = score >= 250 ? "excited" : score >= 150 ? "happy" : score >= 50 ? "thinking" : "sad";
  let starCount = 0;
  if (score >= 250) starCount = 3;
  else if (score >= 150) starCount = 2;
  else if (score >= 50) starCount = 1;

  return (
    <div className="flex flex-col items-center px-4 py-8 sm:px-6">
      <Confetti active={showConfetti} />

      {/* Score Card */}
      <div className="animate-bounce-in mb-8 w-full max-w-md rounded-2xl border border-gold/20 bg-gradient-to-br from-surface to-surface-light p-8 text-center game-shadow-lg">
        <JesterMascot size={80} mood={mascotMood} className="mx-auto mb-4" />

        {/* Stars */}
        <div className="mb-3 flex items-center justify-center gap-1">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={`text-3xl transition-all ${
                i <= starCount
                  ? "animate-bounce-in text-gold"
                  : "text-text-dim opacity-30"
              }`}
              style={{ animationDelay: `${i * 200}ms` }}
            >
              &#11088;
            </span>
          ))}
        </div>

        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-text-muted">Your Score</p>
        <p className="text-6xl font-extrabold text-gradient-gold">{score}</p>
        <p className="text-text-muted">/ 300</p>
        {mode === "relaxed" && (
          <p className="mt-2 text-xs text-text-dim">Relaxed mode — not ranked</p>
        )}
      </div>

      {/* Question Breakdowns */}
      <div className="mb-8 flex w-full max-w-md flex-col gap-4">
        {questionResults.map((result, qi) => {
          const question = questions[qi];
          if (!question) return null;
          return (
            <div
              key={qi}
              className="animate-slide-up-fade rounded-xl border border-border bg-surface p-5 game-shadow"
              style={{ animationDelay: `${(qi + 1) * 150}ms` }}
            >
              <p className="mb-2 text-sm font-semibold text-text-muted">
                Q{qi + 1}: {question.question}
              </p>
              <p className="mb-3 text-lg font-bold">
                <span className="text-gradient-gold">{result.pointsEarned}</span>
                <span className="text-text-dim"> / 100</span>
                <span className="ml-2 text-sm text-text-muted">
                  {result.answersFound.filter(Boolean).length}/6 found
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {question.answers.map((answer, ai) => (
                  <span
                    key={ai}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      result.answersFound[ai]
                        ? "bg-neon-green/10 text-neon-green"
                        : "bg-coral/10 text-coral"
                    }`}
                  >
                    {result.answersFound[ai] ? "\u2713" : "\u2717"} {answer.text} ({answer.points})
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="press-effect mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-electric-bright px-8 py-3.5 font-bold text-white shadow-lg shadow-electric/20 transition-all hover:scale-105"
      >
        {copied ? "\u2713 Copied!" : "\u{1F4CB} Share Results"}
      </button>

      {/* Countdown */}
      <div className="mb-6 text-center">
        <p className="text-sm text-text-muted">Next challenge in</p>
        <p className="text-2xl font-extrabold text-gradient-electric">{countdown}</p>
      </div>

      {/* Solo Journey CTA */}
      <a
        href="/play/solo"
        className="press-effect rounded-2xl border border-neon-green/20 bg-surface p-6 text-center transition-all hover:border-neon-green/40 hover:bg-surface-light game-shadow"
      >
        <p className="mb-1 font-bold">Want more? Try Solo Journey</p>
        <p className="text-sm text-text-muted">
          Progress through levels and earn XP at your own pace.
        </p>
        <span className="mt-3 inline-block rounded-full bg-neon-green/10 px-4 py-1.5 text-sm font-bold text-neon-green">
          Play Solo &rarr;
        </span>
      </a>
    </div>
  );
}
