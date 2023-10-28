const express = require("express");
const router = express.Router();
const User = require("../models/Users");

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

// create new recipe
router.post("/", async (req, res) => {
	const newUser = new User(req.body);
	const savedUser = await newUser.save();
	res.json(savedRecipe);
});

// delete by id	
router.delete("/:id", async (req, res) => {
	try {
		const deleteUser = await User.findByIdAndDelete({ _id: req.params.id });
		res.json(deleteUser);
	} catch (err) {
		res.status(404);
		res.json({ message: err });
	}
});

// update by id	
router.put("/:id", async (req, res) => {
	console.log(req.body)
	try {
		const updateUser = await User.updateOne(
			{ _id: req.params.id },
			{ $set: req.body }
		);
		res.json(updateUser);
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