"use client";

import { Question } from "@/lib/types";
import { CategoryConfig } from "@/lib/categories";
import { useLang } from "@/lib/i18n";

interface Props {
  category: CategoryConfig;
  sampleQuestions: Question[];
  totalQuestions: number;
  allCategories: CategoryConfig[];
}

export default function CategoryDetailClient({ category, sampleQuestions, totalQuestions, allCategories }: Props) {
  const lang = useLang();
  const localized = category[lang];

  const ui = {
    en: { play: "Play Now", sampleTitle: "Sample Questions", moreCategories: "More Categories", questionsLabel: "questions", playDesc: "Think you know what people said? Test yourself in today's Daily Challenge!", playBtn: "Play Daily Challenge" },
    de: { play: "Jetzt spielen", sampleTitle: "Beispielfragen", moreCategories: "Weitere Kategorien", questionsLabel: "Fragen", playDesc: "Glaubst du, du wei\u00dft was die Leute gesagt haben? Teste dich in der heutigen Tages-Challenge!", playBtn: "Tages-Challenge spielen" },
    es: { play: "Jugar ahora", sampleTitle: "Preguntas de ejemplo", moreCategories: "M\u00e1s categor\u00edas", questionsLabel: "preguntas", playDesc: "\u00bfCrees que sabes lo que dijo la gente? \u00a1Ponte a prueba en el reto diario de hoy!", playBtn: "Jugar reto diario" },
  };
  const t = ui[lang];

  const otherCategories = allCategories.filter((c) => c.slug !== category.slug);

  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-md">
        <a href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Fools</span>Guess
        </a>
        <a href="/play/daily" className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-accent-light">
          {t.play}
        </a>
      </nav>

      <main className="mx-auto max-w-2xl px-6 py-12">
        {/* Hero */}
        <div className="mb-10 text-center">
          <span className="mb-3 block text-5xl">{category.icon}</span>
          <h1 className="mb-2 text-3xl font-extrabold">{localized.name}</h1>
          <p className="mb-2 text-text-muted">{localized.description}</p>
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
            {totalQuestions} {t.questionsLabel}
          </span>
        </div>

        {/* Sample Questions */}
        <h2 className="mb-4 text-lg font-bold">{t.sampleTitle}</h2>
        <div className="mb-10 flex flex-col gap-4">
          {sampleQuestions.map((question, qi) => {
            const maxPoints = Math.max(...question.answers.map((a) => a.points));
            return (
              <div key={qi} className="card p-5">
                <p className="mb-3 font-semibold">{question.question}</p>
                <div className="flex flex-col gap-2">
                  {question.answers.map((answer, ai) => (
                    <div key={ai} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                        {ai + 1}
                      </span>
                      <div className="flex flex-1 items-center gap-2">
                        <span className="min-w-0 flex-1 truncate text-sm">{answer.text}</span>
                        <div className="h-2 w-20 shrink-0 overflow-hidden rounded-full bg-border sm:w-28">
                          <div
                            className="h-full rounded-full bg-accent"
                            style={{ width: `${(answer.points / maxPoints) * 100}%` }}
                          />
                        </div>
                        <span className="w-8 shrink-0 text-right text-xs font-bold text-accent">{answer.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <a
          href="/play/daily"
          className="card card-hover press-effect mb-10 block border-accent/20 bg-accent/5 p-6 text-center"
        >
          <p className="mb-2 text-lg font-bold text-accent">{t.playBtn}</p>
          <p className="text-sm text-text-muted">{t.playDesc}</p>
        </a>

        {/* Other Categories */}
        <h2 className="mb-4 text-lg font-bold">{t.moreCategories}</h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {otherCategories.map((cat) => (
            <a
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="card card-hover press-effect flex flex-col items-center p-3 text-center"
            >
              <span className="mb-1 text-xl">{cat.icon}</span>
              <span className="text-xs font-semibold">{cat[lang].name}</span>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
