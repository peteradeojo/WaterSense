import { model, Schema } from "mongoose";
import {} from 'passport-local-mongoose';

const userSchema = new Schema(
	{
		username: { type: String, unique: true, required: true },
	},
	{
		timestamps: true,
	},
);

// userSchema.pl


export default model("User", userSchema);
