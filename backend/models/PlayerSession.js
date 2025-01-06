const { Schema, model } = require("mongoose");

const playerSessionSchema = new Schema(
	{
		player: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		session: {
			type: Schema.Types.ObjectId,
			ref: "Session",
		},
		score: Number,
		status: Number,
	},
	{ timestamps: true },
);

module.exports = model("PlayerSession", playerSessionSchema);
