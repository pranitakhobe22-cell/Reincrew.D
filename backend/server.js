require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { initDatabase } = require('./db/database');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');
const authRoutes = require('./routes/authRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const adminRoutes = require('./routes/adminRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const studentRoutes = require('./routes/studentRoutes');
const monitoringRoutes = require('./routes/monitoringRoutes');
const waitlistRoutes = require('./routes/waitlistRoutes');
const publicController = require('./controllers/publicController');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure upload directories exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
const resumeDir = path.join(uploadsDir, 'resume');
const monitoringDir = path.join(uploadsDir, 'monitoring');
for (const dir of [uploadsDir, resumeDir, monitoringDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// --------------- Middleware ---------------
app.use(cors({
  origin: '*', // Allow all origins for dev
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(logger);
app.use(apiLimiter);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Serve frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// --------------- Health Route ---------------
app.get('/', (req, res) => {
  res.json({ message: 'Reincrew AI Backend Running' });
});

app.get('/api/health', (req, res) => {
  res.json({ message: 'Reincrew AI Backend Running' });
});

app.get('/api/public/stats', publicController.getPublicStats);

// --------------- Routes ---------------
app.use('/auth', authRoutes);
app.use('/interview', interviewRoutes);
app.use('/student', studentRoutes);
app.use('/admin', adminRoutes);
app.use('/resume', resumeRoutes);
app.use('/monitoring', monitoringRoutes);
app.use('/api/waitlist', waitlistRoutes);

// --------------- Error Handler ---------------
app.use(errorHandler);

// --------------- Start Server ---------------
async function startServer() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`\n✦  Reincrew.AI Backend`);
      console.log(`   Server  → http://localhost:${PORT}`);
      console.log(`   Status  → Running\n`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
