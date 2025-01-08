const mongoose = require("mongoose");

const app = require("./app.js");

const http = require("http");
const socketio = require("socket.io");
const socketManager = require("./lib/iomanager.js");

const port = process.env.PORT || 3000;

mongoose
	.connect(process.env.MONGO_DB_URL)
	.then((m) => {
		console.log(
			`Database connected @ ${m.connection.host}:${m.connection.port}`,
		);

		const server = http.createServer(app);
		socketManager.initialize(server);

		server.listen(port, () => {
			console.log(`Server running on port ${port}`);
		});
	})
	.catch((err) => {
		console.error(err);
	});
