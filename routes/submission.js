const express = require('express')
const router = express.Router()
const submissionController = require('../controllers/submission')

router.get('/', submissionController.index)
router.post('/add-recipe', submissionController.addRecipe)

module.exports = router