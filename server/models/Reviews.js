const mongoose = require("mongoose");
const ReviewsSchema = new mongoose.Schema({
	recipeId: mongoose.ObjectId, // Reference to the recipe being reviewed
	userId: mongoose.ObjectId, // Reference to the user giving the review
	rating: Number,
	comment: String,
	createdAt: Date,
});

module.exports = mongoose.model("Reviews", ReviewsSchema);