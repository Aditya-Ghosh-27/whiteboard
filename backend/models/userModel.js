const mongoose = require('mongoose');

// This is like what the structure of the document is going to be
const userSchema = new mongoose.Schema({
    name: {
        type: String,             // The name must be a string
        required: true,           // This field is mandatory
        trim: true                // Removes extra spaces from the name
    },
    email: {
        type:String,              // The email must be a string
        required: true,           // This field is mandatory
        unique: true,             // Ensures no two users have the same email
        lowercase: true,          // Converts the email to lowercase automatically
    },
    password: {
        type: String,
        required: true
    }
});

// Create the User Model
const User = mongoose.model('User', userSchema);


// Export the model for use in other files
module.exports = User;



// For example, in a collection storing user data, you can define a schema to enforce that each user has fields like name, email, and age, with specific data types and rules (e.g., email must be unique, and age must be a number within a certain range).


// Define a Schema
// Create a folder named models.This folder contains all the Mongoose schemas and models that define the structure of your MongoDB documents. Make a file called user.js. Here we will be defining the 'User' Schema.

