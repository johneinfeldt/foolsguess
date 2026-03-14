import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "FoolsGuess — Think Like the Crowd to Win",
  description:
    "The survey-based guessing game. Guess what everyone else said, score points for matching popular answers, and climb the leaderboard. Play daily challenges, multiplayer, or solo.",
  keywords: ["guessing game", "survey game", "trivia", "multiplayer game", "daily challenge"],
  openGraph: {
    title: "FoolsGuess — Think Like the Crowd to Win",
    description:
      "The survey-based guessing game. Guess the most popular answers and compete globally.",
    url: "https://foolsguess.com",
    siteName: "FoolsGuess",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FoolsGuess — Think Like the Crowd to Win",
    description:
      "The survey-based guessing game. Guess the most popular answers and compete globally.",
  },
  metadataBase: new URL("https://foolsguess.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
