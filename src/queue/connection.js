const { Redis } = require("ioredis")

const connection = new Redis();


// Handle Redis connection events
connection.on("connect", () => {
    console.log("Redis connected")
})

module.exports = {
    connection
}