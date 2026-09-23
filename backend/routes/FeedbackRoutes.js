const express = require("express");
const {
  sendFeedback,
  getFeedbacks,
  deleteFeedback
} = require("../controllers/FeedbackController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getFeedbacks);
router.post("/", protect, sendFeedback);
router.delete("/:id", protect, deleteFeedback);

module.exports = router;