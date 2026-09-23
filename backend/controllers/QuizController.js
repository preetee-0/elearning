const Quiz = require("../models/Quiz");
const Course = require("../models/Course");

const createQuiz = async (req, res) => {
    try {
        const {
            title,
            description,
            course,
            questions,
            passingScore
        } = req.body;

        if (!title || !course || !questions || questions.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Title, course and questions are required"
            });
        }

        const existingCourse = await Course.findById(course);

        if (!existingCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (existingCourse.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only create quizzes for your own course"
            });
        }

        const quiz = await Quiz.create({
            title,
            description: description || "",
            course,
            questions,
            passingScore: passingScore || 50
        });

        res.status(201).json({
            success: true,
            message: "Quiz created successfully",
            quiz
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getQuizzesByCourse = async (req, res) => {
    try {
        const quizzes = await Quiz.find({
            course: req.params.courseId
        }).select("-questions.correctAnswer");

        res.status(200).json({
            success: true,
            count: quizzes.length,
            quizzes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
            .select("-questions.correctAnswer");

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        res.status(200).json({
            success: true,
            quiz
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        const course = await Course.findById(quiz.course);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own quiz"
            });
        }

        const updatedQuiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Quiz updated successfully",
            quiz: updatedQuiz
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        const course = await Course.findById(quiz.course);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own quiz"
            });
        }

        await Quiz.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Quiz deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createQuiz,
    getQuizzesByCourse,
    getQuizById,
    updateQuiz,
    deleteQuiz
};