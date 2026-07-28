
require("dotenv").config();
const app = require("./app");

const connectDB = require("./config/db");



const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    connectDB();
});


