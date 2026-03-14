import { DivisionConfig, LevelConfig } from "./types";
import questions from "@/data/questions.json";

const QUESTIONS_PER_LEVEL = 5;

const DIVISION_SETTINGS = [
  { number: 1, name: "Division 1", xpPerLevel: 150 },
  { number: 2, name: "Division 2", xpPerLevel: 200 },
  { number: 3, name: "Division 3", xpPerLevel: 250 },
];

function buildLevels(questionIds: string[]): LevelConfig[] {
  const levels: LevelConfig[] = [];
  for (let i = 0; i < questionIds.length; i += QUESTIONS_PER_LEVEL) {
    levels.push({
      levelNumber: levels.length + 1,
      questionIds: questionIds.slice(i, i + QUESTIONS_PER_LEVEL),
    });
  }
  return levels;
}

function buildDivisions(): DivisionConfig[] {
  const allIds = questions.map((q) => q.id);
  const perDivision = Math.ceil(allIds.length / DIVISION_SETTINGS.length);

  return DIVISION_SETTINGS.map((settings, i) => {
    const start = i * perDivision;
    const end = Math.min(start + perDivision, allIds.length);
    const divisionIds = allIds.slice(start, end);

    return {
      ...settings,
      levels: buildLevels(divisionIds),
    };
  });
}

export const DIVISIONS: DivisionConfig[] = buildDivisions();

export const MAX_ENERGY = 3;

export function getDivision(divNumber: number): DivisionConfig | undefined {
  return DIVISIONS.find((d) => d.number === divNumber);
}

export function getTotalDivisions(): number {
  return DIVISIONS.length;
}
