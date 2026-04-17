import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowRight, ChefHat, Search, X } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EMPTY_RECIPE_SEARCH } from "../App";
import { Category, DietaryTag, Difficulty } from "../backend";
import { RecipeCard } from "../components/RecipeCard";
import { useBlogPosts } from "../hooks/useBlog";
import { useRecipes } from "../hooks/useRecipes";
import { categoryLabel, dietaryTagLabel, difficultyLabel } from "../lib/utils";

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-foreground"
      data-ocid="home.hero_section"
    >
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-food.dim_1400x700.jpg"
          alt="Delicious food spread"
          className="w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/35 to-foreground/65" />
      </div>
      <div className="relative container mx-auto px-4 py-28 md:py-44 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-body text-xs uppercase tracking-widest text-primary-foreground/70 mb-4"
        >
          Recipes & Stories for Every Kitchen
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl font-semibold text-primary-foreground leading-tight max-w-4xl"
        >
          Warm Up with Our Favorite Comfort Foods
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-body text-lg text-primary-foreground/80 mt-5 max-w-xl"
        >
          From weeknight dinners to showstopping desserts — discover recipes
          that make every meal memorable.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 mt-8"
        >
          <Link
            to="/recipes"
            search={EMPTY_RECIPE_SEARCH}
            data-ocid="home.hero_see_more_recipes_button"
          >
            <Button
              size="lg"
              className="font-body tracking-wide px-8 bg-accent text-accent-foreground hover:bg-accent/90 border-0 transition-smooth"
            >
              See More Recipes
            </Button>
          </Link>
          <Link to="/blog" data-ocid="home.hero_blog_button">
            <Button
              size="lg"
              variant="outline"
              className="font-body tracking-wide px-8 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent transition-smooth"
            >
              Read Our Blog
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Category Banner ───────────────────────────────────────────────────────────

