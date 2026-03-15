import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "FoolsGuess global leaderboard. See daily and all-time rankings of top players.",
  openGraph: {
    title: "Leaderboard — FoolsGuess",
    description: "FoolsGuess global leaderboard. See daily and all-time rankings of top players.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leaderboard — FoolsGuess",
    description: "FoolsGuess global leaderboard. See daily and all-time rankings of top players.",
  },
};

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
