import Application from "../models/Application.js";
import Gig from "../models/Gig.js";

// Apply for a gig
export const applyForGig = async (req, res) => {
  try {
    const { gigId } = req.body;

    // Only freelancers can apply
    if (req.user.role !== "freelancer") {
      return res.status(403).json({
        success: false,
        message: "Only freelancers can apply for gigs.",
      });
    }

    // Ensure freelancer profile is complete
    if (
      !req.user.qualification ||
      !req.user.experience ||
      !req.user.about ||
      !req.user.skills ||
      req.user.skills.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete your profile before applying for gigs.",
      });
    }

    // Check if gig exists
    const gig = await Gig.findById(gigId);

    // Cannot apply to your own gig
    if (gig.createdBy.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot apply to your own gig.",
      });
    }

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    // Prevent duplicate applications
    const alreadyApplied = await Application.findOne({
      gig: gigId,
      applicant: req.user._id,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this gig.",
      });
    }

    const application = await Application.create({
      gig: gigId,
      applicant: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get applications submitted by the logged-in user
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate({
        path: "gig",
        populate: {
          path: "createdBy",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 });

    const validApplications = applications.filter(
      (application) => application.gig,
    );

    res.status(200).json({
      success: true,
      applications: validApplications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getReceivedApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate({
        path: "gig",
        match: {
          createdBy: req.user._id,
        },
      })
      .populate("applicant", "name email qualification experience skills about")
      .sort({ createdAt: -1 });

    const filteredApplications = applications.filter(
      (application) => application.gig,
    );

    res.status(200).json({
      success: true,
      applications: filteredApplications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get applications received for a client's gig
export const getApplicationsForGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    // Only the owner can view applications
    if (gig.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const applications = await Application.find({
      gig: gigId,
    })
      .populate("applicant", "name email qualification experience skills about")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id).populate(
      "gig",
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.gig.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      success: true,
      message: "Application updated successfully.",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkApplication = async (req, res) => {
  try {
    const { gigId } = req.params;

    const application = await Application.findOne({
      gig: gigId,
      applicant: req.user._id,
    });

    res.status(200).json({
      success: true,
      applied: !!application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
