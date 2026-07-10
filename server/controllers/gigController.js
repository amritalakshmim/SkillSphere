import Gig from "../models/Gig.js";

export const createGig = async (req, res) => {
  try {

    const {
      title,
      description,
      budget,
      location,
      category,
      skills,
      experienceLevel,
      deadline,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !budget ||
      !location ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Create the gig
    const gig = await Gig.create({
      title,
      description,
      budget,
      location,
      category,
      skills,
      experienceLevel,
      deadline,

      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Gig created successfully",
      gig,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getAllGigs = async (req, res) => {
  try {

    const gigs = await Gig.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: gigs.length,
      gigs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const updateGig = async (req, res) => {
  try {

    const { id } = req.params;

    const gig = await Gig.findById(id);

    // Check if gig exists
    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    // Check ownership
    if (gig.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this gig",
      });
    }

    // Update the gig
    const updatedGig = await Gig.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Gig updated successfully",
      gig: updatedGig,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const deleteGig = async (req, res) => {
  try {

    const { id } = req.params;

    // Find the gig
    const gig = await Gig.findById(id);

    // Check if gig exists
    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    // Check ownership
    if (gig.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this gig",
      });
    }

    // Delete the gig
    await gig.deleteOne();

    res.status(200).json({
      success: true,
      message: "Gig deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getMyGigs = async (req, res) => {
  try {

    const gigs = await Gig.find({
      createdBy: req.user._id,
    });

    res.status(200).json({
      success: true,
      count: gigs.length,
      gigs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    res.status(200).json({
      success: true,
      gig,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};