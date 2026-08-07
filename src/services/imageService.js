const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const Job = require("../models/job");
const { uploadFile } = require("../services/cloudinaryService");

async function processImage(filePath, filename) {
    const outputDir = path.join(process.cwd(), "processed");
    fs.mkdirSync(outputDir, { recursive: true });

    const thumbnail = path.join(outputDir, "thumbnail-" + filename);
    const medium = path.join(outputDir, "medium-" + filename);
    const large = path.join(outputDir, "large-" + filename);

    // await sharp(filePath)
    //     .resize(150, 150)
    //     .toFile(thumbnail);

    await sharp(filePath)
        .resize(600, 600, { fit: "inside" })
        .toFile(medium);

    // await sharp(filePath)
    //     .resize(1200, 1200, { fit: "inside" })
    //     .toFile(large);

    // Upload to Cloudinary
    // const thumbnailUrl = await uploadFile(thumbnail);
    const mediumUrl = await uploadFile(medium);
    // const largeUrl = await uploadFile(large);




    return mediumUrl;
}


module.exports = {
    processImage,
};
