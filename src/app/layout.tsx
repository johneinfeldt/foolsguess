import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LangProvider from "@/components/LangProvider";
import { AuthProvider } from "@/lib/authContext";
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
    languages: {
      "en": "https://foolsguess.com",
      "de": "https://foolsguess.com",
      "es": "https://foolsguess.com",
      "x-default": "https://foolsguess.com",
    },
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "games",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FoolsGuess",
  },
  verification: {
    google: "O2H8_wxZ0lWW31qMaRfsRhvPiNVLbWWigYk1ICFwR08",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I play FoolsGuess?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We show you a survey question that was asked to real people. Your job is to guess the most popular answers. Type what you think people said, and earn points for every match. The higher an answer ranks in the survey, the more points you score.",
      },
    },
    {
      "@type": "Question",
      name: "Is FoolsGuess free to play?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, FoolsGuess is completely free to play. No downloads or sign-ups required. Just open the website in your browser and start guessing. You can optionally create a free account to track your scores and appear on the leaderboard.",
      },
    },
    {
      "@type": "Question",
      name: "Can I play FoolsGuess with friends?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! Party Mode supports 2-8 players. You can play on the same device by passing it between turns, or create an online room where each player joins from their own device using a room code.",
      },
    },
    {
      "@type": "Question",
      name: "What languages does FoolsGuess support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FoolsGuess is available in English, German (Deutsch), and Spanish (Espa\u00f1ol). You can switch languages anytime using the language selector in the navigation bar. All questions and answers are fully translated.",
      },
    },
    {
      "@type": "Question",
      name: "What game modes are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FoolsGuess offers three game modes: Daily Challenge (a new puzzle every day where everyone plays the same questions), Solo Journey (progress through divisions and levels, earn XP), and Party Mode (2-8 players on the same device or online).",
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LangProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LangProvider>
      </body>
    </html>
  );
}
