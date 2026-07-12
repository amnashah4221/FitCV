const express = require('express')
const router = express.Router()
const {
  getHistory,
  getHistoryById,
  deleteHistoryById,
} = require('../controllers/historyController')
const { protect } = require('../middleware/authMiddleware')


router.get('/', protect, getHistory)
router.get('/:id', protect, getHistoryById)
router.delete('/:id', protect, deleteHistoryById)

module.exports = router