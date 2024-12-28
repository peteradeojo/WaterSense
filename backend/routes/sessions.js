import { Router } from "express";
import { v4 as uuid } from "uuid";
import Session from "../models/Session.js";

const router = Router();

export default () => {
	router.get("/:id", (req, res) => {
		res.send("Hello World");
	});

	// Create session
	router.post("/", async (req, res) => {
		try {
			const sessionId = uuid();
			const code = sessionId.split("-")[0];
			const session = await Session.create({
				code,
				sessionId,
			});

			return res.json({ session });
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: err.message || err });
		}
	});

	return router;
};
