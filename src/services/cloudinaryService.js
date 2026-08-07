const cloudinary = require("../config/cloudinary");

async function uploadFile(filePath) {

    const result = await cloudinary.uploader.upload(
        filePath,
        {
            resource_type: "auto",
        }
    );

    return result.secure_url;
}

module.exports = {
    uploadFile,
};