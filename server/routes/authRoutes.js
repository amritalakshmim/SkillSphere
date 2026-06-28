import express from "express";
import { registerUser, loginUser, getCurrentUser } from "../controllers/authController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);
router.get("/admin", protect, authorize("admin"), (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin!",
    });
  }
);

export default router;