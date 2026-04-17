import { cn } from "@/lib/utils";
import { Facebook, Instagram } from "lucide-react";
import { SiPinterest } from "react-icons/si";

interface SocialShareProps {
  recipeName: string;
  recipeUrl?: string;
  className?: string;
}

export function SocialShare({
  recipeName,
  recipeUrl,
  className,
}: SocialShareProps) {
  const url =
    recipeUrl ?? (typeof window !== "undefined" ? window.location.href : "");
  const encoded = encodeURIComponent(url);
  const caption = encodeURIComponent(`Check out this recipe: ${recipeName}`);

  const platforms = [
    {
      name: "Pinterest",
      href: `https://pinterest.com/pin/create/button/?url=${encoded}&description=${caption}`,
      icon: <SiPinterest size={15} />,
      colorClass:
        "hover:bg-primary/10 hover:text-primary hover:border-primary/30",
      ocid: "social_share.pinterest_button",
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}&quote=${caption}`,
      icon: <Facebook size={15} />,
      colorClass:
        "hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30",
      ocid: "social_share.facebook_button",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/",
      icon: <Instagram size={15} />,
      colorClass:
        "hover:bg-accent/10 hover:text-accent-foreground hover:border-accent/30",
      ocid: "social_share.instagram_button",
    },
  ];

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      <span className="font-body text-xs text-muted-foreground uppercase tracking-wider mr-1">
        Share
      </span>
      {platforms.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${p.name}`}
          data-ocid={p.ocid}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-muted-foreground text-xs font-body transition-smooth",
            p.colorClass,
          )}
        >
          {p.icon}
          <span className="hidden sm:inline">{p.name}</span>
        </a>
      ))}
    </div>
  );
}
