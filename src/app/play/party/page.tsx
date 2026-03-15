import questionsEn from "@/data/questions.json";
import PartyGame from "./PartyGame";
import { Question } from "@/lib/types";

export const metadata = {
  title: "Party Mode",
  description: "Play FoolsGuess with friends! Take turns guessing survey answers on the same device.",
  openGraph: {
    title: "Party Mode — FoolsGuess",
    description: "Play FoolsGuess with friends! Take turns guessing survey answers on the same device.",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Party Mode — FoolsGuess",
    description: "Play FoolsGuess with friends! Take turns guessing survey answers on the same device.",
  },
};

export default function PartyPage() {
  return <PartyGame allQuestionsEn={questionsEn as Question[]} />;
}
