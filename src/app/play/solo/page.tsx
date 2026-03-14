import questionsEn from "@/data/questions.json";
import JourneyHome from "./JourneyHome";
import { Question } from "@/lib/types";

export const metadata = {
  title: "Solo Journey — FoolsGuess",
  description: "Progress through divisions, level up, and master every survey question!",
};

export default function SoloPage() {
  return <JourneyHome allQuestionsEn={questionsEn as Question[]} />;
}
