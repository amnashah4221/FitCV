require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const generateLetterRoutes = require("./routes/generateLetterRoutes");
const matchRoutes = require("./routes/matchRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

app.disable("x-powered-by");

const allowedOrigins = [
  "https://fit-cv-frontend-omega.vercel.app",
  "http://localhost:5173",
];
const previewRegex = /^https:\/\/fit-cv-frontend-[a-z0-9-]+\.vercel\.app$/;

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        previewRegex.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "FitCV API running ✓",
    status: "healthy",
  });
});
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connect error:", err.message);
    res.status(500).json({ message: "Database connection failed" });
  }
});

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/cover-letter", generateLetterRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/history", historyRoutes);

// Export for Vercel
module.exports = app;

// Local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
