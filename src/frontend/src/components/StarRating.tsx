import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  score: number;
  maxScore?: number;
  size?: number;
  interactive?: boolean;
  onRate?: (score: number) => void;
  className?: string;
}

export function StarRating({
  score,
  maxScore = 5,
  size = 16,
  interactive = false,
  onRate,
  className,
}: StarRatingProps) {
  const stars = Array.from({ length: maxScore }, (_, i) => i + 1);

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRate?.(star)}
          aria-label={
            interactive ? `Rate ${star} out of ${maxScore}` : undefined
          }
          className={cn(
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
            interactive
              ? "cursor-pointer hover:scale-110 transition-transform duration-150"
              : "cursor-default pointer-events-none",
          )}
          data-ocid={interactive ? `star_rating.star_${star}` : undefined}
        >
          <Star
            size={size}
            className={cn(
              star <= score
                ? "text-accent fill-accent"
                : "text-muted-foreground/40",
              interactive && star > score && "hover:text-accent/60",
            )}
          />
        </button>
      ))}
    </div>
  );
}

interface AverageRatingProps {
  average: number;
  count: number;
  size?: number;
  showCount?: boolean;
  className?: string;
}

export function AverageRating({
  average,
  count,
  size = 16,
  showCount = true,
  className,
}: AverageRatingProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <StarRating score={Math.round(average)} size={size} />
      <span className="font-body text-sm font-semibold text-foreground">
        {average.toFixed(1)}
      </span>
      {showCount && (
        <span className="font-body text-xs text-muted-foreground">
          ({count} {count === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
}
