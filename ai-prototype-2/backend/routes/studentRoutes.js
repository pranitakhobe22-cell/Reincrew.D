const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { getProfile, getInterviews } = require('../controllers/studentController');

// All student routes require authentication
router.use(authMiddleware);

// GET /student/profile
router.get('/profile', getProfile);

// GET /student/interviews
router.get('/interviews', getInterviews);

module.exports = router;
