import { supabase } from "./supabase";
import { JourneyProgress, StreakData, QuestionResult } from "./types";
import { loadJourneyProgress, saveJourneyProgress } from "./journeyStorage";

// --- Journey Progress Sync ---

export async function uploadJourneyProgress(
  userId: string,
  progress: JourneyProgress
): Promise<void> {
  await supabase.from("journey_progress").upsert({
    user_id: userId,
    current_division: progress.currentDivision,
    question_progress: progress.questionProgress,
    energy_current: progress.energy.current,
    energy_last_refill: progress.energy.lastRefillDate,
    updated_at: new Date().toISOString(),
  });
}

export async function downloadJourneyProgress(
  userId: string
): Promise<JourneyProgress | null> {
  const { data } = await supabase
    .from("journey_progress")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!data) return null;

  return {
    currentDivision: data.current_division,
    questionProgress: data.question_progress || {},
    energy: {
      current: data.energy_current,
      lastRefillDate: data.energy_last_refill,
    },
  };
}

export function mergeJourneyProgress(
  local: JourneyProgress,
  remote: JourneyProgress
): JourneyProgress {
  const currentDivision = Math.max(local.currentDivision, remote.currentDivision);

  // Merge question progress: keep the better result per question
  const allIds = new Set([
    ...Object.keys(local.questionProgress),
    ...Object.keys(remote.questionProgress),
  ]);

  const questionProgress: JourneyProgress["questionProgress"] = {};
  for (const id of allIds) {
    const l = local.questionProgress[id];
    const r = remote.questionProgress[id];
    if (!l) { questionProgress[id] = r; continue; }
    if (!r) { questionProgress[id] = l; continue; }
    questionProgress[id] = {
      bestScore: Math.max(l.bestScore, r.bestScore),
      answersFound: l.answersFound.map((v, i) => v || (r.answersFound[i] ?? false)),
      totalXPEarned: Math.max(l.totalXPEarned, r.totalXPEarned),
    };
  }

  // Energy: use most recent refill date
  const energy = local.energy.lastRefillDate >= remote.energy.lastRefillDate
    ? local.energy
    : remote.energy;

  return { currentDivision, questionProgress, energy };
}

export async function syncJourneyOnLogin(userId: string): Promise<void> {
  const local = loadJourneyProgress();
  const remote = await downloadJourneyProgress(userId);

  if (!remote) {
    // First login: upload local data
    await uploadJourneyProgress(userId, local);
    return;
  }

  const merged = mergeJourneyProgress(local, remote);
  saveJourneyProgress(merged);
  await uploadJourneyProgress(userId, merged);
}

// --- Daily Score Sync ---

export async function uploadDailyScore(
  userId: string,
  date: string,
  mode: "relaxed" | "ranked",
  score: number,
  questionResults: QuestionResult[]
): Promise<boolean> {
  const { error } = await supabase.from("daily_scores").upsert(
    {
      user_id: userId,
      play_date: date,
      mode,
      score,
      question_results: questionResults,
    },
    { onConflict: "user_id,play_date" }
  );
  if (error) {
    console.error("uploadDailyScore error:", error);
    return false;
  }
  return true;
}

// --- Streak Sync ---

export async function uploadStreak(
  userId: string,
  streak: StreakData
): Promise<void> {
  // Fetch current server streak to update longest
  const { data } = await supabase
    .from("streaks")
    .select("longest_streak")
    .eq("user_id", userId)
    .single();

  const longestStreak = Math.max(
    streak.current,
    data?.longest_streak || 0
  );

  await supabase.from("streaks").upsert({
    user_id: userId,
    current_streak: streak.current,
    longest_streak: longestStreak,
    last_play_date: streak.lastPlayDate || null,
    updated_at: new Date().toISOString(),
  });
}
