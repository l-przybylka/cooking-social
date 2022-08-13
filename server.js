const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(expressLayouts)
app.set('layout', 'layouts/layout')
app.set('view engine', 'ejs')


let database,
    databaseName = 'cookingSocial'

MongoClient.connect('mongodb+srv://admin:admin@food.qhpfysz.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${databaseName} Database`)
        database = client.db(databaseName) // creates a database
    })

app.get('/', async (req,res) => {
    res.render('index', {tittle: 'Home page'})
})

app.get('/recipes', async (req,res) => {
    const allRecipes = await database.collection('recipes').find().toArray()
    res.render('recipes', {recipes: allRecipes})
})

app.get('/submission', async (req,res) => {
    res.render('submission', {tittle: 'Home page'})
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