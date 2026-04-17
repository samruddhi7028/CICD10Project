import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { CalendarDays, User } from "lucide-react";
import { motion } from "motion/react";
import { formatDate } from "../lib/utils";
import type { BlogPost } from "../types";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}

export function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
      data-ocid={`blog.card.${index + 1}`}
    >
      <Link to="/blog/$id" params={{ id: post.id.toString() }}>
        <div
          className={`overflow-hidden rounded-sm bg-card border border-border hover:border-primary/30 transition-smooth ${featured ? "flex flex-col md:flex-row gap-0" : "flex flex-col"}`}
        >
          {/* Image */}
          <div
            className={`relative overflow-hidden ${featured ? "md:w-3/5 aspect-[4/3] md:aspect-auto" : "aspect-[4/3]"}`}
          >
            <img
              src={
                post.featuredImage ||
                "/assets/generated/blog-hero-pasta.dim_1200x600.jpg"
              }
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
          </div>

          {/* Content */}
          <div
            className={`flex flex-col justify-between p-5 ${featured ? "md:w-2/5 md:p-8" : ""}`}
          >
            <div>
              <Badge
                variant="outline"
                className="mb-3 font-body text-xs uppercase tracking-wider text-primary border-primary/30 bg-primary/5"
              >
                Food & Recipes
              </Badge>
              <h2
                className={`font-display text-foreground group-hover:text-primary transition-smooth leading-snug ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}
              >
                {post.title}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground font-body line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-5 pt-4 border-t border-border">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
                <User size={12} className="text-primary/60" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
                <CalendarDays size={12} className="text-primary/60" />
                {formatDate(post.publishedAt)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function BlogCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className={`rounded-sm border border-border overflow-hidden bg-card ${featured ? "flex flex-col md:flex-row" : "flex flex-col"}`}
    >
      <Skeleton
        className={`${featured ? "md:w-3/5 aspect-[4/3] md:aspect-auto" : "aspect-[4/3]"}`}
      />
      <div
        className={`p-5 flex flex-col gap-3 ${featured ? "md:w-2/5 md:p-8" : ""}`}
      >
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-4/5" />
        <Skeleton className="h-4 w-full mt-1" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-4 mt-auto pt-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
    </div>
  );
}
