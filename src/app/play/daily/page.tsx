import questionsEn from "@/data/questions.json";
import DailyGame from "./DailyGame";
import { Question } from "@/lib/types";

export const metadata = {
  title: "Daily Challenge",
  description: "Play today's FoolsGuess daily challenge. Guess the most popular survey answers!",
  openGraph: {
    title: "Daily Challenge — FoolsGuess",
    description: "Play today's FoolsGuess daily challenge. Guess the most popular survey answers!",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Daily Challenge — FoolsGuess",
    description: "Play today's FoolsGuess daily challenge. Guess the most popular survey answers!",
  },
};

export default function DailyPage() {
  return <DailyGame allQuestionsEn={questionsEn as Question[]} />;
}
