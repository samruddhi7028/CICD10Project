import type {
  BlogPost,
  BlogPostId,
  Ingredient,
  Rating,
  Recipe,
  RecipeId,
} from "./backend.d";
export { Category, DietaryTag, Difficulty } from "./backend.d";
export type { Ingredient, Recipe, BlogPost, Rating, RecipeId, BlogPostId };

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface RecipeSubmissionData {
  name: string;
  email: string;
  recipeName: string;
  category: import("./backend.d").Category;
  ingredients: string;
  instructions: string;
  difficulty: import("./backend.d").Difficulty;
  dietaryTags: import("./backend.d").DietaryTag[];
  prepTime: bigint;
  cookTime: bigint;
}

export interface RecipeFilters {
  search: string | null;
  category: import("./backend.d").Category | null;
  dietaryTag: import("./backend.d").DietaryTag | null;
  difficulty: import("./backend.d").Difficulty | null;
  maxPrepTime: bigint | null;
}
