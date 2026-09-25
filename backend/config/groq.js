const Groq = require('groq-sdk');
const dotenv = require('dotenv');
dotenv.config();
console.log("GROQ API KEY STATUS:", process.env.GROQ_API_KEY ? "Loaded Successfully ✓" : "MISSING ON CLOUD ❌");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

module.exports = groq;
