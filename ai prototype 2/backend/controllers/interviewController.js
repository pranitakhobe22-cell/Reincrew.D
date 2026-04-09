const { getDatabase, saveDatabase } = require('../db/database');
const { generateQuestions, evaluateAnswers } = require('../services/geminiService');

// POST /interview/start
async function startInterview(req, res, next) {
  try {
    const userId = req.user.id;
    const db = getDatabase();

    // Fetch candidate profile for AI question generation
    const userResult = db.exec(
      'SELECT name, college, skillsJSON FROM Users WHERE id = ?',
      [userId]
    );

    if (userResult.length === 0 || userResult[0].values.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found.',
      });
    }

    const row = userResult[0].values[0];
    const userName = row[0];
    const college = row[1];
    const skillsJSON = row[2];

    // Build profile from resume if available, otherwise use defaults
    const profile = skillsJSON ? JSON.parse(skillsJSON) : {};

    // Generate questions via Gemini
    let questions;
    try {
      questions = await generateQuestions({
        name: userName,
        skills: profile.skills || [],
        domain: profile.domain || 'General',
        experience: profile.experience || 'entry',
        college,
      });
      console.log(`[INTERVIEW] AI generated ${questions.length} questions for user #${userId}`);
    } catch (aiErr) {
      console.error(`[INTERVIEW] AI question generation failed for user #${userId}:`, aiErr.message);
      return res.status(502).json({
        success: false,
        error: 'AI question generation failed. Please try again.',
      });
    }

    db.run(
      `INSERT INTO Interviews (userId, questions, answers, status) VALUES (?, ?, ?, ?)`,
      [userId, JSON.stringify(questions), JSON.stringify([]), 'in_progress']
    );
    saveDatabase();

    const result = db.exec(
      'SELECT id, createdAt FROM Interviews WHERE userId = ? ORDER BY id DESC LIMIT 1',
      [userId]
    );
    const interviewId = result[0].values[0][0];
    const createdAt = result[0].values[0][1];

    console.log(`[INTERVIEW] Started: interview #${interviewId} for user #${userId}`);

    res.status(201).json({
      success: true,
      message: 'Interview started.',
      data: {
        interviewId,
        questions,
        totalQuestions: questions.length,
        status: 'in_progress',
        createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
}

// POST /interview/answer
function submitAnswer(req, res, next) {
  try {
    const userId = req.user.id;
    const { interviewId, answer } = req.body;

    if (!interviewId || typeof interviewId !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'interviewId (number) is required.',
      });
    }

    if (!answer || typeof answer !== 'string' || answer.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'answer (non-empty string) is required.',
      });
    }

    const db = getDatabase();

    const result = db.exec(
      'SELECT id, questions, answers, status FROM Interviews WHERE id = ? AND userId = ?',
      [interviewId, userId]
    );

    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Interview not found.',
      });
    }

    const row = result[0].values[0];
    const status = row[3];

    if (status !== 'in_progress') {
      return res.status(400).json({
        success: false,
        error: 'This interview is already completed.',
      });
    }

    const questions = JSON.parse(row[1]);
    const answers = JSON.parse(row[2]);

    if (answers.length >= questions.length) {
      return res.status(400).json({
        success: false,
        error: 'All questions have already been answered.',
      });
    }

    answers.push(answer.trim());

    db.run(
      'UPDATE Interviews SET answers = ? WHERE id = ?',
      [JSON.stringify(answers), interviewId]
    );
    saveDatabase();

    const currentIndex = answers.length - 1;
    const nextQuestion = answers.length < questions.length ? questions[answers.length] : null;

    console.log(`[INTERVIEW] Answer ${answers.length}/${questions.length} submitted for interview #${interviewId}`);

    res.json({
      success: true,
      message: 'Answer submitted.',
      data: {
        interviewId,
        answeredSoFar: answers.length,
        totalQuestions: questions.length,
        isComplete: answers.length >= questions.length,
        nextQuestion,
      },
    });
  } catch (err) {
    next(err);
  }
}

// POST /interview/end
async function endInterview(req, res, next) {
  try {
    const userId = req.user.id;
    const { interviewId } = req.body;

    if (!interviewId || typeof interviewId !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'interviewId (number) is required.',
      });
    }

    const db = getDatabase();

    const result = db.exec(
      'SELECT id, questions, answers, status FROM Interviews WHERE id = ? AND userId = ?',
      [interviewId, userId]
    );

    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Interview not found.',
      });
    }

    const row = result[0].values[0];
    const status = row[3];

    if (status === 'completed') {
      return res.status(400).json({
        success: false,
        error: 'This interview is already completed.',
      });
    }

    const questions = JSON.parse(row[1]);
    const answers = JSON.parse(row[2]);

    // AI evaluation via Gemini
    let evaluation;
    try {
      evaluation = await evaluateAnswers(questions, answers);
      console.log(`[INTERVIEW] AI evaluation for interview #${interviewId}: score ${evaluation.score}/10`);
    } catch (aiErr) {
      console.error(`[INTERVIEW] AI evaluation failed for interview #${interviewId}:`, aiErr.message);
      // Fallback to basic scoring if AI fails
      const basicScore = questions.length > 0
        ? Math.round((answers.length / questions.length) * 10)
        : 0;
      evaluation = {
        score: basicScore,
        strengths: ['Completed the interview'],
        improvements: ['AI evaluation unavailable — try again later'],
        summary: `Answered ${answers.length} of ${questions.length} questions.`,
      };
    }

    const summaryJSON = JSON.stringify({
      score: evaluation.score,
      strengths: evaluation.strengths,
      improvements: evaluation.improvements,
      summary: evaluation.summary,
    });

    db.run(
      'UPDATE Interviews SET status = ?, summary = ?, score = ? WHERE id = ?',
      ['completed', summaryJSON, evaluation.score, interviewId]
    );
    saveDatabase();

    console.log(`[INTERVIEW] Ended: interview #${interviewId} — score ${evaluation.score}/10`);

    res.json({
      success: true,
      message: 'Interview completed.',
      data: {
        interviewId,
        questionsAsked: questions.length,
        questionsAnswered: answers.length,
        score: evaluation.score,
        strengths: evaluation.strengths,
        improvements: evaluation.improvements,
        summary: evaluation.summary,
        status: 'completed',
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { startInterview, submitAnswer, endInterview };
