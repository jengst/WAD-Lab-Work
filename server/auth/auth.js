const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/Users');

// get config vars
dotenv.config();

passport.use(
	'signup',
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		async (req, email, password, done) => {
			try {
				// Check if user already exists with the given email
				const userExists = await User.findOne({ email });
				if (userExists) {
					return done(null, userExists, { message: 'User already exists' });
				}

				// Create a new user with the given email and password
				const newUser = new User({
					email,
					password,
					username: req.body.username,
					recipesSaved: req.body.recipesSaved,
					recipesSubmitted: req.body.recipesSubmitted,
				});
				const savedUser = await newUser.save();

				// Return the new user
				return done(null, savedUser, { message: 'Signup successful' });
			} catch (error) {
				// Return any errors that occur during the signup process
				done(error);
			}
		}
	)
);

// Passport middleware for user login
passport.use(
	'login',
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		async (email, password, done) => {
			try {
				// Find the user with the given email
				const savedUser = await User.findOne({ email });

				// If the user is not found, return an error
				if (!savedUser) {
					return done(null, false, { message: 'User not found' });
				}

				// Validate the user's password
				const validate = await savedUser.isValidPassword(password);

				// If the password is incorrect, return an error
				if (!validate) {
					return done(null, false, { message: 'Wrong Password' });
				}

				// If the email and password are correct, return the user
				return done(null, savedUser, { message: 'Logged in Successfully' });
			} catch (error) {
				// Return any errors that occur during the login process
				return done(error);
			}
		}
	)
);

passport.use(
	new JWTstrategy(
		{
			secretOrKey: process.env.TOKEN_SECRET,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
		},
		async (token, done) => {
			try {
				return done(null, token.user);
			} catch (error) {
				done(error);
			}
		}
	)
);

const requireAuth = (req, res, next) => {
	let test = passport.authenticate('jwt', { session: false })(req, res, next);
	return test;
};

module.exports = {
	passport,
	requireAuth,
	jwt
};