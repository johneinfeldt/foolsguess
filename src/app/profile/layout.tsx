import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "View your FoolsGuess profile, stats, and manage your account.",
  robots: { index: false, follow: true },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
