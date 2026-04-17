import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Clock, Flame } from "lucide-react";
import { motion } from "motion/react";
import {
  categoryLabel,
  difficultyColor,
  difficultyLabel,
  formatTotalTime,
} from "../lib/utils";
import type { Category, Difficulty, Recipe } from "../types";

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
  ocidPrefix?: string;
}

export function RecipeCard({
  recipe,
  index,
  ocidPrefix = "recipe",
}: RecipeCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.4) }}
      className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-smooth flex flex-col"
      data-ocid={`${ocidPrefix}.item.${index + 1}`}
    >
      {/* Image */}
      <div className="aspect-recipe overflow-hidden bg-muted relative">
        <img
          src={recipe.imageUrl || "/assets/images/placeholder.svg"}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        {/* Category overlay badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-card/90 text-foreground border-0 font-body text-xs shadow-subtle backdrop-blur-sm">
            {categoryLabel(recipe.category as Category)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Meta row */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-body font-medium ${difficultyColor(recipe.difficulty as Difficulty)}`}
          >
            <Flame size={10} />
            {difficultyLabel(recipe.difficulty as Difficulty)}
          </span>
          <span className="flex items-center gap-1 text-xs font-body text-muted-foreground ml-auto">
            <Clock size={11} />
            {formatTotalTime(recipe.prepTime, recipe.cookTime)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-smooth line-clamp-2 flex-1">
          {recipe.name}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-muted-foreground mt-1.5 line-clamp-2">
          {recipe.description}
        </p>

        {/* CTA */}
        <Link
          to="/recipes/$id"
          params={{ id: recipe.id.toString() }}
          data-ocid={`${ocidPrefix}.get_recipe_button.${index + 1}`}
          className="mt-4 block"
        >
          <Button
            size="sm"
            className="w-full font-body text-xs tracking-wide bg-accent text-accent-foreground hover:bg-accent/85 border-0 transition-smooth"
          >
            Get Recipe
          </Button>
        </Link>
      </div>
    </motion.article>
  );
}
