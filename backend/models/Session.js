const { model, Schema } = require("mongoose");

const sessionSchema = new Schema(
	{
		sessionId: String,
		players: [
			{
				username: String,
				score: String,
			}
		],
		code: { type: String, required: true },
		owner: String,
	},
	{
		timestamps: true,
	},
);

module.exports = model("Session", sessionSchema);
