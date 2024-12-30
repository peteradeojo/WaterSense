const { Router } = require("express");
const { v4: uuid } = require("uuid");
const Session = require("../models/Session.js");

const router = Router();

module.exports = () => {
	router.get("/:id", async (req, res) => {
		const session = await Session.findOne({ code: req.params.id });
		return res.json({ session });
	});

	// Create session
	router.post("/", async (req, res) => {
		try {
			const sessionId = uuid();
			const code = sessionId.split("-")[0];
			const session = await Session.create({
				code,
				sessionId,
				owner: req.body.username,
			});

			return res.json({ session, username: req.body.username });
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: err.message || err });
		}
	});

	// Join session
	router.post("/join", async (req, res) => {
		const { username, code } = req.body;
		const session = await Session.findOne({ code });

		const p = session.players.find((player) => player.username == username);
		if (p) {
			return res
				.status(400)
				.json({ message: "This username is already a part of this room." });
		}

		session.players.push({ username, score: 0 });
		await session.save({ reload: true });

		return res.json({ session });
	});

	// TODO: Start game
	router.post("/start", async (req, res) => {});

	// Submit score
	router.post("/submit-score", async (req, res) => {
		try {
			const { username, score, code } = req.body;
			const session = await Session.findOne({ code });

			if (!session) {
				return res.status(404).json({ message: "Room not found" });
			}

			const playerIndex = session.players.findIndex(
				(player) => player.username == username,
			);

			if (playerIndex < 0)
				return res.status(404).json({ message: "player not found." });

			session.players[playerIndex].score = score;

			await session.save();

			return res.json({ session });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: error });
		}
	});

	return router;
};
