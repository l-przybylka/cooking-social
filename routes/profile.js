const express = require('express')
const profile = require('')

router.get("/profile", ensureAuth, recipesController.getProfile);
