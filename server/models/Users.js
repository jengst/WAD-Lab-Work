const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// Defining the Users schema
const UsersSchema = new mongoose.Schema({
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	reviewsSubmitted: [mongoose.ObjectId],
	recipesSubmitted: [mongoose.ObjectId],
});

// Pre-save hook to hash the password before saving to the database
UsersSchema.pre(
	'save',
	async function (next) {
		const user = this;
		const hash = await bcrypt.hash(this.password, 10);

		this.password = hash;
		next();
	}
);

// Method to validate user's password
UsersSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);

	return compare;
}

// Exporting the Users model
module.exports = mongoose.model("Users", UsersSchema);