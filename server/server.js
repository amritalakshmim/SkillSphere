import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import gigRoutes from "./routes/gigRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(
  cors({
     origin: process.env.VITE_API_URL, 
     // [
    //   "http://localhost:5173", // Vite development server
    //   "https://skillsphere.vercel.app", // Replace with your actual Vercel URL
    // ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/gigs", gigRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("SkillSphere Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});