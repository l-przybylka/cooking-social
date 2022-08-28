const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const recipesRoutes = require('./routes/recipes')
const submissionRoutes = require('./routes/submission')

require('dotenv').config({path: './config/.env'})

connectDB()

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);
app.set("layout", "./layouts/layout");
app.set("view engine", "ejs");


app.use('/', homeRoutes)
app.use('/recipes', recipesRoutes)
app.use('/submission', submissionRoutes)

app.listen(process.env.PORT, () => {
  console.log("Server running")
});
