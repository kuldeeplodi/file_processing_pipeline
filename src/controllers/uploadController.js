const Job = require("../models/job")
const fileQueue = require("../queue/fileQueue")

const uploadFile = async (req, res) => {
    const File = req.file;
    if (!File) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded"
        })
    }

    const fileType = File.mimetype || File.type || "application/octet-stream";

    const job = await Job.create({
        filename: File.filename,
        fileType,
        path: File.path,
    })

    await fileQueue.add("process-file", {
        jobId: job._id,
    },
        {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 2000,
            },
        }
    )

    return res.status(201).json({
        jobId: job._id,
        status: job.status,
    })


}

const getJobStatus = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
        return res.status(404).json({
            success: false,
            message: "Job not found",
        })
    }



    return res.json({
        jobId: job._id,
        status: job.status,
    })
}

module.exports = {
    uploadFile,
    getJobStatus,
};