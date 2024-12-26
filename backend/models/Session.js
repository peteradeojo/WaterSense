import { model, Schema } from "mongoose";

const sessionSchema = new Schema(
	{
		sessionId: String,
		players: { type: [Schema.Types.ObjectId], ref: "User" },
		code: { type: String, required: true },
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	},
);


export default model("Session", sessionSchema);
