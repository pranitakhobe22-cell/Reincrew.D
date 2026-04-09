const path = require('path');
const fs = require('fs');
const { extractTextFromPDF } = require('../utils/pdfExtractor');
const { getDatabase, saveDatabase } = require('../db/database');
const { analyseResume } = require('../services/geminiService');

// POST /resume/upload
async function uploadResume(req, res, next) {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded. Please upload a PDF file.',
      });
    }

    // Extract text from PDF
    const resumeText = await extractTextFromPDF(req.file.path);

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        error: 'Could not extract enough text from the PDF. Please upload a valid resume.',
      });
    }

    console.log(`[RESUME] Extracted ${resumeText.length} chars from PDF for user #${userId}`);

    // Analyse with Gemini
    let analysis;
    try {
      analysis = await analyseResume(resumeText);
      console.log(`[RESUME] Gemini analysis complete for user #${userId}:`, JSON.stringify(analysis));
    } catch (aiErr) {
      console.error(`[RESUME] Gemini analysis failed for user #${userId}:`, aiErr.message);
      return res.status(502).json({
        success: false,
        error: 'AI analysis failed. Please check your Gemini API key and try again.',
      });
    }

    // Save to database
    const relativePath = `uploads/resume/${req.file.filename}`;
    const db = getDatabase();

    db.run(
      'UPDATE Users SET resumePath = ?, skillsJSON = ? WHERE id = ?',
      [relativePath, JSON.stringify(analysis), userId]
    );
    saveDatabase();

    console.log(`[RESUME] Saved resume for user #${userId} → ${relativePath}`);

    res.json({
      success: true,
      message: 'Resume uploaded and analysed successfully.',
      data: {
        resumePath: relativePath,
        analysis,
      },
    });
  } catch (err) {
    next(err);
  }
}

// GET /resume
function getResume(req, res, next) {
  try {
    const userId = req.user.id;
    const db = getDatabase();

    const result = db.exec(
      'SELECT resumePath, skillsJSON FROM Users WHERE id = ?',
      [userId]
    );

    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found.',
      });
    }

    const row = result[0].values[0];
    const resumePath = row[0];
    const skillsJSON = row[1];

    if (!resumePath) {
      return res.status(404).json({
        success: false,
        error: 'No resume uploaded yet.',
      });
    }

    res.json({
      success: true,
      data: {
        resumePath,
        analysis: skillsJSON ? JSON.parse(skillsJSON) : null,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadResume, getResume };
