const Recipe = require('../models/Recipe')

module.exports = {
    getRecipes: async(req,res) => {
        try {
            const recipes = Recipe.find()
            console.log((await recipes).forEach(el => el))
            res.render('recipes.ejs', {recipe: recipes})
        } catch (err) {
            console.log(err)            
        }
    }   
}
