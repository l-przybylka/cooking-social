const Recipe = require('../models/Recipe')

module.exports = {
    getRecipes: async(req,res) => {
        try {
            const recipes = await Recipe.find()
            res.render('recipes.ejs', {recipe: recipes})
        } catch (err) {
            console.log(err)            
        }
    }   
}
