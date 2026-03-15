import questionsEn from "@/data/questions.json";
import JourneyHome from "./JourneyHome";
import { Question } from "@/lib/types";

export const metadata = {
  title: "Solo Journey",
  description: "Progress through divisions, level up, and master every survey question!",
  openGraph: {
    title: "Solo Journey — FoolsGuess",
    description: "Progress through divisions, level up, and master every survey question!",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Solo Journey — FoolsGuess",
    description: "Progress through divisions, level up, and master every survey question!",
  },
};

export default function SoloPage() {
  return <JourneyHome allQuestionsEn={questionsEn as Question[]} />;
}
