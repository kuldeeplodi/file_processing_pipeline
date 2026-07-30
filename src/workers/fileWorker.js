const { Worker } = require("bullmq")

const connection = require("../queue/connection")
const connectDB = require("../config/db")
const Job = require("../models/job")
const { processImage } = require("../services/imageService");

const startWorker = async () => {
    await connectDB();

    const worker = new Worker(
        "FileQueue",
        async (job) => {
            console.log("job Received:", job.data);

            let dbJob = null;

            try {
                dbJob = await Job.findById(job.data.jobId);

                if (!dbJob) {
                    throw new Error("Job not found");
                }

                dbJob.status = "PROCESSING";
                await dbJob.save();

                let result;

                if (dbJob.fileType.startsWith("image/")) {
                    result = await processImage(
                        dbJob.path,
                        dbJob.filename
                    );

                    console.log("Image processed:", result);
                }

                dbJob.status = "DONE";
                dbJob.processedAt = new Date();
                await dbJob.save();

                return result;
            } catch (error) {
                if (dbJob) {
                    dbJob.status = "FAILED";
                    await dbJob.save();
                }

                throw error;
            }
        },
        { connection }
    );

    worker.on("completed", (job) => {
        console.log(`Job ${job.id} completed`);
    });

    worker.on("failed", (job, err) => {
        console.log(`Job ${job?.id} failed`);
        console.error(err.message);
    });

    console.log("File Worker Started");
};

startWorker();
