const mongoose = require("mongoose");

const canvasSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    shared: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    elements: [{
        type: mongoose.Schema.Types.Mixed
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Canvas = mongoose.model('Canvas', canvasSchema);

module.exports = Canvas;


// owner: References the user who created the canvas.
// shared: Stores an array of user IDs with whom the canvas is shared.
// elements: Holds all elements present in the canvas.
// createdAt: Automatically records the canvas creation timestamp.