const express = require("express");
const router = express.Router();
const Category = require("../models/Categories");


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

// create new recipe
router.post("/", async (req, res) => {
	const newCategory = new Category(req.body);
	const savedCategory = await newCategory.save();
	res.json(savedCategory);
});

router.post("/:id", async (req, res) => {
	res.status(405);
	res.json({ message: "Method not allowed." });
});

// delete by id	
router.delete("/:id", async (req, res) => {
	try {
		const deleteCategory = await Category.findByIdAndDelete({ _id: req.params.id });
		res.json(deleteCategory);
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

router.put("/", async (req, res) => {
	res.status(405);
	res.json({ message: "Method not allowed." });
});

module.exports = router;