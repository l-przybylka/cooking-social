const Recipe = require('../models/Recipe')
const User = require('../models/User')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const recipes = await Recipe.find({ user: req.params.id })
            const userInfo = await User.findById({ _id: req.params.id })
           
            res.render('profile.ejs', { recipe: recipes, author: userInfo, visitor: req.user})

        } catch (err) {
            console.log(err);
        }
    }
}