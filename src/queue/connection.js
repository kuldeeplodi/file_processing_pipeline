const { Redis } = require("ioredis");

const connection = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
});

connection.on("connect", () => {
    console.log("Redis connected");
});

connection.on("error", (err) => {
    console.error("Redis Error:", err.message);
});

module.exports = connection;