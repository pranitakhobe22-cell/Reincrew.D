const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { uploadResume, getResume } = require('../controllers/resumeController');

// Multer config: PDF only, 5MB max, save to uploads/resume/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'uploads', 'resume'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `resume_${req.user.id}_${Date.now()}.pdf`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// All resume routes require authentication
router.use(authMiddleware);

// POST /resume/upload
router.post('/upload', (req, res, next) => {
  upload.single('resume')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          error: 'File too large. Maximum size is 5MB.',
        });
      }
      return res.status(400).json({
        success: false,
        error: err.message,
      });
    }
    next();
  });
}, uploadResume);

// GET /resume
router.get('/', getResume);

module.exports = router;
