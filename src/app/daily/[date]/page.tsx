import { Metadata } from "next";
import { notFound } from "next/navigation";
import questionsEn from "@/data/questions.json";
import { getDailyQuestions, getDailyNumber } from "@/lib/daily";
import { Question } from "@/lib/types";
import { createClient } from "@supabase/supabase-js";
import DailyResultsClient from "./DailyResultsClient";

interface Props {
  params: Promise<{ date: string }>;
}

function isValidDate(dateStr: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr) && !isNaN(Date.parse(dateStr));
}

function isPastDate(dateStr: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return dateStr < today;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  if (!isValidDate(date)) return {};

  const dateObj = new Date(date + "T00:00:00Z");
  const dayNum = getDailyNumber(dateObj);
  const dateFormatted = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return {
    title: `Daily #${dayNum} — ${dateFormatted}`,
    description: `FoolsGuess Daily Challenge #${dayNum} results. See the questions, top answers, and how players scored on ${dateFormatted}.`,
    openGraph: {
      title: `FoolsGuess Daily #${dayNum} — ${dateFormatted}`,
      description: `See the questions, top answers, and how players scored on ${dateFormatted}.`,
    },
    twitter: {
      card: "summary_large_image",
      title: `FoolsGuess Daily #${dayNum} — ${dateFormatted}`,
      description: `See the questions, top answers, and how players scored on ${dateFormatted}.`,
    },
  };
}

async function getStats(date: string) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: scores } = await supabase
      .from("daily_scores")
      .select("score")
      .eq("play_date", date);

    if (!scores || scores.length === 0) return null;

    const totalPlayers = scores.length;
    const avgScore = Math.round(scores.reduce((sum, s) => sum + s.score, 0) / totalPlayers);
    const highScore = Math.max(...scores.map((s) => s.score));

    return { totalPlayers, avgScore, highScore };
  } catch {
    return null;
  }
}

export default async function DailyResultsPage({ params }: Props) {
  const { date } = await params;

  if (!isValidDate(date)) notFound();
  if (!isPastDate(date)) notFound();

  const dateObj = new Date(date + "T00:00:00Z");
  const dayNum = getDailyNumber(dateObj);
  const questions = getDailyQuestions(dateObj, questionsEn as Question[]);
  const stats = await getStats(date);

  const dateFormatted = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <DailyResultsClient
      date={date}
      dayNum={dayNum}
      dateFormatted={dateFormatted}
      questions={questions}
      stats={stats}
    />
  );
}
