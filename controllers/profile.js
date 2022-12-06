const Comment = require('../models/Comment')
const Recipe = require('../models/Recipe')
const User = require('../models/User')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const recipes = await Recipe.find({ user: req.params.id })
            const userInfo = await User.find({ user: req.params.id })

            res.render('profile.ejs', { recipe: recipes, user: userInfo})
        } catch (err) {
            console.log(err);
        }
    }
}