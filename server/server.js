import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("SkillSphere Backend Running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});