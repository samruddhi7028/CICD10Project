import Types "../types/recipes-blog";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func getRecipes(
    recipes : List.List<Types.Recipe>,
    search : ?Text,
    category : ?Types.Category,
    dietaryTag : ?Types.DietaryTag,
    difficulty : ?Types.Difficulty,
    maxPrepTime : ?Nat,
  ) : [Types.Recipe] {
    let filtered = recipes.filter(func(r : Types.Recipe) : Bool {
      let matchSearch = switch (search) {
        case null true;
        case (?term) {
          let lower = term.toLower();
          r.name.toLower().contains(#text lower) or r.description.toLower().contains(#text lower)
        };
      };
      let matchCategory = switch (category) {
        case null true;
        case (?cat) r.category == cat;
      };
      let matchDietaryTag = switch (dietaryTag) {
        case null true;
        case (?tag) {
          r.dietaryTags.find(func(t : Types.DietaryTag) : Bool { t == tag }) != null
        };
      };
      let matchDifficulty = switch (difficulty) {
        case null true;
        case (?diff) r.difficulty == diff;
      };
      let matchPrepTime = switch (maxPrepTime) {
        case null true;
        case (?maxTime) r.prepTime <= maxTime;
      };
      matchSearch and matchCategory and matchDietaryTag and matchDifficulty and matchPrepTime
    });
    filtered.toArray()
  };

  public func getRecipe(recipes : List.List<Types.Recipe>, id : Types.RecipeId) : ?Types.Recipe {
    recipes.find(func(r : Types.Recipe) : Bool { r.id == id })
  };

  public func getBlogPosts(blogPosts : List.List<Types.BlogPost>) : [Types.BlogPost] {
    blogPosts.toArray()
  };

  public func getBlogPost(blogPosts : List.List<Types.BlogPost>, id : Types.BlogPostId) : ?Types.BlogPost {
    blogPosts.find(func(p : Types.BlogPost) : Bool { p.id == id })
  };

  public func getRatings(ratings : List.List<Types.Rating>, recipeId : Types.RecipeId) : [Types.Rating] {
    let filtered = ratings.filter(func(r : Types.Rating) : Bool { r.recipeId == recipeId });
    filtered.toArray()
  };

  public func addRating(
    ratings : List.List<Types.Rating>,
    recipeId : Types.RecipeId,
    score : Nat,
    comment : ?Text,
    commenterName : Text,
  ) : Types.Result {
    if (score < 1 or score > 5) {
      return #err "Score must be between 1 and 5";
    };
    if (commenterName.size() == 0) {
      return #err "Commenter name cannot be empty";
    };
    let rating : Types.Rating = {
      recipeId;
      score;
      comment;
      commenterName;
      createdAt = Time.now();
    };
    ratings.add(rating);
    #ok "Rating submitted successfully"
  };

  public func submitContact(
    contacts : List.List<Types.ContactSubmission>,
    name : Text,
    email : Text,
    subject : Text,
    message : Text,
  ) : Types.Result {
    if (name.size() == 0 or email.size() == 0 or subject.size() == 0 or message.size() == 0) {
      return #err "All fields are required";
    };
    let submission : Types.ContactSubmission = {
      name;
      email;
      subject;
      message;
      submittedAt = Time.now();
    };
    contacts.add(submission);
    #ok "Message submitted successfully"
  };

  public func submitRecipe(
    submissions : List.List<Types.RecipeSubmission>,
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
  ) : Types.Result {
    if (name.size() == 0 or email.size() == 0 or recipeName.size() == 0) {
      return #err "Name, email, and recipe name are required";
    };
    let submission : Types.RecipeSubmission = {
      name;
      email;
      recipeName;
      category;
      ingredients;
      instructions;
      difficulty;
      dietaryTags;
      prepTime;
      cookTime;
      submittedAt = Time.now();
    };
    submissions.add(submission);
    #ok "Recipe submitted successfully"
  };

  public func seedRecipes(recipes : List.List<Types.Recipe>) {
    if (not recipes.isEmpty()) return;

    let now = Time.now();

    recipes.add({
      id = 1;
      name = "Fluffy Banana Pancakes";
      category = #Breakfast;
      dietaryTags = [#Vegan, #GlutenFree];
      difficulty = #Easy;
      prepTime = 10;
      cookTime = 15;
      description = "Light and fluffy pancakes made with ripe bananas and oat flour. A wholesome, naturally sweet breakfast that's both vegan and gluten-free. Perfect for lazy weekend mornings.";
      ingredients = [
        { name = "Ripe bananas"; quantity = "2 large" },
        { name = "Oat flour"; quantity = "1 cup" },
        { name = "Almond milk"; quantity = "1/2 cup" },
        { name = "Flax egg (1 tbsp ground flaxseed + 3 tbsp water)"; quantity = "1" },
        { name = "Baking powder"; quantity = "1 tsp" },
        { name = "Vanilla extract"; quantity = "1 tsp" },
        { name = "Maple syrup"; quantity = "2 tbsp" },
        { name = "Coconut oil"; quantity = "1 tbsp" },
      ];
      instructions = [
        "Prepare the flax egg by mixing ground flaxseed with water; let sit for 5 minutes until gel-like.",
        "Mash the bananas in a large bowl until smooth, then mix in the flax egg, almond milk, maple syrup, and vanilla.",
        "Stir in the oat flour and baking powder until just combined — do not overmix.",
        "Heat a non-stick skillet over medium heat and lightly grease with coconut oil.",
        "Pour 1/4 cup batter per pancake onto the skillet. Cook 2-3 minutes until bubbles form, then flip and cook 1-2 minutes more.",
        "Serve warm with fresh berries and extra maple syrup.",
      ];
      imageUrl = "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80";
      createdAt = now;
    });

    recipes.add({
      id = 2;
      name = "Classic Avocado Toast with Poached Eggs";
      category = #Breakfast;
      dietaryTags = [];
      difficulty = #Easy;
      prepTime = 10;
      cookTime = 10;
      description = "A modern breakfast staple — creamy smashed avocado on toasted sourdough topped with perfectly poached eggs, red pepper flakes, and a squeeze of lemon. Simple, nourishing, and utterly satisfying.";
      ingredients = [
        { name = "Sourdough bread"; quantity = "2 thick slices" },
        { name = "Ripe avocado"; quantity = "1 large" },
        { name = "Eggs"; quantity = "2" },
        { name = "Lemon juice"; quantity = "1 tbsp" },
        { name = "Red pepper flakes"; quantity = "1/4 tsp" },
        { name = "Sea salt"; quantity = "to taste" },
        { name = "Black pepper"; quantity = "to taste" },
        { name = "White vinegar (for poaching)"; quantity = "1 tbsp" },
      ];
      instructions = [
        "Toast the sourdough slices until golden and crisp.",
        "Halve and pit the avocado. Scoop flesh into a bowl, add lemon juice, salt, and pepper, then mash to desired consistency.",
        "Bring a pot of water to a gentle simmer and add the white vinegar.",
        "Crack each egg into a small cup; swirl the water and gently slide the egg in. Poach for 3-4 minutes.",
        "Spread the avocado mash generously over each toast slice.",
        "Top with poached eggs, sprinkle with red pepper flakes, and season to taste.",
      ];
      imageUrl = "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80";
      createdAt = now;
    });

    recipes.add({
      id = 3;
      name = "Thai Basil Chicken Stir-Fry";
      category = #Dinner;
      dietaryTags = [#GlutenFree, #Keto];
      difficulty = #Medium;
      prepTime = 15;
      cookTime = 15;
      description = "A bold, aromatic Thai street-food classic made with ground chicken, fresh Thai basil, garlic, and bird's eye chilies. Ready in 30 minutes and packed with vibrant flavor, it's the perfect weeknight dinner.";
      ingredients = [
        { name = "Ground chicken"; quantity = "500g" },
        { name = "Fresh Thai basil leaves"; quantity = "1 cup" },
        { name = "Garlic cloves, minced"; quantity = "4" },
        { name = "Bird's eye chilies, sliced"; quantity = "3-4" },
        { name = "Fish sauce"; quantity = "2 tbsp" },
        { name = "Oyster sauce"; quantity = "1 tbsp" },
        { name = "Coconut aminos (or low-sodium soy sauce)"; quantity = "1 tbsp" },
        { name = "Vegetable oil"; quantity = "2 tbsp" },
      ];
      instructions = [
        "Heat vegetable oil in a wok or large skillet over high heat until smoking.",
        "Add garlic and chilies; stir-fry for 30 seconds until fragrant.",
        "Add ground chicken, breaking it up with a spatula. Cook for 5-6 minutes until browned.",
        "Mix fish sauce, oyster sauce, and coconut aminos together; pour over the chicken.",
        "Stir-fry for 2 more minutes until the sauce is absorbed and the chicken is caramelized.",
        "Remove from heat, fold in fresh Thai basil leaves, and serve over steamed jasmine rice.",
      ];
      imageUrl = "https://images.unsplash.com/photo-1562802378-063ec186a863?w=800&q=80";
      createdAt = now;
    });

    recipes.add({
      id = 4;
      name = "Chocolate Lava Cake";
      category = #Desserts;
      dietaryTags = [];
      difficulty = #Medium;
      prepTime = 15;
      cookTime = 12;
      description = "Indulgent individual chocolate cakes with a gloriously molten center. This restaurant-quality dessert is surprisingly simple to make at home, and guaranteed to impress any guest. Serve immediately for the full dramatic effect.";
      ingredients = [
        { name = "Dark chocolate (70%)"; quantity = "150g" },
        { name = "Unsalted butter"; quantity = "100g" },
        { name = "Eggs"; quantity = "2" },
        { name = "Egg yolks"; quantity = "2" },
        { name = "Caster sugar"; quantity = "60g" },
        { name = "All-purpose flour"; quantity = "3 tbsp" },
        { name = "Cocoa powder (for dusting)"; quantity = "1 tbsp" },
        { name = "Vanilla extract"; quantity = "1 tsp" },
      ];
      instructions = [
        "Preheat oven to 200°C (390°F). Grease 4 ramekins with butter and dust with cocoa powder.",
        "Melt dark chocolate and butter together in a heatproof bowl over simmering water, stirring until smooth. Cool slightly.",
        "Whisk eggs, egg yolks, and sugar together vigorously until pale and thick, about 2 minutes.",
        "Fold the chocolate mixture and vanilla into the egg mixture until combined.",
        "Sift in the flour and fold gently until just incorporated — do not overmix.",
        "Divide batter among ramekins. Bake for 10-12 minutes until the edges are set but the center still wobbles.",
        "Run a knife around the edge, invert onto plates, and serve immediately with vanilla ice cream.",
      ];
      imageUrl = "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80";
      createdAt = now;
    });

    recipes.add({
      id = 5;
      name = "Roasted Red Pepper and Tomato Soup";
      category = #Vegan;
      dietaryTags = [#Vegan, #GlutenFree];
      difficulty = #Easy;
      prepTime = 15;
      cookTime = 40;
      description = "A deeply flavored, velvety soup made from fire-roasted red peppers, ripe tomatoes, and fragrant garlic. This comforting bowl is entirely plant-based, naturally sweet, and perfect paired with crusty bread on a cool evening.";
      ingredients = [
        { name = "Red bell peppers"; quantity = "4 large" },
        { name = "Ripe tomatoes"; quantity = "500g" },
        { name = "Garlic cloves"; quantity = "5" },
        { name = "Yellow onion, diced"; quantity = "1 large" },
        { name = "Vegetable broth"; quantity = "500ml" },
        { name = "Olive oil"; quantity = "3 tbsp" },
        { name = "Fresh basil"; quantity = "1/4 cup" },
        { name = "Salt and black pepper"; quantity = "to taste" },
      ];
      instructions = [
        "Preheat oven to 220°C (425°F). Halve the peppers, place cut-side down on a baking tray with whole tomatoes and unpeeled garlic cloves. Drizzle with 2 tbsp olive oil.",
        "Roast for 30-35 minutes until the peppers are charred and tomatoes are blistered.",
        "While the vegetables roast, sauté the onion in remaining olive oil over medium heat for 8 minutes until softened.",
        "Peel the roasted garlic and add it, along with the roasted peppers and tomatoes (with juices), to the pot.",
        "Pour in the vegetable broth, bring to a simmer, and cook for 10 minutes.",
        "Blend until smooth using an immersion blender. Season generously and stir in fresh basil before serving.",
      ];
      imageUrl = "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80";
      createdAt = now;
    });
  };

  public func seedBlogPosts(blogPosts : List.List<Types.BlogPost>) {
    if (not blogPosts.isEmpty()) return;

    let now = Time.now();

    blogPosts.add({
      id = 1;
      title = "10 Knife Skills Every Home Cook Should Master";
      excerpt = "Sharp knives and proper technique can transform your time in the kitchen. Here's what you need to know to cut smarter, safer, and faster.";
      content = "Great cooking starts long before anything hits the pan — it starts at the cutting board. Mastering a few fundamental knife skills will not only speed up your prep time dramatically but also make cooking feel more effortless and enjoyable.\n\nThe most important skill is learning the basic rock chop: anchor the tip of your knife on the board and rock the heel up and down while guiding the blade forward with your knuckles. Keep your fingers curled inward in the 'bear claw' grip to protect your fingertips. This single technique handles 80% of all cutting tasks.\n\nBeyond the basics, learning to julienne vegetables (thin matchstick cuts), mince aromatics like garlic and ginger finely, and chiffonade fresh herbs like basil will elevate your dishes both in flavor release and presentation. Consistent, uniform cuts also mean ingredients cook evenly — no more half-burnt, half-raw onions.\n\nFinally, keep your knives sharp. A dull knife requires more force, which means less control and a higher risk of slipping. A honing steel used before each session and a whetstone sharpening every few months will keep your blades performing at their best.";
      author = "Chef Mia Torres";
      featuredImage = "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80";
      publishedAt = now;
      createdAt = now;
    });

    blogPosts.add({
      id = 2;
      title = "The Secret to Perfect Caramelized Onions";
      excerpt = "Low and slow is the only way. Learn why most recipes lie about caramelized onions — and how to actually make them right.";
      content = "Here's a truth that almost every recipe glosses over: real caramelized onions take 45 minutes to an hour, not 10. The Maillard reaction that transforms pungent raw onions into deeply sweet, golden, almost jammy ribbons simply cannot be rushed — and if you've ever ended up with pale, slightly soft onions instead of the real thing, now you know why.\n\nStart with more onions than you think you need. They reduce to about one-fifth of their volume. Slice them evenly, about 5mm thick, and choose a wide, heavy-bottomed pan — cast iron or stainless steel works beautifully. Heat a mix of butter and olive oil over medium-low heat, add the onions with a generous pinch of salt, and leave them largely alone.\n\nStir every 5-7 minutes, scraping up any browned bits from the bottom. If the pan gets too dry, add a splash of water or white wine to deglaze rather than turning up the heat. After 40-50 minutes, you'll have deeply golden, glossy onions with an almost sweet, savory complexity that will transform burgers, tarts, pasta, and grilled cheese sandwiches.\n\nFor extra depth, add a splash of balsamic vinegar or fresh thyme in the final 5 minutes. These slow-cooked onions keep refrigerated for a week and are endlessly useful.";
      author = "James Holloway";
      featuredImage = "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80";
      publishedAt = now;
      createdAt = now;
    });

    blogPosts.add({
      id = 3;
      title = "A Spotlight on Miso: The Umami Powerhouse in Your Fridge";
      excerpt = "Miso is one of the most versatile ingredients you can keep on hand. Here's everything you need to know about this fermented Japanese staple.";
      content = "Miso paste is made from fermented soybeans (and sometimes grains like rice or barley) and is one of Japan's most treasured culinary staples. But its genius is that it works far beyond miso soup — once you understand it, you'll be using it to enrich everything from salad dressings to roasted vegetables to marinades.\n\nThere are three main varieties to know. White miso (shiro miso) is fermented for the shortest time and has the mildest, slightly sweet flavor — it's great in light dressings, butter sauces, and as a glaze for fish. Yellow miso (shinshu miso) sits in the middle, with a balanced, earthy character that's excellent in soups and braises. Red miso (aka miso) is fermented longest, producing an intensely savory, salty paste perfect for hearty stews and strong marinades.\n\nThe key to using miso is never to boil it — heat destroys the beneficial probiotic bacteria and can make the flavor bitter. Always add it off the heat or whisk it into warm (not simmering) liquids. A small spoonful stirred into a vinaigrette, blended into hummus, or spread under the skin of a roast chicken adds a dimension of umami depth that's hard to replicate.\n\nStore miso in an airtight container in the refrigerator and it will last for months. Once you have it on hand, you'll find dozens of reasons to reach for it.";
      author = "Chef Mia Torres";
      featuredImage = "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80";
      publishedAt = now;
      createdAt = now;
    });

    blogPosts.add({
      id = 4;
      title = "How to Build a Flavor-Packed Meal from Your Pantry";
      excerpt = "Great cooking doesn't always require a grocery run. These pantry essentials and combinations will have you creating delicious meals from scratch.";
      content = "A well-stocked pantry is the foundation of confident, spontaneous cooking. With the right combination of shelf-stable ingredients, you can put together flavorful, satisfying meals on any weeknight — without a trip to the store.\n\nThe five pillars of a versatile pantry are: acids (canned tomatoes, vinegars, citrus), umami boosters (fish sauce, soy sauce, miso, anchovies, nutritional yeast), fats (good olive oil, coconut oil, tahini), aromatics (garlic, dried chilies, onions), and bulk staples (pasta, rice, lentils, canned beans). With these in place, the combinations are nearly endless.\n\nSome quick, powerful combinations to know: Canned chickpeas + olive oil + smoked paprika + lemon = a 15-minute roasted side dish. Pasta + canned anchovies + garlic + chili + breadcrumbs = aglio e olio with depth. Lentils + canned tomatoes + curry powder + coconut milk = a warming dal.\n\nThe trick is thinking in layers: start with aromatics cooked in fat, build with a sauce or liquid, season with acid and salt at the end. Once you internalize this structure, the pantry becomes a playground rather than a limitation.";
      author = "James Holloway";
      featuredImage = "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=800&q=80";
      publishedAt = now;
      createdAt = now;
    });

    blogPosts.add({
      id = 5;
      title = "Why Resting Meat Is Non-Negotiable (And How Long to Wait)";
      excerpt = "Cutting into your steak straight from the pan is the single most common mistake home cooks make. Here's the science behind why resting matters.";
      content = "You've cooked the perfect steak — beautiful crust, cooked to the ideal internal temperature — and then you cut straight into it and watch all the juices flood out onto the board. What went wrong? You didn't rest it.\n\nWhen meat is cooked, heat drives the moisture toward the center as the outer layers contract. The muscle fibers tighten and squeeze the liquid inward. If you cut immediately, all that juice — which contains both flavor and moisture — escapes onto your cutting board rather than redistributing through the meat as it cools slightly and relaxes.\n\nThe rule of thumb: rest meat for roughly half the time it took to cook, or at a minimum, for the following times based on size. Steaks and chops: 5-10 minutes under a loose foil tent. Chicken breasts: 5 minutes. Whole chicken: 15-20 minutes. Roast beef or pork loin: 20-30 minutes. Large roasts and whole birds like turkey: 30-45 minutes.\n\nDuring resting, the internal temperature of the meat will also continue rising (called carryover cooking) by 3-8°C — so always pull your meat off the heat slightly before it reaches its target temperature. A medium-rare steak should come off at around 52°C, not 57°C. Patience at this final step is what separates a good cook from a great one.";
      author = "Chef Mia Torres";
      featuredImage = "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80";
      publishedAt = now;
      createdAt = now;
    });
  };
};
