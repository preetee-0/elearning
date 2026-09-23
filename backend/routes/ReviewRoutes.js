const express = require("express");

const {
    createReview,
    getCourseReviews,
    getReviewById,
    updateReview,
    deleteReview
} = require("../controllers/ReviewController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    createReview
);

router.get(
    "/course/:courseId",
    getCourseReviews
);

router.get(
    "/:id",
    getReviewById
);

router.patch(
    "/:id",
    protect,
    updateReview
);

router.delete(
    "/:id",
    protect,
    deleteReview
);

module.exports = router;