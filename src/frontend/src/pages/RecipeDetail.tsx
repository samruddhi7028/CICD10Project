import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  ChefHat,
  Clock,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { EMPTY_RECIPE_SEARCH } from "../App";
import { SocialShare } from "../components/SocialShare";
import { AverageRating, StarRating } from "../components/StarRating";
import {
  useAddRating,
  useRatings,
  useRecipe,
  useRecipes,
} from "../hooks/useRecipes";
import {
  categoryLabel,
  dietaryTagLabel,
  difficultyColor,
  difficultyLabel,
  formatDate,
  formatTime,
  formatTotalTime,
} from "../lib/utils";
import type { Recipe } from "../types";

function RecipeCard({ recipe, index }: { recipe: Recipe; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-smooth"
      data-ocid={`recipe_detail.related_card.${index + 1}`}
    >
      <div className="aspect-recipe overflow-hidden bg-muted">
        <img
          src={recipe.imageUrl || "/assets/images/placeholder.svg"}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs font-body">
            {categoryLabel(recipe.category)}
          </Badge>
          <span
            className={`text-xs px-2 py-0.5 rounded font-body ${difficultyColor(recipe.difficulty)}`}
          >
            {difficultyLabel(recipe.difficulty)}
          </span>
        </div>
        <h3 className="font-display text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-smooth line-clamp-2 mb-2">
          {recipe.name}
        </h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-body mb-3">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {formatTotalTime(recipe.prepTime, recipe.cookTime)}
          </span>
        </div>
        <Link to="/recipes/$id" params={{ id: recipe.id.toString() }}>
          <Button
            variant="outline"
            size="sm"
            className="w-full font-body text-xs"
            data-ocid={`recipe_detail.related_card_button.${index + 1}`}
          >
            View Recipe
          </Button>
        </Link>
      </div>
    </motion.article>
  );
}

