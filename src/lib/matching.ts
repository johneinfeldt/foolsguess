import { Answer } from "./types";

function normalize(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[^\w\s']/g, "");
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= a.length; i++) {
    matrix[i] = [i];
    for (let j = 1; j <= b.length; j++) {
      if (i === 0) {
        matrix[i][j] = j;
      } else {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
  }
  return matrix[a.length][b.length];
}

function fuzzyMatch(input: string, target: string): boolean {
  if (input.length >= 4 && target.startsWith(input)) return true;
  const maxDistance = target.length <= 5 ? 1 : 2;
  return levenshteinDistance(input, target) <= maxDistance;
}

function wordComponentMatch(input: string, target: string): boolean {
  if (input.length < 2) return false;
  const words = target.split(" ");
  return words.some((word) => word === input);
}

function matchAnswer(input: string, answer: Answer): boolean {
  const normalized = normalize(input);
  if (normalized.length === 0) return false;

  const allForms = [answer.text, ...answer.aliases].map(normalize);

  // 1. Exact match
  if (allForms.includes(normalized)) return true;

  // 2. Word-component match (e.g., "tv" matches "watch tv")
  for (const form of allForms) {
    if (wordComponentMatch(normalized, form)) return true;
  }

  // 3. Fuzzy match (Levenshtein)
  for (const form of allForms) {
    if (fuzzyMatch(normalized, form)) return true;
  }

  return false;
}

export function checkGuess(
  input: string,
  answers: Answer[],
  revealedAnswers: boolean[]
): { matched: boolean; answerIndex: number; points: number } {
  for (let i = 0; i < answers.length; i++) {
    if (revealedAnswers[i]) continue;
    if (matchAnswer(input, answers[i])) {
      return { matched: true, answerIndex: i, points: answers[i].points };
    }
  }
  return { matched: false, answerIndex: -1, points: 0 };
}
