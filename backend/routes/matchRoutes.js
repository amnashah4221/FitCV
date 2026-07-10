const express = require('express')
const router = express.Router()
const multer = require('multer')
const { matchSkills } = require('../controllers/matchController')
const { protect } = require('../middleware/authMiddleware')

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Only PDF files are allowed'), false)
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
})

router.post('/matchSkills', protect, upload.single('resume'), matchSkills)

module.exports = router