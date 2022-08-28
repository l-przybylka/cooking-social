const Recipe = require('../models/Recipe')

module.exports = {
    index: (req,res) => {
        res.render('submission')
    },
    addRecipe: async(req,res) => {
        try{
            await Recipe.create ({
            title: req.body.title,
            author: req.body.author,
            instructions: req.body.instructions,
            difficulty: req.body.difficulty
            })
            console.log(`Recipe added`)
            console.log(req.body)
            res.redirect('/recipes')
        } catch(err) {
            res.redirect('/')
            console.log(err)
        }
  
    }
}