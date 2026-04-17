import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowUpDown } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import { BlogCard, BlogCardSkeleton } from "../components/BlogCard";
import { useBlogPosts } from "../hooks/useBlog";

type BlogSearch = { sort?: "newest" | "oldest" };

export default function Blog() {
  const search = useSearch({ from: "/blog" }) as BlogSearch;
  const sort = search.sort ?? "newest";
  const navigate = useNavigate();

  const { data: posts, isLoading, error } = useBlogPosts();

  const sorted = useMemo(() => {
    if (!posts) return [];
    return [...posts].sort((a, b) => {
      const diff = Number(b.publishedAt - a.publishedAt);
      return sort === "newest" ? diff : -diff;
    });
  }, [posts, sort]);

  const toggleSort = () => {
    void navigate({
      to: "/blog",
      search: { sort: sort === "newest" ? "oldest" : "newest" },
    });
  };

  return (
    <div className="bg-background min-h-screen" data-ocid="blog.page">
      {/* Page Header */}
      <section
        className="bg-card border-b border-border"
        data-ocid="blog.header_section"
      >
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3"
          >
            From Our Kitchen
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl text-foreground leading-tight"
          >
            The Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base text-muted-foreground font-body max-w-md mx-auto"
          >
            Tips, stories, seasonal inspiration, and everything in between.
          </motion.p>
        </div>
      </section>

      {/* Blog Content */}
      <section
        className="container mx-auto px-4 py-12 md:py-16"
        data-ocid="blog.list_section"
      >
        {/* Sort Controls */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-muted-foreground font-body">
            {!isLoading && sorted.length > 0 && (
              <>
                {sorted.length} {sorted.length === 1 ? "post" : "posts"}
              </>
            )}
          </p>
          <button
            type="button"
            onClick={toggleSort}
            data-ocid="blog.sort_toggle"
            className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth px-3 py-1.5 rounded-sm border border-border hover:border-primary/30 bg-card"
          >
            <ArrowUpDown size={13} />
            {sort === "newest" ? "Newest First" : "Oldest First"}
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div data-ocid="blog.loading_state">
            <div className="mb-8">
              <BlogCardSkeleton featured />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <BlogCardSkeleton key="sk-1" />
              <BlogCardSkeleton key="sk-2" />
              <BlogCardSkeleton key="sk-3" />
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div
            className="text-center py-20 bg-card rounded-sm border border-border"
            data-ocid="blog.error_state"
          >
            <p className="font-display text-2xl text-foreground mb-2">
              Something went wrong
            </p>
            <p className="text-sm text-muted-foreground font-body">
              We couldn't load the blog posts. Please try again later.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && sorted.length === 0 && (
          <div
            className="text-center py-24 bg-card rounded-sm border border-border"
            data-ocid="blog.empty_state"
          >
            <span className="text-5xl mb-4 block">✍️</span>
            <p className="font-display text-2xl text-foreground mb-2">
              No posts yet
            </p>
            <p className="text-sm text-muted-foreground font-body max-w-xs mx-auto">
              Stories and recipes are on their way — check back soon.
            </p>
          </div>
        )}

        {/* Posts */}
        {!isLoading && !error && sorted.length > 0 && (
          <>
            {/* Featured post (first) */}
            <div className="mb-8" data-ocid="blog.featured_post">
              <BlogCard post={sorted[0]} index={0} featured />
            </div>

            {/* Grid of remaining posts */}
            {sorted.length > 1 && (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                data-ocid="blog.posts_grid"
              >
                {sorted.slice(1).map((post, i) => (
                  <BlogCard
                    key={post.id.toString()}
                    post={post}
                    index={i + 1}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
