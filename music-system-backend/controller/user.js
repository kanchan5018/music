const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import Models
const User = require("../models/user");

// Secret key for JWT (use environment variables in production)
const JWT_SECRET = process.env.JWT_TOKEN;

// Register user
const register = async (req, res) => {
    try {
        console.log("Registration process started");
        const { username, email, password } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            console.log("Validation failed: Missing required fields");
            return res.status(400).send({
                status: "failed",
                message: "All fields are required.",
                data: []
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists, registration aborted");
            return res.status(400).send({
                status: "failed",
                message: "User already exists.",
                data: []
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Prepare user data for response
        const userData = {
            username: newUser.username,
            email: newUser.email
        };

        console.log("User registered successfully");
        return res.status(200).send({
            status: "success",
            message: "User registered successfully.",
            data: userData
        });
    } catch (error) {
        console.error("Registration failed with error:", error.message);
        return res.status(500).send({
            status: "failed",
            message: "Server error",
            error: error.message
        });
    }
};

// Login user
const login = async (req, res) => {
    try {
        console.log("Login process started");
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            console.log("Validation failed: Missing email or password");
            return res.status(400).send({
                status: "failed",
                message: "Email and password are required.",
                data: []
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        console.log("user", user)
        if (!user) {
            console.log("Login failed: Invalid credentials");
            return res.status(400).send({
                status: "failed",
                message: "Invalid credentials.",
                data: []
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Login failed: Invalid credentials");
            return res.status(400).send({
                status: "failed",
                message: "Invalid credentials.",
                data: []
            });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );


        console.log("User logged in successfully");
        return res.status(200).send({
            status: "success",
            message: "Login successful.",
            data: {id: user._id,
                name: user.name,
                 token }
        });
    } catch (error) {
        console.error("Login failed with error:", error.message);
        return res.status(500).send({
            status: "failed",
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {login, register}