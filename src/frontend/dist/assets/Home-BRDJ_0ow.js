import { c as createLucideIcon, j as jsxRuntimeExports, a as categoryLabel, d as difficultyLabel, b as difficultyColor, f as formatTotalTime, L as Link, B as Button, E as EMPTY_RECIPE_SEARCH, C as Category, u as useNavigate, e as useSearch, r as reactExports, X, D as DietaryTag, g as dietaryTagLabel, h as Difficulty } from "./index-C5v_uq_Z.js";
import { m as motion, B as Badge } from "./proxy-BoDJhELw.js";
import { I as Input } from "./input-C_u8Eg16.js";
import { S as Skeleton } from "./skeleton-C78k2yN3.js";
import { C as Clock } from "./clock-Ce2kAY0c.js";
import { u as useBlogPosts } from "./useBlog-C9WemVrB.js";
import { u as useRecipes } from "./useRecipes-CX1qgMr1.js";
import { S as Search } from "./search-Cb0PKeNT.js";
import { C as ChefHat } from "./chef-hat-BGTpItG_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode);
function RecipeCard({
  recipe,
  index,
  ocidPrefix = "recipe"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: Math.min(index * 0.08, 0.4) },
      className: "group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-smooth flex flex-col",
      "data-ocid": `${ocidPrefix}.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-recipe overflow-hidden bg-muted relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: recipe.imageUrl || "/assets/images/placeholder.svg",
              alt: recipe.name,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-card/90 text-foreground border-0 font-body text-xs shadow-subtle backdrop-blur-sm", children: categoryLabel(recipe.category) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-body font-medium ${difficultyColor(recipe.difficulty)}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 10 }),
                  difficultyLabel(recipe.difficulty)
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-body text-muted-foreground ml-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
              formatTotalTime(recipe.prepTime, recipe.cookTime)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-smooth line-clamp-2 flex-1", children: recipe.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mt-1.5 line-clamp-2", children: recipe.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/recipes/$id",
              params: { id: recipe.id.toString() },
              "data-ocid": `${ocidPrefix}.get_recipe_button.${index + 1}`,
              className: "mt-4 block",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  className: "w-full font-body text-xs tracking-wide bg-accent text-accent-foreground hover:bg-accent/85 border-0 transition-smooth",
                  children: "Get Recipe"
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
function HeroSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative overflow-hidden bg-foreground",
      "data-ocid": "home.hero_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/hero-food.dim_1400x700.jpg",
              alt: "Delicious food spread",
              className: "w-full h-full object-cover opacity-55"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/35 to-foreground/65" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative container mx-auto px-4 py-28 md:py-44 flex flex-col items-center text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              className: "font-body text-xs uppercase tracking-widest text-primary-foreground/70 mb-4",
              children: "Recipes & Stories for Every Kitchen"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.1 },
              className: "font-display text-5xl md:text-7xl font-semibold text-primary-foreground leading-tight max-w-4xl",
              children: "Warm Up with Our Favorite Comfort Foods"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.2 },
              className: "font-body text-lg text-primary-foreground/80 mt-5 max-w-xl",
              children: "From weeknight dinners to showstopping desserts — discover recipes that make every meal memorable."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.3 },
              className: "flex flex-col sm:flex-row gap-3 mt-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/recipes",
                    search: EMPTY_RECIPE_SEARCH,
                    "data-ocid": "home.hero_see_more_recipes_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "lg",
                        className: "font-body tracking-wide px-8 bg-accent text-accent-foreground hover:bg-accent/90 border-0 transition-smooth",
                        children: "See More Recipes"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", "data-ocid": "home.hero_blog_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    variant: "outline",
                    className: "font-body tracking-wide px-8 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent transition-smooth",
                    children: "Read Our Blog"
                  }
                ) })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function CategoryBanner() {
  const categories = [
    { label: "Breakfast", emoji: "🥞", category: Category.Breakfast },
    { label: "Lunch", emoji: "🥗", category: Category.Lunch },
    { label: "Dinner", emoji: "🍝", category: Category.Dinner },
    { label: "Desserts", emoji: "🍰", category: Category.Desserts },
    { label: "Vegan", emoji: "🥦", category: Category.Vegan }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-10 bg-muted/30 border-y border-border",
      "data-ocid": "home.categories_section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-3", children: categories.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { duration: 0.3, delay: i * 0.07 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/recipes",
              search: {
                ...EMPTY_RECIPE_SEARCH,
                category: cat.category
              },
              "data-ocid": `home.category_${cat.label.toLowerCase()}_button`,
              className: "flex items-center gap-2 px-5 py-2.5 bg-card border border-border rounded-md font-body text-sm text-foreground hover:border-primary hover:text-primary transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.label })
              ]
            }
          )
        },
        cat.label
      )) }) })
    }
  );
}
const CATEGORIES = [
  { value: Category.Breakfast, label: "Breakfast" },
  { value: Category.Lunch, label: "Lunch" },
  { value: Category.Dinner, label: "Dinner" },
  { value: Category.Desserts, label: "Desserts" },
  { value: Category.Vegan, label: "Vegan" }
];
const DIETARY_TAGS = [
  { value: DietaryTag.Vegan, label: "Vegan" },
  { value: DietaryTag.GlutenFree, label: "Gluten-Free" },
  { value: DietaryTag.Keto, label: "Keto" }
];
const DIFFICULTIES = [
  { value: Difficulty.Easy, label: "Easy" },
  { value: Difficulty.Medium, label: "Medium" },
  { value: Difficulty.Hard, label: "Hard" }
];
const PREP_TIMES = [
  { value: null, label: "Any Time" },
  { value: BigInt(15), label: "≤ 15 min" },
  { value: BigInt(30), label: "≤ 30 min" },
  { value: BigInt(60), label: "≤ 60 min" }
];
function FeaturedRecipes() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const [searchInput, setSearchInput] = reactExports.useState(search.q ?? "");
  const debounceRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setSearchInput(search.q ?? "");
  }, [search.q]);
  const handleSearchChange = reactExports.useCallback(
    (val) => {
      setSearchInput(val);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        void navigate({
          to: "/",
          search: (prev) => ({ ...prev, q: val || void 0 }),
          replace: true
        });
      }, 300);
    },
    [navigate]
  );
  const activeCategory = search.category;
  const activeDietary = search.dietaryTag;
  const activeDifficulty = search.difficulty;
  const prepTimeStr = search.prepTime;
  const activePrepTime = prepTimeStr != null && prepTimeStr !== "" ? BigInt(Number.parseInt(prepTimeStr, 10)) : null;
  function setActivePrepTime(val) {
    void navigate({
      to: "/",
      search: (prev) => ({
        ...prev,
        prepTime: val != null ? val.toString() : void 0
      }),
      replace: true
    });
  }
  const filters = reactExports.useMemo(
    () => ({
      search: search.q ?? null,
      category: activeCategory ?? null,
      dietaryTag: activeDietary ?? null,
      difficulty: activeDifficulty ?? null,
      maxPrepTime: activePrepTime
    }),
    [search.q, activeCategory, activeDietary, activeDifficulty, activePrepTime]
  );
  const { data: recipes, isLoading } = useRecipes(filters);
  const featured = (recipes == null ? void 0 : recipes.slice(0, 6)) ?? [];
  const hasActiveFilters = !!activeCategory || !!activeDietary || !!activeDifficulty || !!activePrepTime || !!search.q;
  function toggleCategory(cat) {
    void navigate({
      to: "/",
      search: (prev) => ({
        ...prev,
        category: activeCategory === cat ? void 0 : cat
      }),
      replace: true
    });
  }
  function toggleDietary(tag) {
    void navigate({
      to: "/",
      search: (prev) => ({
        ...prev,
        dietaryTag: activeDietary === tag ? void 0 : tag
      }),
      replace: true
    });
  }
  function toggleDifficulty(diff) {
    void navigate({
      to: "/",
      search: (prev) => ({
        ...prev,
        difficulty: activeDifficulty === diff ? void 0 : diff
      }),
      replace: true
    });
  }
  function clearAllFilters() {
    setSearchInput("");
    void navigate({
      to: "/",
      search: { ...EMPTY_RECIPE_SEARCH, prepTime: void 0 },
      replace: true
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 bg-background",
      "data-ocid": "home.featured_recipes_section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs uppercase tracking-widest text-muted-foreground mb-1", children: "Hand-picked" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-semibold text-foreground", children: "Featured Recipes" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/recipes",
              search: EMPTY_RECIPE_SEARCH,
              "data-ocid": "home.see_more_recipes_button",
              className: "hidden sm:flex items-center gap-1 text-sm font-body text-primary hover:underline transition-smooth",
              children: [
                "See More Recipes ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Search,
            {
              size: 16,
              className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "text",
              placeholder: "Search recipes...",
              value: searchInput,
              onChange: (e) => handleSearchChange(e.target.value),
              className: "pl-9 pr-9 font-body bg-card border-border focus:ring-1 focus:ring-primary/30",
              "data-ocid": "home.recipe_search_input"
            }
          ),
          searchInput && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleSearchChange(""),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
              "aria-label": "Clear search",
              "data-ocid": "home.recipe_search_clear_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-wrap gap-2",
              "data-ocid": "home.category_filter",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-muted-foreground self-center mr-1 min-w-[60px]", children: "Category" }),
                CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggleCategory(cat.value),
                    "data-ocid": `home.category_filter.${cat.label.toLowerCase()}`,
                    className: `px-3 py-1 rounded-full text-xs font-body border transition-smooth ${activeCategory === cat.value ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary hover:text-primary"}`,
                    children: cat.label
                  },
                  cat.value
                ))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", "data-ocid": "home.dietary_filter", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-muted-foreground self-center mr-1 min-w-[60px]", children: "Dietary" }),
            DIETARY_TAGS.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => toggleDietary(tag.value),
                "data-ocid": `home.dietary_filter.${dietaryTagLabel(tag.value).toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
                className: `px-3 py-1 rounded-full text-xs font-body border transition-smooth ${activeDietary === tag.value ? "bg-secondary text-secondary-foreground border-secondary" : "bg-card text-foreground border-border hover:border-secondary hover:text-secondary"}`,
                children: tag.label
              },
              tag.value
            ))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-wrap gap-2",
                "data-ocid": "home.difficulty_filter",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-muted-foreground self-center mr-1 min-w-[60px]", children: "Difficulty" }),
                  DIFFICULTIES.map((diff) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleDifficulty(diff.value),
                      "data-ocid": `home.difficulty_filter.${diff.label.toLowerCase()}`,
                      className: `px-3 py-1 rounded-full text-xs font-body border transition-smooth ${activeDifficulty === diff.value ? "bg-accent text-accent-foreground border-accent" : "bg-card text-foreground border-border hover:border-accent hover:text-accent-foreground"}`,
                      children: diff.label
                    },
                    diff.value
                  ))
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-wrap gap-2",
                "data-ocid": "home.preptime_filter",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-muted-foreground self-center mr-1 min-w-[60px]", children: "Prep time" }),
                  PREP_TIMES.map((pt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActivePrepTime(
                        activePrepTime === pt.value ? null : pt.value
                      ),
                      "data-ocid": `home.preptime_filter.${pt.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
                      className: `px-3 py-1 rounded-full text-xs font-body border transition-smooth ${activePrepTime === pt.value ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary hover:text-primary"}`,
                      children: pt.label
                    },
                    pt.label
                  ))
                ]
              }
            )
          ] })
        ] }),
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-muted-foreground", children: "Active:" }),
          activeCategory && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "font-body text-xs gap-1", children: [
            categoryLabel(activeCategory),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => toggleCategory(activeCategory),
                "aria-label": "Remove category filter",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 10 })
              }
            )
          ] }),
          activeDietary && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "font-body text-xs gap-1", children: [
            dietaryTagLabel(activeDietary),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => toggleDietary(activeDietary),
                "aria-label": "Remove dietary filter",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 10 })
              }
            )
          ] }),
          activeDifficulty && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "font-body text-xs gap-1", children: [
            difficultyLabel(activeDifficulty),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => toggleDifficulty(activeDifficulty),
                "aria-label": "Remove difficulty filter",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 10 })
              }
            )
          ] }),
          activePrepTime && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "font-body text-xs gap-1", children: [
            "≤",
            activePrepTime.toString(),
            " min",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActivePrepTime(null),
                "aria-label": "Remove prep time filter",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 10 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: clearAllFilters,
              className: "font-body text-xs text-muted-foreground hover:text-foreground underline transition-smooth ml-1",
              "data-ocid": "home.clear_filters_button",
              children: "Clear all"
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-lg overflow-hidden",
            "data-ocid": "home.recipe_loading_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-recipe w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full mt-2" })
              ] })
            ]
          },
          sk
        )) }) : featured.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-20 bg-muted/30 rounded-lg border border-border",
            "data-ocid": "home.recipes_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { size: 44, className: "mx-auto text-muted-foreground mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl text-foreground mb-1", children: "No recipes found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground max-w-xs mx-auto", children: hasActiveFilters ? "Try adjusting your filters to discover more recipes." : "Check back soon — we're cooking something up!" }),
              hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "mt-4 font-body",
                  onClick: clearAllFilters,
                  "data-ocid": "home.empty_state_clear_button",
                  children: "Clear filters"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: featured.map((recipe, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          RecipeCard,
          {
            recipe,
            index: i,
            ocidPrefix: "home.recipe"
          },
          recipe.id.toString()
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden flex justify-center mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/recipes",
            search: EMPTY_RECIPE_SEARCH,
            "data-ocid": "home.see_more_recipes_mobile_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "font-body tracking-wide", children: [
              "See More Recipes ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14, className: "ml-1" })
            ] })
          }
        ) })
      ] })
    }
  );
}
function LatestBlogPosts() {
  const { data: posts, isLoading } = useBlogPosts();
  const latest = (posts == null ? void 0 : posts.slice(0, 3)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-muted/20", "data-ocid": "home.blog_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs uppercase tracking-widest text-muted-foreground mb-1", children: "From the kitchen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-semibold text-foreground", children: "Latest Stories" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/blog",
          "data-ocid": "home.see_all_posts_button",
          className: "hidden sm:flex items-center gap-1 text-sm font-body text-primary hover:underline transition-smooth",
          children: [
            "All Posts ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: ["b1", "b2", "b3"].map((bk) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-lg overflow-hidden",
        "data-ocid": "home.blog_loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" })
          ] })
        ]
      },
      bk
    )) }) : latest.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-center font-body text-muted-foreground py-8",
        "data-ocid": "home.blog_empty_state",
        children: "No blog posts yet."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: latest.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.article,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4, delay: i * 0.1 },
        className: "group bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-smooth",
        "data-ocid": `home.blog_card.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: post.featuredImage || "/assets/images/placeholder.svg",
              alt: post.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-smooth line-clamp-2", children: post.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mt-2 line-clamp-2", children: post.excerpt }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/blog/$id",
                params: { id: post.id.toString() },
                "data-ocid": `home.blog_read_more_button.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "mt-3 px-0 font-body text-xs text-primary hover:text-primary/80",
                    children: [
                      "Read More ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12, className: "ml-1" })
                    ]
                  }
                )
              }
            )
          ] })
        ]
      },
      post.id.toString()
    )) })
  ] }) });
}
function NewsletterBanner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 bg-primary text-primary-foreground",
      "data-ocid": "home.newsletter_section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.h2,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "font-display text-3xl md:text-4xl font-semibold mb-3",
            children: "Never Miss a Recipe"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-primary-foreground/80 max-w-sm mx-auto mb-6 text-sm", children: "Subscribe to our weekly digest with fresh recipes, seasonal tips, and kitchen inspiration." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", "data-ocid": "home.newsletter_contact_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "lg",
            className: "bg-accent text-accent-foreground hover:bg-accent/90 border-0 font-body tracking-wide px-8 transition-smooth",
            children: "Get in Touch"
          }
        ) })
      ] })
    }
  );
}
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedRecipes, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LatestBlogPosts, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterBanner, {})
  ] });
}
export {
  Home as default
};
