const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/Users');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const dotenv = require('dotenv');

// get config vars
dotenv.config();

// Passport middleware for user signup
passport.use(
	'signup',
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		async (email, password, done) => {
			try {
				// Create a new user with the given email and password
				const user = await UserModel.create({ email, password });

				// Return the new user
				return done(null, user);
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
				const user = await UserModel.findOne({ email });

				// If the user is not found, return an error
				if (!user) {
					return done(null, false, { message: 'User not found' });
				}

				// Validate the user's password
				const validate = await user.isValidPassword(password);

				// If the password is incorrect, return an error
				if (!validate) {
					return done(null, false, { message: 'Wrong Password' });
				}

				// If the email and password are correct, return the user
				return done(null, user, { message: 'Logged in Successfully' });
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
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
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