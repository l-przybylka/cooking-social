const Recipe = require('../models/Recipe')

module.exports = {
    getIndex: async (req, res) => {
        // retrive the last 5 recipes
        const recipes = await Recipe.find()
            .populate("user")
            .sort({ createdAt: 'desc' })
            .limit(5)

        console.log(recipes);
        res.render('index.ejs', { recipe: recipes, isLoggedIn: req.isAuthenticated() })
    }}
