const express = require("express");
const upload = require("./middleware/upload")
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(express.urlencoded())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Server Running");
});

app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/")

})

module.exports = app;