import Common "common";

module {
  public type Timestamp = Common.Timestamp;
  public type RecipeId = Common.RecipeId;
  public type BlogPostId = Common.BlogPostId;
  public type Result = Common.Result;

  public type Category = {
    #Breakfast;
    #Lunch;
    #Dinner;
    #Desserts;
    #Vegan;
  };

  public type DietaryTag = {
    #Vegan;
    #GlutenFree;
    #Keto;
  };

  public type Difficulty = {
    #Easy;
    #Medium;
    #Hard;
  };

  public type Ingredient = {
    name : Text;
    quantity : Text;
  };

  public type Recipe = {
    id : RecipeId;
    name : Text;
    category : Category;
    dietaryTags : [DietaryTag];
    difficulty : Difficulty;
    prepTime : Nat;
    cookTime : Nat;
    description : Text;
    ingredients : [Ingredient];
    instructions : [Text];
    imageUrl : Text;
    createdAt : Timestamp;
  };

  public type BlogPost = {
    id : BlogPostId;
    title : Text;
    excerpt : Text;
    content : Text;
    author : Text;
    featuredImage : Text;
    publishedAt : Timestamp;
    createdAt : Timestamp;
  };

  public type Rating = {
    recipeId : RecipeId;
    score : Nat;
    comment : ?Text;
    commenterName : Text;
    createdAt : Timestamp;
  };

  public type ContactSubmission = {
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    submittedAt : Timestamp;
  };

  public type RecipeSubmission = {
    name : Text;
    email : Text;
    recipeName : Text;
    category : Category;
    ingredients : Text;
    instructions : Text;
    difficulty : Difficulty;
    dietaryTags : [DietaryTag];
    prepTime : Nat;
    cookTime : Nat;
    submittedAt : Timestamp;
  };
};
