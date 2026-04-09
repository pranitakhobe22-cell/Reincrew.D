const { getDatabase } = require('../db/database');

// GET /student/profile
function getProfile(req, res, next) {
  try {
    const userId = req.user.id;
    const db = getDatabase();

    const result = db.exec(
      'SELECT id, name, email, role, college, skillsJSON, resumePath, createdAt, domain, experience FROM Users WHERE id = ?',
      [userId]
    );

    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found.',
      });
    }

    const row = result[0].values[0];
    const skills = row[5] ? JSON.parse(row[5]) : null;

    console.log(`[STUDENT] Profile fetched for user #${userId}`);

    res.json({
      success: true,
      data: {
        id: row[0],
        name: row[1],
        email: row[2],
        role: row[3],
        college: row[4],
        skills: skills ? skills.skills || [] : [],
        resumeUploaded: !!row[6],
        createdAt: row[7],
        domain: row[8] || (skills ? skills.domain : null),
        experience: row[9] || (skills ? skills.experience : null),
      },
    });
  } catch (err) {
    next(err);
  }
}

// GET /student/interviews
function getInterviews(req, res, next) {
  try {
    const userId = req.user.id;
    const db = getDatabase();

    const result = db.exec(
      `SELECT id, questions, answers, summary, score, status, createdAt
       FROM Interviews
       WHERE userId = ?
       ORDER BY createdAt DESC`,
      [userId]
    );

    if (result.length === 0) {
      return res.json({
        success: true,
        data: { interviews: [], total: 0 },
      });
    }

    const interviews = result[0].values.map(row => {
      const questions = JSON.parse(row[1] || '[]');
      const answers = JSON.parse(row[2] || '[]');
      const summary = row[3] ? JSON.parse(row[3]) : null;

      return {
        interviewId: row[0],
        questionsAsked: questions.length,
        questionsAnswered: answers.length,
        score: row[4],
        summary: summary ? summary.summary : null,
        strengths: summary ? summary.strengths : null,
        improvements: summary ? summary.improvements : null,
        status: row[5],
        date: row[6],
      };
    });

    console.log(`[STUDENT] Fetched ${interviews.length} interviews for user #${userId}`);

    res.json({
      success: true,
      data: { interviews, total: interviews.length },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfile, getInterviews };
