const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { passport, requireAuth, jwt } = require("../auth/auth");

// get all recipes
router.get("/", async (req, res) => {
	const users = await User.find();
	res.json(users);
});

// get by id	
router.get("/:id", async (req, res) => {
	try {
		const getUser = await User.findById({ _id: req.params.id });
		res.json(getUser);
	}
	catch (err) {
		res.status(404);
		res.json({ message: err });
	}
});

router.get("/:id/submitted-recipe/", async (req, res) => {
	try {
		const getUser = await User.findById({ _id: req.params.id });
		res.json(getUser.recipesSubmitted);
	}
	catch (err) {
		res.status(404);
		res.json({ message: err });
	}
});

router.get("/:uid/submitted-recipe/:rid", async (req, res) => {
	try {
		const getUser = await User.findById({ _id: req.params.uid });
		res.redirect(`/recipe/${req.params.rid}`);
	}
	catch (err) {
		res.status(404);
		res.json({ message: err });
	}
});

// create new user
router.post("/signup", passport.authenticate('signup', { session: false }), async (req, res) => {
	res.json({
		message: req.authInfo.message,
		user: req.user
	});
});

// login user
router.post("/login", async (req, res, next) => {
	passport.authenticate(
		'login',
		async (err, user, info) => {
			try {
				if (err || !user) {
					const error = new Error('An error occurred.');

					return next(error);
				}

				req.login(
					user,
					{ session: false },
					async (error) => {
						if (error) return next(error);

						const body = { _id: user._id, email: user.email };
						const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET);

						res.cookie('token', token, {
							httpOnly: true,
							secure: false, // set to false if you are not using https
							sameSite: 'strict',
							maxAge: 900000 // 15 minutes
						});

						return res.json({
							// token: token, // todo: delete
							message: 'Authentication successful'
						});
					}
				);
			} catch (error) {
				return next(error);
			}
		}
	)(req, res, next);
});

// delete by id	
router.delete("/:id", requireAuth, async (req, res) => {
	try {
		const deleteUser = await User.findByIdAndDelete({ _id: req.params.id });
		res.json({
			message: "User deleted successfully",
			user: deleteUser
		});
	} catch (err) {
		res.status(404);
		res.json({ message: err });
	}
});

// update by id	
router.put("/:id", requireAuth, async (req, res) => {
	console.log(req.body)
	try {
		const updateUser = await User.updateOne(
			{ _id: req.params.id },
			{ $set: req.body }
		);
		res.json({
			message: "User updated successfully",
			user: updateUser
		});
	} catch (err) {
		res.status(404);
		res.json({ message: err });
	}
});

router.all("*", async (req, res) => {
	res.status(405);
	res.json({ message: "Method not allowed." });
});

module.exports = router;