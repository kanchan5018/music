require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Import Routes
const userRoutes = require("./routes/user");
const playList = require("./routes/playlists");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/playlist", playList);

app.get("/", (req, res) => {
    res.send({ message: "Express Server for Music System is running on Vercel" });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database is connected successfully"))
    .catch((error) => console.error("Database connection error: ", error));

app.listen(8000, () => {
        console.log(`Server is running on port 8000`);
});

module.exports = app; // Export app for serverless functions
