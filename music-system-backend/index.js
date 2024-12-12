require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Import Routes
const userRoutes = require("./routes/user");
const playList = require("./routes/playlists");
const CONNECTION_URL = 'mongodb+srv://tiwarikanchan0518:tiwarikanchan0518@music.zun02.mongodb.net/?retryWrites=true&w=majority&appName=Music';

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/playlist", playList);

app.get("/", (req, res) => {
    res.send({ message: "Express Server for Music System is running on Vercel" });
});

mongoose.connect(CONNECTION_URL)
    .then(() => console.log("Database is connected successfully"))
    .catch((error) => console.error("Database connection error: ", error));

module.exports = app;
