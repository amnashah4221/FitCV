const groq = require('../config/groq');

const extractJobInfo = async (jobDescription) => {
    const fallback = { company: 'Unknown Company', role: 'Unknown Role' };

    try {
        const completion = await groq.chat.completions.create({
            model: 'openai/gpt-oss-20b',
            temperature: 0,
            max_completion_tokens: 2048,
            reasoning_effort: 'low',
            response_format: { type: 'json_object' },
            messages: [
                {
                    role: 'system',
                    content: `Extract the company name and job role from the job description.
Return a JSON object with exactly two fields: "company" and "role".
If company isn't mentioned use "Unknown Company".
If role isn't mentioned use "Unknown Role".
Return JSON only.`,
                },
                { role: 'user', content: jobDescription },
            ],
        });

        const raw = completion.choices[0]?.message?.content;
        if (!raw || !raw.trim()) {
            console.error('extractJobInfo empty. finish_reason:', completion.choices[0]?.finish_reason);
            return fallback;
        }

        const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());

        return {
            company: parsed.company || fallback.company,
            role: parsed.role || fallback.role,
        };
    } catch (error) {
        console.error('extractJobInfo error:', error.message);
        return fallback; // job info fail ho to poori request fail na ho
    }
};

module.exports = extractJobInfo;
