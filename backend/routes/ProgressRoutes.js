const express = require("express");

const {
    completeLesson,
    getProgress
} = require("../controllers/ProgressController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.patch(
    "/lesson/:lessonId",
    protect,
    completeLesson
);

router.get(
    "/course/:courseId",
    protect,
    getProgress
);

module.exports = router;