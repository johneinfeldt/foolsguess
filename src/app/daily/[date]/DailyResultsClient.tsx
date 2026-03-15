"use client";

import { Question } from "@/lib/types";
import { useLang, t } from "@/lib/i18n";

interface Stats {
  totalPlayers: number;
  avgScore: number;
  highScore: number;
}

interface Props {
  date: string;
  dayNum: number;
  dateFormatted: string;
  questions: Question[];
  stats: Stats | null;
}

export default function DailyResultsClient({ dayNum, dateFormatted, questions, stats }: Props) {
  const lang = useLang();

  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-md">
        <a href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Fools</span>Guess
        </a>
        <a
          href="/play/daily"
          className="rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-white transition-colors hover:bg-accent-light"
        >
          {t("results.playToday", lang)}
        </a>
      </nav>

      <main className="mx-auto max-w-lg px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-1 text-sm font-bold uppercase tracking-wider text-accent">
            Daily #{dayNum}
          </p>
          <h1 className="mb-2 text-2xl font-extrabold sm:text-3xl">
            {dateFormatted}
          </h1>
          <p className="text-sm text-text-muted">
            {t("dailyResults.subtitle", lang)}
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="card mb-8 grid grid-cols-3 gap-4 p-6 text-center">
            <div>
              <p className="text-2xl font-extrabold text-accent">{stats.totalPlayers}</p>
              <p className="text-xs text-text-muted">{t("dailyResults.players", lang)}</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-accent">{stats.avgScore}</p>
              <p className="text-xs text-text-muted">{t("dailyResults.avgScore", lang)}</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-accent">{stats.highScore}</p>
              <p className="text-xs text-text-muted">{t("dailyResults.highScore", lang)}</p>
            </div>
          </div>
        )}

        {/* Questions & Answers */}
        <div className="flex flex-col gap-6">
          {questions.map((question, qi) => (
            <div key={qi} className="card p-5">
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-accent">
                {t("dailyResults.question", lang)} {qi + 1}
              </p>
              <h2 className="mb-4 text-lg font-bold">{question.question}</h2>
              <div className="flex flex-col gap-2">
                {question.answers.map((answer, ai) => {
                  const maxPoints = question.answers[0].points;
                  const barWidth = maxPoints > 0 ? (answer.points / maxPoints) * 100 : 0;
                  return (
                    <div key={ai} className="relative">
                      <div
                        className="absolute inset-y-0 left-0 rounded-lg bg-accent/10"
                        style={{ width: `${barWidth}%` }}
                      />
                      <div className="relative flex items-center justify-between px-3 py-2">
                        <span className="text-sm font-medium">{answer.text}</span>
                        <span className="text-sm font-bold text-accent">{answer.points} pts</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="/play/daily"
            className="press-effect inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 font-bold text-white transition-colors hover:bg-accent-light"
          >
            {t("dailyResults.playCTA", lang)} &rarr;
          </a>
          <p className="mt-3 text-xs text-text-dim">
            {t("dailyResults.freeToPlay", lang)}
          </p>
        </div>
      </main>
    </div>
  );
}
