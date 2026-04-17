import { c as createLucideIcon, j as jsxRuntimeExports, i as cn, S as SiPinterest, F as Facebook, I as Instagram, k as useParams, r as reactExports, L as Link, E as EMPTY_RECIPE_SEARCH, B as Button, a as categoryLabel, d as difficultyLabel, b as difficultyColor, g as dietaryTagLabel, l as formatTime, f as formatTotalTime, m as formatDate } from "./index-C5v_uq_Z.js";
import { m as motion, B as Badge } from "./proxy-BoDJhELw.js";
import { I as Input } from "./input-C_u8Eg16.js";
import { C as CircleCheckBig, L as Label, T as Textarea, u as ue } from "./index-18e3ju0I.js";
import { S as Skeleton } from "./skeleton-C78k2yN3.js";
import { S as Star, A as ArrowLeft } from "./star-U61jS7xL.js";
import { a as useRecipe, b as useRatings, c as useAddRating, u as useRecipes } from "./useRecipes-CX1qgMr1.js";
import { C as Clock } from "./clock-Ce2kAY0c.js";
import { C as ChefHat } from "./chef-hat-BGTpItG_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8", key: "n7qcjb" }],
  [
    "path",
    { d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7", key: "d0u48b" }
  ],
  ["path", { d: "m2.1 21.8 6.4-6.3", key: "yn04lh" }],
  ["path", { d: "m19 5-7 7", key: "194lzd" }]
];
const UtensilsCrossed = createLucideIcon("utensils-crossed", __iconNode);
function SocialShare({
  recipeName,
  recipeUrl,
  className
}) {
  const url = recipeUrl ?? (typeof window !== "undefined" ? window.location.href : "");
  const encoded = encodeURIComponent(url);
  const caption = encodeURIComponent(`Check out this recipe: ${recipeName}`);
  const platforms = [
    {
      name: "Pinterest",
      href: `https://pinterest.com/pin/create/button/?url=${encoded}&description=${caption}`,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SiPinterest, { size: 15 }),
      colorClass: "hover:bg-primary/10 hover:text-primary hover:border-primary/30",
      ocid: "social_share.pinterest_button"
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}&quote=${caption}`,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { size: 15 }),
      colorClass: "hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30",
      ocid: "social_share.facebook_button"
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { size: 15 }),
      colorClass: "hover:bg-accent/10 hover:text-accent-foreground hover:border-accent/30",
      ocid: "social_share.instagram_button"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-2 flex-wrap", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-muted-foreground uppercase tracking-wider mr-1", children: "Share" }),
    platforms.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: p.href,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `Share on ${p.name}`,
        "data-ocid": p.ocid,
        className: cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-muted-foreground text-xs font-body transition-smooth",
          p.colorClass
        ),
        children: [
          p.icon,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: p.name })
        ]
      },
      p.name
    ))
  ] });
}
function StarRating({
  score,
  maxScore = 5,
  size = 16,
  interactive = false,
  onRate,
  className
}) {
  const stars = Array.from({ length: maxScore }, (_, i) => i + 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex items-center gap-0.5", className), children: stars.map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      disabled: !interactive,
      onClick: () => interactive && (onRate == null ? void 0 : onRate(star)),
      "aria-label": interactive ? `Rate ${star} out of ${maxScore}` : void 0,
      className: cn(
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
        interactive ? "cursor-pointer hover:scale-110 transition-transform duration-150" : "cursor-default pointer-events-none"
      ),
      "data-ocid": interactive ? `star_rating.star_${star}` : void 0,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Star,
        {
          size,
          className: cn(
            star <= score ? "text-accent fill-accent" : "text-muted-foreground/40",
            interactive && star > score && "hover:text-accent/60"
          )
        }
      )
    },
    star
  )) });
}
function AverageRating({
  average,
  count,
  size = 16,
  showCount = true,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-2", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { score: Math.round(average), size }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm font-semibold text-foreground", children: average.toFixed(1) }),
    showCount && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-body text-xs text-muted-foreground", children: [
      "(",
      count,
      " ",
      count === 1 ? "review" : "reviews",
      ")"
    ] })
  ] });
}
function RecipeCard({ recipe, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.35, delay: index * 0.08 },
      className: "group bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-smooth",
      "data-ocid": `recipe_detail.related_card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-recipe overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: recipe.imageUrl || "/assets/images/placeholder.svg",
            alt: recipe.name,
            className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs font-body", children: categoryLabel(recipe.category) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs px-2 py-0.5 rounded font-body ${difficultyColor(recipe.difficulty)}`,
                children: difficultyLabel(recipe.difficulty)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-smooth line-clamp-2 mb-2", children: recipe.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 text-xs text-muted-foreground font-body mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
            formatTotalTime(recipe.prepTime, recipe.cookTime)
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/recipes/$id", params: { id: recipe.id.toString() }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "w-full font-body text-xs",
              "data-ocid": `recipe_detail.related_card_button.${index + 1}`,
              children: "View Recipe"
            }
          ) })
        ] })
      ]
    }
  );
}
function RecipeDetail() {
  const { id } = useParams({ from: "/recipes/$id" });
  const recipeId = BigInt(id);
  const { data: recipe, isLoading } = useRecipe(recipeId);
  const { data: ratings = [] } = useRatings(recipeId);
  const addRating = useAddRating();
  const [checkedIngredients, setCheckedIngredients] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [reviewName, setReviewName] = reactExports.useState("");
  const [reviewScore, setReviewScore] = reactExports.useState(5);
  const [reviewComment, setReviewComment] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const { data: allRecipes = [] } = useRecipes(
    recipe ? { category: recipe.category } : void 0
  );
  const relatedRecipes = allRecipes.filter((r) => r.id !== recipeId).slice(0, 4);
  function toggleIngredient(index) {
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
  async function handleSubmitRating(e) {
    e.preventDefault();
    if (!reviewName.trim()) return;
    const result = await addRating.mutateAsync({
      recipeId,
      score: BigInt(reviewScore),
      comment: reviewComment || null,
      commenterName: reviewName
    });
    if (result.__kind__ === "ok") {
      ue.success("Review submitted!");
      setSubmitted(true);
    } else {
      ue.error(result.err);
    }
  }
  const avgRating = ratings.length ? ratings.reduce((sum, r) => sum + Number(r.score), 0) / ratings.length : null;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-10 max-w-4xl",
        "data-ocid": "recipe_detail.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-80 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-2/3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
          ] })
        ]
      }
    );
  }
  if (!recipe) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-24 text-center",
        "data-ocid": "recipe_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            UtensilsCrossed,
            {
              size: 48,
              className: "mx-auto text-muted-foreground mb-4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-foreground", children: "Recipe not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground mt-2", children: "This recipe may have been removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/recipes",
              search: EMPTY_RECIPE_SEARCH,
              "data-ocid": "recipe_detail.back_to_recipes_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "mt-4 font-body", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14, className: "mr-1" }),
                " Back to Recipes"
              ] })
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "recipe_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full aspect-hero overflow-hidden bg-muted relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: recipe.imageUrl || "/assets/images/placeholder.svg",
          alt: recipe.name,
          className: "w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/recipes",
          search: EMPTY_RECIPE_SEARCH,
          className: "inline-flex items-center gap-1 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth mb-6",
          "data-ocid": "recipe_detail.back_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
            " All Recipes"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "font-body", children: categoryLabel(recipe.category) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-2 py-1 rounded font-body ${difficultyColor(recipe.difficulty)}`,
                  children: difficultyLabel(recipe.difficulty)
                }
              ),
              recipe.dietaryTags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "font-body text-xs", children: dietaryTagLabel(tag) }, tag))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight", children: recipe.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground mt-3 text-base leading-relaxed", children: recipe.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-6 mt-6 py-4 border-y border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16, className: "text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground", children: "Prep Time" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm font-medium text-foreground", children: formatTime(recipe.prepTime) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16, className: "text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground", children: "Cook Time" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm font-medium text-foreground", children: formatTime(recipe.cookTime) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16, className: "text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground", children: "Total Time" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm font-medium text-foreground", children: formatTotalTime(recipe.prepTime, recipe.cookTime) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { size: 16, className: "text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground", children: "Difficulty" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm font-medium text-foreground", children: difficultyLabel(recipe.difficulty) })
                ] })
              ] }),
              avgRating !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                AverageRating,
                {
                  average: avgRating,
                  count: ratings.length,
                  size: 14
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SocialShare,
              {
                recipeName: recipe.name,
                "data-ocid": "recipe_detail.social_share"
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-10 mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "md:col-span-1",
            initial: { opacity: 0, x: -16 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.4 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-4", children: "Ingredients" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: recipe.ingredients.map((ing, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-start gap-3 font-body text-sm cursor-pointer group",
                  "data-ocid": `recipe_detail.ingredient.${i + 1}`,
                  onClick: () => toggleIngredient(i),
                  onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") toggleIngredient(i);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "aria-label": `${checkedIngredients.has(i) ? "Uncheck" : "Check"} ${ing.name}`,
                        className: [
                          "mt-0.5 flex-shrink-0 w-4 h-4 rounded border transition-smooth flex items-center justify-center",
                          checkedIngredients.has(i) ? "bg-primary border-primary" : "border-border bg-background group-hover:border-primary"
                        ].join(" "),
                        "data-ocid": `recipe_detail.ingredient_checkbox.${i + 1}`,
                        children: checkedIngredients.has(i) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CircleCheckBig,
                          {
                            size: 10,
                            className: "text-primary-foreground"
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: checkedIngredients.has(i) ? "line-through text-muted-foreground" : "text-foreground",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: ing.quantity }),
                          " ",
                          ing.name
                        ]
                      }
                    )
                  ]
                },
                `${ing.name}-${i}`
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "md:col-span-2",
            initial: { opacity: 0, x: 16 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.4 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-4", children: "Instructions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-5", children: recipe.instructions.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex gap-4",
                  "data-ocid": `recipe_detail.step.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground font-display text-sm flex items-center justify-center font-semibold", children: i + 1 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground leading-relaxed pt-1", children: step })
                  ]
                },
                `step-${step.slice(0, 30)}`
              )) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-12 pt-8 border-t border-border",
          "data-ocid": "recipe_detail.ratings_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between flex-wrap gap-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-semibold text-foreground", children: [
                "Reviews",
                ratings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-lg ml-2", children: [
                  "(",
                  ratings.length,
                  ")"
                ] })
              ] }),
              avgRating !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
                AverageRating,
                {
                  average: avgRating,
                  count: ratings.length,
                  size: 18,
                  className: "mt-2"
                }
              )
            ] }) }),
            ratings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 mb-8", children: ratings.map((rating, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: i * 0.06 },
                className: "p-4 bg-muted/30 rounded-lg border border-border",
                "data-ocid": `recipe_detail.review_card.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body font-semibold text-sm text-foreground", children: rating.commenterName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { score: Number(rating.score), size: 13 })
                  ] }),
                  rating.comment && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground", children: rating.comment }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground mt-1.5", children: formatDate(rating.createdAt) })
                ]
              },
              `${rating.commenterName}-${i}`
            )) }),
            submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 p-4 bg-secondary/10 rounded-lg border border-secondary/30 text-secondary",
                "data-ocid": "recipe_detail.review_success_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 18 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm", children: "Thanks for your review!" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmitRating,
                className: "space-y-4 bg-muted/20 p-6 rounded-lg border border-border",
                "data-ocid": "recipe_detail.review_form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground", children: "Leave a Review" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "reviewer-name",
                        className: "font-body text-sm mb-1.5 block",
                        children: "Your Name"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "reviewer-name",
                        value: reviewName,
                        onChange: (e) => setReviewName(e.target.value),
                        placeholder: "Jane Smith",
                        required: true,
                        className: "font-body max-w-xs",
                        "data-ocid": "recipe_detail.reviewer_name_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-body text-sm mb-2 block", children: "Rating" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StarRating,
                      {
                        score: reviewScore,
                        size: 28,
                        interactive: true,
                        onRate: setReviewScore,
                        "data-ocid": "recipe_detail.star_rating"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        htmlFor: "review-comment",
                        className: "font-body text-sm mb-1.5 block",
                        children: [
                          "Comment",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "review-comment",
                        value: reviewComment,
                        onChange: (e) => setReviewComment(e.target.value),
                        placeholder: "Share your experience with this recipe...",
                        className: "font-body resize-none",
                        rows: 3,
                        "data-ocid": "recipe_detail.review_comment_textarea"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      disabled: addRating.isPending || !reviewName.trim(),
                      className: "font-body bg-accent text-accent-foreground hover:bg-accent/90 border-0",
                      "data-ocid": "recipe_detail.submit_review_button",
                      children: addRating.isPending ? "Submitting…" : "Submit Review"
                    }
                  )
                ]
              }
            )
          ]
        }
      ),
      relatedRecipes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-12 pt-8 border-t border-border",
          "data-ocid": "recipe_detail.related_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-semibold text-foreground mb-6", children: [
              "More in",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: categoryLabel(recipe.category) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5", children: relatedRecipes.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RecipeCard, { recipe: r, index: i }, r.id.toString())) })
          ]
        }
      )
    ] })
  ] });
}
export {
  RecipeDetail as default
};
