"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/authContext";
import { useLang, t } from "@/lib/i18n";
import type { LeaderboardEntry } from "@/lib/types";

export default function LeaderboardPage() {
  const lang = useLang();
  const { user } = useAuth();
  const [tab, setTab] = useState<"daily" | "alltime">("daily");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const date = new Date().toISOString().slice(0, 10);
    fetch(`/api/leaderboard?type=${tab}&date=${date}&limit=50`)
      .then((r) => r.json())
      .then((data) => {
        setEntries(data.entries || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [tab]);

  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-md">
        <a href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Fools</span>Guess
        </a>
      </nav>

      <main className="mx-auto max-w-lg px-6 py-12">
        <h1 className="mb-6 text-center text-2xl font-extrabold">
          {t("leaderboard.title", lang)}
        </h1>

        {/* Tabs */}
        <div className="mb-6 flex justify-center gap-2">
          <button
            onClick={() => setTab("daily")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              tab === "daily"
                ? "bg-accent text-white"
                : "border border-border text-text-muted hover:bg-surface-alt"
            }`}
          >
            {t("leaderboard.today", lang)}
          </button>
          <button
            onClick={() => setTab("alltime")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              tab === "alltime"
                ? "bg-accent text-white"
                : "border border-border text-text-muted hover:bg-surface-alt"
            }`}
          >
            {t("leaderboard.allTime", lang)}
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-center text-text-muted">Loading...</p>
        ) : entries.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-text-muted">{t("leaderboard.empty", lang)}</p>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface-alt text-xs font-bold uppercase tracking-wider text-text-dim">
                  <th className="px-4 py-3 text-left">{t("leaderboard.rank", lang)}</th>
                  <th className="px-4 py-3 text-left">{t("leaderboard.player", lang)}</th>
                  <th className="px-4 py-3 text-right">{t("leaderboard.score", lang)}</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => {
                  const isMe = user && entry.user_id === user.id;
                  return (
                    <tr
                      key={entry.rank}
                      className={`border-b border-border last:border-0 ${
                        isMe ? "bg-accent/5" : ""
                      }`}
                    >
                      <td className="px-4 py-3 text-sm font-bold">
                        {entry.rank <= 3 ? (
                          <span className="text-lg">
                            {entry.rank === 1 ? "\u{1F947}" : entry.rank === 2 ? "\u{1F948}" : "\u{1F949}"}
                          </span>
                        ) : (
                          entry.rank
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                            {entry.display_name.charAt(0).toUpperCase()}
                          </span>
                          <span className={`text-sm font-medium ${isMe ? "text-accent" : ""}`}>
                            {entry.display_name}
                            {isMe && " (you)"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-bold">
                        {entry.score}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!user && (
          <div className="mt-6 card p-5 text-center">
            <p className="mb-3 text-sm text-text-muted">
              {t("leaderboard.signUpCta", lang)}
            </p>
            <a
              href="/auth/register"
              className="press-effect inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-accent-light"
            >
              {t("auth.register", lang)}
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
