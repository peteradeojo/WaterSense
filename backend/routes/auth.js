const { Router } = require("express");
const User = require("../models/User.js");

const router = Router();

module.exports = () => {
	router.post("/login", async (req, res) => {
		try {
			const user = await User.findByUsername(req.body.username);

			req.logIn(user, (err) => {
				if (err) {
					res.status(400).json({
						error: err,
					});
				}

				res.json(user);
			});
		} catch (err) {
			res.status(500).json({ error: err });
		}
	});
	
	router.post("/register", async (req, res) => {
		try {
			const player = await User.create({
				username: req.body.username,
			});

			return res.json({ user: player, message: "User created successfully" });
		} catch (error) {
			return res.status(500).json({
				error: error.message || error,
			});
		}
	});

	return router;
};
