import { Strategy as LocalStrategy } from "passport-local-mongoose";
import User from "../models/User.js";

/**
 * @param {import("passport").PassportStatic} passport
 */
export default (passport) => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: "username",
			},
			async (username, password, done) => {
                done(null, false);
            },
		),
	);

	passport.serializeUser((user, done) => {});

	passport.deserializeUser((id, done) => {});
};
