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

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        origin.includes("vercel.app") ||
        origin === "http://localhost:5173"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });


// Routes
app.use("/api/auth", userRoutes);
app.use("/api/cover-letter", generateLetterRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/history", historyRoutes);


// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "FitCV API running ✓",
    status: "healthy",
  });
});


// Export for Vercel
module.exports = app;


// Local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}