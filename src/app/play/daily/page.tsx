import { getDailyQuestions } from "@/lib/daily";
import questions from "@/data/questions.json";
import DailyGame from "./DailyGame";
import { Question } from "@/lib/types";

export const metadata = {
  title: "Daily Challenge — FoolsGuess",
  description: "Play today's FoolsGuess daily challenge. Guess the most popular survey answers!",
};

export default function DailyPage() {
  const allQuestions = questions as Question[];
  const dailyQuestions = getDailyQuestions(new Date(), allQuestions);

  return <DailyGame questions={dailyQuestions} />;
}
