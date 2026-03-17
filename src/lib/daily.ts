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
  const shuffled = [...allQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 3);
}

// Day number since launch (March 15, 2026)
const LAUNCH_DATE = new Date("2026-03-15");

export function getDailyNumber(date: Date): number {
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const utcLaunch = new Date(Date.UTC(LAUNCH_DATE.getFullYear(), LAUNCH_DATE.getMonth(), LAUNCH_DATE.getDate()));
  return Math.floor((utcDate.getTime() - utcLaunch.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

function getScoreEmoji(points: number): string {
  if (points >= 80) return "🟪";
  if (points >= 50) return "🟦";
  if (points >= 20) return "🟨";
  return "⬛";
}

export function generateShareText(
  questionResults: QuestionResult[],
  date: Date,
  totalScore: number
): string {
  const dayNum = getDailyNumber(date);

  const lines = questionResults.map((result) => {
    const bar = result.answersFound
      .map((found) => (found ? "🟪" : "⬛"))
      .join("");
    const emoji = getScoreEmoji(result.pointsEarned);
    return `${emoji} ${bar} ${result.pointsEarned}`;
  });

  let stars = "";
  if (totalScore >= 250) stars = " ⭐⭐⭐";
  else if (totalScore >= 150) stars = " ⭐⭐";
  else if (totalScore >= 50) stars = " ⭐";

  return [
    `🃏 FoolsGuess #${dayNum}`,
    "",
    ...lines,
    "",
    `Score: ${totalScore}/300${stars}`,
    "",
    "https://foolsguess.com",
  ].join("\n");
}
