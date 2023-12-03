const express = require("express");
const router = express.Router();
const Category = require("../models/Categories");
const Recipe = require("../models/Recipes");
const { requireAuth } = require("../auth/auth");


// get all recipes
router.get("/", async (req, res) => {
	const categories = await Category.find();
	res.json(categories);
});

// get by id	
router.get("/:id", async (req, res) => {
	try {
		const getCategory = await Category.findById({ _id: req.params.id });
		res.json(getCategory);
	}
	catch (err) {
		res.status(404);
		res.json({ message: err });
	}
});

// get recipes of category
router.get("/:id/recipe", async (req, res) => {
	try {
		const category = await Category.findById(req.params.id);
		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}

		const recipes = await Recipe.find({ _id: { $in: category.recipes } });
		res.json(recipes);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// create new recipe
router.post("/", requireAuth, async (req, res) => {
	const newCategory = new Category(req.body);
	const savedCategory = await newCategory.save();
	res.json(savedCategory);
});

// delete by id	
router.delete("/:id", requireAuth, async (req, res) => {
	try {
		const deleteCategory = await Category.findByIdAndDelete({ _id: req.params.id });
		res.json(deleteCategory);
	} catch (err) {
		res.status(404);
		res.json({ message: err });
	}
});

// update by id	
router.put("/:id", requireAuth, async (req, res) => {
	console.log(req.body)
	try {
		const updateCategory = await Category.updateOne(
			{ _id: req.params.id },
			{ $set: req.body }
		);
		res.json(updateCategory);
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