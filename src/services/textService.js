const fs = require("fs");
const path = require("path");
const { uploadFile } = require("../services/cloudinaryService");

async function processText(filePath, filename) {
    // Read text file
    const text = fs.readFileSync(filePath, "utf8");

    // Convert to lowercase and split into words
    const words = text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);

    // Count frequency
    const frequency = {};

    for (const word of words) {
        if (word.trim() === "") continue;

        frequency[word] = (frequency[word] || 0) + 1;
    }

    // Output file
    const outputFile = path.join(
        "processed",
        `${filename}.json`
    );

    // Save JSON
    fs.writeFileSync(
        outputFile,
        JSON.stringify(frequency, null, 2)
    );

    const uploadedUrl = await uploadFile(outputFile);
    return uploadedUrl;
}

module.exports = {
    processText,
};