const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const auth = require("./routes/auth.js");
const sessions = require("./routes/sessions.js");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Routes
app.use("/auth", auth());
app.use("/sessions", sessions());

module.exports = app;
