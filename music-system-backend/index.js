require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// Import Routes
const userRoutes = require("./routes/user");
const playList = require("./routes/playlists");
const PORT = 8000;
const CONNECTION_URL = process.env.MONGO_URI;

app.use(cors({
    // origin: ["http://localhost:3000", "https://music-pyjc.vercel.app"]
}));
app.use(express.json());


app.use("/user", userRoutes);
app.use('/playlist', playList);

app.get("/", (req, res) => {
    return res.send({ message: "Express Server for Music System is running on vercel" });
});

mongoose.connect(CONNECTION_URL)
    .then(() => {
        console.log("Database is connected successfully");
        app.listen(PORT, () => {
            console.log("Server is running on port 8000");
        });
    })
    .catch((error) => {
        console.error("Database connection error: ", error);
    });