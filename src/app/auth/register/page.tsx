"use client";

import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import { useLang, t } from "@/lib/i18n";

export default function RegisterPage() {
  const lang = useLang();
  const { signUp } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t("auth.passwordMismatch", lang));
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password, displayName);
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    // Subscribe to newsletter if checked
    if (newsletter) {
      try {
        await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, subscribe: true }),
        });
      } catch {
        // Newsletter failure is non-critical
      }
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-bg font-sans text-text">
        <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-md">
          <a href="/" className="text-xl font-bold tracking-tight">
            <span className="text-accent">Fools</span>Guess
          </a>
        </nav>
        <main className="mx-auto max-w-sm px-6 py-16 text-center">
          <div className="card p-8">
            <div className="mb-4 text-5xl">&#9993;</div>
            <h1 className="mb-3 text-xl font-extrabold">{t("auth.checkEmail", lang)}</h1>
            <p className="text-sm text-text-muted">{email}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-md">
        <a href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Fools</span>Guess
        </a>
      </nav>

      <main className="mx-auto max-w-sm px-6 py-16">
        <h1 className="mb-8 text-center text-2xl font-extrabold">
          {t("auth.register", lang)}
        </h1>

        <form onSubmit={handleSubmit} className="card flex flex-col gap-4 p-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-text-muted">
              {t("auth.displayName", lang)}
            </label>
            <input
              type="text"
              required
              maxLength={20}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-text outline-none transition-colors focus:border-accent"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-text-muted">
              {t("auth.email", lang)}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-text outline-none transition-colors focus:border-accent"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-text-muted">
              {t("auth.password", lang)}
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-text outline-none transition-colors focus:border-accent"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-text-muted">
              {t("auth.confirmPassword", lang)}
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-text outline-none transition-colors focus:border-accent"
            />
          </div>

          {/* Newsletter opt-in */}
          <label className="flex items-start gap-3 rounded-lg border border-border p-3">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-accent"
            />
            <div>
              <span className="text-sm font-medium">{t("newsletter.subscribe", lang)}</span>
              <p className="text-xs text-text-muted">{t("newsletter.description", lang)}</p>
            </div>
          </label>

          {error && (
            <p className="text-sm text-wrong">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="press-effect mt-2 rounded-full bg-accent px-6 py-3 font-bold text-white transition-colors hover:bg-accent-light disabled:opacity-50"
          >
            {loading ? "..." : t("auth.register", lang)}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          {t("auth.hasAccount", lang)}{" "}
          <a href="/auth/login" className="font-semibold text-accent hover:text-accent-light">
            {t("auth.login", lang)}
          </a>
        </p>
      </main>
    </div>
  );
}
