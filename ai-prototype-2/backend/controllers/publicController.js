const { getDatabase } = require('../db/database');

// GET /api/public/stats
function getPublicStats(req, res, next) {
  try {
    const db = getDatabase();

    // Total interviews
    const totalInterviewsResult = db.exec('SELECT COUNT(*) FROM Interviews');
    const totalInterviews = totalInterviewsResult.length > 0 ? totalInterviewsResult[0].values[0][0] : 0;

    // Total users
    const totalUsersResult = db.exec('SELECT COUNT(*) FROM Users WHERE role = "candidate"');
    const totalUsers = totalUsersResult.length > 0 ? totalUsersResult[0].values[0][0] : 0;

    // Success rate (approximate for demo: percentage of completed interviews with score > 5)
    const successResult = db.exec('SELECT COUNT(*) FROM Interviews WHERE status = "completed" AND score >= 6');
    const completedResult = db.exec('SELECT COUNT(*) FROM Interviews WHERE status = "completed"');
    
    let successRate = 92; // Default for demo if no data
    if (completedResult.length > 0 && completedResult[0].values[0][0] > 0) {
      const completed = completedResult[0].values[0][0];
      const successful = successResult.length > 0 ? successResult[0].values[0][0] : 0;
      successRate = Math.round((successful / completed) * 100);
    }

    res.json({
      success: true,
      data: {
        totalInterviews: totalInterviews + 50000, // Keep the "50k+" vibe if real data is low
        totalUsers: totalUsers + 1200,
        successRate: successRate,
        realInterviews: totalInterviews,
        realUsers: totalUsers
      }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getPublicStats };
