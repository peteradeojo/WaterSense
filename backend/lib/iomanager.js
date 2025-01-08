// socketManager.js
const socketIO = require("socket.io");

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

	initialize(server) {
		if (!this.io) {
			this.io = socketIO(server);

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
						socket.broadcast
							.to(room_code)
							.emit("new-player", `${username} has joined the room.`);
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
