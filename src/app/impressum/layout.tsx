import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Legal notice (Impressum) for FoolsGuess according to §5 TMG.",
  openGraph: {
    title: "Impressum — FoolsGuess",
    description: "Legal notice (Impressum) for FoolsGuess according to §5 TMG.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impressum — FoolsGuess",
    description: "Legal notice (Impressum) for FoolsGuess according to §5 TMG.",
  },
  robots: { index: true, follow: true },
};

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
