const groq = require('../config/groq');

const extractAndMatchSkills = async (resumeText, jobDescription) => {
    const prompt = `You are an expert resume analyst. Analyze the resume and job description below.

        RESUME:
        ${resumeText}

        JOB DESCRIPTION:
        ${jobDescription}

        Your task:
        1. Extract ALL required skills, qualifications, tools, and keywords from the JOB DESCRIPTION
        2. Extract ALL skills, qualifications, tools, and keywords from the RESUME
        3. Compare them and categorize into 3 groups

        Return ONLY a valid JSON object in this exact format, nothing else:
        {
        "matchedSkills": ["skill1", "skill2"],
        "missingSkills": ["skill1", "skill2"],
        "bonusSkills": ["skill1", "skill2"],
        "matchScore": 75
        }

        Rules:
        - matchedSkills: skills required in JD that candidate HAS in resume
        - missingSkills: skills required in JD that candidate does NOT have
        - bonusSkills: skills candidate has that are NOT required in JD but still valuable. Don't add projects under bonusSkills, only skills, tools, certifications, qualifications, and keywords
        - matchScore: percentage (0-100) based on matched/total JD skills
        - Keep skill names short and clean (e.g. "Project Management" not "experience in project management")
        - Include both technical AND soft skills
        - Include tools, certifications, qualifications
        - Be thorough — do not miss important skills`;

    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        max_tokens: 1000,
    });

    const raw = response.choices[0]?.message?.content || '';

    const cleaned = raw
        .replaceAll('```json', '')
        .replaceAll('```', '')
        .trim();

    const jsonMatch = cleaned.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) {
        throw new TypeError('AI response does not contain valid JSON');
    }

    let result;

try {
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}') + 1;

    if (start === -1 || end === 0) {
        throw new TypeError('AI response does not contain valid JSON');
    }

    result = JSON.parse(cleaned.substring(start, end));

    } catch (error) {
        throw new TypeError('AI returned malformed JSON');
    }
      
    // Validate structure
    if (
        !Array.isArray(result.matchedSkills) ||
        !Array.isArray(result.missingSkills) ||
        !Array.isArray(result.bonusSkills) ||
        typeof result.matchScore !== 'number'
    ) {
        throw new TypeError('Invalid response structure from AI');
    }

    return result;
};

module.exports = { extractAndMatchSkills };