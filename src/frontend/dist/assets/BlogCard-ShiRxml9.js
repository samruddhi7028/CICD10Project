import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, m as formatDate } from "./index-C5v_uq_Z.js";
import { m as motion, B as Badge } from "./proxy-BoDJhELw.js";
import { S as Skeleton } from "./skeleton-C78k2yN3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function BlogCard({ post, index = 0, featured = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.article,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index * 0.08 },
      className: "group",
      "data-ocid": `blog.card.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog/$id", params: { id: post.id.toString() }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `overflow-hidden rounded-sm bg-card border border-border hover:border-primary/30 transition-smooth ${featured ? "flex flex-col md:flex-row gap-0" : "flex flex-col"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `relative overflow-hidden ${featured ? "md:w-3/5 aspect-[4/3] md:aspect-auto" : "aspect-[4/3]"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: post.featuredImage || "/assets/generated/blog-hero-pasta.dim_1200x600.jpg",
                      alt: post.title,
                      className: "w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex flex-col justify-between p-5 ${featured ? "md:w-2/5 md:p-8" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "mb-3 font-body text-xs uppercase tracking-wider text-primary border-primary/30 bg-primary/5",
                        children: "Food & Recipes"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h2",
                      {
                        className: `font-display text-foreground group-hover:text-primary transition-smooth leading-snug ${featured ? "text-2xl md:text-3xl" : "text-xl"}`,
                        children: post.title
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground font-body line-clamp-3 leading-relaxed", children: post.excerpt })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-5 pt-4 border-t border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground font-body", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 12, className: "text-primary/60" }),
                      post.author
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground font-body", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 12, className: "text-primary/60" }),
                      formatDate(post.publishedAt)
                    ] })
                  ] })
                ]
              }
            )
          ]
        }
      ) })
    }
  );
}
function BlogCardSkeleton({ featured = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-sm border border-border overflow-hidden bg-card ${featured ? "flex flex-col md:flex-row" : "flex flex-col"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: `${featured ? "md:w-3/5 aspect-[4/3] md:aspect-auto" : "aspect-[4/3]"}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `p-5 flex flex-col gap-3 ${featured ? "md:w-2/5 md:p-8" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-4/5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full mt-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-auto pt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-28" })
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  BlogCardSkeleton as B,
  CalendarDays as C,
  User as U,
  BlogCard as a
};
