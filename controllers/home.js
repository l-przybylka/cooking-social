const Recipe = require('../models/Recipe')

module.exports = {
    getIndex: (req,res) => {
            res.render('index.ejs')
        }}
