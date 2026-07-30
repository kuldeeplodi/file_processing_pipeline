const express = require("express");
const upload = require("./middleware/upload")
const cors = require("cors")
const app = express();
const uploadRoutes = require("./routes/uploadRoutes")

app.use(express.json());
app.use(express.urlencoded())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Server Running");
});

app.use("/api", uploadRoutes);

module.exports = app;