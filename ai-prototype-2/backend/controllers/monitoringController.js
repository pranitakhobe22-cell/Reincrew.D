const { getDatabase, saveDatabase } = require('../db/database');

// POST /monitoring/violation
function reportViolation(req, res, next) {
  try {
    const userId = req.user.id;
    const { violationType, timestamp, interviewId } = req.body;

    if (!violationType || typeof violationType !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'violationType (string) is required.',
      });
    }

    if (!timestamp || typeof timestamp !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'timestamp (string) is required.',
      });
    }

    if (!interviewId) {
      return res.status(400).json({
        success: false,
        error: 'interviewId is required.',
      });
    }

    const parsedInterviewId = Number(interviewId);
    if (isNaN(parsedInterviewId)) {
      return res.status(400).json({
        success: false,
        error: 'interviewId must be a valid number.',
      });
    }

    const db = getDatabase();

    // Verify the interview exists and belongs to this user
    const ivResult = db.exec(
      'SELECT id FROM Interviews WHERE id = ? AND userId = ?',
      [parsedInterviewId, userId]
    );

    if (ivResult.length === 0 || ivResult[0].values.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Interview not found.',
      });
    }

    const mediaPath = req.file ? `uploads/monitoring/${req.file.filename}` : null;

    db.run(
      `INSERT INTO InterviewMonitoring (interviewId, userId, violationType, timestamp, mediaPath)
       VALUES (?, ?, ?, ?, ?)`,
      [parsedInterviewId, userId, violationType.trim(), timestamp.trim(), mediaPath]
    );
    saveDatabase();

    // Get the inserted record ID
    const idResult = db.exec(
      'SELECT id FROM InterviewMonitoring WHERE interviewId = ? AND userId = ? ORDER BY id DESC LIMIT 1',
      [parsedInterviewId, userId]
    );
    const violationId = idResult[0].values[0][0];

    console.log(`[MONITORING] Violation #${violationId}: type="${violationType}" interview=#${parsedInterviewId} user=#${userId}`);

    res.status(201).json({
      success: true,
      message: 'Violation reported.',
      data: {
        id: violationId,
        interviewId: parsedInterviewId,
        violationType: violationType.trim(),
        timestamp: timestamp.trim(),
        mediaPath,
      },
    });
  } catch (err) {
    next(err);
  }
}

// GET /admin/monitoring
function getMonitoringData(req, res, next) {
  try {
    const db = getDatabase();

    const result = db.exec(`
      SELECT
        m.id,
        m.interviewId,
        u.name,
        u.email,
        m.violationType,
        m.timestamp,
        m.mediaPath,
        m.createdAt
      FROM InterviewMonitoring m
      JOIN Users u ON m.userId = u.id
      JOIN Interviews i ON m.interviewId = i.id
      ORDER BY m.createdAt DESC
    `);

    if (result.length === 0) {
      return res.json({
        success: true,
        data: { violations: [], total: 0 },
      });
    }

    const violations = result[0].values.map(row => ({
      id: row[0],
      interviewId: row[1],
      candidateName: row[2],
      candidateEmail: row[3],
      violationType: row[4],
      timestamp: row[5],
      mediaPath: row[6],
      createdAt: row[7],
    }));

    console.log(`[ADMIN] Fetched ${violations.length} monitoring violations`);

    res.json({
      success: true,
      data: { violations, total: violations.length },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { reportViolation, getMonitoringData };
