import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  applyForGig,
  getMyApplications,
  getReceivedApplications,
  getApplicationsForGig,
  updateApplicationStatus,
  checkApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

// Freelancer applies for a gig
router.post("/", protect, applyForGig);

// Freelancer views their applications
router.get("/my", protect, getMyApplications);

router.get("/received", protect, getReceivedApplications);

// Client views applications for a specific gig
router.get("/gig/:gigId", protect, getApplicationsForGig);

router.get("/check/:gigId", protect, checkApplication);

// Client approves/rejects an application
router.put("/:id", protect, updateApplicationStatus);

export default router;