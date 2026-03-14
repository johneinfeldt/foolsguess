import { Question, QuestionResult } from "./types";

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getDailyQuestions(date: Date, allQuestions: Question[]): Question[] {
  const dateString = date.toISOString().slice(0, 10);
  const seed = hashString(dateString);
  const rng = seededRandom(seed);
  const shuffled = [...allQuestions].sort(() => rng() - 0.5);
  return shuffled.slice(0, 3);
}

export function generateShareText(
  questionResults: QuestionResult[],
  date: Date,
  totalScore: number
): string {
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const lines = questionResults.map((result, i) => {
    const squares = result.answersFound
      .map((found) => (found ? "🟩" : "⬛"))
      .join("");
    return `Q${i + 1}: ${squares} (${result.pointsEarned}/100)`;
  });

  let stars = "";
  if (totalScore >= 250) stars = " ⭐⭐⭐";
  else if (totalScore >= 150) stars = " ⭐⭐";
  else if (totalScore >= 50) stars = " ⭐";

  return [
    `FoolsGuess Daily - ${dateStr}`,
    "",
    ...lines,
    "",
    `Total: ${totalScore}/300${stars}`,
    "",
    "Play at foolsguess.com",
  ].join("\n");
}
