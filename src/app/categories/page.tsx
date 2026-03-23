import { categories } from "@/lib/categories";
import CategoriesClient from "./CategoriesClient";

export const metadata = {
  title: "Trivia Categories",
  description: "Browse all FoolsGuess trivia categories — from Food & Drink to Travel, Animals, Entertainment and more. Play free survey guessing games online.",
  openGraph: {
    title: "Trivia Categories — FoolsGuess",
    description: "Browse all FoolsGuess trivia categories. Play free survey guessing games online.",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Trivia Categories — FoolsGuess",
    description: "Browse all FoolsGuess trivia categories. Play free survey guessing games online.",
  },
};

export default function CategoriesPage() {
  return <CategoriesClient categories={categories} />;
}
