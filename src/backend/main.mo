import Types "types/recipes-blog";
import Lib "lib/recipes-blog";
import RecipesBlogApi "mixins/recipes-blog-api";
import List "mo:core/List";

actor {
  let recipes : List.List<Types.Recipe> = List.empty();
  let blogPosts : List.List<Types.BlogPost> = List.empty();
  let ratings : List.List<Types.Rating> = List.empty();
  let contacts : List.List<Types.ContactSubmission> = List.empty();
  let recipeSubmissions : List.List<Types.RecipeSubmission> = List.empty();

  Lib.seedRecipes(recipes);
  Lib.seedBlogPosts(blogPosts);

  include RecipesBlogApi(recipes, blogPosts, ratings, contacts, recipeSubmissions);
};
