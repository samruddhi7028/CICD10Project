import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, Star, User } from "lucide-react";
import { motion } from "motion/react";
import { EMPTY_RECIPE_SEARCH } from "../App";
import { BlogCard } from "../components/BlogCard";
import { useBlogPost, useBlogPosts } from "../hooks/useBlog";
import { useRecipes } from "../hooks/useRecipes";
import { formatDate, formatTotalTime } from "../lib/utils";
import type { Recipe } from "../types";

function RecipeSuggestionCard({
  recipe,
  index,
}: { recipe: Recipe; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
      data-ocid={`blog_post.recommended_recipe.${index + 1}`}
    >
      <Link to="/recipes/$id" params={{ id: recipe.id.toString() }}>
        <div className="flex flex-col overflow-hidden rounded-sm border border-border bg-card hover:border-primary/30 transition-smooth">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={
                recipe.imageUrl ||
                "/assets/generated/blog-card-bowl.dim_600x400.jpg"
              }
              alt={recipe.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700"
            />
          </div>
          <div className="p-4">
            <h4 className="font-display text-lg text-foreground group-hover:text-primary transition-smooth leading-snug line-clamp-2">
              {recipe.name}
            </h4>
            <div className="flex items-center gap-3 mt-3">
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                <Clock size={11} />
                {formatTotalTime(recipe.prepTime, recipe.cookTime)}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                <Star size={11} />
                {String(recipe.difficulty)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogPost() {
  const { id } = useParams({ from: "/blog/$id" });
  const postId = BigInt(id);

  const { data: post, isLoading, error } = useBlogPost(postId);
  const { data: allPosts } = useBlogPosts();
  const { data: recipes, isLoading: recipesLoading } = useRecipes();

  const recommendedRecipes = recipes?.slice(0, 3) ?? [];
  const relatedPosts =
    allPosts?.filter((p) => p.id !== postId).slice(0, 2) ?? [];

  // Loading State
  if (isLoading) {
    return (
      <div
        className="bg-background min-h-screen"
        data-ocid="blog_post.loading_state"
      >
        <Skeleton className="w-full h-[50vh]" />
        <div className="container mx-auto px-4 max-w-3xl py-12 space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-4/5" />
          <div className="flex gap-4 mt-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="mt-8 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // 404 / error state
  if (!post || error) {
    return (
      <div
        className="bg-background min-h-screen flex items-center justify-center"
        data-ocid="blog_post.error_state"
      >
        <div className="text-center py-24 max-w-md mx-auto px-4">
          <span className="text-6xl block mb-6">📄</span>
          <h1 className="font-display text-4xl text-foreground mb-4">
            Post not found
          </h1>
          <p className="text-muted-foreground font-body mb-8">
            This story seems to have wandered off. Head back to the blog for
            more delicious reading.
          </p>
          <Link
            to="/blog"
            data-ocid="blog_post.back_to_blog_link"
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-primary hover:text-primary/80 transition-smooth border-b border-primary/40 pb-0.5"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Split content into paragraphs
  const paragraphs = post.content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="bg-background min-h-screen" data-ocid="blog_post.page">
      {/* Full-width hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full aspect-hero overflow-hidden bg-muted"
        data-ocid="blog_post.hero_image"
      >
        <img
          src={
            post.featuredImage ||
            "/assets/generated/blog-hero-pasta.dim_1200x600.jpg"
          }
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Article Content */}
      <div className="container mx-auto px-4 max-w-3xl py-12 md:py-16">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/blog"
            data-ocid="blog_post.back_to_blog_link"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-smooth mb-8 group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-smooth"
            />
            Back to Blog
          </Link>
        </motion.div>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Badge
            variant="outline"
            className="mb-5 font-body text-xs uppercase tracking-wider text-primary border-primary/30 bg-primary/5"
          >
            Food &amp; Recipes
          </Badge>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-display text-4xl md:text-5xl text-foreground leading-tight mb-6"
          data-ocid="blog_post.title"
        >
          {post.title}
        </motion.h1>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap items-center gap-5 pb-8 border-b border-border"
          data-ocid="blog_post.meta"
        >
          <span className="flex items-center gap-2 text-sm text-muted-foreground font-body">
            <User size={14} className="text-primary/60" />
            <span>{post.author}</span>
          </span>
          <span className="flex items-center gap-2 text-sm text-muted-foreground font-body">
            <CalendarDays size={14} className="text-primary/60" />
            <span>{formatDate(post.publishedAt)}</span>
          </span>
        </motion.div>

        {/* Excerpt (lead paragraph) */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-8 font-display text-xl md:text-2xl text-foreground/80 leading-relaxed"
        >
          {post.excerpt}
        </motion.p>

        {/* Body paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 space-y-6"
          data-ocid="blog_post.content"
        >
          {paragraphs.length > 0 ? (
            paragraphs.map((para, i) => (
              <p
                key={`para-${para.slice(0, 20).replace(/\s/g, "-")}-${i}`}
                className="font-body text-base md:text-lg text-foreground/85 leading-relaxed"
              >
                {para}
              </p>
            ))
          ) : (
            <p className="font-body text-base md:text-lg text-foreground/85 leading-relaxed">
              {post.content}
            </p>
          )}
        </motion.div>

        {/* Author Footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-14 pt-8 border-t border-border flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User size={20} className="text-primary" />
          </div>
          <div>
            <p className="font-body font-semibold text-sm text-foreground">
              {post.author}
            </p>
            <p className="font-body text-xs text-muted-foreground">
              Recipe developer &amp; food writer at Delicious Bites
            </p>
          </div>
        </motion.div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section
          className="bg-muted/30 border-t border-border py-14 md:py-20"
          data-ocid="blog_post.related_posts_section"
        >
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="font-display text-3xl text-foreground mb-8">
              More from the Blog
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((p, i) => (
                <BlogCard key={p.id.toString()} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommended Recipes */}
      <section
        className="bg-background border-t border-border py-14 md:py-20"
        data-ocid="blog_post.recommended_recipes_section"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-3xl text-foreground">
              You Might Also Like
            </h2>
            <Link
              to="/recipes"
              search={EMPTY_RECIPE_SEARCH}
              className="font-body text-sm text-primary hover:text-primary/80 transition-smooth border-b border-primary/40 pb-0.5"
              data-ocid="blog_post.all_recipes_link"
            >
              All Recipes
            </Link>
          </div>

          {recipesLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
              data-ocid="blog_post.recommended_recipes_loading"
            >
              {["rsk-1", "rsk-2", "rsk-3"].map((k) => (
                <div
                  key={k}
                  className="bg-card border border-border rounded overflow-hidden"
                >
                  <Skeleton className="aspect-[4/3] w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : recommendedRecipes.length === 0 ? (
            <p
              className="font-body text-sm text-muted-foreground"
              data-ocid="blog_post.recommended_recipes_empty"
            >
              No recipes available yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {recommendedRecipes.map((recipe, i) => (
                <RecipeSuggestionCard
                  key={recipe.id.toString()}
                  recipe={recipe}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
