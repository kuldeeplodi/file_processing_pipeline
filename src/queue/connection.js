const { Redis } = require("ioredis")

const connection = new Redis();

connection.on("connect", () => {
    console.log("Redis connected")
})

module.exports = {
    connection
}