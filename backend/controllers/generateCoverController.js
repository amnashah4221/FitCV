const groq = require('../config/groq');
const { extractTextFromPDF } = require('../utils/pdfParser');
const {extractAndMatchSkills} = require('../utils/skillsMatcher');
const History = require('../models/History');

const generateCoverLetter = async (req, res) => {
    try {
        const { jobDescription, tone } = req.body;

        if(!jobDescription) {
            return res.status(400).json({ error: 'Job description is required.' });
        }

        if(!req.file) {
            return res.status(400).json({ error: 'Resume file is required.' });
        }

        const resumeText = await extractTextFromPDF(req.file.buffer);

        if(!resumeText || resumeText.trim().length === 0){
            return res.status(400).json({ error: 'Resume file is empty or could not be parsed.' });
        }
        
        const toneInstructions = {
            professional: "Write a professional cover letter  suitable for corporate environments.",
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

       const userPrompt =  `Write a cover letter for the following:

            RESUME:
            ${resumeText}

            JOB DESCRIPTION:
            ${jobDescription}

            Write a tailored cover letter that matches the candidate's experience to this specific job.`

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    res.flushHeaders() // Flush the headers to establish SSE with the client
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

    const matchResult = await extractAndMatchSkills(resumeText, jobDescription);
    await History.create({
      user: req.user._id,
      jobDescription,
      tone: tone || 'professional',
      coverLetter: fullText,
      matchScore: matchResult.matchScore,
      matchedSkills: matchResult.matchedSkills,
      missingSkills: matchResult.missingSkills,
      bonusSkills: matchResult.bonusSkills,
    })
    }
    catch (error) {
        console.error('Error generating cover letter:', error);
        res.status(500).json({ error: 'Failed to generate cover letter.' });
    }
}
module.exports = { generateCoverLetter };