const groq = require('../config/groq');
const { extractTextFromPDF } = require('../utils/pdfParser');
const { extractAndMatchSkills } = require('../utils/skillsMatcher');
const History = require('../models/History');
const extractJobInfo = require('../utils/extractJobInfo');

const generateCoverLetter = async (req, res) => {
  try {
    const { jobDescription, tone } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ error: 'Job description is required.' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required.' });
    }

    const resumeText = await extractTextFromPDF(req.file.buffer);
    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({ error: 'Resume file is empty or could not be parsed.' });
    }

    const toneInstructions = {
      professional: "Write a professional cover letter suitable for corporate environments.",
      enthusiastic: "Write an enthusiastic cover letter that shows excitement and passion for the role.",
      concise: "Write in a concise, to-the-point tone. Keep it brief and impactful."
    }

    const selectedTone = toneInstructions[tone?.toLowerCase()] || toneInstructions['professional'];

    const systemPrompt = `You are an expert career coach and professional cover letter writer. 
Your job is to write highly personalized, compelling cover letters that get candidates noticed.
${selectedTone}
Always structure the cover letter with:
1. Strong opening paragraph that mentions the specific role
2. Middle paragraph highlighting relevant skills and experience from the resume
3. Closing paragraph with a call to action
Keep it to 3-4 paragraphs maximum.`

    const userPrompt = `Write a cover letter for the following:

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Write a tailored cover letter that matches the candidate's experience to this specific job.`

    // Note: CORS headers (Access-Control-Allow-Origin / -Credentials) are
    // already set correctly and dynamically by the global cors() middleware
    // in server.js based on the actual request origin. Setting them again
    // here with a hardcoded value was overriding that and breaking requests
    // from any frontend domain other than the one hardcoded below.
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders()

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      stream: true,
      max_tokens: 1000,
      temperature: 0.7,
    })

    let fullText = ''
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || ''
      if (content) {
        fullText += content;
        res.write(`data: ${JSON.stringify({ text: content })}\n\n`)
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
    res.end()

    // ← res.end() ke baad history save karo — sirf logged in users ke liye
    if (req.user) {
      try {
        const matchResult = await extractAndMatchSkills(resumeText, jobDescription)
        const { company, role } = await extractJobInfo(jobDescription)
        await History.create({
          user: req.user._id,
          jobDescription,
          role,
          company,
          tone: tone || 'professional',
          coverLetter: fullText,
          matchScore: matchResult.matchScore,
          matchedSkills: matchResult.matchedSkills,
          missingSkills: matchResult.missingSkills,
          bonusSkills: matchResult.bonusSkills,
        })
        console.log('History saved ✓')
      } catch (saveError) {
        console.error('History save error:', saveError.message)
      }
    }

  } catch (error) {
    console.error('Error generating cover letter:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to generate cover letter.' });
    }
  }
}

module.exports = { generateCoverLetter };