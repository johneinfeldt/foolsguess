import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "Sign up or log in to FoolsGuess to save your progress and compete on the leaderboard.",
  robots: { index: false, follow: true },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
