import { c as createLucideIcon, e as useSearch, u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-C5v_uq_Z.js";
import { B as BlogCardSkeleton, a as BlogCard } from "./BlogCard-ShiRxml9.js";
import { u as useBlogPosts } from "./useBlog-C9WemVrB.js";
import { m as motion } from "./proxy-BoDJhELw.js";
import "./skeleton-C78k2yN3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
];
const ArrowUpDown = createLucideIcon("arrow-up-down", __iconNode);
function Blog() {
  const search = useSearch({ from: "/blog" });
  const sort = search.sort ?? "newest";
  const navigate = useNavigate();
  const { data: posts, isLoading, error } = useBlogPosts();
  const sorted = reactExports.useMemo(() => {
    if (!posts) return [];
    return [...posts].sort((a, b) => {
      const diff = Number(b.publishedAt - a.publishedAt);
      return sort === "newest" ? diff : -diff;
    });
  }, [posts, sort]);
  const toggleSort = () => {
    void navigate({
      to: "/blog",
      search: { sort: sort === "newest" ? "oldest" : "newest" }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", "data-ocid": "blog.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-card border-b border-border",
        "data-ocid": "blog.header_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 md:py-24 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4 },
              className: "font-body text-xs uppercase tracking-widest text-muted-foreground mb-3",
              children: "From Our Kitchen"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.1 },
              className: "font-display text-5xl md:text-6xl text-foreground leading-tight",
              children: "The Blog"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.2 },
              className: "mt-4 text-base text-muted-foreground font-body max-w-md mx-auto",
              children: "Tips, stories, seasonal inspiration, and everything in between."
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "container mx-auto px-4 py-12 md:py-16",
        "data-ocid": "blog.list_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: !isLoading && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              sorted.length,
              " ",
              sorted.length === 1 ? "post" : "posts"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: toggleSort,
                "data-ocid": "blog.sort_toggle",
                className: "flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth px-3 py-1.5 rounded-sm border border-border hover:border-primary/30 bg-card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { size: 13 }),
                  sort === "newest" ? "Newest First" : "Oldest First"
                ]
              }
            )
          ] }),
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "blog.loading_state", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCardSkeleton, { featured: true }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCardSkeleton, {}, "sk-1"),
              /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCardSkeleton, {}, "sk-2"),
              /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCardSkeleton, {}, "sk-3")
            ] })
          ] }),
          error && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-20 bg-card rounded-sm border border-border",
              "data-ocid": "blog.error_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl text-foreground mb-2", children: "Something went wrong" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: "We couldn't load the blog posts. Please try again later." })
              ]
            }
          ),
          !isLoading && !error && sorted.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-24 bg-card rounded-sm border border-border",
              "data-ocid": "blog.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl mb-4 block", children: "✍️" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl text-foreground mb-2", children: "No posts yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body max-w-xs mx-auto", children: "Stories and recipes are on their way — check back soon." })
              ]
            }
          ),
          !isLoading && !error && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", "data-ocid": "blog.featured_post", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCard, { post: sorted[0], index: 0, featured: true }) }),
            sorted.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                "data-ocid": "blog.posts_grid",
                children: sorted.slice(1).map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  BlogCard,
                  {
                    post,
                    index: i + 1
                  },
                  post.id.toString()
                ))
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  Blog as default
};
