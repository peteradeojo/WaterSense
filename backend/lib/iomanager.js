// socketManager.js
const socketIO = require("socket.io");
const Session = require("../models/Session");

class SocketManager {
	constructor() {
		if (SocketManager.instance) {
			return SocketManager.instance;
		}

		/**
		 * @type {socketIO.|null} io
		 */
		this.io = null;
		SocketManager.instance = this;
	}

	async updateWithRetry (session, playerIndex, score, maxRetries = 3) {
		for (let i = 0; i < maxRetries; i++) {
			try {
				session.players[playerIndex].score = score;
				session.players.sort((a, b) => b.score - a.score);
				await session.save();
				return;
			} catch (err) {
				if (err.name !== 'VersionError' || i === maxRetries - 1) {
					throw err;
				}
				// Get fresh session data before retrying
				session = await Session.findById(session._id);
			}
		}
	};

	initialize(server) {
		if (!this.io) {
			this.io = socketIO(server, {
				cors: {
					origin: "*",
				},
			});

			// Set up default connection handling
			this.io.on(
				"connection",
				/**
				 * @param {socketIO.Socket} socket
				 */
				(socket) => {
					console.log("Client connected:", socket.id);

					socket.on("disconnect", () => {
						console.log("Client disconnected:", socket.id);
					});

					socket.on("created-room", (room_code) => {
						socket.join(room_code);
					});

					socket.on("join-room", ({ room_code, username }) => {
						socket.join(room_code);
					});

					socket.on("submit-score", async ({ username, score, code }) => {
						/**
						 * @type {{players: {username: string, score: number}[]}} session
						 */
						const session = await Session.findOne({ code });
						console.log(
							`submit-score: user: ${username} score: ${score} code: ${code}`,
						);

						if (!session || !session.started) {
							return; // res.status(404).json({ message: "Room not found" });
						}

						let playerIndex = session.players.findIndex(
							(player) => player.username == username,
						);

						if (playerIndex < 0) {
							console.log(
								`bad message: ${username} ${score} ${code} ${playerIndex}`,
							);
							return;
						}

						console.log(`submit-score: found player at @${playerIndex}`);

						this.updateWithRetry(session, playerIndex, score, 3);

						playerIndex = session.players.findIndex(
							(player) => player.username == username,
						);

						console.log(`Score: ${playerIndex}`);

						const update = {
							username,
							score,
							position: playerIndex,
							time: new Date().valueOf(),
						};

						// this.io.to(code).emit("score-update", update);
						socket.emit("score-update", update);
						this.io.to(code).emit("leaderboard-update", session.players);
					});
				},
			);
		}
		return this.io;
	}

	getIO() {
		if (!this.io) {
			throw new Error(
				"Socket.IO has not been initialized. Please call initialize() first.",
			);
		}
		return this.io;
	}
}

// Export a single instance
module.exports = new SocketManager();
