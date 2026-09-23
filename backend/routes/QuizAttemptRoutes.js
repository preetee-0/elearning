const express = require("express");

const {
    submitQuiz,
    getMyAttempts,
    getQuizAttempts
} = require("../controllers/QuizAttemptController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/:quizId",
    protect,
    submitQuiz
);

router.get(
    "/my",
    protect,
    getMyAttempts
);

router.get(
    "/quiz/:quizId",
    protect,
    getQuizAttempts
);

module.exports = router;