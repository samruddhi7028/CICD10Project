import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Category, DietaryTag, Difficulty } from "../backend";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatTime(minutes: bigint | number): string {
  const mins = typeof minutes === "bigint" ? Number(minutes) : minutes;
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  const remaining = mins % 60;
  if (remaining === 0) return `${hours}h`;
  return `${hours}h ${remaining}m`;
}

export function formatTotalTime(
  prep: bigint | number,
  cook: bigint | number,
): string {
  const total = Number(prep) + Number(cook);
  return formatTime(total);
}

export function categoryLabel(category: Category): string {
  const labels: Record<Category, string> = {
    [Category.Breakfast]: "Breakfast",
    [Category.Lunch]: "Lunch",
    [Category.Dinner]: "Dinner",
    [Category.Desserts]: "Desserts",
    [Category.Vegan]: "Vegan",
  };
  return labels[category] ?? category;
}

export function difficultyLabel(difficulty: Difficulty): string {
  const labels: Record<Difficulty, string> = {
    [Difficulty.Easy]: "Easy",
    [Difficulty.Medium]: "Medium",
    [Difficulty.Hard]: "Hard",
  };
  return labels[difficulty] ?? difficulty;
}

export function dietaryTagLabel(tag: DietaryTag): string {
  const labels: Record<DietaryTag, string> = {
    [DietaryTag.Vegan]: "Vegan",
    [DietaryTag.GlutenFree]: "Gluten-Free",
    [DietaryTag.Keto]: "Keto",
  };
  return labels[tag] ?? tag;
}

export function formatDate(timestamp: bigint | number): string {
  const ms =
    typeof timestamp === "bigint" ? Number(timestamp) / 1_000_000 : timestamp;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(ms));
}

export function difficultyColor(difficulty: Difficulty): string {
  const colors: Record<Difficulty, string> = {
    [Difficulty.Easy]: "bg-secondary/20 text-secondary",
    [Difficulty.Medium]: "bg-accent/20 text-accent-foreground",
    [Difficulty.Hard]: "bg-primary/20 text-primary",
  };
  return colors[difficulty] ?? "bg-muted text-muted-foreground";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
