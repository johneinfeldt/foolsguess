import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the FoolsGuess team. Report bugs, suggest features, or ask questions.",
  openGraph: {
    title: "Contact — FoolsGuess",
    description: "Get in touch with the FoolsGuess team. Report bugs, suggest features, or ask questions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — FoolsGuess",
    description: "Get in touch with the FoolsGuess team. Report bugs, suggest features, or ask questions.",
  },
  robots: { index: true, follow: true },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
