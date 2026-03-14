"use client";

import JesterMascot from "@/components/JesterMascot";
import LanguageSelector from "@/components/LanguageSelector";
import { useLang, t } from "@/lib/i18n";

export default function Home() {
  const lang = useLang();

  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-md">
        <span className="text-xl font-bold tracking-tight">
          <span className="text-accent">Fools</span>Guess
        </span>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <a
            href="#modes"
            className="press-effect rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-light"
          >
            {t("nav.playNow", lang)}
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-16 pb-12 sm:pt-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="animate-float">
            <JesterMascot size={100} mood="excited" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            <span className="text-accent">Fools</span>Guess
          </h1>
          <p className="max-w-md text-lg text-text-muted">
            {t("hero.tagline", lang)}
          </p>
          <p className="text-sm text-text-dim">
            {t("hero.free", lang)}
          </p>
        </div>
      </section>

      {/* Game Mode Cards */}
      <section id="modes" className="px-6 pb-16">
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
          {/* Daily Challenge */}
          <a
            href="/play/daily"
            className="card card-hover press-effect group relative p-6 transition-all hover:scale-[1.02]"
          >
            <div className="absolute top-0 right-0 rounded-bl-xl rounded-tr-2xl bg-accent px-3 py-1 text-xs font-bold text-white">
              {t("label.popular", lang)}
            </div>
            <div className="mb-3 text-4xl">&#128197;</div>
            <h3 className="mb-2 text-lg font-bold">{t("mode.daily", lang)}</h3>
            <p className="mb-4 text-sm leading-relaxed text-text-muted">
              {t("mode.daily.desc", lang)}
            </p>
            <span className="text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
              {t("nav.playNow", lang)} &rarr;
            </span>
          </a>

          {/* Solo Journey */}
          <a
            href="/play/solo"
            className="card card-hover press-effect group relative p-6 transition-all hover:scale-[1.02]"
          >
            <div className="absolute top-0 right-0 rounded-bl-xl rounded-tr-2xl bg-correct px-3 py-1 text-xs font-bold text-white">
              {t("label.new", lang)}
            </div>
            <div className="mb-3 text-4xl">&#129513;</div>
            <h3 className="mb-2 text-lg font-bold">{t("mode.solo", lang)}</h3>
            <p className="mb-4 text-sm leading-relaxed text-text-muted">
              {t("mode.solo.desc", lang)}
            </p>
            <span className="text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
              {t("nav.playNow", lang)} &rarr;
            </span>
          </a>

          {/* Party Mode */}
          <a
            href="/play/party"
            className="card card-hover press-effect group relative p-6 transition-all hover:scale-[1.02]"
          >
            <div className="absolute top-0 right-0 rounded-bl-xl rounded-tr-2xl bg-gold px-3 py-1 text-xs font-bold text-white">
              {t("label.new", lang)}
            </div>
            <div className="mb-3 text-4xl">&#128101;</div>
            <h3 className="mb-2 text-lg font-bold">{t("party.title", lang)}</h3>
            <p className="mb-4 text-sm leading-relaxed text-text-muted">
              {t("mode.multi.desc", lang)}
            </p>
            <span className="text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
              {t("nav.playNow", lang)} &rarr;
            </span>
          </a>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border bg-surface-alt px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-center text-2xl font-extrabold sm:text-3xl">
            {t("how.title", lang)}
          </h2>
          <p className="mb-12 text-center text-text-muted">
            {t("how.subtitle", lang)}
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card animate-stagger-in p-6 text-center" style={{ animationDelay: "0ms" }}>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-2xl">
                &#128203;
              </div>
              <span className="mb-2 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-bold text-accent">
                Step 1
              </span>
              <h3 className="mb-1.5 text-base font-bold">{t("how.step1.title", lang)}</h3>
              <p className="text-sm text-text-muted">
                {t("how.step1.desc", lang)}
              </p>
            </div>

            <div className="card animate-stagger-in p-6 text-center" style={{ animationDelay: "100ms" }}>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-2xl">
                &#128172;
              </div>
              <span className="mb-2 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-bold text-accent">
                Step 2
              </span>
              <h3 className="mb-1.5 text-base font-bold">{t("how.step2.title", lang)}</h3>
              <p className="text-sm text-text-muted">
                {t("how.step2.desc", lang)}
              </p>
            </div>

            <div className="card animate-stagger-in p-6 text-center" style={{ animationDelay: "200ms" }}>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-2xl">
                &#127942;
              </div>
              <span className="mb-2 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-bold text-accent">
                Step 3
              </span>
              <h3 className="mb-1.5 text-base font-bold">{t("how.step3.title", lang)}</h3>
              <p className="text-sm text-text-muted">
                {t("how.step3.desc", lang)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="flex flex-col items-center gap-6 px-6 py-16 text-center sm:py-20">
        <JesterMascot size={64} mood="happy" />
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          {t("cta.title", lang)}
        </h2>
        <p className="max-w-md text-text-muted">
          {t("cta.subtitle", lang)}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="/play/daily"
            className="press-effect inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-bold text-white transition-colors hover:bg-accent-light"
          >
            {t("mode.daily", lang)} &rarr;
          </a>
          <a
            href="/play/solo"
            className="press-effect inline-flex items-center gap-2 rounded-full border-2 border-accent/30 px-7 py-3 font-bold text-accent transition-all hover:border-accent hover:bg-accent/5"
          >
            {t("mode.solo", lang)} &rarr;
          </a>
          <a
            href="/play/party"
            className="press-effect inline-flex items-center gap-2 rounded-full border-2 border-accent/30 px-7 py-3 font-bold text-accent transition-all hover:border-accent hover:bg-accent/5"
          >
            {t("party.title", lang)} &rarr;
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-sm text-text-dim">
            &copy; 2026 FoolsGuess. {t("footer.rights", lang)}
          </span>
          <div className="flex gap-6 text-sm text-text-dim">
            <a href="#" className="transition-colors hover:text-text-muted">Privacy</a>
            <a href="#" className="transition-colors hover:text-text-muted">Terms</a>
            <a href="#" className="transition-colors hover:text-text-muted">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
