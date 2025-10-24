const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// This is like what the structure of the document is going to be
const userSchema = new mongoose.Schema({
    email: {
        type:String,              // The email must be a string
        required: true,           // This field is mandatory
        unique: true,             // Ensures no two users have the same email
        lowercase: true,          // Converts the email to lowercase automatically
        trim: true
    },
    password: {
        type: String,
        required: true
    }
    // why passwords should not be unique? -> 2 person will not have the same password, then someone will be able to figure out 
}, {
    timestamps: true,
    collection: 'users'
});

// Encrypt passwords before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// Create the User Model
const User = mongoose.model('User', userSchema);


// Export the model for use in other files
module.exports = User;



// For example, in a collection storing user data, you can define a schema to enforce that each user has fields like name, email, and age, with specific data types and rules (e.g., email must be unique, and age must be a number within a certain range).


// Define a Schema
// Create a folder named models.This folder contains all the Mongoose schemas and models that define the structure of your MongoDB documents. Make a file called user.js. Here we will be defining the 'User' Schema.