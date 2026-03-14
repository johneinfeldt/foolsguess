"use client";

import { Question } from "./types";
import { Lang } from "./i18n";

const cache: Partial<Record<Lang, Question[]>> = {};

export async function loadQuestions(lang: Lang, fallback: Question[]): Promise<Question[]> {
  if (lang === "en") return fallback;
  if (cache[lang]) return cache[lang]!;

  try {
    let data: Question[];
    if (lang === "de") {
      const mod = await import("@/data/questions-de.json");
      data = (mod.default || []) as Question[];
    } else {
      const mod = await import("@/data/questions-es.json");
      data = (mod.default || []) as Question[];
    }
    // Fall back to English if translation file is empty
    if (data.length === 0) return fallback;
    cache[lang] = data;
    return data;
  } catch {
    return fallback;
  }
}
