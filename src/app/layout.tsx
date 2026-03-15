import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LangProvider from "@/components/LangProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FoolsGuess \u2014 Think Like the Crowd to Win",
    template: "%s | FoolsGuess",
  },
  description:
    "The survey-based guessing game. Guess what everyone else said, score points for matching popular answers, and climb the leaderboard. Play daily challenges, multiplayer, or solo.",
  keywords: [
    "guessing game",
    "survey game",
    "trivia",
    "multiplayer game",
    "daily challenge",
    "family feud style game",
    "free browser game",
    "online quiz",
    "party game",
    "word guessing",
  ],
  authors: [{ name: "John-Niklas Einfeldt" }],
  creator: "John-Niklas Einfeldt",
  openGraph: {
    title: "FoolsGuess \u2014 Think Like the Crowd to Win",
    description:
      "The survey-based guessing game. Guess the most popular answers and compete globally.",
    url: "https://foolsguess.com",
    siteName: "FoolsGuess",
    type: "website",
    locale: "en_US",
    alternateLocale: ["de_DE", "es_ES"],
  },
  twitter: {
    card: "summary_large_image",
    title: "FoolsGuess \u2014 Think Like the Crowd to Win",
    description:
      "The survey-based guessing game. Guess the most popular answers and compete globally.",
  },
  metadataBase: new URL("https://foolsguess.com"),
  alternates: {
    canonical: "https://foolsguess.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "games",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FoolsGuess",
  url: "https://foolsguess.com",
  description:
    "A survey-based guessing game. Guess what everyone else said, match the most popular answers, and compete globally. Play daily challenges, solo journey, or multiplayer party mode.",
  applicationCategory: "GameApplication",
  genre: "Trivia",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  author: {
    "@type": "Person",
    name: "John-Niklas Einfeldt",
  },
  inLanguage: ["en", "de", "es"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
