"use client";

import { CategoryConfig } from "@/lib/categories";
import { useLang } from "@/lib/i18n";
import questionsEn from "@/data/questions.json";

interface Props {
  categories: CategoryConfig[];
}

export default function CategoriesClient({ categories }: Props) {
  const lang = useLang();

  const headings = {
    en: { title: "Trivia Categories", subtitle: "Pick a category and see what people said.", cta: "Play Daily Challenge" },
    de: { title: "Trivia-Kategorien", subtitle: "W\u00e4hle eine Kategorie und sieh, was die Leute gesagt haben.", cta: "Tages-Challenge spielen" },
    es: { title: "Categor\u00edas de Trivia", subtitle: "Elige una categor\u00eda y descubre qu\u00e9 dijo la gente.", cta: "Jugar reto diario" },
  };
  const h = headings[lang];

  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-md">
        <a href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Fools</span>Guess
        </a>
        <a href="/play/daily" className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-accent-light">
          {h.cta}
        </a>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-2 text-3xl font-extrabold">{h.title}</h1>
        <p className="mb-8 text-text-muted">{h.subtitle}</p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {categories.map((cat) => {
            const count = questionsEn.filter((q) => q.category === cat.jsonCategory).length;
            const localized = cat[lang];
            return (
              <a
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="card card-hover press-effect flex flex-col items-center p-5 text-center"
              >
                <span className="mb-2 text-3xl">{cat.icon}</span>
                <span className="text-sm font-bold">{localized.name}</span>
                <span className="mt-1 text-xs text-text-dim">{count} questions</span>
              </a>
            );
          })}
        </div>
      </main>
    </div>
  );
}
