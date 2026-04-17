import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: BlogPostId;
    title: string;
    content: string;
    featuredImage: string;
    createdAt: Timestamp;
    publishedAt: Timestamp;
    author: string;
    excerpt: string;
}
export type RecipeId = bigint;
export type Timestamp = bigint;
export type Result = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface Rating {
    commenterName: string;
    recipeId: RecipeId;
    createdAt: Timestamp;
    score: bigint;
    comment?: string;
}
export interface Ingredient {
    name: string;
    quantity: string;
}
export type BlogPostId = bigint;
export interface Recipe {
    id: RecipeId;
    difficulty: Difficulty;
    name: string;
    createdAt: Timestamp;
    cookTime: bigint;
    description: string;
    instructions: Array<string>;
    imageUrl: string;
    dietaryTags: Array<DietaryTag>;
    prepTime: bigint;
    category: Category;
    ingredients: Array<Ingredient>;
}
export enum Category {
    Desserts = "Desserts",
    Lunch = "Lunch",
    Vegan = "Vegan",
    Breakfast = "Breakfast",
    Dinner = "Dinner"
}
export enum DietaryTag {
    Keto = "Keto",
    GlutenFree = "GlutenFree",
    Vegan = "Vegan"
}
export enum Difficulty {
    Easy = "Easy",
    Hard = "Hard",
    Medium = "Medium"
}
export interface backendInterface {
    addRating(recipeId: RecipeId, score: bigint, comment: string | null, commenterName: string): Promise<Result>;
    getBlogPost(id: BlogPostId): Promise<BlogPost | null>;
    getBlogPosts(): Promise<Array<BlogPost>>;
    getRatings(recipeId: RecipeId): Promise<Array<Rating>>;
    getRecipe(id: RecipeId): Promise<Recipe | null>;
    getRecipes(search: string | null, category: Category | null, dietaryTag: DietaryTag | null, difficulty: Difficulty | null, maxPrepTime: bigint | null): Promise<Array<Recipe>>;
    submitContact(name: string, email: string, subject: string, message: string): Promise<Result>;
    submitRecipe(name: string, email: string, recipeName: string, category: Category, ingredients: string, instructions: string, difficulty: Difficulty, dietaryTags: Array<DietaryTag>, prepTime: bigint, cookTime: bigint): Promise<Result>;
}
