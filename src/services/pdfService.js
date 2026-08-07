const { PDFParse } = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const { uploadFile } = require("../services/cloudinaryService");

async function processPDF(filePath, filename) {
    // Read uploaded PDF
    const buffer = fs.readFileSync(filePath);

    // Create parser
    const parser = new PDFParse({ data: buffer });

    // Extract text
    const result = await parser.getText();

    // Output file
    const outputFile = path.join(
        "processed",
        `${filename}.txt`
    );

    // Save extracted text
    fs.writeFileSync(outputFile, result.text);

    // Clean up parser resources
    await parser.destroy();
    const uploadedUrl = await uploadFile(outputFile);
    return uploadedUrl;
}

module.exports = {
    processPDF,
};