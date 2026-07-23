import Gig from "../models/Gig.js";
import Application from "../models/Application.js";

export const getDashboardStats = async (req, res) => {
  try {
    let stats = {};

    if (req.user.role === "client") {
      // Total gigs created
      const totalGigs = await Gig.countDocuments({
        createdBy: req.user._id,
      });

      // Find all client's gigs
      const gigs = await Gig.find({
        createdBy: req.user._id,
      });

      const gigIds = gigs.map((gig) => gig._id);

      // Applications received
      const applicationsReceived = await Application.countDocuments({
        gig: { $in: gigIds },
      });

      // Approved applications
      const approvedApplications = await Application.countDocuments({
        gig: { $in: gigIds },
        status: "Approved",
      });

      stats = {
        totalGigs,
        applicationsReceived,
        approvedApplications,
      };
    } else if (req.user.role === "freelancer") {
      const applicationsSent = await Application.countDocuments({
        applicant: req.user._id,
      });

      const approvedApplications = await Application.countDocuments({
        applicant: req.user._id,
        status: "Approved",
      });

      const pendingApplications = await Application.countDocuments({
        applicant: req.user._id,
        status: "Pending",
      });

      stats = {
        applicationsSent,
        approvedApplications,
        pendingApplications,
      };
    }

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};