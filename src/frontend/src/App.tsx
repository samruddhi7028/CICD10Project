import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Recipes = lazy(() => import("./pages/Recipes"));
const RecipeDetail = lazy(() => import("./pages/RecipeDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Home />
    </Suspense>
  ),
});

export type RecipesSearch = {
  category?: string;
  dietaryTag?: string;
  difficulty?: string;
  q?: string;
};

export const EMPTY_RECIPE_SEARCH: RecipesSearch = {
  category: undefined,
  dietaryTag: undefined,
  difficulty: undefined,
  q: undefined,
};

const recipesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/recipes",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Recipes />
    </Suspense>
  ),
  validateSearch: (search: Record<string, unknown>): RecipesSearch => ({
    category: (search.category as string | undefined) ?? undefined,
    dietaryTag: (search.dietaryTag as string | undefined) ?? undefined,
    difficulty: (search.difficulty as string | undefined) ?? undefined,
    q: (search.q as string | undefined) ?? undefined,
  }),
});

const recipeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/recipes/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RecipeDetail />
    </Suspense>
  ),
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Blog />
    </Suspense>
  ),
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BlogPost />
    </Suspense>
  ),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Contact />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  recipesRoute,
  recipeDetailRoute,
  blogRoute,
  blogPostRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}
