const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const profileController = require("../controllers/profile");
// server side auth
router.get('/id/:id', ensureAuth, profileController.getProfile);
router.get('/mine', profileController.myProfile)

module.exports = router