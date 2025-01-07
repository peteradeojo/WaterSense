const mongoose = require("mongoose");

const app = require("./app.js");

const port = process.env.PORT || 3000;

mongoose
	.connect(process.env.MONGO_DB_URL)
	.then((m) => {
		console.log(`Database connected @: ${m.connection.host}`);
		app.listen(port, () => {
			console.log(`Server running on port ${port}`);
		});
	})
	.catch((err) => {w
		console.error(err);
	});
