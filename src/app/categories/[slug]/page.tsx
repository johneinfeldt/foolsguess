import { notFound } from "next/navigation";
import { Metadata } from "next";
import { categories, getCategoryBySlug } from "@/lib/categories";
import questionsEn from "@/data/questions.json";
import { Question } from "@/lib/types";
import CategoryDetailClient from "./CategoryDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};

  return {
    title: `${cat.en.name} Trivia`,
    description: `Play free ${cat.en.name.toLowerCase()} trivia questions on FoolsGuess. ${cat.en.description} Guess what people said and score points!`,
    openGraph: {
      title: `${cat.en.name} Trivia — FoolsGuess`,
      description: `Play free ${cat.en.name.toLowerCase()} trivia. ${cat.en.description}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${cat.en.name} Trivia — FoolsGuess`,
      description: `Play free ${cat.en.name.toLowerCase()} trivia. ${cat.en.description}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const allEn = questionsEn as Question[];
  const categoryQuestions = allEn.filter((q) => q.category === cat.jsonCategory);

  // Show up to 6 sample questions
  const sampleQuestions = categoryQuestions.slice(0, 6);

  return (
    <CategoryDetailClient
      category={cat}
      sampleQuestions={sampleQuestions}
      totalQuestions={categoryQuestions.length}
      allCategories={categories}
    />
  );
}
