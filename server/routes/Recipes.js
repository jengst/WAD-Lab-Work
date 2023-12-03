const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipes");
const Category = require("../models/Categories");
const Review = require("../models/Reviews");
const { requireAuth } = require("../auth/auth");

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

// get categories of recipe
router.get("/:id/category", async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id);
		if (!recipe) {
			return res.status(404).json({ message: "Recipe not found" });
		}

		const categories = await Category.find({ _id: { $in: recipe.categories } });
		res.json(categories);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// get reviews of recipe
router.get("/:id/review", async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id);
		if (!recipe) {
			return res.status(404).json({ message: "Recipe not found" });
		}

		const reviews = await Review.find({ recipeId: recipe._id });
		res.json(reviews);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// create new recipe
router.post("/", requireAuth, async (req, res) => {
	try {
		const newRecipe = new Recipe(req.body);
		const savedRecipe = await newRecipe.save();
		res.json({
			message: "Recipe created successfully",
			recipe: savedRecipe
		});
	} catch (err) {
		res.status(404);
		res.json({ message: err });
	}

});

// delete by id	
router.delete("/:id", requireAuth, async (req, res) => {
	try {
		const deleteRecipe = await Recipe.findByIdAndDelete({ _id: req.params.id });
		res.json(deleteRecipe);
	} catch (err) {
		res.status(404);
		res.json({ message: err });
	}
});

// update by id	
router.put("/:id", requireAuth, async (req, res) => {
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

router.all("*", async (req, res) => {
	if (req.method === 'OPTIONS') {
		res.status(200);
		res.json({ message: "OK" });
	} else {
		res.status(405);
		res.json({ message: "Method not allowed." });
	}
});

module.exports = router;