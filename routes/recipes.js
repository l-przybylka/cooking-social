const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const recipesController = require("../controllers/recipes");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get('/', ensureAuth, recipesController.getRecipes)
router.get('/recipe/:id', recipesController.getRecipe)
router.post("/profile-add-recipe", upload.single("file"), recipesController.createRecipe)
// router.get("/:id", ensureAuth, postsController.getPost);
// router.post("/createPost", upload.single("file"), postsController.createPost);
router.put("/likeRecipe/:id", recipesController.likeRecipe);
router.delete("/deleteRecipe/:id", recipesController.deleteRecipe);

module.exports = router