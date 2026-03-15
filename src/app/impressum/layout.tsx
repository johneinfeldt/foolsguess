import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Legal notice (Impressum) for FoolsGuess according to \u00a7 5 TMG.",
  robots: { index: true, follow: true },
};

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
