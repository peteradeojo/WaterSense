const { model, Schema } = require("mongoose");

const sessionSchema = new Schema(
	{
		sessionId: String,
		players: [
			{
				username: String,
				score: String,
			},
		],
		code: { type: String, required: true },
		owner: String,
		limit: {
			type: Number,
			default: 1,
		},
		started: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	},
);

module.exports = model("Session", sessionSchema);
