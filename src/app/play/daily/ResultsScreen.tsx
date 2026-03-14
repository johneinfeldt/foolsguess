"use client";

import { useState, useEffect } from "react";
import { Question, QuestionResult } from "@/lib/types";
import { generateShareText } from "@/lib/daily";

interface ResultsScreenProps {
  questions: Question[];
  questionResults: QuestionResult[];
  score: number;
  mode: string;
}

export default function ResultsScreen({ questions, questionResults, score, mode }: ResultsScreenProps) {
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState("");

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

  let stars = "";
  if (score >= 250) stars = "⭐⭐⭐";
  else if (score >= 150) stars = "⭐⭐";
  else if (score >= 50) stars = "⭐";

  return (
    <div className="flex flex-col items-center px-4 py-8 sm:px-6">
      {/* Score Card */}
      <div className="animate-slide-up-fade mb-8 w-full max-w-md rounded-2xl border border-gold/30 bg-surface p-8 text-center">
        <div className="mb-2 text-4xl">{stars || "🎯"}</div>
        <p className="mb-1 text-sm uppercase text-text-muted">Your Score</p>
        <p className="text-5xl font-extrabold text-gold">{score}</p>
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
              className="animate-slide-up-fade rounded-xl border border-border bg-surface p-5"
              style={{ animationDelay: `${(qi + 1) * 150}ms` }}
            >
              <p className="mb-2 text-sm font-semibold text-text-muted">
                Q{qi + 1}: {question.question}
              </p>
              <p className="mb-3 text-lg font-bold">
                <span className="text-gold">{result.pointsEarned}</span>
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
                    {result.answersFound[ai] ? "✓" : "✕"} {answer.text} ({answer.points})
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
        className="mb-6 inline-flex items-center gap-2 rounded-full bg-electric px-6 py-3 font-bold text-white transition-all hover:bg-electric-bright hover:scale-105"
      >
        {copied ? "✓ Copied!" : "📋 Share Results"}
      </button>

      {/* Countdown */}
      <div className="mb-6 text-center">
        <p className="text-sm text-text-muted">Next challenge in</p>
        <p className="text-xl font-bold text-electric">{countdown}</p>
      </div>

      {/* Account CTA */}
      <div className="rounded-2xl border border-border bg-surface p-6 text-center">
        <p className="mb-2 font-semibold">Want to save your scores?</p>
        <p className="mb-4 text-sm text-text-muted">
          Create an account to appear on the leaderboard and track your streak.
        </p>
        <button className="rounded-full border border-electric px-6 py-2 text-sm font-semibold text-electric transition-all hover:bg-electric/10">
          Create Account (Coming Soon)
        </button>
      </div>
    </div>
  );
}
