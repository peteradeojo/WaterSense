const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
		},
		role: {
			type: String,
			enum: ["player", "instructor"],
			default: "player",
		},
	},
	{
		timestamps: true,
	},
);

userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema);
