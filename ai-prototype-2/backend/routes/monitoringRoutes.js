const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { reportViolation } = require('../controllers/monitoringController');

// Ensure monitoring uploads directory exists
const monitoringDir = path.join(__dirname, '..', '..', 'uploads', 'monitoring');
if (!fs.existsSync(monitoringDir)) {
  fs.mkdirSync(monitoringDir, { recursive: true });
}

// Multer config: image/video files, 10MB max, save to uploads/monitoring/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, monitoringDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `violation_${req.user.id}_${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'video/webm', 'video/mp4'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image (JPEG, PNG, WebP) or video (WebM, MP4) files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// All monitoring routes require authentication
router.use(authMiddleware);

// POST /monitoring/violation
router.post('/violation', (req, res, next) => {
  upload.single('media')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          error: 'File too large. Maximum size is 10MB.',
        });
      }
      return res.status(400).json({
        success: false,
        error: err.message,
      });
    }
    next();
  });
}, reportViolation);

module.exports = router;
