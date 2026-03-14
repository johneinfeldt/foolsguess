import { Answer, DivisionConfig, JourneyProgress, QuestionProgress } from "./types";
import { DIVISIONS } from "./journeyConfig";

export function getLevelXP(
  progress: JourneyProgress,
  division: DivisionConfig,
  levelIndex: number
): number {
  const level = division.levels[levelIndex];
  if (!level) return 0;
  return level.questionIds.reduce((sum, qId) => {
    const qp = progress.questionProgress[qId];
    return sum + (qp?.totalXPEarned ?? 0);
  }, 0);
}

export function isLevelComplete(
  progress: JourneyProgress,
  division: DivisionConfig,
  levelIndex: number
): boolean {
  return getLevelXP(progress, division, levelIndex) >= division.xpPerLevel;
}

export function isLevelUnlocked(
  progress: JourneyProgress,
  division: DivisionConfig,
  levelIndex: number
): boolean {
  if (levelIndex === 0) return true;
  return isLevelComplete(progress, division, levelIndex - 1);
}

export function isDivisionComplete(
  progress: JourneyProgress,
  division: DivisionConfig
): boolean {
  return division.levels.every((_, i) => isLevelComplete(progress, division, i));
}

export function isDivisionUnlocked(
  progress: JourneyProgress,
  divNumber: number
): boolean {
  if (divNumber === 1) return true;
  const prevDiv = DIVISIONS.find((d) => d.number === divNumber - 1);
  if (!prevDiv) return false;
  return isDivisionComplete(progress, prevDiv);
}

export function isQuestionComplete(progress: JourneyProgress, questionId: string): boolean {
  const qp = progress.questionProgress[questionId];
  if (!qp) return false;
  return qp.answersFound.every(Boolean);
}

export function isQuestionPlayed(progress: JourneyProgress, questionId: string): boolean {
  const qp = progress.questionProgress[questionId];
  return !!qp && qp.totalXPEarned > 0;
}

export function calculateReplayXP(
  oldProgress: QuestionProgress | undefined,
  newAnswersFound: boolean[],
  answers: Answer[]
): { xpEarned: number; newBestScore: number; mergedAnswers: boolean[] } {
  const oldAnswers = oldProgress?.answersFound ?? answers.map(() => false);
  const mergedAnswers = newAnswersFound.map((found, i) => found || oldAnswers[i]);

  let xpEarned = 0;
  let newBestScore = 0;

  for (let i = 0; i < answers.length; i++) {
    if (mergedAnswers[i]) {
      newBestScore += answers[i].points;
    }
    if (newAnswersFound[i] && !oldAnswers[i]) {
      xpEarned += answers[i].points;
    }
  }

  return { xpEarned, newBestScore, mergedAnswers };
}

export function getDivisionProgress(
  progress: JourneyProgress,
  division: DivisionConfig
): { completedLevels: number; totalLevels: number } {
  const completedLevels = division.levels.filter((_, i) =>
    isLevelComplete(progress, division, i)
  ).length;
  return { completedLevels, totalLevels: division.levels.length };
}
