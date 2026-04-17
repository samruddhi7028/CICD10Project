import Types "../types/recipes-blog";
import Lib "../lib/recipes-blog";
import List "mo:core/List";

mixin (
  recipes : List.List<Types.Recipe>,
  blogPosts : List.List<Types.BlogPost>,
  ratings : List.List<Types.Rating>,
  contacts : List.List<Types.ContactSubmission>,
  recipeSubmissions : List.List<Types.RecipeSubmission>,
) {
  public query func getRecipes(
    search : ?Text,
    category : ?Types.Category,
    dietaryTag : ?Types.DietaryTag,
    difficulty : ?Types.Difficulty,
    maxPrepTime : ?Nat,
  ) : async [Types.Recipe] {
    Lib.getRecipes(recipes, search, category, dietaryTag, difficulty, maxPrepTime)
  };

  public query func getRecipe(id : Types.RecipeId) : async ?Types.Recipe {
    Lib.getRecipe(recipes, id)
  };

  public query func getBlogPosts() : async [Types.BlogPost] {
    Lib.getBlogPosts(blogPosts)
  };

  public query func getBlogPost(id : Types.BlogPostId) : async ?Types.BlogPost {
    Lib.getBlogPost(blogPosts, id)
  };

  public query func getRatings(recipeId : Types.RecipeId) : async [Types.Rating] {
    Lib.getRatings(ratings, recipeId)
  };

  public shared func addRating(
    recipeId : Types.RecipeId,
    score : Nat,
    comment : ?Text,
    commenterName : Text,
  ) : async Types.Result {
    Lib.addRating(ratings, recipeId, score, comment, commenterName)
  };

  public shared func submitContact(
    name : Text,
    email : Text,
    subject : Text,
    message : Text,
  ) : async Types.Result {
    Lib.submitContact(contacts, name, email, subject, message)
  };

  public shared func submitRecipe(
    name : Text,
    email : Text,
    recipeName : Text,
    category : Types.Category,
    ingredients : Text,
    instructions : Text,
    difficulty : Types.Difficulty,
    dietaryTags : [Types.DietaryTag],
    prepTime : Nat,
    cookTime : Nat,
  ) : async Types.Result {
    Lib.submitRecipe(recipeSubmissions, name, email, recipeName, category, ingredients, instructions, difficulty, dietaryTags, prepTime, cookTime)
  };
};
