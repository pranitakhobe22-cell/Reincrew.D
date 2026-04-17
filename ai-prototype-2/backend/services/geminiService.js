const { GoogleGenerativeAI } = require('@google/generative-ai');

let model = null;

function getModel() {
  if (!model) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      throw new Error('GEMINI_API_KEY is not configured. Set it in backend/.env');
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-2.0-flash' });
  }
  return model;
}

async function analyseResume(resumeText) {
  const gemini = getModel();

  const prompt = `Analyse this resume and extract:
- skills (list of technical and soft skills)
- domain focus (the primary professional domain)
- experience level (entry/junior/mid/senior)

Resume text:
${resumeText}

Respond ONLY with valid JSON in this exact format, no markdown, no explanation:
{"skills":[],"domain":"","experience":""}`;

  const result = await gemini.generateContent(prompt);
  const response = result.response.text();

  // Strip markdown fences if Gemini wraps the response
  const cleaned = response.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

  const parsed = JSON.parse(cleaned);

  // Validate shape
  if (!Array.isArray(parsed.skills) || typeof parsed.domain !== 'string' || typeof parsed.experience !== 'string') {
    throw new Error('Gemini returned unexpected JSON structure.');
  }

  return parsed;
}

async function generateQuestions(profile) {
  const gemini = getModel();

  const prompt = `You are an expert HR interviewer. Generate exactly 5 interview questions for this candidate.

Candidate profile:
- Name: ${profile.name}
- Skills: ${profile.skills.join(', ')}
- Domain: ${profile.domain}
- Experience level: ${profile.experience}
- College: ${profile.college || 'Not specified'}

Generate a mix of:
- 1 behavioral question
- 2 technical questions based on their skills
- 1 situational question
- 1 domain-specific question

Respond ONLY with valid JSON in this exact format, no markdown, no explanation:
{"questions":["question1","question2","question3","question4","question5"]}`;

  const result = await gemini.generateContent(prompt);
  const response = result.response.text();

  const cleaned = response.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  const parsed = JSON.parse(cleaned);

  if (!Array.isArray(parsed.questions) || parsed.questions.length !== 5) {
    throw new Error('Gemini did not return exactly 5 questions.');
  }

  return parsed.questions;
}

async function evaluateAnswers(questions, answers) {
  const gemini = getModel();

  const qaPairs = questions.map((q, i) => {
    const a = answers[i] || '(No answer provided)';
    return `Q${i + 1}: ${q}\nA${i + 1}: ${a}`;
  }).join('\n\n');

  const prompt = `You are an expert HR interviewer evaluating a candidate's interview performance.

Interview transcript:
${qaPairs}

Evaluate the candidate and respond ONLY with valid JSON in this exact format, no markdown, no explanation:
{
  "score": <number 0-10>,
  "strengths": ["strength1", "strength2"],
  "improvements": ["improvement1", "improvement2"],
  "summary": "<2-3 sentence overall assessment>"
}

Scoring guide:
0-3: Poor - vague, irrelevant, or no answers
4-5: Below average - some relevance but lacks depth
6-7: Good - clear answers with reasonable depth
8-9: Very good - strong, specific, well-structured answers
10: Exceptional - outstanding answers with deep insight`;

  const result = await gemini.generateContent(prompt);
  const response = result.response.text();

  const cleaned = response.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  const parsed = JSON.parse(cleaned);

  if (typeof parsed.score !== 'number' || !Array.isArray(parsed.strengths) ||
      !Array.isArray(parsed.improvements) || typeof parsed.summary !== 'string') {
    throw new Error('Gemini returned unexpected evaluation structure.');
  }

  parsed.score = Math.max(0, Math.min(10, Math.round(parsed.score * 10) / 10));

  return parsed;
}

module.exports = { analyseResume, generateQuestions, evaluateAnswers };
