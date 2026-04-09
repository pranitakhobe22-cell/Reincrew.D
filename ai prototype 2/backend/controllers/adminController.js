const { getDatabase } = require('../db/database');

// GET /admin/interviews
function getAllInterviews(req, res, next) {
  try {
    const db = getDatabase();

    const result = db.exec(`
      SELECT
        i.id,
        u.name,
        u.email,
        i.score,
        i.summary,
        i.status,
        i.createdAt
      FROM Interviews i
      JOIN Users u ON i.userId = u.id
      ORDER BY i.createdAt DESC
    `);

    if (result.length === 0) {
      return res.json({
        success: true,
        data: { interviews: [], total: 0 },
      });
    }

    const interviews = result[0].values.map(row => {
      const summary = row[4] ? JSON.parse(row[4]) : null;

      return {
        interviewId: row[0],
        candidateName: row[1],
        candidateEmail: row[2],
        score: row[3],
        summary: summary ? summary.summary : null,
        strengths: summary ? summary.strengths : null,
        improvements: summary ? summary.improvements : null,
        status: row[5],
        date: row[6],
      };
    });

    console.log(`[ADMIN] Fetched ${interviews.length} interviews`);

    res.json({
      success: true,
      data: { interviews, total: interviews.length },
    });
  } catch (err) {
    next(err);
  }
}

// GET /admin/analytics
function getAnalytics(req, res, next) {
  try {
    const db = getDatabase();

    // Total interviews
    const totalResult = db.exec('SELECT COUNT(*) FROM Interviews');
    const totalInterviews = totalResult.length > 0 ? totalResult[0].values[0][0] : 0;

    // Average score (only completed interviews with a score)
    const avgResult = db.exec(
      "SELECT AVG(score), COUNT(*) FROM Interviews WHERE status = 'completed' AND score IS NOT NULL"
    );
    const avgScore = avgResult.length > 0 && avgResult[0].values[0][0] !== null
      ? Math.round(avgResult[0].values[0][0] * 10) / 10
      : 0;
    const completedInterviews = avgResult.length > 0 ? avgResult[0].values[0][1] : 0;

    // In-progress interviews
    const inProgressResult = db.exec(
      "SELECT COUNT(*) FROM Interviews WHERE status = 'in_progress'"
    );
    const inProgressInterviews = inProgressResult.length > 0 ? inProgressResult[0].values[0][0] : 0;

    // Top candidates (by highest score, completed only)
    const topResult = db.exec(`
      SELECT
        u.id,
        u.name,
        u.email,
        u.college,
        MAX(i.score) AS bestScore,
        COUNT(i.id) AS totalInterviews
      FROM Interviews i
      JOIN Users u ON i.userId = u.id
      WHERE i.status = 'completed' AND i.score IS NOT NULL
      GROUP BY u.id
      ORDER BY bestScore DESC
      LIMIT 10
    `);

    const topCandidates = topResult.length > 0
      ? topResult[0].values.map(row => ({
          id: row[0],
          name: row[1],
          email: row[2],
          college: row[3],
          bestScore: row[4],
          totalInterviews: row[5],
        }))
      : [];

    console.log(`[ADMIN] Analytics: ${totalInterviews} total, ${completedInterviews} completed, avg ${avgScore}/10`);

    res.json({
      success: true,
      data: {
        totalInterviews,
        completedInterviews,
        inProgressInterviews,
        averageScore: avgScore,
        topCandidates,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllInterviews, getAnalytics };
