const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const generateLetterRoutes = require('./routes/generateLetterRoutes');
const matchRoutes = require('./routes/matchRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', userRoutes);
app.use('/api/cover-letter', generateLetterRoutes);
app.use('/api/match', matchRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'FitCV API running ✓' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})