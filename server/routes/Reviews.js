const express = require("express");
const router = express.Router();
const Review = require("../models/Reviews");

// get all recipes
router.get("/", async (req, res) => {
	const reviews = await Review.find();
	res.json(reviews);
});

// get by id	
router.get("/:id", async (req, res) => {
	try {
		const getReview = await Review.findById({ _id: req.params.id });
		res.json(getReview);
	}
	catch (err) {
		res.status(404);
		res.json({ message: err });
	}
});

// create new recipe
router.post("/", async (req, res) => {
	const newReview = new Review(req.body);
	const savedReview = await newReview.save();
	res.json(savedReview);
});

router.post("/:id", async (req, res) => {
	res.status(405);
	res.json({ message: "Method not allowed." });
});

// delete by id	
router.delete("/:id", async (req, res) => {
	try {
		const deleteReview = await Review.findByIdAndDelete({ _id: req.params.id });
		res.json(deleteReview);
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
		const updateReview = await Review.updateOne(
			{ _id: req.params.id },
			{ $set: req.body }
		);
		res.json(updateReview);
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