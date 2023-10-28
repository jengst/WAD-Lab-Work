const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const errorhandler = require('errorhandler');
const dotenv = require('dotenv');
const passport = require('passport');
require('./auth/auth');

// get config vars
dotenv.config();

// create express app
const app = express();

// handle CORS + middleware
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
	next();
})

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(errorhandler());

// database
const uri = "mongodb+srv://julianengst:YObczCZpyXfFRlZM@cluster0.szhv1e6.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log("Connected to MongoDB."))
	.catch(err => console.error("Could not connect to MongoDB."));
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

const recipeRoute = require("./routes/Recipes");
app.use("/recipe", recipeRoute);

const categoryRoute = require("./routes/Categories");
app.use("/category", categoryRoute);

const reviewRoute = require("./routes/Reviews");
app.use("/review", reviewRoute);

const userRoute = require("./routes/Users");
app.use("/user", passport.authenticate('jwt', { session: false }), userRoute);

const authRoute = require("./routes/Auth");
app.use("/auth", authRoute);

// Handle errors
app.use((err, req, res, next) => {
	if (!err) {
		err = new Error('Not Found');
	}
	console.log(err.stack);

	res.status(err.status || 500);
	res.json({
		'errors': {
			message: err.message,
			error: err
		}
	});
});

app.listen(process.env.PORT, () => {
	console.log("Server Listening on PORT:", process.env.PORT);
});