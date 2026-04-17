const express = require('express');
const router = express.Router();
const { register, login, onboard } = require('../controllers/authController');
const { authLimiter } = require('../middleware/rateLimiter');
const { authMiddleware } = require('../middleware/auth');

// Rate limit all auth routes
router.use(authLimiter);

// POST /auth/register
router.post('/register', register);

// POST /auth/login
router.post('/login', login);

// POST /auth/onboard
router.post('/onboard', authMiddleware, onboard);

module.exports = router;
