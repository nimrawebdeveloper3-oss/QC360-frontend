import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";

// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan("dev"));
// Parse JSON request bodies
app.use(express.json());
// Parse URL-encoded request bodies (form submissions)
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

// Root health-check
app.get("/", (req, res) => {
  res.json({ message: " API is running!" });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err && err.stack ? err.stack : err);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err && err.message : null,
  });
});

const mongoUri = process.env.DATABASE_URL || process.env.MONGODB_URI;

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
      const conn = mongoose.connection;
      const name = conn?.name || conn?.db?.databaseName || "unknown_db";

      console.log(`MongoDB Connected:`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });
