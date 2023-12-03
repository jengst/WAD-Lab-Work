const mongoose = require("mongoose");
const CategoriesSchema = new mongoose.Schema({
	name: String,
	description: String,
	image: String,
	recipes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Recipes"
		}
	]
});

module.exports = mongoose.model("Categories", CategoriesSchema);