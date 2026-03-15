import { Metadata } from "next";
import DailyArchiveClient from "./DailyArchiveClient";

export const metadata: Metadata = {
  title: "Daily Challenge Archive",
  description: "Browse all past FoolsGuess daily challenges. See questions, top answers, and player statistics for every day.",
  openGraph: {
    title: "Daily Challenge Archive — FoolsGuess",
    description: "Browse all past FoolsGuess daily challenges. See questions, top answers, and player statistics.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Challenge Archive — FoolsGuess",
    description: "Browse all past FoolsGuess daily challenges.",
  },
};

export default function DailyArchivePage() {
  return <DailyArchiveClient />;
}
