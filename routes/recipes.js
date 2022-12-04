const express = require('express')
const router = express.Router()
const recipesController = require('../controllers/recipes')
const upload = require("../middleware/multer");

router.get('/', recipesController.getRecipes)
router.post("/profile-add-recipe", upload.single("file"), recipesController.createPost)

module.exports = router