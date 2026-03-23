"use client";

import JesterMascot from "@/components/JesterMascot";
import LanguageSelector from "@/components/LanguageSelector";
import UserMenu from "@/components/UserMenu";
import { useLang, t } from "@/lib/i18n";
import { categories } from "@/lib/categories";

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
          <a
            href="/leaderboard"
            className="text-sm font-semibold text-text-muted transition-colors hover:text-accent"
          >
            {t("leaderboard.title", lang)}
          </a>
          <LanguageSelector />
          <UserMenu />
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
            <span className="mt-2 block text-base font-semibold tracking-normal text-text-muted sm:text-xl">
              {t("hero.h1", lang).replace("FoolsGuess — ", "")}
            </span>
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
            <div className="mb-3 text-4xl">&#128293;</div>
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

      {/* Categories */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-extrabold">
            {lang === "de" ? "Kategorien entdecken" : lang === "es" ? "Explorar categor\u00edas" : "Browse Categories"}
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-7">
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="card card-hover press-effect flex flex-col items-center p-3 text-center"
              >
                <span className="mb-1 text-2xl">{cat.icon}</span>
                <span className="text-xs font-semibold">{cat[lang].name}</span>
              </a>
            ))}
          </div>
          <div className="mt-4 text-center">
            <a href="/categories" className="text-sm font-semibold text-accent hover:text-accent-light">
              {lang === "de" ? "Alle Kategorien ansehen" : lang === "es" ? "Ver todas las categor\u00edas" : "View all categories"} &rarr;
            </a>
          </div>
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

      {/* SEO Content */}
      <section className="border-t border-border bg-surface-alt px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-text-muted">
          <div>
            <h2 className="mb-2 text-lg font-bold text-text">{t("seo.whatIs.title", lang)}</h2>
            <p>{t("seo.whatIs.text", lang)}</p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-text">{t("seo.whySurvey.title", lang)}</h2>
            <p>{t("seo.whySurvey.text", lang)}</p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-text">{t("seo.gameModes.title", lang)}</h2>
            <p>{t("seo.gameModes.text", lang)}</p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-text">{t("seo.language.title", lang)}</h2>
            <p>{t("seo.language.text", lang)}</p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-text">{t("seo.free.title", lang)}</h2>
            <p>{t("seo.free.text", lang)}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-sm text-text-dim">
            &copy; 2026 FoolsGuess. {t("footer.rights", lang)}
          </span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-text-dim">
            <a href="/categories" className="transition-colors hover:text-text-muted">{lang === "de" ? "Kategorien" : lang === "es" ? "Categor\u00edas" : "Categories"}</a>
            <a href="/impressum" className="transition-colors hover:text-text-muted">{t("footer.impressum", lang)}</a>
            <a href="/privacy" className="transition-colors hover:text-text-muted">{t("footer.privacy", lang)}</a>
            <a href="/terms" className="transition-colors hover:text-text-muted">{t("footer.terms", lang)}</a>
            <a href="/contact" className="transition-colors hover:text-text-muted">{t("footer.contact", lang)}</a>
          </div>
        </div>
        <div className="mx-auto mt-4 flex max-w-3xl items-center justify-center gap-4">
          <a href="https://x.com/foolsguess" target="_blank" rel="noopener noreferrer" className="text-text-dim transition-colors hover:text-text-muted" aria-label="X (Twitter)">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://instagram.com/foolsguess" target="_blank" rel="noopener noreferrer" className="text-text-dim transition-colors hover:text-text-muted" aria-label="Instagram">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://tiktok.com/@foolsguess" target="_blank" rel="noopener noreferrer" className="text-text-dim transition-colors hover:text-text-muted" aria-label="TikTok">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
