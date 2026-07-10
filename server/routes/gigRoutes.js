import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createGig, getAllGigs, getMyGigs, getGigById, updateGig, deleteGig } from "../controllers/gigController.js";

const router = express.Router();

// Create a gig
router.post("/", protect, createGig);

router.get("/", getAllGigs);

router.get("/my", protect, getMyGigs);

router.get("/:id", getGigById);

router.put("/:id", protect, updateGig);

router.delete("/:id", protect, deleteGig);

export default router;