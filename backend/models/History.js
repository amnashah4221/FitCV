const mongoose = require('mongoose')

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    tone: {
      type: String,
      enum: ['professional', 'enthusiastic', 'concise'],
      default: 'professional',
    },
    coverLetter: {
      type: String,
      required: true,
    },
    matchScore: {
      type: Number,
      required: true,
    },
    matchedSkills: [String],
    missingSkills: [String],
    bonusSkills: [String],
  },
  { timestamps: true }
)

module.exports = mongoose.model('History', historySchema)