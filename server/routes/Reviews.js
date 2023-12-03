const express = require("express");
const router = express.Router();
const Review = require("../models/Reviews");
const User = require("../models/Users");
const { requireAuth } = require("../auth/auth");


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

// get users of review
router.get("/:id/user", async (req, res) => {
	try {
		const review = await Review.findById(req.params.id);
		if (!review) {
			return res.status(404).json({ message: "Review not found" });
		}

		const users = await User.find({ _id: { $in: review.userId } });
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// create new recipe
router.post("/", requireAuth, async (req, res) => {
	const newReview = new Review(req.body);
	const savedReview = await newReview.save();
	res.json(savedReview);
});

// delete by id	
router.delete("/:id", requireAuth, async (req, res) => {
	try {
		const deleteReview = await Review.findByIdAndDelete({ _id: req.params.id });
		res.json(deleteReview);
	} catch (err) {
		res.status(404);
		res.json({ message: err });
	}
});

// update by id	
router.put("/:id", requireAuth, async (req, res) => {
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