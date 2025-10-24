const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: [ { msg: "All fields are required" } ]});
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: "User created successfully "});
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all users
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if(!user) return res.status(404).json({ error: "User not found "});
        
        res.json(user);
    } catch(error) {
        res.status(500).json({ error: "Failed to get user", details: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: [{ msg: "Invalid credentials" }] });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: [{ msg: "Invalid credentials"}] });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: [{ msg: "Login failed", details: error.message }] });
    }
};


module.exports = { registerUser, getUser, loginUser };


// Using the Model
// Create a Controllers folder. This folder handles the business logic of your application, such as creating, reading, updating, or deleting data. It acts as a middle layer between the routes and the database. Make a file named userController.js where the Functions to add a user, fetch all users, or update user details will be present