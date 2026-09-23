const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
    {
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        answer: {
            type: String,
            required: true
        }
    }
);

const quizAttemptSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        quiz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            required: true
        },

        answers: [answerSchema],

        score: {
            type: Number,
            default: 0
        },

        totalQuestions: {
            type: Number,
            default: 0
        },

        correctAnswers: {
            type: Number,
            default: 0
        },

        passed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);