export default function RecipeDetail() {
  const { id } = useParams({ from: "/recipes/$id" });
  const recipeId = BigInt(id);
  const { data: recipe, isLoading } = useRecipe(recipeId);
  const { data: ratings = [] } = useRatings(recipeId);
  const addRating = useAddRating();

  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(
    new Set(),
  );
  const [reviewName, setReviewName] = useState("");
  const [reviewScore, setReviewScore] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { data: allRecipes = [] } = useRecipes(
    recipe ? { category: recipe.category } : undefined,
  );
  const relatedRecipes = allRecipes
    .filter((r) => r.id !== recipeId)
    .slice(0, 4);

  function toggleIngredient(index: number) {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  async function handleSubmitRating(e: React.FormEvent) {
    e.preventDefault();
    if (!reviewName.trim()) return;
    const result = await addRating.mutateAsync({
      recipeId,
      score: BigInt(reviewScore),
      comment: reviewComment || null,
      commenterName: reviewName,
    });
    if (result.__kind__ === "ok") {
      toast.success("Review submitted!");
      setSubmitted(true);
    } else {
      toast.error(result.err);
    }
  }

  const avgRating = ratings.length
    ? ratings.reduce((sum, r) => sum + Number(r.score), 0) / ratings.length
    : null;

  if (isLoading) {
    return (
      <div
        className="container mx-auto px-4 py-10 max-w-4xl"
        data-ocid="recipe_detail.loading_state"
      >
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="w-full h-80 rounded" />
        <div className="mt-6 space-y-3">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div
        className="container mx-auto px-4 py-24 text-center"
        data-ocid="recipe_detail.error_state"
      >
        <UtensilsCrossed
          size={48}
          className="mx-auto text-muted-foreground mb-4"
        />
        <h2 className="font-display text-2xl text-foreground">
          Recipe not found
        </h2>
        <p className="font-body text-muted-foreground mt-2">
          This recipe may have been removed.
        </p>
        <Link
          to="/recipes"
          search={EMPTY_RECIPE_SEARCH}
          data-ocid="recipe_detail.back_to_recipes_button"
        >
          <Button variant="outline" className="mt-4 font-body">
            <ArrowLeft size={14} className="mr-1" /> Back to Recipes
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div data-ocid="recipe_detail.page">
      {/* Full-width hero image */}
      <div className="w-full aspect-hero overflow-hidden bg-muted relative">
        <img
          src={recipe.imageUrl || "/assets/images/placeholder.svg"}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back link */}
        <Link
          to="/recipes"
          search={EMPTY_RECIPE_SEARCH}
          className="inline-flex items-center gap-1 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth mb-6"
          data-ocid="recipe_detail.back_link"
        >
          <ArrowLeft size={14} /> All Recipes
        </Link>

        {/* Title + meta */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="secondary" className="font-body">
              {categoryLabel(recipe.category)}
            </Badge>
            <span
              className={`text-xs px-2 py-1 rounded font-body ${difficultyColor(recipe.difficulty)}`}
            >
              {difficultyLabel(recipe.difficulty)}
            </span>
            {recipe.dietaryTags.map((tag) => (
              <Badge key={tag} variant="outline" className="font-body text-xs">
                {dietaryTagLabel(tag)}
              </Badge>
            ))}
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            {recipe.name}
          </h1>
          <p className="font-body text-muted-foreground mt-3 text-base leading-relaxed">
            {recipe.description}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mt-6 py-4 border-y border-border">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              <div>
                <p className="font-body text-xs text-muted-foreground">
                  Prep Time
                </p>
                <p className="font-body text-sm font-medium text-foreground">
                  {formatTime(recipe.prepTime)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              <div>
                <p className="font-body text-xs text-muted-foreground">
                  Cook Time
                </p>
                <p className="font-body text-sm font-medium text-foreground">
                  {formatTime(recipe.cookTime)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              <div>
                <p className="font-body text-xs text-muted-foreground">
                  Total Time
                </p>
                <p className="font-body text-sm font-medium text-foreground">
                  {formatTotalTime(recipe.prepTime, recipe.cookTime)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat size={16} className="text-primary" />
              <div>
                <p className="font-body text-xs text-muted-foreground">
                  Difficulty
                </p>
                <p className="font-body text-sm font-medium text-foreground">
                  {difficultyLabel(recipe.difficulty)}
                </p>
              </div>
            </div>
            {avgRating !== null && (
              <div className="flex items-center gap-2">
                <AverageRating
                  average={avgRating}
                  count={ratings.length}
                  size={14}
                />
              </div>
            )}
          </div>

          {/* Social share */}
          <div className="mt-4">
            <SocialShare
              recipeName={recipe.name}
              data-ocid="recipe_detail.social_share"
            />
          </div>
        </motion.div>

        {/* Ingredients + Instructions grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {/* Checklist Ingredients */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              Ingredients
            </h2>
            <ul className="space-y-2.5">
              {recipe.ingredients.map((ing, i) => (
                <li
                  key={`${ing.name}-${i}`}
                  className="flex items-start gap-3 font-body text-sm cursor-pointer group"
                  data-ocid={`recipe_detail.ingredient.${i + 1}`}
                  onClick={() => toggleIngredient(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggleIngredient(i);
                  }}
                >
                  <button
                    type="button"
                    aria-label={`${checkedIngredients.has(i) ? "Uncheck" : "Check"} ${ing.name}`}
                    className={[
                      "mt-0.5 flex-shrink-0 w-4 h-4 rounded border transition-smooth flex items-center justify-center",
                      checkedIngredients.has(i)
                        ? "bg-primary border-primary"
                        : "border-border bg-background group-hover:border-primary",
                    ].join(" ")}
                    data-ocid={`recipe_detail.ingredient_checkbox.${i + 1}`}
                  >
                    {checkedIngredients.has(i) && (
                      <CheckCircle
                        size={10}
                        className="text-primary-foreground"
                      />
                    )}
                  </button>
                  <span
                    className={
                      checkedIngredients.has(i)
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }
                  >
                    <span className="font-medium">{ing.quantity}</span>{" "}
                    {ing.name}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Instructions */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              Instructions
            </h2>
            <ol className="space-y-5">
              {recipe.instructions.map((step, i) => (
                <li
                  key={`step-${step.slice(0, 30)}`}
                  className="flex gap-4"
                  data-ocid={`recipe_detail.step.${i + 1}`}
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground font-display text-sm flex items-center justify-center font-semibold">
                    {i + 1}
                  </span>
                  <p className="font-body text-sm text-foreground leading-relaxed pt-1">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>

        {/* Ratings section */}
        <div
          className="mt-12 pt-8 border-t border-border"
          data-ocid="recipe_detail.ratings_section"
        >
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Reviews
                {ratings.length > 0 && (
                  <span className="text-muted-foreground text-lg ml-2">
                    ({ratings.length})
                  </span>
                )}
              </h2>
              {avgRating !== null && (
                <AverageRating
                  average={avgRating}
                  count={ratings.length}
                  size={18}
                  className="mt-2"
                />
              )}
            </div>
          </div>

          {ratings.length > 0 && (
            <div className="space-y-4 mb-8">
              {ratings.map((rating, i) => (
                <motion.div
                  key={`${rating.commenterName}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="p-4 bg-muted/30 rounded-lg border border-border"
                  data-ocid={`recipe_detail.review_card.${i + 1}`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="font-body font-semibold text-sm text-foreground">
                      {rating.commenterName}
                    </p>
                    <StarRating score={Number(rating.score)} size={13} />
                  </div>
                  {rating.comment && (
                    <p className="font-body text-sm text-muted-foreground">
                      {rating.comment}
                    </p>
                  )}
                  <p className="font-body text-xs text-muted-foreground mt-1.5">
                    {formatDate(rating.createdAt)}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Add review form */}
          {submitted ? (
            <div
              className="flex items-center gap-2 p-4 bg-secondary/10 rounded-lg border border-secondary/30 text-secondary"
              data-ocid="recipe_detail.review_success_state"
            >
              <CheckCircle size={18} />
              <p className="font-body text-sm">Thanks for your review!</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmitRating}
              className="space-y-4 bg-muted/20 p-6 rounded-lg border border-border"
              data-ocid="recipe_detail.review_form"
            >
              <h3 className="font-display text-xl font-semibold text-foreground">
                Leave a Review
              </h3>
              <div>
                <Label
                  htmlFor="reviewer-name"
                  className="font-body text-sm mb-1.5 block"
                >
                  Your Name
                </Label>
                <Input
                  id="reviewer-name"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="Jane Smith"
                  required
                  className="font-body max-w-xs"
                  data-ocid="recipe_detail.reviewer_name_input"
                />
              </div>
              <div>
                <Label className="font-body text-sm mb-2 block">Rating</Label>
                <StarRating
                  score={reviewScore}
                  size={28}
                  interactive
                  onRate={setReviewScore}
                  data-ocid="recipe_detail.star_rating"
                />
              </div>
              <div>
                <Label
                  htmlFor="review-comment"
                  className="font-body text-sm mb-1.5 block"
                >
                  Comment{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Textarea
                  id="review-comment"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience with this recipe..."
                  className="font-body resize-none"
                  rows={3}
                  data-ocid="recipe_detail.review_comment_textarea"
                />
              </div>
              <Button
                type="submit"
                disabled={addRating.isPending || !reviewName.trim()}
                className="font-body bg-accent text-accent-foreground hover:bg-accent/90 border-0"
                data-ocid="recipe_detail.submit_review_button"
              >
                {addRating.isPending ? "Submitting…" : "Submit Review"}
              </Button>
            </form>
          )}
        </div>

        {/* Related Recipes */}
        {relatedRecipes.length > 0 && (
          <div
            className="mt-12 pt-8 border-t border-border"
            data-ocid="recipe_detail.related_section"
          >
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
              More in{" "}
              <span className="text-primary">
                {categoryLabel(recipe.category)}
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {relatedRecipes.map((r, i) => (
                <RecipeCard key={r.id.toString()} recipe={r} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
