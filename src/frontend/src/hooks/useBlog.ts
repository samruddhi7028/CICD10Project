import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { BlogPost, BlogPostId } from "../types";

export function useBlogPosts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBlogPost(id: BlogPostId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BlogPost | null>({
    queryKey: ["blogPost", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getBlogPost(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}
