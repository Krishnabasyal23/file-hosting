const rateLimit= require("express-rate-limit");
const limiter=reateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 50,                 // 50 requests per minute
    message: { message: "Too many requests, slow down" }
});

module.exports = limiter;
