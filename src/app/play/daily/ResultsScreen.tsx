"use client";

import { useState, useEffect } from "react";
import { Question, QuestionResult } from "@/lib/types";
import { generateShareText, getDailyNumber } from "@/lib/daily";
import { useLang, t } from "@/lib/i18n";
import { useAuth } from "@/lib/authContext";
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
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [generatingCard, setGeneratingCard] = useState(false);

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

  const shareText = generateShareText(questionResults, new Date(), score);
  const dailyNumber = getDailyNumber(new Date());

  const mascotMood = score >= 250 ? "excited" : score >= 150 ? "happy" : score >= 50 ? "thinking" : "sad";
  let starCount = 0;
  if (score >= 250) starCount = 3;
  else if (score >= 150) starCount = 2;
  else if (score >= 50) starCount = 1;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const handleTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch {
        // User cancelled or share failed
      }
    }
  };

  const handleShareCard = async () => {
    setGeneratingCard(true);
    try {
      const params = new URLSearchParams({
        score: String(score),
        q1: String(questionResults[0]?.pointsEarned || 0),
        q2: String(questionResults[1]?.pointsEarned || 0),
        q3: String(questionResults[2]?.pointsEarned || 0),
        f1: String(questionResults[0]?.answersFound.filter(Boolean).length || 0),
        f2: String(questionResults[1]?.answersFound.filter(Boolean).length || 0),
        f3: String(questionResults[2]?.answersFound.filter(Boolean).length || 0),
        day: String(dailyNumber),
        stars: String(starCount),
      });

      const res = await fetch(`/api/share-card?${params}`);
      const blob = await res.blob();

      // Try native share with image file
      if (navigator.share && navigator.canShare) {
        const file = new File([blob], `foolsguess-${dailyNumber}.png`, { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            text: `FoolsGuess #${dailyNumber} — ${score}/300\nhttps://foolsguess.com`,
          });
          return;
        }
      }

      // Fallback: download the image
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `foolsguess-${dailyNumber}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Share cancelled or failed
    } finally {
      setGeneratingCard(false);
    }
  };

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

      {/* Share Buttons */}
      <div className="mb-6 flex w-full max-w-md flex-col gap-3">
        <p className="text-center text-sm font-bold uppercase tracking-wider text-text-muted">
          {t("results.share", lang)}
        </p>

        {/* Share Card Button */}
        <button
          onClick={handleShareCard}
          disabled={generatingCard}
          className="press-effect flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#8B7CF6] px-4 py-3.5 font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {generatingCard ? (
            <>
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {t("results.generating", lang)}
            </>
          ) : (
            <>
              &#x1F4F8; {t("results.shareCard", lang)}
            </>
          )}
        </button>

        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="press-effect flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 font-bold text-white transition-colors hover:bg-accent-light"
          >
            {copied ? "\u2713" : "\u{1F4CB}"} {copied ? t("results.copied", lang) : t("results.copy", lang)}
          </button>
          <button
            onClick={handleWhatsApp}
            className="press-effect flex items-center justify-center rounded-xl bg-[#25D366] px-4 py-3 font-bold text-white transition-colors hover:bg-[#20bd5a]"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </button>
          <button
            onClick={handleTwitter}
            className="press-effect flex items-center justify-center rounded-xl bg-black px-4 py-3 font-bold text-white transition-colors hover:bg-gray-800"
            aria-label="X / Twitter"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </button>
          {typeof navigator !== "undefined" && "share" in navigator && (
            <button
              onClick={handleNativeShare}
              className="press-effect flex items-center justify-center rounded-xl bg-text/10 px-4 py-3 font-bold text-text transition-colors hover:bg-text/20"
              aria-label="Share"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
            </button>
          )}
        </div>
      </div>

      {/* Leaderboard CTA */}
      {mode === "ranked" && !user && (
        <a
          href="/auth/register"
          className="card card-hover press-effect mb-6 w-full max-w-md border-accent/20 bg-accent/5 p-5 text-center"
        >
          <p className="mb-1 font-bold text-accent">{t("results.leaderboardCTA", lang)}</p>
          <p className="text-sm text-text-muted">{t("results.leaderboardCTA.desc", lang)}</p>
        </a>
      )}
      {mode === "ranked" && user && (
        <a
          href="/leaderboard"
          className="card card-hover press-effect mb-6 w-full max-w-md p-4 text-center"
        >
          <p className="text-sm font-bold">{t("results.viewLeaderboard", lang)} &rarr;</p>
        </a>
      )}

      {/* Countdown */}
      <div className="mb-6 text-center">
        <p className="text-sm text-text-muted">{t("results.nextIn", lang)}</p>
        <p className="text-2xl font-extrabold text-accent">{countdown}</p>
      </div>

      {/* Yesterday's Results Link */}
      <a
        href={`/daily/${(() => { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10); })()}`}
        className="card card-hover press-effect mb-4 w-full max-w-md p-4 text-center"
      >
        <p className="text-sm font-bold">{t("results.seeYesterday", lang)}</p>
        <p className="text-xs text-text-muted">{t("results.seeYesterday.desc", lang)}</p>
      </a>

      {/* Solo Journey CTA */}
      <a
        href="/play/solo"
        className="card card-hover press-effect w-full max-w-md p-6 text-center"
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
