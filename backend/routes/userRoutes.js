const express = require('express');
const { registerUser, getUser, loginUser } = require('../controllers/userController');
const { validateUser } = require('../middlewares/validation');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', validateUser, registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUser);

module.exports = router;