const groq = require('../config/groq');

const extractAndMatchSkills = async (resumeText, jobDescription) => {
    const prompt = `Analyze the resume and job description below.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Your task:
1. Extract ALL required skills, qualifications, tools, and keywords from the JOB DESCRIPTION.
2. Extract ALL skills, qualifications, tools, and keywords from the RESUME.
3. Compare them and categorize into 3 groups.

Rules:
- matchedSkills: skills required in the JD that the candidate HAS in the resume.
- missingSkills: skills required in the JD that the candidate DOES NOT have in the resume.
- bonusSkills: skills the candidate has that are NOT required in the JD but are still valuable. Do not add projects here, only skills, tools, certifications, qualifications, and keywords.
- matchScore: integer from 0 to 100 based on matched / total JD skills.
- Keep skill names short and clean (e.g. "Project Management").
- Include technical AND soft skills, tools, certifications, qualifications.
- Be thorough.

Return a JSON object with exactly these fields:
matchedSkills (array of strings), missingSkills (array of strings), bonusSkills (array of strings), matchScore (number).`;

    let response;

    try {
        response = await groq.chat.completions.create({
            model: 'openai/gpt-oss-20b',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are an expert resume analyst. Respond only with a valid JSON object. No markdown, no explanations.',
                },
                { role: 'user', content: prompt },
            ],
            temperature: 0.1,
            max_completion_tokens: 8192, // reasoning + output dono ke liye
            reasoning_effort: 'low',     // kam reasoning = fast + tokens bachte hain
            response_format: { type: 'json_object' }, // valid JSON guarantee
        });
    } catch (error) {
        console.error('GROQ ERROR:', error.status, error.message);
        if (error.error) {
            console.error('GROQ ERROR OBJECT:', JSON.stringify(error.error, null, 2));
        }
        throw error;
    }

    const choice = response.choices[0];
    const raw = choice?.message?.content;

    if (!raw || !raw.trim()) {
        console.error('EMPTY RESPONSE. finish_reason:', choice?.finish_reason);
        console.error('Usage:', JSON.stringify(response.usage));
        throw new TypeError('AI returned an empty response');
    }
    const cleaned = raw.replace(/```json|```/g, '').trim();

    let result;
    try {
        const start = cleaned.indexOf('{');
        const end = cleaned.lastIndexOf('}');
        if (start === -1 || end === -1) {
            throw new Error('No JSON braces found');
        }
        result = JSON.parse(cleaned.substring(start, end + 1));
    } catch (error) {
        console.error('JSON PARSE ERROR:', error.message);
        console.error('RAW AI RESPONSE:', raw);
        throw new TypeError('AI returned malformed JSON');
    }

    if (
        !Array.isArray(result.matchedSkills) ||
        !Array.isArray(result.missingSkills) ||
        !Array.isArray(result.bonusSkills) ||
        typeof result.matchScore !== 'number'
    ) {
        console.error('INVALID STRUCTURE:', result);
        throw new TypeError('Invalid response structure from AI');
    }

    return result;
};

module.exports = { extractAndMatchSkills };
