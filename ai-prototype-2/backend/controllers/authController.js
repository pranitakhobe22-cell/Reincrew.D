const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDatabase, saveDatabase } = require('../db/database');
const { JWT_SECRET } = require('../middleware/auth');

const SALT_ROUNDS = 10;

// POST /auth/register
async function register(req, res, next) {
  try {
    const { name, email, password, role, college } = req.body;

    // --- Input validation ---
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        error: 'Fields name, email, password, and role are required.',
      });
    }

    if (typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Name must be at least 2 characters.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters.',
      });
    }

    if (!['candidate', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Role must be either "candidate" or "admin".',
      });
    }

    // --- Check duplicate email ---
    const db = getDatabase();
    const existing = db.exec('SELECT id FROM Users WHERE email = ?', [email]);

    if (existing.length > 0 && existing[0].values.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'An account with this email already exists.',
      });
    }

    // --- Hash password & insert ---
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    db.run(
      `INSERT INTO Users (name, email, password, role, college) VALUES (?, ?, ?, ?, ?)`,
      [name.trim(), email.toLowerCase().trim(), hashedPassword, role, college || null]
    );
    saveDatabase();

    // Get the inserted user's id
    const result = db.exec(
      'SELECT id FROM Users WHERE email = ?',
      [email.toLowerCase().trim()]
    );
    const userId = result[0].values[0][0];

    // --- Generate token ---
    const token = jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: '24h' });

    console.log(`[AUTH] New user registered: ${email} (${role})`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      data: {
        user: { id: userId, name: name.trim(), email: email.toLowerCase().trim(), role, onboarded: 0 },
        token,
      },
    });
  } catch (err) {
    next(err);
  }
}

// POST /auth/login
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // --- Input validation ---
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format.',
      });
    }

    // --- Find user ---
    const db = getDatabase();
    const result = db.exec(
      'SELECT id, name, email, password, role, onboarded FROM Users WHERE email = ?',
      [email.toLowerCase().trim()]
    );

    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.',
      });
    }

    const row = result[0].values[0];
    const user = {
      id: row[0],
      name: row[1],
      email: row[2],
      password: row[3],
      role: row[4],
      onboarded: row[5],
    };

    // --- Verify password ---
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.',
      });
    }

    // --- Generate token ---
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

    console.log(`[AUTH] User logged in: ${user.email} (${user.role})`);

    res.json({
      success: true,
      message: 'Login successful.',
      data: {
        user: { id: user.id, name: user.name, email: user.email, role: user.role, onboarded: user.onboarded },
        token,
      },
    });
  } catch (err) {
    next(err);
  }
}

// POST /auth/onboard
async function onboard(req, res, next) {
  try {
    const { id, role } = req.user;
    const db = getDatabase();

    if (role === 'candidate') {
      const { college, domain, experience } = req.body;
      db.run('UPDATE Users SET college = ?, domain = ?, experience = ?, onboarded = 1 WHERE id = ?', 
        [college || null, domain || null, experience || null, id]);
    } else if (role === 'admin') {
      const { company, jobTitle } = req.body;
      db.run('UPDATE Users SET company = ?, jobTitle = ?, onboarded = 1 WHERE id = ?',
        [company || null, jobTitle || null, id]);
    }

    saveDatabase();
    res.json({ success: true, message: 'Onboarding completed successfully.' });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, onboard };
