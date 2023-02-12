const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/Recipe");
const Comment = require("../models/Comment");


module.exports = {
  getRecipes: async (req, res) => {
    try {
      const recipes = await Recipe.find()
        .populate("user");

      res.render("recipes.ejs", { recipe: recipes, isLoggedIn: req.isAuthenticated() });
    } catch (err) {
      console.log(err);
    }
  },
  getRecipe: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);

      const comments = await Comment.find({ recipe: req.params.id })
        .populate("user")
        .sort({ createdAt: "desc" })
        .lean();


   console.log(recipe);

      res.render("recipe.ejs", {
        recipe: recipe,
        user: req.user,
        comments: comments,
        isLoggedIn: req.isAuthenticated(),
      });
    } catch (err) {
      console.log(err);
    }
  },
  createRecipe: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
    
      await Recipe.create({
        title: req.body.title,
        image: result.secure_url,
        difficulty: req.body.difficulty,
        instructions: req.body.instructions,
        cloudinaryId: result.public_id,
        likes: 0,
        user: req.user.id,
      });


      res.redirect(`/profile/id/${req.user.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeRecipe: async (req, res) => {
    try {
      await Recipe.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/recipes/recipe/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteRecipe: async (req, res) => {
    try {
 
      let recipe = await Recipe.findById({ _id: req.params.id });
     
      await cloudinary.uploader.destroy(recipe.cloudinaryId);
    
      await Recipe.remove({ _id: req.params.id });
  
      res.redirect("/recipes");
    } catch (err) {
      res.redirect("/recipes");
    }
  },
};
