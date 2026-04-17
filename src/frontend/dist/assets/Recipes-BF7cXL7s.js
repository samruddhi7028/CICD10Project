import { c as createLucideIcon, u as useNavigate, e as useSearch, r as reactExports, j as jsxRuntimeExports, B as Button, a as categoryLabel, d as difficultyLabel, X, b as difficultyColor, f as formatTotalTime, L as Link, C as Category, h as Difficulty, D as DietaryTag } from "./index-C5v_uq_Z.js";
import { m as motion, B as Badge } from "./proxy-BoDJhELw.js";
import { I as Input } from "./input-C_u8Eg16.js";
import { S as Skeleton } from "./skeleton-C78k2yN3.js";
import { u as useRecipes } from "./useRecipes-CX1qgMr1.js";
import { S as Search } from "./search-Cb0PKeNT.js";
import { C as ChefHat } from "./chef-hat-BGTpItG_.js";
import { C as Clock } from "./clock-Ce2kAY0c.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const CATEGORIES = Object.values(Category);
const DIFFICULTIES = Object.values(Difficulty);
const DIETARY_TAGS = Object.values(DietaryTag);
function Recipes() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/recipes" });
  const q = search.q ?? "";
  const activeCategory = search.category ?? null;
  const activeDifficulty = search.difficulty ?? null;
  const activeDietaryTag = search.dietaryTag ?? null;
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const { data: recipes, isLoading } = useRecipes({
    search: q || null,
    category: activeCategory,
    difficulty: activeDifficulty,
    dietaryTag: activeDietaryTag
  });
  function setQ(val) {
    void navigate({
      to: "/recipes",
      search: (prev) => ({ ...prev, q: val || void 0 }),
      replace: true
    });
  }
  function setActiveCategory(cat) {
    void navigate({
      to: "/recipes",
      search: (prev) => ({ ...prev, category: cat ?? void 0 }),
      replace: true
    });
  }
  function setActiveDifficulty(diff) {
    void navigate({
      to: "/recipes",
      search: (prev) => ({ ...prev, difficulty: diff ?? void 0 }),
      replace: true
    });
  }
  function setActiveDietaryTag(tag) {
    void navigate({
      to: "/recipes",
      search: (prev) => ({ ...prev, dietaryTag: tag ?? void 0 }),
      replace: true
    });
  }
  function clearFilters() {
    void navigate({
      to: "/recipes",
      search: {
        category: void 0,
        dietaryTag: void 0,
        difficulty: void 0,
        q: void 0
      },
      replace: true
    });
  }
  const hasFilters = !!q || !!activeCategory || !!activeDifficulty || !!activeDietaryTag;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "recipes.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs uppercase tracking-widest text-muted-foreground mb-1", children: "Browse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-semibold text-foreground mb-4", children: "All Recipes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Search,
            {
              size: 16,
              className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "text",
              placeholder: "Search recipes...",
              value: q,
              onChange: (e) => setQ(e.target.value),
              className: "pl-9 font-body",
              "data-ocid": "recipes.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setShowFilters((v) => !v),
            "data-ocid": "recipes.filters_toggle",
            className: showFilters ? "border-primary text-primary" : "",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { size: 16, className: "mr-1.5" }),
              "Filters",
              hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 w-2 h-2 rounded-full bg-primary inline-block" })
            ]
          }
        )
      ] }),
      showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-4 p-4 bg-muted/30 rounded border border-border space-y-4",
          "data-ocid": "recipes.filter_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2", children: "Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveCategory(activeCategory === cat ? null : cat),
                  "data-ocid": `recipes.category_${cat.toLowerCase()}_filter`,
                  className: [
                    "px-3 py-1 text-xs font-body rounded border transition-smooth",
                    activeCategory === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground hover:border-primary"
                  ].join(" "),
                  children: categoryLabel(cat)
                },
                cat
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2", children: "Difficulty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: DIFFICULTIES.map((diff) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveDifficulty(
                    activeDifficulty === diff ? null : diff
                  ),
                  "data-ocid": `recipes.difficulty_${diff.toLowerCase()}_filter`,
                  className: [
                    "px-3 py-1 text-xs font-body rounded border transition-smooth",
                    activeDifficulty === diff ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground hover:border-primary"
                  ].join(" "),
                  children: difficultyLabel(diff)
                },
                diff
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2", children: "Dietary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: DIETARY_TAGS.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveDietaryTag(
                    activeDietaryTag === tag ? null : tag
                  ),
                  "data-ocid": `recipes.dietary_${tag.toLowerCase()}_filter`,
                  className: [
                    "px-3 py-1 text-xs font-body rounded border transition-smooth",
                    activeDietaryTag === tag ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground hover:border-primary"
                  ].join(" "),
                  children: tag
                },
                tag
              )) })
            ] }),
            hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: clearFilters,
                "data-ocid": "recipes.clear_filters_button",
                className: "flex items-center gap-1 text-xs font-body text-muted-foreground hover:text-foreground transition-smooth",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 }),
                  " Clear all filters"
                ]
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-10", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
        "data-ocid": "recipes.loading_state",
        children: ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-recipe w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full mt-2" })
              ] })
            ]
          },
          k
        ))
      }
    ) : !(recipes == null ? void 0 : recipes.length) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        className: "text-center py-24",
        "data-ocid": "recipes.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { size: 48, className: "mx-auto text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-foreground", children: "No recipes found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mt-2", children: hasFilters ? "Try adjusting your filters." : "Check back soon — we're adding more." }),
          hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: clearFilters,
              className: "mt-4 font-body text-sm",
              "data-ocid": "recipes.clear_filters_empty_button",
              children: "Clear Filters"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-muted-foreground mb-6", children: [
        recipes.length,
        " recipe",
        recipes.length !== 1 ? "s" : "",
        " found"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: recipes.map((recipe, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.article,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.35, delay: i % 4 * 0.07 },
          className: "group bg-card border border-border rounded overflow-hidden hover:shadow-md transition-smooth",
          "data-ocid": `recipes.recipe_card.${i + 1}`,
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
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs font-body", children: categoryLabel(recipe.category) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs px-2 py-0.5 rounded font-body ${difficultyColor(recipe.difficulty)}`,
                    children: difficultyLabel(recipe.difficulty)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-smooth line-clamp-2", children: recipe.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2 text-xs text-muted-foreground font-body", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
                  formatTotalTime(recipe.prepTime, recipe.cookTime)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { size: 11 }),
                  difficultyLabel(recipe.difficulty)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/recipes/$id",
                  params: { id: recipe.id.toString() },
                  "data-ocid": `recipes.get_recipe_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "default",
                      size: "sm",
                      className: "mt-3 w-full font-body text-xs tracking-wide bg-accent text-accent-foreground hover:bg-accent/90 border-0",
                      children: "Get Recipe"
                    }
                  )
                }
              )
            ] })
          ]
        },
        recipe.id.toString()
      )) })
    ] }) })
  ] });
}
export {
  Recipes as default
};
