const groq = require('../config/groq');

const extractAndMatchSkills = async (resumeText, jobDescription) => {

    console.log("🔥🔥 NEW SKILLS MATCHER VERSION RUNNING");

    const prompt = `You are an expert resume analyst.

Analyze the resume and job description below.

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
- bonusSkills: skills the candidate has that are NOT required in the JD but are still valuable.
- Do not add projects under bonusSkills.
- Only include skills, tools, certifications, qualifications, and keywords.
- matchScore: percentage from 0 to 100 based on matched JD skills.
- Keep skill names short and clean.
- Include technical AND soft skills.
- Include tools, certifications, and qualifications.
- Be thorough and do not miss important skills.

IMPORTANT:
Return ONLY valid JSON.
Do NOT use markdown.
Do NOT use code fences.
Do NOT add explanations before or after the JSON.

Return exactly this structure:

{
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "bonusSkills": ["skill1", "skill2"],
  "matchScore": 75
}`;

    let response;

    try {

      response = await groq.chat.completions.create({

    model: 'openai/gpt-oss-20b',

    messages: [
        {
            role: 'system',
            content: `You are an expert resume analyst.

Return ONLY a valid JSON object with exactly these four fields:
matchedSkills, missingSkills, bonusSkills, matchScore.

Do not return markdown.
Do not return explanations.`
        },
        {
            role: 'user',
            content: prompt
        }
    ],

    temperature: 0.1,
    max_completion_tokens: 1500,

    include_reasoning: false
});

    } catch (error) {

        console.error("🔥🔥 GROQ ERROR MESSAGE:", error.message);
        console.error("🔥🔥 GROQ STATUS:", error.status);

        if (error.error) {
            console.error(
                "🔥🔥 GROQ ERROR OBJECT:",
                JSON.stringify(error.error, null, 2)
            );
        }

        throw error;
    }

    const raw = response.choices[0]?.message?.content;

    console.log("🔥🔥 GROQ RAW RESPONSE:", raw);

    if (!raw) {
        throw new TypeError('AI returned an empty response');
    }

    let result;

    try {

        result = JSON.parse(raw);

    } catch (error) {

        console.error("🔥🔥 JSON PARSE ERROR:", error.message);
        console.error("🔥🔥 RAW AI RESPONSE:", raw);

        throw new TypeError('AI returned malformed JSON');
    }

    if (
        !Array.isArray(result.matchedSkills) ||
        !Array.isArray(result.missingSkills) ||
        !Array.isArray(result.bonusSkills) ||
        typeof result.matchScore !== 'number'
    ) {

        console.error(
            "🔥🔥 INVALID AI RESPONSE STRUCTURE:",
            result
        );

        throw new TypeError('Invalid response structure from AI');
    }

    return result;
};

module.exports = { extractAndMatchSkills };
