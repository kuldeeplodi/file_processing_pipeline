const { Queue } = require("bullmq")

const connection = require("./connection")


const queue = new Queue("FileQueue", {
    connection,
});  // FileQueue ? It's just the queue name.


module, exports = queue;