function CategoryBanner() {
  const categories = [
    { label: "Breakfast", emoji: "🥞", category: Category.Breakfast },
    { label: "Lunch", emoji: "🥗", category: Category.Lunch },
    { label: "Dinner", emoji: "🍝", category: Category.Dinner },
    { label: "Desserts", emoji: "🍰", category: Category.Desserts },
    { label: "Vegan", emoji: "🥦", category: Category.Vegan },
  ];

  return (
    <section
      className="py-10 bg-muted/30 border-y border-border"
      data-ocid="home.categories_section"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
            >
              <Link
                to="/recipes"
                search={{
                  ...EMPTY_RECIPE_SEARCH,
                  category: cat.category as string,
                }}
                data-ocid={`home.category_${cat.label.toLowerCase()}_button`}
                className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border rounded-md font-body text-sm text-foreground hover:border-primary hover:text-primary transition-smooth"
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Filter helpers ────────────────────────────────────────────────────────────

const CATEGORIES = [
  { value: Category.Breakfast, label: "Breakfast" },
  { value: Category.Lunch, label: "Lunch" },
  { value: Category.Dinner, label: "Dinner" },
  { value: Category.Desserts, label: "Desserts" },
  { value: Category.Vegan, label: "Vegan" },
];

const DIETARY_TAGS = [
  { value: DietaryTag.Vegan, label: "Vegan" },
  { value: DietaryTag.GlutenFree, label: "Gluten-Free" },
  { value: DietaryTag.Keto, label: "Keto" },
];

const DIFFICULTIES = [
  { value: Difficulty.Easy, label: "Easy" },
  { value: Difficulty.Medium, label: "Medium" },
  { value: Difficulty.Hard, label: "Hard" },
];

const PREP_TIMES = [
  { value: null as bigint | null, label: "Any Time" },
  { value: BigInt(15), label: "≤ 15 min" },
  { value: BigInt(30), label: "≤ 30 min" },
  { value: BigInt(60), label: "≤ 60 min" },
];

// ─── Featured Recipes with Filters ────────────────────────────────────────────

function FeaturedRecipes() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as {
    category?: string;
    dietaryTag?: string;
    difficulty?: string;
    q?: string;
  };

  // Local search state (debounced into URL)
  const [searchInput, setSearchInput] = useState(search.q ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync URL → input when navigating externally
  useEffect(() => {
    setSearchInput(search.q ?? "");
  }, [search.q]);

  const handleSearchChange = useCallback(
    (val: string) => {
      setSearchInput(val);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        void navigate({
          to: "/",
          search: (prev) => ({ ...prev, q: val || undefined }),
          replace: true,
        });
      }, 300);
    },
    [navigate],
  );

  // Filter state from URL
  const activeCategory = search.category as Category | undefined;
  const activeDietary = search.dietaryTag as DietaryTag | undefined;
  const activeDifficulty = search.difficulty as Difficulty | undefined;

  // Prep time stored as string in URL ("15", "30", "60" or absent)
  const prepTimeStr = (search as { prepTime?: string }).prepTime;
  const activePrepTime: bigint | null =
    prepTimeStr != null && prepTimeStr !== ""
      ? BigInt(Number.parseInt(prepTimeStr, 10))
      : null;

  function setActivePrepTime(val: bigint | null) {
    void navigate({
      to: "/",
      search: (prev) => ({
        ...prev,
        prepTime: val != null ? val.toString() : undefined,
      }),
      replace: true,
    });
  }

  const filters = useMemo(
    () => ({
      search: search.q ?? null,
      category: activeCategory ?? null,
      dietaryTag: activeDietary ?? null,
      difficulty: activeDifficulty ?? null,
      maxPrepTime: activePrepTime,
    }),
    [search.q, activeCategory, activeDietary, activeDifficulty, activePrepTime],
  );

  const { data: recipes, isLoading } = useRecipes(filters);
  const featured = recipes?.slice(0, 6) ?? [];

  const hasActiveFilters =
    !!activeCategory ||
    !!activeDietary ||
    !!activeDifficulty ||
    !!activePrepTime ||
    !!search.q;

  function toggleCategory(cat: Category) {
    void navigate({
      to: "/",
      search: (prev) => ({
        ...prev,
        category: activeCategory === cat ? undefined : (cat as string),
      }),
      replace: true,
    });
  }

  function toggleDietary(tag: DietaryTag) {
    void navigate({
      to: "/",
      search: (prev) => ({
        ...prev,
        dietaryTag: activeDietary === tag ? undefined : (tag as string),
      }),
      replace: true,
    });
  }

  function toggleDifficulty(diff: Difficulty) {
    void navigate({
      to: "/",
      search: (prev) => ({
        ...prev,
        difficulty: activeDifficulty === diff ? undefined : (diff as string),
      }),
      replace: true,
    });
  }

  function clearAllFilters() {
    setSearchInput("");
    void navigate({
      to: "/",
      search: { ...EMPTY_RECIPE_SEARCH, prepTime: undefined },
      replace: true,
    });
  }

  return (
    <section
      className="py-16 bg-background"
      data-ocid="home.featured_recipes_section"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">
              Hand-picked
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Featured Recipes
            </h2>
          </div>
          <Link
            to="/recipes"
            search={EMPTY_RECIPE_SEARCH}
            data-ocid="home.see_more_recipes_button"
            className="hidden sm:flex items-center gap-1 text-sm font-body text-primary hover:underline transition-smooth"
          >
            See More Recipes <ArrowRight size={14} />
          </Link>
        </div>

        {/* Search bar */}
        <div className="relative mb-5">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            type="text"
            placeholder="Search recipes..."
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 pr-9 font-body bg-card border-border focus:ring-1 focus:ring-primary/30"
            data-ocid="home.recipe_search_input"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
              aria-label="Clear search"
              data-ocid="home.recipe_search_clear_button"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter rows */}
        <div className="space-y-3 mb-6">
          {/* Category pills */}
          <div
            className="flex flex-wrap gap-2"
            data-ocid="home.category_filter"
          >
            <span className="font-body text-xs text-muted-foreground self-center mr-1 min-w-[60px]">
              Category
            </span>
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat.value}
                onClick={() => toggleCategory(cat.value)}
                data-ocid={`home.category_filter.${cat.label.toLowerCase()}`}
                className={`px-3 py-1 rounded-full text-xs font-body border transition-smooth ${
                  activeCategory === cat.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dietary tags */}
          <div className="flex flex-wrap gap-2" data-ocid="home.dietary_filter">
            <span className="font-body text-xs text-muted-foreground self-center mr-1 min-w-[60px]">
              Dietary
            </span>
            {DIETARY_TAGS.map((tag) => (
              <button
                type="button"
                key={tag.value}
                onClick={() => toggleDietary(tag.value)}
                data-ocid={`home.dietary_filter.${dietaryTagLabel(tag.value)
                  .toLowerCase()
                  .replace(/[^a-z0-9]/g, "_")}`}
                className={`px-3 py-1 rounded-full text-xs font-body border transition-smooth ${
                  activeDietary === tag.value
                    ? "bg-secondary text-secondary-foreground border-secondary"
                    : "bg-card text-foreground border-border hover:border-secondary hover:text-secondary"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Difficulty + Prep Time row */}
          <div className="flex flex-wrap gap-4">
            <div
              className="flex flex-wrap gap-2"
              data-ocid="home.difficulty_filter"
            >
              <span className="font-body text-xs text-muted-foreground self-center mr-1 min-w-[60px]">
                Difficulty
              </span>
              {DIFFICULTIES.map((diff) => (
                <button
                  type="button"
                  key={diff.value}
                  onClick={() => toggleDifficulty(diff.value)}
                  data-ocid={`home.difficulty_filter.${diff.label.toLowerCase()}`}
                  className={`px-3 py-1 rounded-full text-xs font-body border transition-smooth ${
                    activeDifficulty === diff.value
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-card text-foreground border-border hover:border-accent hover:text-accent-foreground"
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>

            <div
              className="flex flex-wrap gap-2"
              data-ocid="home.preptime_filter"
            >
              <span className="font-body text-xs text-muted-foreground self-center mr-1 min-w-[60px]">
                Prep time
              </span>
              {PREP_TIMES.map((pt) => (
                <button
                  type="button"
                  key={pt.label}
                  onClick={() =>
                    setActivePrepTime(
                      activePrepTime === pt.value ? null : pt.value,
                    )
                  }
                  data-ocid={`home.preptime_filter.${pt.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                  className={`px-3 py-1 rounded-full text-xs font-body border transition-smooth ${
                    activePrepTime === pt.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {pt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active filters / Clear */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className="font-body text-xs text-muted-foreground">
              Active:
            </span>
            {activeCategory && (
              <Badge variant="secondary" className="font-body text-xs gap-1">
                {categoryLabel(activeCategory)}
                <button
                  type="button"
                  onClick={() => toggleCategory(activeCategory)}
                  aria-label="Remove category filter"
                >
                  <X size={10} />
                </button>
              </Badge>
            )}
            {activeDietary && (
              <Badge variant="secondary" className="font-body text-xs gap-1">
                {dietaryTagLabel(activeDietary)}
                <button
                  type="button"
                  onClick={() => toggleDietary(activeDietary)}
                  aria-label="Remove dietary filter"
                >
                  <X size={10} />
                </button>
              </Badge>
            )}
            {activeDifficulty && (
              <Badge variant="secondary" className="font-body text-xs gap-1">
                {difficultyLabel(activeDifficulty)}
                <button
                  type="button"
                  onClick={() => toggleDifficulty(activeDifficulty)}
                  aria-label="Remove difficulty filter"
                >
                  <X size={10} />
                </button>
              </Badge>
            )}
            {activePrepTime && (
              <Badge variant="secondary" className="font-body text-xs gap-1">
                ≤{activePrepTime.toString()} min
                <button
                  type="button"
                  onClick={() => setActivePrepTime(null)}
                  aria-label="Remove prep time filter"
                >
                  <X size={10} />
                </button>
              </Badge>
            )}
            <button
              type="button"
              onClick={clearAllFilters}
              className="font-body text-xs text-muted-foreground hover:text-foreground underline transition-smooth ml-1"
              data-ocid="home.clear_filters_button"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Recipe grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((sk) => (
              <div
                key={sk}
                className="bg-card border border-border rounded-lg overflow-hidden"
                data-ocid="home.recipe_loading_state"
              >
                <Skeleton className="aspect-recipe w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-9 w-full mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : featured.length === 0 ? (
          <div
            className="text-center py-20 bg-muted/30 rounded-lg border border-border"
            data-ocid="home.recipes_empty_state"
          >
            <ChefHat size={44} className="mx-auto text-muted-foreground mb-4" />
            <p className="font-display text-xl text-foreground mb-1">
              No recipes found
            </p>
            <p className="font-body text-sm text-muted-foreground max-w-xs mx-auto">
              {hasActiveFilters
                ? "Try adjusting your filters to discover more recipes."
                : "Check back soon — we're cooking something up!"}
            </p>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4 font-body"
                onClick={clearAllFilters}
                data-ocid="home.empty_state_clear_button"
              >
                Clear filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((recipe, i) => (
              <RecipeCard
                key={recipe.id.toString()}
                recipe={recipe}
                index={i}
                ocidPrefix="home.recipe"
              />
            ))}
          </div>
        )}

        {/* Mobile see more */}
        <div className="sm:hidden flex justify-center mt-8">
          <Link
            to="/recipes"
            search={EMPTY_RECIPE_SEARCH}
            data-ocid="home.see_more_recipes_mobile_button"
          >
            <Button variant="outline" className="font-body tracking-wide">
              See More Recipes <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Latest Blog Posts ─────────────────────────────────────────────────────────

function LatestBlogPosts() {
  const { data: posts, isLoading } = useBlogPosts();
  const latest = posts?.slice(0, 3) ?? [];

  return (
    <section className="py-16 bg-muted/20" data-ocid="home.blog_section">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">
              From the kitchen
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Latest Stories
            </h2>
          </div>
          <Link
            to="/blog"
            data-ocid="home.see_all_posts_button"
            className="hidden sm:flex items-center gap-1 text-sm font-body text-primary hover:underline transition-smooth"
          >
            All Posts <ArrowRight size={14} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["b1", "b2", "b3"].map((bk) => (
              <div
                key={bk}
                className="bg-card border border-border rounded-lg overflow-hidden"
                data-ocid="home.blog_loading_state"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : latest.length === 0 ? (
          <p
            className="text-center font-body text-muted-foreground py-8"
            data-ocid="home.blog_empty_state"
          >
            No blog posts yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latest.map((post, i) => (
              <motion.article
                key={post.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-smooth"
                data-ocid={`home.blog_card.${i + 1}`}
              >
                <div className="h-48 overflow-hidden bg-muted">
                  <img
                    src={post.featuredImage || "/assets/images/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-smooth line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link
                    to="/blog/$id"
                    params={{ id: post.id.toString() }}
                    data-ocid={`home.blog_read_more_button.${i + 1}`}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 px-0 font-body text-xs text-primary hover:text-primary/80"
                    >
                      Read More <ArrowRight size={12} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Newsletter ────────────────────────────────────────────────────────────────

function NewsletterBanner() {
  return (
    <section
      className="py-16 bg-primary text-primary-foreground"
      data-ocid="home.newsletter_section"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-semibold mb-3"
        >
          Never Miss a Recipe
        </motion.h2>
        <p className="font-body text-primary-foreground/80 max-w-sm mx-auto mb-6 text-sm">
          Subscribe to our weekly digest with fresh recipes, seasonal tips, and
          kitchen inspiration.
        </p>
        <Link to="/contact" data-ocid="home.newsletter_contact_button">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 border-0 font-body tracking-wide px-8 transition-smooth"
          >
            Get in Touch
          </Button>
        </Link>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div data-ocid="home.page">
      <HeroSection />
      <CategoryBanner />
      <FeaturedRecipes />
      <LatestBlogPosts />
      <NewsletterBanner />
    </div>
  );
}
