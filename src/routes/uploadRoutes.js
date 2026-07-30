const express = require("express")

const upload = require("../middleware/upload")


const router = express.Router();


const { uploadFile, getJobStatus } = require("../controllers/uploadController")


router.post("/upload", upload.single("file"), uploadFile)
router.get("/status/:id", getJobStatus)

module.exports = router;