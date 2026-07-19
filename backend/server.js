const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const generateLetterRoutes = require('./routes/generateLetterRoutes');
const matchRoutes = require('./routes/matchRoutes');
const historyRoutes = require('./routes/historyRoutes');

dotenv.config();
connectDB(); // ← sirf yahan — ek baar

const app = express();

app.use(cors({
  origin: [
    'https://fit-cv-frontend-omega.vercel.app',
    'http://localhost:5173',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', userRoutes);
app.use('/api/cover-letter', generateLetterRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/history', historyRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'FitCV API running ✓' })
})

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}
