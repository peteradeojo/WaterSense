const { rateLimit } = require("express-rate-limit");
const MongoStore = require("rate-limit-mongo");

const timeout = 60 * 1000;
const limiter = rateLimit({
	windowMs: timeout, // 15 minutes
	limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	store: new MongoStore({
		uri: process.env.MONGO_DB_URL,
		expireTimeMs: timeout,
		errorHandler: console.error.bind(null, "rate-limit-mongo"),
	}), // Redis, Memcached, etc. See below.
	handler: (req, res, next) => {
		return res.status(429).json({
			message: "Rate limit exceeded",
		});
	},
});

module.exports = limiter;
