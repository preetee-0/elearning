const Review = require("../models/Review");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

const createReview = async (req, res) => {
    try {
        const { course, rating, comment } = req.body;

        if (!course || !rating || !comment) {
            return res.status(400).json({
                success: false,
                message: "Course, rating and comment are required"
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5"
            });
        }

        const existingCourse = await Course.findById(course);

        if (!existingCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const enrollment = await Enrollment.findOne({
            student: req.user.id,
            course
        });

        if (!enrollment) {
            return res.status(403).json({
                success: false,
                message: "You must be enrolled in this course to review it"
            });
        }

        const existingReview = await Review.findOne({
            student: req.user.id,
            course
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this course"
            });
        }

        const review = await Review.create({
            student: req.user.id,
            course,
            rating,
            comment
        });

        const populatedReview = await Review.findById(review._id)
            .populate("student", "name profileImage");

        res.status(201).json({
            success: true,
            message: "Review created successfully",
            review: populatedReview
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getCourseReviews = async (req, res) => {
    try {
        const reviews = await Review.find({
            course: req.params.courseId
        })
            .populate("student", "name profileImage")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate("student", "name profileImage")
            .populate("course", "title");

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        res.status(200).json({
            success: true,
            review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        if (review.student.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own review"
            });
        }

        if (rating !== undefined && (rating < 1 || rating > 5)) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5"
            });
        }

        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            {
                ...(rating !== undefined && { rating }),
                ...(comment !== undefined && { comment })
            },
            {
                new: true,
                runValidators: true
            }
        ).populate("student", "name profileImage");

        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            review: updatedReview
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        if (review.student.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own review"
            });
        }

        await Review.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createReview,
    getCourseReviews,
    getReviewById,
    updateReview,
    deleteReview
};