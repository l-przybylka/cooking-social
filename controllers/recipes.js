const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/Recipe");
const Comment = require("../models/Comment");
// const User = require("../models/User")

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
      const post = await Recipe.findById(req.params.id);

      const comments = await Comment.find({ post: req.params.id })
        .populate("user")
        .sort({ createdAt: "desc" })
        .lean();
     
      res.render("recipe.ejs", {
        post: post,
        user: req.user,
        comments: comments,
        isLoggedIn: req.isAuthenticated()
      });
    } catch (err) {
      console.log(err);
    }
  },
  createRecipe: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(req.body)
      await Recipe.create({
        title: req.body.title,
        image: result.secure_url,
        difficulty: req.body.difficulty,
        instructions: req.body.instructions,
        cloudinaryId: result.public_id,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      
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
      // Find post by id
      let recipe = await Recipe.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(recipe.cloudinaryId);
      // Delete post from db
      await Recipe.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/recipes");
    } catch (err) {
      res.redirect("/recipes");
    }
  },
};
