import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import auth from "./routes/auth.js";
import sessions from "./routes/sessions.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV != "production") {
	app.use(morgan("dev"));
}

// Routes
app.use("/auth", auth());
app.use("/sessions", sessions());

export default app;
