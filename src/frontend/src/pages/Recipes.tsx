import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ChefHat, Clock, Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Category, DietaryTag, Difficulty } from "../backend";
import { useRecipes } from "../hooks/useRecipes";
import {
  categoryLabel,
  difficultyColor,
  difficultyLabel,
  formatTotalTime,
} from "../lib/utils";

const CATEGORIES = Object.values(Category);
const DIFFICULTIES = Object.values(Difficulty);
const DIETARY_TAGS = Object.values(DietaryTag);

export default function Recipes() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/recipes" });

  const q = search.q ?? "";
  const activeCategory = (search.category as Category | undefined) ?? null;
  const activeDifficulty =
    (search.difficulty as Difficulty | undefined) ?? null;
  const activeDietaryTag =
    (search.dietaryTag as DietaryTag | undefined) ?? null;

  const [showFilters, setShowFilters] = useState(false);

  const { data: recipes, isLoading } = useRecipes({
    search: q || null,
    category: activeCategory,
    difficulty: activeDifficulty,
    dietaryTag: activeDietaryTag,
  });

  function setQ(val: string) {
    void navigate({
      to: "/recipes",
      search: (prev) => ({ ...prev, q: val || undefined }),
      replace: true,
    });
  }

  function setActiveCategory(cat: Category | null) {
    void navigate({
      to: "/recipes",
      search: (prev) => ({ ...prev, category: cat ?? undefined }),
      replace: true,
    });
  }

  function setActiveDifficulty(diff: Difficulty | null) {
    void navigate({
      to: "/recipes",
      search: (prev) => ({ ...prev, difficulty: diff ?? undefined }),
      replace: true,
    });
  }

  function setActiveDietaryTag(tag: DietaryTag | null) {
    void navigate({
      to: "/recipes",
      search: (prev) => ({ ...prev, dietaryTag: tag ?? undefined }),
      replace: true,
    });
  }

  function clearFilters() {
    void navigate({
      to: "/recipes",
      search: {
        category: undefined,
        dietaryTag: undefined,
        difficulty: undefined,
        q: undefined,
      },
      replace: true,
    });
  }

  const hasFilters =
    !!q || !!activeCategory || !!activeDifficulty || !!activeDietaryTag;

  return (
    <div data-ocid="recipes.page">
      {/* Page header */}
      <div className="bg-card border-b border-border py-10">
        <div className="container mx-auto px-4">
          <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">
            Browse
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            All Recipes
          </h1>
          <div className="flex gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="text"
                placeholder="Search recipes..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="pl-9 font-body"
                data-ocid="recipes.search_input"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowFilters((v) => !v)}
              data-ocid="recipes.filters_toggle"
              className={showFilters ? "border-primary text-primary" : ""}
            >
              <SlidersHorizontal size={16} className="mr-1.5" />
              Filters
              {hasFilters && (
                <span className="ml-1.5 w-2 h-2 rounded-full bg-primary inline-block" />
              )}
            </Button>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div
              className="mt-4 p-4 bg-muted/30 rounded border border-border space-y-4"
              data-ocid="recipes.filter_panel"
            >
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() =>
                        setActiveCategory(activeCategory === cat ? null : cat)
                      }
                      data-ocid={`recipes.category_${cat.toLowerCase()}_filter`}
                      className={[
                        "px-3 py-1 text-xs font-body rounded border transition-smooth",
                        activeCategory === cat
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border text-foreground hover:border-primary",
                      ].join(" ")}
                    >
                      {categoryLabel(cat)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Difficulty
                </p>
                <div className="flex flex-wrap gap-2">
                  {DIFFICULTIES.map((diff) => (
                    <button
                      type="button"
                      key={diff}
                      onClick={() =>
                        setActiveDifficulty(
                          activeDifficulty === diff ? null : diff,
                        )
                      }
                      data-ocid={`recipes.difficulty_${diff.toLowerCase()}_filter`}
                      className={[
                        "px-3 py-1 text-xs font-body rounded border transition-smooth",
                        activeDifficulty === diff
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border text-foreground hover:border-primary",
                      ].join(" ")}
                    >
                      {difficultyLabel(diff)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Dietary
                </p>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_TAGS.map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() =>
                        setActiveDietaryTag(
                          activeDietaryTag === tag ? null : tag,
                        )
                      }
                      data-ocid={`recipes.dietary_${tag.toLowerCase()}_filter`}
                      className={[
                        "px-3 py-1 text-xs font-body rounded border transition-smooth",
                        activeDietaryTag === tag
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border text-foreground hover:border-primary",
                      ].join(" ")}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  data-ocid="recipes.clear_filters_button"
                  className="flex items-center gap-1 text-xs font-body text-muted-foreground hover:text-foreground transition-smooth"
                >
                  <X size={12} /> Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Recipe grid */}
      <div className="container mx-auto px-4 py-10">
        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            data-ocid="recipes.loading_state"
          >
            {["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"].map((k) => (
              <div
                key={k}
                className="bg-card border border-border rounded overflow-hidden"
              >
                <Skeleton className="aspect-recipe w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-9 w-full mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : !recipes?.length ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
            data-ocid="recipes.empty_state"
          >
            <ChefHat size={48} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="font-display text-2xl text-foreground">
              No recipes found
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-2">
              {hasFilters
                ? "Try adjusting your filters."
                : "Check back soon — we're adding more."}
            </p>
            {hasFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-4 font-body text-sm"
                data-ocid="recipes.clear_filters_empty_button"
              >
                Clear Filters
              </Button>
            )}
          </motion.div>
        ) : (
          <>
            <p className="font-body text-sm text-muted-foreground mb-6">
              {recipes.length} recipe{recipes.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe, i) => (
                <motion.article
                  key={recipe.id.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: (i % 4) * 0.07 }}
                  className="group bg-card border border-border rounded overflow-hidden hover:shadow-md transition-smooth"
                  data-ocid={`recipes.recipe_card.${i + 1}`}
                >
                  <div className="aspect-recipe overflow-hidden bg-muted">
                    <img
                      src={recipe.imageUrl || "/assets/images/placeholder.svg"}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs font-body">
                        {categoryLabel(recipe.category)}
                      </Badge>
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-body ${difficultyColor(recipe.difficulty)}`}
                      >
                        {difficultyLabel(recipe.difficulty)}
                      </span>
                    </div>
                    <h3 className="font-display text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-smooth line-clamp-2">
                      {recipe.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground font-body">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {formatTotalTime(recipe.prepTime, recipe.cookTime)}
                      </span>
                      <span className="flex items-center gap-1">
                        <ChefHat size={11} />
                        {difficultyLabel(recipe.difficulty)}
                      </span>
                    </div>
                    <Link
                      to="/recipes/$id"
                      params={{ id: recipe.id.toString() }}
                      data-ocid={`recipes.get_recipe_button.${i + 1}`}
                    >
                      <Button
                        variant="default"
                        size="sm"
                        className="mt-3 w-full font-body text-xs tracking-wide bg-accent text-accent-foreground hover:bg-accent/90 border-0"
                      >
                        Get Recipe
                      </Button>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
