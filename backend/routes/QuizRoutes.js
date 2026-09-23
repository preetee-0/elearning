const express = require("express");

const {
    createQuiz,
    getQuizzesByCourse,
    getQuizById,
    updateQuiz,
    deleteQuiz
} = require("../controllers/QuizController");

const { protect } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    roleMiddleware("instructor"),
    createQuiz
);

router.get(
    "/course/:courseId",
    protect,
    getQuizzesByCourse
);

router.get(
    "/:id",
    protect,
    getQuizById
);

router.patch(
    "/:id",
    protect,
    roleMiddleware("instructor"),
    updateQuiz
);

router.delete(
    "/:id",
    protect,
    roleMiddleware("instructor"),
    deleteQuiz
);

module.exports = router;