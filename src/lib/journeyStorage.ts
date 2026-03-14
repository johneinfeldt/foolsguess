import { JourneyProgress, StreakData } from "./types";
import { MAX_ENERGY } from "./journeyConfig";

const JOURNEY_KEY = "foolsguess_journey";
const STREAK_KEY = "foolsguess_streak";

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

// --- Journey Progress ---

export function loadJourneyProgress(): JourneyProgress {
  try {
    const stored = localStorage.getItem(JOURNEY_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return {
    currentDivision: 1,
    questionProgress: {},
    energy: { current: MAX_ENERGY, lastRefillDate: getTodayString() },
  };
}

export function saveJourneyProgress(progress: JourneyProgress): void {
  try {
    localStorage.setItem(JOURNEY_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

// --- Energy ---

export function getRefreshedEnergy(energy: JourneyProgress["energy"]): JourneyProgress["energy"] {
  const today = getTodayString();
  if (energy.lastRefillDate !== today) {
    return { current: MAX_ENERGY, lastRefillDate: today };
  }
  return energy;
}

export function spendEnergy(progress: JourneyProgress): JourneyProgress {
  const energy = getRefreshedEnergy(progress.energy);
  return {
    ...progress,
    energy: {
      current: Math.max(0, energy.current - 1),
      lastRefillDate: energy.lastRefillDate,
    },
  };
}

export function hasEnergy(progress: JourneyProgress): boolean {
  const energy = getRefreshedEnergy(progress.energy);
  return energy.current > 0;
}

export function addBonusEnergy(progress: JourneyProgress): JourneyProgress {
  const energy = getRefreshedEnergy(progress.energy);
  return {
    ...progress,
    energy: {
      current: Math.min(energy.current + 1, MAX_ENERGY + 2),
      lastRefillDate: energy.lastRefillDate,
    },
  };
}

// --- Streak ---

export function loadStreak(): StreakData {
  try {
    const stored = localStorage.getItem(STREAK_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return { current: 0, lastPlayDate: "" };
}

export function updateStreak(): StreakData {
  const streak = loadStreak();
  const today = getTodayString();

  if (streak.lastPlayDate === today) {
    return streak;
  }

  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayString = yesterday.toISOString().slice(0, 10);

  let newCurrent: number;
  if (streak.lastPlayDate === yesterdayString) {
    newCurrent = streak.current + 1;
  } else {
    newCurrent = 1;
  }

  const updated: StreakData = { current: newCurrent, lastPlayDate: today };
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  return updated;
}

export function getEnergyRefillCountdown(): string {
  const now = new Date();
  const tomorrow = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
  );
  const diff = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}
