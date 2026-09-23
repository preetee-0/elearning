const Course = require("../models/Course");
const Review = require("../models/Review");

const createCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            price,
            thumbnail,
            level,
            duration
        } = req.body;

        if (!title || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "Title, description and category are required"
            });
        }

        const course = await Course.create({
            title,
            description,
            instructor: req.user.id,
            category,
            price: price || 0,
            thumbnail: thumbnail || "",
            level: level || "beginner",
            duration: duration || ""
        });

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate("instructor", "name email")
            .sort({ createdAt: -1 });

        const coursesWithRatings = await Promise.all(
            courses.map(async (course) => {
                const reviews = await Review.find({
                    course: course._id
                });

                const reviewCount = reviews.length;

                const averageRating =
                    reviewCount > 0
                        ? (
                              reviews.reduce(
                                  (total, review) =>
                                      total + review.rating,
                                  0
                              ) / reviewCount
                          ).toFixed(1)
                        : 0;

                return {
                    ...course.toObject(),
                    averageRating: Number(averageRating),
                    reviewCount
                };
            })
        );

        res.status(200).json({
            success: true,
            count: coursesWithRatings.length,
            courses: coursesWithRatings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate("instructor", "name email");

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const reviews = await Review.find({
            course: course._id
        });

        const reviewCount = reviews.length;

        const averageRating =
            reviewCount > 0
                ? (
                      reviews.reduce(
                          (total, review) =>
                              total + review.rating,
                          0
                      ) / reviewCount
                  ).toFixed(1)
                : 0;

        res.status(200).json({
            success: true,
            course: {
                ...course.toObject(),
                averageRating: Number(averageRating),
                reviewCount
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getMyCourses = async (req, res) => {
    try {
        const courses = await Course.find({
            instructor: req.user.id
        }).populate("instructor", "name email");

        res.status(200).json({
            success: true,
            courses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own course"
            });
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course: updatedCourse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own course"
            });
        }

        await Course.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
    createCourse, getCourses, getCourseById, updateCourse, deleteCourse, getMyCourses
};

