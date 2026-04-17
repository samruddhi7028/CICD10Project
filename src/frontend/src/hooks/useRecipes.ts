import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category, DietaryTag, Difficulty, createActor } from "../backend";
import type { Recipe, RecipeFilters, RecipeId } from "../types";

export function useRecipes(filters?: Partial<RecipeFilters>) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Recipe[]>({
    queryKey: ["recipes", filters],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecipes(
        filters?.search ?? null,
        filters?.category ?? null,
        filters?.dietaryTag ?? null,
        filters?.difficulty ?? null,
        filters?.maxPrepTime ?? null,
      );
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecipe(id: RecipeId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Recipe | null>({
    queryKey: ["recipe", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getRecipe(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useRatings(recipeId: RecipeId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["ratings", recipeId?.toString()],
    queryFn: async () => {
      if (!actor || recipeId === null) return [];
      return actor.getRatings(recipeId);
    },
    enabled: !!actor && !isFetching && recipeId !== null,
  });
}

export function useAddRating() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      recipeId,
      score,
      comment,
      commenterName,
    }: {
      recipeId: RecipeId;
      score: bigint;
      comment: string | null;
      commenterName: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addRating(recipeId, score, comment, commenterName);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["ratings", variables.recipeId.toString()],
      });
    },
  });
}

export function useSubmitRecipe() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      recipeName: string;
      category: Category;
      ingredients: string;
      instructions: string;
      difficulty: Difficulty;
      dietaryTags: DietaryTag[];
      prepTime: bigint;
      cookTime: bigint;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitRecipe(
        data.name,
        data.email,
        data.recipeName,
        data.category,
        data.ingredients,
        data.instructions,
        data.difficulty,
        data.dietaryTags,
        data.prepTime,
        data.cookTime,
      );
    },
  });
}

export function useSubmitContact() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      subject: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitContact(
        data.name,
        data.email,
        data.subject,
        data.message,
      );
    },
  });
}

export { Category, DietaryTag, Difficulty };
