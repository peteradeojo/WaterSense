import { Router } from "express";
import User from "../models/User.js";

const router = Router();

export default () => {
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
