const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const recipesController = require("../controllers/recipes");

router.get("/profile", ensureAuth, recipesController.getProfile);