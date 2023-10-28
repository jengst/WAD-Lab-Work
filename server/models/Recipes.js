const mongoose = require("mongoose");
const RecipesSchema = new mongoose.Schema({
	title: String,
	description: String,
	ingredients: [String],
	instructions: [String],
	category: mongoose.ObjectId, // Reference to category
	sumbmittedBy: mongoose.ObjectId, // Reference to user who created the recipe
	approvedByAdmin: Boolean
});

module.exports = mongoose.model("Recipes", RecipesSchema);