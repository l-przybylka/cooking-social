const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const profileController = require("../controllers/profile");

router.get('/profile/:id', ensureAuth, profileController.getProfile);

module.exports = router