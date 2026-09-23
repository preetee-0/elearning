const Feedback = require("../models/Feedback");

// Submit feedback (logged-in user only)
const sendFeedback = async (req, res) => {
  try {
    const { comment, imageUrl, rating } = req.body;

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment is required"
      });
    }

    const feedback = await Feedback.create({
      user: req.user._id,          // 👈 from protect middleware
      name: req.user.name,         // 👈 use the logged-in user's name
      comment,
      imageUrl: imageUrl || "",
      rating: rating || 5
    });

    const populated = await feedback.populate("user", "name email");

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback: populated
    });
  } catch (error) {
    console.error("Feedback error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all feedbacks (public)
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      feedbacks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete (only owner or admin)
const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;

        const feedback = await Feedback.findById(id);

        if (!feedback) {
            return res.status(404).json({
                success: false,
                message: "Feedback not found"
            });
        }

        // Only the owner can delete — with safe checks
        const ownerId = feedback.user ? feedback.user.toString() : null;
        const currentUserId = req.user?._id?.toString() || req.user?.id?.toString();

        if (ownerId && currentUserId && ownerId !== currentUserId) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own feedback"
            });
        }

        await feedback.deleteOne();

        res.status(200).json({
            success: true,
            message: "Feedback deleted"
        });
    } catch (error) {
        console.error("Delete feedback error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
  sendFeedback,
  getFeedbacks,
  deleteFeedback
};