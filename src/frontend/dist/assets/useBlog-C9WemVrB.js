import { n as createActor } from "./index-C5v_uq_Z.js";
import { u as useActor, a as useQuery } from "./proxy-BoDJhELw.js";
function useBlogPosts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBlogPosts();
    },
    enabled: !!actor && !isFetching
  });
}
function useBlogPost(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["blogPost", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getBlogPost(id);
    },
    enabled: !!actor && !isFetching && id !== null
  });
}
export {
  useBlogPost as a,
  useBlogPosts as u
};
