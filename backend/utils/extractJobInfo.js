const groq = require('../config/groq');

const extractJobInfo = async (jobDescription) => {

    const completion = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        temperature: 0,
        messages: [
            {
                role: "system",
                content: `
Extract ONLY this JSON.

{
  "company":"...",
  "role":"..."
}

If company isn't mentioned use "Unknown Company".
If role isn't mentioned use "Unknown Role".

Return JSON only.
`
            },
            {
                role: "user",
                content: jobDescription
            }
        ]
    });

    return JSON.parse(completion.choices[0].message.content);
};

module.exports = extractJobInfo;
