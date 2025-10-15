const User = require('../models/userModel');

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = new User(req.body);

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        const user = new User({ name, email, password });
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


module.exports = { registerUser, getUser, loginUser };


// Using the Model
// Create a Controllers folder. This folder handles the business logic of your application, such as creating, reading, updating, or deleting data. It acts as a middle layer between the routes and the database. Make a file named userController.js where the Functions to add a user, fetch all users, or update user details will be present.


