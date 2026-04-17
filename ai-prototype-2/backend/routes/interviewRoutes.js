const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { startInterview, submitAnswer, endInterview } = require('../controllers/interviewController');

// All interview routes require authentication
router.use(authMiddleware);

// POST /interview/start
router.post('/start', startInterview);

// POST /interview/answer
router.post('/answer', submitAnswer);

// POST /interview/end
router.post('/end', endInterview);

module.exports = router;
