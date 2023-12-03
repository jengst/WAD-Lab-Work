const mongoose = require("mongoose");
const RecipesSchema = new mongoose.Schema({
	title: String,
	description: String,
	ingredients: [String],
	instructions: [String],
	categories: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category"
		}
	],
	image: String,
	approvedByAdmin: Boolean,
});

module.exports = mongoose.model("Recipes", RecipesSchema);