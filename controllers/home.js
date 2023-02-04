const Recipe = require('../models/Recipe')

module.exports = {
    getIndex: async (req, res) => {
        const recipes = await Recipe.find()
            .populate("user")
            .sort({ createdAt: 'desc' })
            .limit(5)

        res.render('index.ejs', { recipes: recipes, isLoggedIn: req.isAuthenticated() })
    }}
