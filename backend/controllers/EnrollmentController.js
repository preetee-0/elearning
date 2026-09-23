const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

const enrollCourse = async (req, res) => {
    try {
        const { course } = req.body;

        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course is required"
            });
        }

        const existingCourse = await Course.findById(course);

        if (!existingCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const existingEnrollment = await Enrollment.findOne({
            student: req.user.id,
            course
        });

        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: "You are already enrolled in this course"
            });
        }

        const enrollment = await Enrollment.create({
            student: req.user.id,
            course
        });

        res.status(201).json({
            success: true,
            message: "Enrolled successfully",
            enrollment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getMyEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({
            student: req.user.id
        })
            .populate("course")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: enrollments.length,
            enrollments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getEnrollmentByCourse = async (req, res) => {
    try {
        const enrollment = await Enrollment.findOne({
            student: req.user.id,
            course: req.params.courseId
        })
            .populate("course")
            .populate("student", "name email");

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: "You are not enrolled in this course"
            });
        }

        res.status(200).json({
            success: true,
            enrollment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getCourseStudents = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to view students"
            });
        }

        const enrollments = await Enrollment.find({
            course: req.params.courseId
        })
            .populate("student", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: enrollments.length,
            enrollments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const unenrollCourse = async (req, res) => {
    try {
        const enrollment = await Enrollment.findOne({
            student: req.user.id,
            course: req.params.courseId
        });

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found"
            });
        }

        await Enrollment.findByIdAndDelete(enrollment._id);

        res.status(200).json({
            success: true,
            message: "Unenrolled successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    enrollCourse,
    getMyEnrollments,
    getEnrollmentByCourse,
    getCourseStudents,
    unenrollCourse
};