"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { useLang, t } from "@/lib/i18n";

export default function LoginPage() {
  const lang = useLang();
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);
    if (error) {
      setError(error);
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-md">
        <a href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Fools</span>Guess
        </a>
      </nav>

      <main className="mx-auto max-w-sm px-6 py-16">
        <h1 className="mb-8 text-center text-2xl font-extrabold">
          {t("auth.login", lang)}
        </h1>

        <form onSubmit={handleSubmit} className="card flex flex-col gap-4 p-6">
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

          {error && (
            <p className="text-sm text-wrong">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="press-effect mt-2 rounded-full bg-accent px-6 py-3 font-bold text-white transition-colors hover:bg-accent-light disabled:opacity-50"
          >
            {loading ? "..." : t("auth.login", lang)}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          {t("auth.noAccount", lang)}{" "}
          <a href="/auth/register" className="font-semibold text-accent hover:text-accent-light">
            {t("auth.register", lang)}
          </a>
        </p>
      </main>
    </div>
  );
}
