import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, qualification, experience, skills, about } = req.body;

    // Update only if values are provided
    if (name) {
      req.user.name = name;
    }

    if (email) {
      const normalizedEmail = email.toLowerCase();

      const existingUser = await User.findOne({
        email: normalizedEmail,
      });

      if (
        existingUser &&
        existingUser._id.toString() !== req.user._id.toString()
      ) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      req.user.email = normalizedEmail;
    }

    if (qualification !== undefined) {
      req.user.qualification = qualification.trim();
    }

    if (experience !== undefined) {
      req.user.experience = experience.trim();
    }

    if (skills !== undefined) {
      req.user.skills = skills
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");
    }

    if (about !== undefined) {
      req.user.about = about.trim();
    }

    // Save updated user
    await req.user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        qualification: req.user.qualification,
        experience: req.user.experience,
        skills: req.user.skills,
        about: req.user.about,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
