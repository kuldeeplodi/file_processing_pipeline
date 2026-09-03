const fs = require("fs");

function deleteFile(filePath) {
    if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Deleted:", filePath);
    }
}

module.exports = {
    deleteFile,
};