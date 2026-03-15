import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data protection information (Datenschutzerklärung) for FoolsGuess.",
  openGraph: {
    title: "Privacy Policy — FoolsGuess",
    description: "Privacy policy and data protection information (Datenschutzerklärung) for FoolsGuess.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — FoolsGuess",
    description: "Privacy policy and data protection information (Datenschutzerklärung) for FoolsGuess.",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
