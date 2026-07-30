const { Worker } = require("bullmq")

const connection = require("../queue/connection")


const worker = new Worker(
    "FileQueue",
    async (job) => {
        console.log(job.id);

        console.log(job.data);

    },

    { connection, }
)