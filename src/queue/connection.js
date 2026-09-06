const { Redis } = require("ioredis")

const connection = new Redis(process.env.REDIS_URL);


// Handle Redis connection events
connection.on("connect", () => {
    console.log("Redis connected")
})

module.exports = {
    connection
}