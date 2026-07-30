const mongoose = require("mongoose")


const jobSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            required: true
        },
        fileType: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["QUEUED", "PROCESSING", "DONE", "FAILED"],
            default: "QUEUED",
        },

        uploadedAt: {
            type: Date,
            default: Date.now,
        },

        processedAt: {
            type: Date,
        },

        outputUrl: {
            type: String,
        },

        retries: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Job", jobSchema)