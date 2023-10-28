const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipes");

// get all recipes
router.get("/", async (req, res) => {
	try {
		const recipes = await Recipe.find();
		res.json(recipes);
	} catch (err) {
		res.status(404);
		res.json({ message: err });
	}

});

// get by id	
router.get("/:id", async (req, res) => {
	try {
		const getRecipe = await Recipe.findById({ _id: req.params.id });
		res.json(getRecipe);
	}
	catch (err) {
		res.status(404);
		res.json({ message: err });
	}
});

// create new recipe
router.post("/", async (req, res) => {
	try {
		const newRecipe = new Recipe(req.body);
		const savedRecipe = await newRecipe.save();
		res.json(savedRecipe);
	} catch (err) {
		res.status(404);
		res.json({ message: err });
	}

});

router.post("/:id", async (req, res) => {
	res.status(405);
	res.json({ message: "Method not allowed." });
});

// delete by id	
router.delete("/:id", async (req, res) => {
	try {
		const deleteRecipe = await Recipe.findByIdAndDelete({ _id: req.params.id });
		res.json(deleteRecipe);
	} catch (err) {
		res.status(404);
		res.json({ message: err });
	}
});

router.delete("/", async (req, res) => {
	res.status(405);
	res.json({ message: "Method not allowed." });
});

// update by id	
router.put("/:id", async (req, res) => {
	console.log(req.body)
	try {
		const updateRecipe = await Recipe.updateOne(
			{ _id: req.params.id },
			{ $set: req.body }
		);
		res.json(updateRecipe);
	} catch (err) {
		res.status(404);
		res.json({ message: err });
	}
});

router.put("/", async (req, res) => {
	res.status(405);
	res.json({ message: "Method not allowed." });
});

module.exports = router;