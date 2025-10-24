const Canvas = require('../models/canvasModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// The backend should provide an endpoint that allows authenticated users to create a new canvas. We will be creating a function called createCanvas.
const createCanvas = async (req, res) => {
    try {
        const userId = req.userId

        const newCanvas = new Canvas({
            owner: userId,
            shared: [],
            elements: []
        });

        await newCanvas.save();
        res.status(201).json({ message: "Canvas created successfully", canvasId: newCanvas._id });
    } catch(error) {
        res.status(500).json({ error: "Failed to create canvas", details: error.message });
    }
};


// Handling Canvas Updates
// The backend should expose an API that enables users to update their canvas by modifying its elements. This function will first validate whether the requesting user is the owner or has the necessary access permissions. Upon successful verification, it will update the elements field with the new data and return the updated canvas.
const updateCanvas = async (req, res) => {
    try {
        const { canvasId, elements } = req.body;
        const userId = req.userId;
        console.log("Canvas ID:", canvasId);


        const canvas = await Canvas.findById(canvasId);
        if (!canvas) {
            return res.status(404).json({ error: "Canvas not found" });
        }


        // Ensure only the owner or shared users can update
        if (canvas.owner.toString() !== userId && !canvas.shared.includes(userId)) {
            return res.status(403).json({ error: "Unauthorized to update this canvas" });
        }

        canvas.elements = elements;
        await canvas.save();

        console.log("saved");

        res.status(200).json({ message: "Canvas updated successfully "});
    } catch(error) {
        res.status(500).json({ error: "Failed to update canvas", details: error.message });
    }
};



// We will define a loadCanvas function inside the canvasController. This function retrieves a canvas by its ID while ensuring that only authorized users can access it.
const loadCanvas = async (req, res) => {
    try {
        const canvasId = req.params.id;
        const userId = req.userId;

        const canvas = await Canvas.findById(canvasId);
        if (!canvas) {
            return res.status(404).json({ error: "Canvas not found" });
        }

        // Ensure only the owner or shared users can access it
        if (canvas.owner.toString() !== userId && !canvas.shared.includes(userId)) {
            return res.status(403).json({ error: "Unauthorized to access this canvas" });
        }

        res.json(canvas);
    } catch (error) {
        res.status(500).json({ error: "Failed to load canvas", details: error.message });
    }
};

// Extracts the canvasId from request parameters and verifies if the user is authorized.
// Retrieves the canvas from the database if the user owns it or - has shared access.
// Returns the canvas data or an error message if the user lacks permission.


// Fetching User Canvases
// To retrieve a user's canvases, we define the getUserCanvases function inside the canvasController. This function queries the database for canvases where the user is either the owner or a collaborator.
const getUserCanvases = async (req, res) => {
    try {
        const userId = req.userId;

        const canvases = await Canvas.find({
            $or: [{ owner: userId }, { shared: userId }]
        }).sort({ createdAt: -1 });

        res.json(canvases);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch canvases", details: error.message });
    }
};

// To implement deletion, we first create a controller function that checks if the requesting user is the owner of the canvas. If they are, the canvas is deleted; otherwise, an error message is returned.
const deleteCanvas = async (req, res) => {
    try {
        const canvasId = req.params.canvasId;
        const userId = req.userId;

        const canvas = await Canvas.findById(canvasId);
        if (!canvas) {
            return res.status(404).json({ error: "Canvas not found" });
        }

        if (canvas.owner.toString() !== userId) {
            return res.status(403).json({ error: "Only the owner can delete this canvas" });
        }

        await Canvas.findByIdAndDelete(canvasId);
        res.json({ message: "Canvas deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete canvas", details: error.message });
    }
};



module.exports = {
    createCanvas,
    loadCanvas,
    updateCanvas,
    getUserCanvases,
    deleteCanvas
}