const { Router } = require("express");
const { v4: uuid } = require("uuid");
const Session = require("../models/Session.js");
const limiter = require("../lib/ratelimit.js");

const socketManager = require("../lib/iomanager.js");

const router = Router();

module.exports = () => {
	router.get("/:id", limiter, async (req, res) => {
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
				limit: Number(req.body.limit),
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
		console.log(req.body);
		const session = await Session.findOne({ code });

		if (!session)
			return res.status(400).json({
				message: "Invalid session code.",
			});

		if (session.players.length >= session.limit) {
			return res.status(428).json({
				message: "Game room has reached the player limit",
			});
		}

		const p = session.players.find((player) => player.username == username);
		if (p) {
			return res.status(400).json({
				session,
				message: "This username is already a part of this room.",
			});
		}

		console.log(session);

		session.players.push({ username, score: 0 });
		await session.save({ reload: true });

		socketManager.io
			.to(code)
			.emit("new-player", { username, total: session.players.length });

		return res.json({ session });
	});

	// Start game
	router.post("/start", async (req, res) => {
		const { code } = req.body;

		socketManager.io?.to(code).emit("start-game", {
			time: new Date().valueOf(),
		});
		return res.json({ message: "broadcast sent" });
	});

	// Submit score
	router.post("/submit-score", async (req, res) => {
		try {
			// const { username, score, code } = req.body;
			// const session = await Session.findOne({ code });

			// if (!session) {
			// 	return res.status(404).json({ message: "Room not found" });
			// }

			// const playerIndex = session.players.findIndex(
			// 	(player) => player.username == username,
			// );

			// if (playerIndex < 0)
			// 	return res.status(404).json({ message: "player not found." });

			// session.players[playerIndex].score = score;

			// await session.save();

			// socketManager.io?.to(code).emit("global-score-update", {
			// 	username,
			// 	score,
			// 	time: new Date().valueOf(),
			// });

			return res.json(req.body);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: error });
		}
	});

	return router;
};
