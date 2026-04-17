import { k as useParams, j as jsxRuntimeExports, L as Link, m as formatDate, E as EMPTY_RECIPE_SEARCH, f as formatTotalTime } from "./index-C5v_uq_Z.js";
import { m as motion, B as Badge } from "./proxy-BoDJhELw.js";
import { S as Skeleton } from "./skeleton-C78k2yN3.js";
import { U as User, C as CalendarDays, a as BlogCard } from "./BlogCard-ShiRxml9.js";
import { a as useBlogPost, u as useBlogPosts } from "./useBlog-C9WemVrB.js";
import { u as useRecipes } from "./useRecipes-CX1qgMr1.js";
import { A as ArrowLeft, S as Star } from "./star-U61jS7xL.js";
import { C as Clock } from "./clock-Ce2kAY0c.js";
function RecipeSuggestionCard({
  recipe,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.article,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.1 },
      className: "group",
      "data-ocid": `blog_post.recommended_recipe.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/recipes/$id", params: { id: recipe.id.toString() }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col overflow-hidden rounded-sm border border-border bg-card hover:border-primary/30 transition-smooth", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: recipe.imageUrl || "/assets/generated/blog-card-bowl.dim_600x400.jpg",
            alt: recipe.name,
            className: "w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg text-foreground group-hover:text-primary transition-smooth leading-snug line-clamp-2", children: recipe.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground font-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
              formatTotalTime(recipe.prepTime, recipe.cookTime)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground font-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 11 }),
              String(recipe.difficulty)
            ] })
          ] })
        ] })
      ] }) })
    }
  );
}
function BlogPost() {
  const { id } = useParams({ from: "/blog/$id" });
  const postId = BigInt(id);
  const { data: post, isLoading, error } = useBlogPost(postId);
  const { data: allPosts } = useBlogPosts();
  const { data: recipes, isLoading: recipesLoading } = useRecipes();
  const recommendedRecipes = (recipes == null ? void 0 : recipes.slice(0, 3)) ?? [];
  const relatedPosts = (allPosts == null ? void 0 : allPosts.filter((p) => p.id !== postId).slice(0, 2)) ?? [];
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-background min-h-screen",
        "data-ocid": "blog_post.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-[50vh]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-3xl py-12 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-4/5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" })
            ] })
          ] })
        ]
      }
    );
  }
  if (!post || error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-background min-h-screen flex items-center justify-center",
        "data-ocid": "blog_post.error_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-24 max-w-md mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl block mb-6", children: "📄" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl text-foreground mb-4", children: "Post not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mb-8", children: "This story seems to have wandered off. Head back to the blog for more delicious reading." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/blog",
              "data-ocid": "blog_post.back_to_blog_link",
              className: "inline-flex items-center gap-2 font-body text-sm font-medium text-primary hover:text-primary/80 transition-smooth border-b border-primary/40 pb-0.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
                "Back to Blog"
              ]
            }
          )
        ] })
      }
    );
  }
  const paragraphs = post.content.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "bg-background min-h-screen", "data-ocid": "blog_post.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.6 },
        className: "w-full aspect-hero overflow-hidden bg-muted",
        "data-ocid": "blog_post.hero_image",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: post.featuredImage || "/assets/generated/blog-hero-pasta.dim_1200x600.jpg",
            alt: post.title,
            className: "w-full h-full object-cover"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-3xl py-12 md:py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -10 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.4 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/blog",
              "data-ocid": "blog_post.back_to_blog_link",
              className: "inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-smooth mb-8 group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ArrowLeft,
                  {
                    size: 14,
                    className: "group-hover:-translate-x-1 transition-smooth"
                  }
                ),
                "Back to Blog"
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "mb-5 font-body text-xs uppercase tracking-wider text-primary border-primary/30 bg-primary/5",
              children: "Food & Recipes"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h1,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.15 },
          className: "font-display text-4xl md:text-5xl text-foreground leading-tight mb-6",
          "data-ocid": "blog_post.title",
          children: post.title
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.2 },
          className: "flex flex-wrap items-center gap-5 pb-8 border-b border-border",
          "data-ocid": "blog_post.meta",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-sm text-muted-foreground font-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14, className: "text-primary/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: post.author })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-sm text-muted-foreground font-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 14, className: "text-primary/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(post.publishedAt) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.25 },
          className: "mt-8 font-display text-xl md:text-2xl text-foreground/80 leading-relaxed",
          children: post.excerpt
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.3 },
          className: "mt-8 space-y-6",
          "data-ocid": "blog_post.content",
          children: paragraphs.length > 0 ? paragraphs.map((para, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-body text-base md:text-lg text-foreground/85 leading-relaxed",
              children: para
            },
            `para-${para.slice(0, 20).replace(/\s/g, "-")}-${i}`
          )) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-base md:text-lg text-foreground/85 leading-relaxed", children: post.content })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4 },
          className: "mt-14 pt-8 border-t border-border flex items-center gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 20, className: "text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body font-semibold text-sm text-foreground", children: post.author }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground", children: "Recipe developer & food writer at Delicious Bites" })
            ] })
          ]
        }
      )
    ] }),
    relatedPosts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 border-t border-border py-14 md:py-20",
        "data-ocid": "blog_post.related_posts_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl text-foreground mb-8", children: "More from the Blog" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: relatedPosts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCard, { post: p, index: i }, p.id.toString())) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background border-t border-border py-14 md:py-20",
        "data-ocid": "blog_post.recommended_recipes_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl text-foreground", children: "You Might Also Like" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/recipes",
                search: EMPTY_RECIPE_SEARCH,
                className: "font-body text-sm text-primary hover:text-primary/80 transition-smooth border-b border-primary/40 pb-0.5",
                "data-ocid": "blog_post.all_recipes_link",
                children: "All Recipes"
              }
            )
          ] }),
          recipesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-3 gap-6",
              "data-ocid": "blog_post.recommended_recipes_loading",
              children: ["rsk-1", "rsk-2", "rsk-3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "bg-card border border-border rounded overflow-hidden",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/3] w-full" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
                    ] })
                  ]
                },
                k
              ))
            }
          ) : recommendedRecipes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-body text-sm text-muted-foreground",
              "data-ocid": "blog_post.recommended_recipes_empty",
              children: "No recipes available yet."
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: recommendedRecipes.map((recipe, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            RecipeSuggestionCard,
            {
              recipe,
              index: i
            },
            recipe.id.toString()
          )) })
        ] })
      }
    )
  ] });
}
export {
  BlogPost as default
};
