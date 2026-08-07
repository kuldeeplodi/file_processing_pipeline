require("dotenv").config();
const { Worker } = require("bullmq")
const { processPDF } = require("../services/pdfService")
const connection = require("../queue/connection")
const connectDB = require("../config/db")
const Job = require("../models/job")
const { processImage } = require("../services/imageService")
const { processText } = require("../services/textService")

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
                    const output = await processImage(
                        dbJob.path,
                        dbJob.filename
                    );
                    dbJob.outputUrl = output.medium;
                    await dbJob.save();

                    console.log("Image processed:", output);
                }
                else if (dbJob.fileType === "application/pdf") {
                    const output = await processPDF(dbJob.path, dbJob.filename);

                    console.log("PDF processed:", output);

                    dbJob.outputUrl = output;

                    await dbJob.save();
                }
                else if (dbJob.fileType === "text/plain") {

                    const output = await processText(
                        dbJob.path,
                        dbJob.filename
                    );

                    console.log("Text processed:", output);

                    dbJob.outputUrl = output;
                    await dbJob.save();

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
