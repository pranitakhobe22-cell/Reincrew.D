const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '..', '..', 'database', 'initium.db');

let db = null;

async function initDatabase() {
  const SQL = await initSqlJs();

  // Ensure the database directory exists
  const dbDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('[DB] Created database directory:', dbDir);
  }

  // Load existing database file if it exists, otherwise create new
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
    console.log('[DB] Loaded existing database from', DB_PATH);
  } else {
    db = new SQL.Database();
    console.log('[DB] Created new database');
  }

  // Create tables if they don't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('candidate', 'admin')),
      college TEXT,
      skillsJSON TEXT,
      resumePath TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add onboarding columns gracefully if they don't exist
  try { db.run(`ALTER TABLE Users ADD COLUMN onboarded INTEGER DEFAULT 0`); } catch (err) {}
  try { db.run(`ALTER TABLE Users ADD COLUMN domain TEXT`); } catch (err) {}
  try { db.run(`ALTER TABLE Users ADD COLUMN experience TEXT`); } catch (err) {}
  try { db.run(`ALTER TABLE Users ADD COLUMN company TEXT`); } catch (err) {}
  try { db.run(`ALTER TABLE Users ADD COLUMN jobTitle TEXT`); } catch (err) {}


  db.run(`
    CREATE TABLE IF NOT EXISTS Interviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      questions TEXT,
      answers TEXT,
      summary TEXT,
      score REAL,
      status TEXT DEFAULT 'pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES Users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS InterviewMonitoring (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      interviewId INTEGER NOT NULL,
      userId INTEGER NOT NULL,
      violationType TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      mediaPath TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (interviewId) REFERENCES Interviews(id),
      FOREIGN KEY (userId) REFERENCES Users(id)
    )
  `);

  // Persist to disk
  saveDatabase();

  console.log('[DB] Tables initialized successfully');
  return db;
}

function saveDatabase() {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

module.exports = { initDatabase, getDatabase, saveDatabase };
