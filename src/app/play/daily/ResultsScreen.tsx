"use client";

import { useState, useEffect } from "react";
import { Question, QuestionResult } from "@/lib/types";
import { generateShareText } from "@/lib/daily";
import { useLang, t } from "@/lib/i18n";
import JesterMascot from "@/components/JesterMascot";
import Confetti from "@/components/Confetti";

interface ResultsScreenProps {
  questions: Question[];
  questionResults: QuestionResult[];
  score: number;
  mode: string;
}

export default function ResultsScreen({ questions, questionResults, score, mode }: ResultsScreenProps) {
  const lang = useLang();
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
      <div className="card animate-bounce-in mb-8 w-full max-w-md p-8 text-center">
        <JesterMascot size={64} mood={mascotMood} className="mx-auto mb-4" />

        {/* Stars */}
        <div className="mb-3 flex items-center justify-center gap-1">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={`text-2xl transition-all ${
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

        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-text-muted">{t("results.yourScore", lang)}</p>
        <p className="text-5xl font-extrabold text-accent">{score}</p>
        <p className="text-text-muted">/ 300</p>
        {mode === "relaxed" && (
          <p className="mt-2 text-xs text-text-dim">{t("daily.notRanked", lang)}</p>
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
              className="card animate-slide-up-fade p-5"
              style={{ animationDelay: `${(qi + 1) * 150}ms` }}
            >
              <p className="mb-2 text-sm font-semibold text-text-muted">
                Q{qi + 1}: {question.question}
              </p>
              <p className="mb-3 text-lg font-bold">
                <span className="text-accent">{result.pointsEarned}</span>
                <span className="text-text-dim"> / 100</span>
                <span className="ml-2 text-sm text-text-muted">
                  {result.answersFound.filter(Boolean).length}/6 {t("game.found", lang)}
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {question.answers.map((answer, ai) => (
                  <span
                    key={ai}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      result.answersFound[ai]
                        ? "bg-correct/10 text-correct"
                        : "bg-wrong/10 text-wrong"
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
        className="press-effect mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 font-bold text-white transition-colors hover:bg-accent-light"
      >
        {copied ? `\u2713 ${t("results.copied", lang)}` : `\u{1F4CB} ${t("results.share", lang)}`}
      </button>

      {/* Countdown */}
      <div className="mb-6 text-center">
        <p className="text-sm text-text-muted">{t("results.nextIn", lang)}</p>
        <p className="text-2xl font-extrabold text-accent">{countdown}</p>
      </div>

      {/* Solo Journey CTA */}
      <a
        href="/play/solo"
        className="card card-hover press-effect p-6 text-center"
      >
        <p className="mb-1 font-bold">{t("results.trySolo", lang)}</p>
        <p className="text-sm text-text-muted">
          {t("results.trySolo.desc", lang)}
        </p>
        <span className="mt-3 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent">
          {t("results.playSolo", lang)} &rarr;
        </span>
      </a>
    </div>
  );
}
