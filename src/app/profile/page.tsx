"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { useLang, t } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

interface Stats {
  gamesPlayed: number;
  bestScore: number;
  currentStreak: number;
  longestStreak: number;
}

export default function ProfilePage() {
  const lang = useLang();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [stats, setStats] = useState<Stats>({
    gamesPlayed: 0,
    bestScore: 0,
    currentStreak: 0,
    longestStreak: 0,
  });
  const [newsletter, setNewsletter] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;

    // Fetch stats
    async function fetchStats() {
      const [dailyRes, streakRes, profileRes] = await Promise.all([
        supabase
          .from("daily_scores")
          .select("score")
          .eq("user_id", user!.id),
        supabase
          .from("streaks")
          .select("current_streak, longest_streak")
          .eq("user_id", user!.id)
          .single(),
        supabase
          .from("profiles")
          .select("newsletter_subscribed")
          .eq("id", user!.id)
          .single(),
      ]);

      const scores = dailyRes.data || [];
      setStats({
        gamesPlayed: scores.length,
        bestScore: scores.length > 0 ? Math.max(...scores.map((s) => s.score)) : 0,
        currentStreak: streakRes.data?.current_streak || 0,
        longestStreak: streakRes.data?.longest_streak || 0,
      });
      setNewsletter(profileRes.data?.newsletter_subscribed || false);
    }
    fetchStats();
  }, [user]);

  const toggleNewsletter = async () => {
    if (!user?.email) return;
    setNewsletterLoading(true);
    const newValue = !newsletter;

    await Promise.all([
      supabase
        .from("profiles")
        .update({ newsletter_subscribed: newValue })
        .eq("id", user.id),
      fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, subscribe: newValue }),
      }),
    ]);

    setNewsletter(newValue);
    setNewsletterLoading(false);
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  const displayName =
    user.user_metadata?.display_name || user.email?.split("@")[0] || "Player";

  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-md">
        <a href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Fools</span>Guess
        </a>
      </nav>

      <main className="mx-auto max-w-sm px-6 py-12">
        {/* Profile header */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-bold text-white">
            {displayName.charAt(0).toUpperCase()}
          </span>
          <h1 className="text-2xl font-extrabold">{displayName}</h1>
          <p className="text-sm text-text-muted">{user.email}</p>
        </div>

        {/* Stats */}
        <div className="card mb-4 p-5">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-dim">
            {t("profile.stats", lang)}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold">{stats.gamesPlayed}</p>
              <p className="text-xs text-text-muted">{t("profile.gamesPlayed", lang)}</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.bestScore}</p>
              <p className="text-xs text-text-muted">{t("profile.bestScore", lang)}</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.currentStreak}</p>
              <p className="text-xs text-text-muted">{t("profile.currentStreak", lang)}</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.longestStreak}</p>
              <p className="text-xs text-text-muted">{t("profile.longestStreak", lang)}</p>
            </div>
          </div>
        </div>

        {/* Newsletter toggle */}
        <div className="card mb-4 p-5">
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">{t("newsletter.subscribe", lang)}</p>
              <p className="text-xs text-text-muted">{t("newsletter.description", lang)}</p>
            </div>
            <button
              onClick={toggleNewsletter}
              disabled={newsletterLoading}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                newsletter ? "bg-accent" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  newsletter ? "translate-x-5" : ""
                }`}
              />
            </button>
          </label>
        </div>

        {/* Logout */}
        <button
          onClick={async () => {
            await signOut();
            router.push("/");
          }}
          className="press-effect w-full rounded-full border-2 border-wrong/30 px-6 py-3 font-bold text-wrong transition-colors hover:border-wrong hover:bg-wrong/5"
        >
          {t("auth.logout", lang)}
        </button>
      </main>
    </div>
  );
}
