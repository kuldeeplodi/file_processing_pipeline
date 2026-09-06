const express = require("express");
const upload = require("./middleware/upload")
const cors = require("cors")
const app = express();
const uploadRoutes = require("./routes/uploadRoutes")
const serverAdapter = require("./config/bullBoard");

app.use(express.json());
app.use(express.urlencoded())
app.use(cors())
app.use(
    "/admin/queues",
    serverAdapter.getRouter()
);

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        service: "File Processing Pipeline"
    });
});


app.use("/api", uploadRoutes);

module.exports = app;