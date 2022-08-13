const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000

let database,
    databaseName = 'cookingSocial'

MongoClient.connect('mongodb+srv://admin:admin@food.qhpfysz.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${databaseName} Database`)
        database = client.db(databaseName) // creates a database
    })

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req,res) => {
    const allRecipes = await database.collection('recipes').find().toArray()
    res.render('index.ejs', {recipes: allRecipes})
})

app.post('/add-recipe', (req,res) => {
    database.collection('recipes').insertOne({
        title: req.body.title,
        author: req.body.author,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,

    })
        .then(result => {
            console.log('New recipe added')
            res.redirect('/')
        })
})

app.listen(PORT, console.log("Server running"))