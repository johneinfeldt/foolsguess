export interface Answer {
  text: string;
  aliases: string[];
  points: number;
}

export interface Question {
  id: string;
  question: string;
  category: string;
  answers: Answer[];
}

export interface QuestionResult {
  questionId: string;
  pointsEarned: number;
  answersFound: boolean[];
  strikes: number;
  timedOut: boolean;
}

// Solo Journey types

export interface QuestionProgress {
  bestScore: number;
  answersFound: boolean[];
  totalXPEarned: number;
}

export interface JourneyProgress {
  currentDivision: number;
  questionProgress: Record<string, QuestionProgress>;
  energy: {
    current: number;
    lastRefillDate: string;
  };
}

export interface StreakData {
  current: number;
  lastPlayDate: string;
}

export interface LevelConfig {
  levelNumber: number;
  questionIds: string[];
}

export interface DivisionConfig {
  number: number;
  name: string;
  xpPerLevel: number;
  levels: LevelConfig[];
}

// User & Leaderboard types

export interface UserProfile {
  id: string;
  display_name: string;
  avatar_config: {
    headShape: string;
    color: string;
    accessory: string;
  };
  newsletter_subscribed: boolean;
}

export interface DailyScore {
  user_id: string;
  play_date: string;
  mode: "relaxed" | "ranked";
  score: number;
  question_results: QuestionResult[];
}

export interface LeaderboardEntry {
  rank: number;
  display_name: string;
  avatar_config: UserProfile["avatar_config"];
  score: number;
  user_id: string;
}
