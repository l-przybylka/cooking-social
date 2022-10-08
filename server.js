const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session"); // store session info
const MongoStore = require("connect-mongo")(session); // stores session in mongo?
const methodOverride = require("method-override"); // overrides method post to put or delete if needed
const flash = require("express-flash"); // flas messages for users
const logger = require("morgan"); // for dev purposes logs info and responses from the server
const connectDB = require("./config/database"); // connects to mongo
// routes 
const homeRoutes = require('./routes/home')
const recipesRoutes = require('./routes/recipes')
const submissionRoutes = require('./routes/submission')

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());


app.use('/', homeRoutes)
app.use('/recipes', recipesRoutes)
app.use('/submission', submissionRoutes)

app.listen(process.env.PORT, () => {
  console.log("Server running")
});
