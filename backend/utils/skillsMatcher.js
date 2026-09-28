const groq = require('../config/groq');

const extractAndMatchSkills = async (resumeText, jobDescription) => {
      console.log("🔥🔥 NEW SKILLS MATCHER VERSION RUNNING");
    const prompt = `You are an expert resume analyst. Analyze the resume and job description below.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Your task:
1. Extract ALL required skills, qualifications, tools, and keywords from the JOB DESCRIPTION.
2. Extract ALL skills, qualifications, tools, and keywords from the RESUME.
3. Compare them and categorize into 3 groups.

Rules:
- matchedSkills: skills required in JD that candidate HAS in resume
- missingSkills: skills required in JD that candidate does NOT have
- bonusSkills: skills candidate has that are NOT required in JD but still valuable
- Don't add projects under bonusSkills. Only include skills, tools, certifications, qualifications, and keywords.
- matchScore: percentage (0-100) based on matched/total JD skills
- Keep skill names short and clean (e.g. "Project Management" not "experience in project management")
- Include both technical AND soft skills
- Include tools, certifications, and qualifications
- Be thorough — do not miss important skills.`;

    const response = await groq.chat.completions.create({
        model: 'openai/gpt-oss-20b',

        messages: [
            {
                role: 'system',
                content: 'You are an expert resume analyst. Return the analysis strictly according to the provided JSON schema.'
            },
            {
                role: 'user',
                content: prompt
            }
        ],

        temperature: 0.1,
        max_completion_tokens: 1500,

        response_format: {
            type: 'json_schema',
            json_schema: {
                name: 'skill_match_result',
                strict: true,
                schema: {
                    type: 'object',

                    properties: {
                        matchedSkills: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        },

                        missingSkills: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        },

                        bonusSkills: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        },

                        matchScore: {
                            type: 'number'
                        }
                    },

                    required: [
                        'matchedSkills',
                        'missingSkills',
                        'bonusSkills',
                        'matchScore'
                    ],

                    additionalProperties: false
                }
            }
        }
    });

    const raw = response.choices[0]?.message?.content;

    if (!raw) {
        throw new TypeError('AI returned an empty response');
    }

    let result;

    try {
        result = JSON.parse(raw);
    } catch (error) {
        console.error('AI RAW RESPONSE:', raw);
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
