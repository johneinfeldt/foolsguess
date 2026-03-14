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
