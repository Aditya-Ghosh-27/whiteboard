const express = require('express');
const { createCanvas, loadCanvas, updateCanvas, getUserCanvases, deleteCanvas } = require('../controllers/canvasController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/create", authMiddleware, createCanvas);
router.put("/update", authMiddleware, updateCanvas);
router.get("/load/:id", authMiddleware, loadCanvas);
router.get("/list", authMiddleware, getUserCanvases);
router.delete("/:canvasId", authMiddleware, deleteCanvas);

module.exports = router;