const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const generateLetterRoutes = require("./routes/generateLetterRoutes");
const matchRoutes = require("./routes/matchRoutes");
const historyRoutes = require("./routes/historyRoutes");

dotenv.config();

const app = express();

app.disable("x-powered-by");

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://fit-cv-frontend-omega.vercel.app",
        "http://localhost:5173",
      ];

      // Allow requests without origin (Postman, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      // Allow listed origins and Vercel preview deployments
      if (
        allowedOrigins.includes(origin) ||
        origin.includes("vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
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


// Database Connection
connectDB().catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1);
});


// API Routes
app.use("/api/auth", userRoutes);
app.use("/api/cover-letter", generateLetterRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/history", historyRoutes);


// Health Check Route
app.get("/", (req, res) => {
  res.json({
    message: "FitCV API running ✓",
  });
});


// Export for Vercel
module.exports = app;


// Local Development Server
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}