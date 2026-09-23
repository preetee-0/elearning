const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");
const Enrollment = require("../models/Enrollment");

const submitQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const { answers } = req.body;

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({
                success: false,
                message: "Answers are required"
            });
        }

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        const enrollment = await Enrollment.findOne({
            student: req.user.id,
            course: quiz.course
        });

        if (!enrollment) {
            return res.status(403).json({
                success: false,
                message: "You are not enrolled in this course"
            });
        }

        let correctAnswers = 0;

        quiz.questions.forEach((question) => {
            const studentAnswer = answers.find(
                (answer) =>
                    answer.questionId.toString() ===
                    question._id.toString()
            );

            if (
                studentAnswer &&
                studentAnswer.answer === question.correctAnswer
            ) {
                correctAnswers++;
            }
        });

        const totalQuestions = quiz.questions.length;

        const score =
            totalQuestions > 0
                ? Math.round((correctAnswers / totalQuestions) * 100)
                : 0;

        const passed = score >= quiz.passingScore;

        const attempt = await QuizAttempt.create({
            student: req.user.id,
            quiz: quizId,
            answers,
            score,
            totalQuestions,
            correctAnswers,
            passed
        });

        res.status(201).json({
            success: true,
            message: "Quiz submitted successfully",
            result: {
                score,
                totalQuestions,
                correctAnswers,
                passed,
                attemptId: attempt._id
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getMyAttempts = async (req, res) => {
    try {
        const attempts = await QuizAttempt.find({
            student: req.user.id
        })
            .populate("quiz", "title passingScore")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: attempts.length,
            attempts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getQuizAttempts = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        const attempts = await QuizAttempt.find({
            quiz: req.params.quizId
        })
            .populate("student", "name email")
            .sort({ score: -1 });

        res.status(200).json({
            success: true,
            count: attempts.length,
            attempts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    submitQuiz,
    getMyAttempts,
    getQuizAttempts
};