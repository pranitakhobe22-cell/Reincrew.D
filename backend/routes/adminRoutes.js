const express = require('express');
const router = express.Router();
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { adminLimiter } = require('../middleware/rateLimiter');
const { getAllInterviews, getAnalytics } = require('../controllers/adminController');
const { getMonitoringData } = require('../controllers/monitoringController');

// All admin routes require authentication + admin role + rate limiting
router.use(authMiddleware);
router.use(adminOnly);
router.use(adminLimiter);

// GET /admin/interviews
router.get('/interviews', getAllInterviews);

// GET /admin/analytics
router.get('/analytics', getAnalytics);

// GET /admin/monitoring
router.get('/monitoring', getMonitoringData);

module.exports = router;
