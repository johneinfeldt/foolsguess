import questions from "@/data/questions.json";
import JourneyHome from "./JourneyHome";
import { Question } from "@/lib/types";

export const metadata = {
  title: "Solo Journey — FoolsGuess",
  description: "Progress through divisions, level up, and master every survey question!",
};

export default function SoloPage() {
  const allQuestions = questions as Question[];
  return <JourneyHome allQuestions={allQuestions} />;
}
