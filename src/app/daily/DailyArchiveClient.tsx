"use client";

import { useLang, t } from "@/lib/i18n";
import { getDailyNumber } from "@/lib/daily";

const LAUNCH_DATE = "2026-03-15";

function getPastDates(): string[] {
  const dates: string[] = [];
  const today = new Date().toISOString().slice(0, 10);
  const current = new Date(LAUNCH_DATE + "T00:00:00Z");

  while (current.toISOString().slice(0, 10) < today) {
    dates.push(current.toISOString().slice(0, 10));
    current.setUTCDate(current.getUTCDate() + 1);
  }

  return dates.reverse(); // newest first
}

export default function DailyArchiveClient() {
  const lang = useLang();
  const dates = getPastDates();

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
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-extrabold sm:text-3xl">
            {t("archive.title", lang)}
          </h1>
          <p className="text-sm text-text-muted">
            {t("archive.subtitle", lang)}
          </p>
        </div>

        {dates.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-text-muted">{t("archive.noResults", lang)}</p>
            <a
              href="/play/daily"
              className="mt-4 inline-block rounded-full bg-accent px-6 py-2 font-bold text-white"
            >
              {t("dailyResults.playCTA", lang)}
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {dates.map((date) => {
              const dateObj = new Date(date + "T00:00:00Z");
              const dayNum = getDailyNumber(dateObj);
              const formatted = dateObj.toLocaleDateString(lang === "de" ? "de-DE" : lang === "es" ? "es-ES" : "en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              });

              return (
                <a
                  key={date}
                  href={`/daily/${date}`}
                  className="card card-hover flex items-center justify-between p-4 transition-colors"
                >
                  <div>
                    <span className="text-sm font-bold text-accent">#{dayNum}</span>
                    <span className="ml-2 text-sm">{formatted}</span>
                  </div>
                  <span className="text-text-muted">&rarr;</span>
                </a>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
