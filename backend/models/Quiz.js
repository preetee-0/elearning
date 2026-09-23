const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true
        },

        options: {
            type: [String],
            required: true
        },

        correctAnswer: {
            type: String,
            required: true
        }
    }
);

const quizSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },

        questions: [questionSchema],

        passingScore: {
            type: Number,
            default: 50
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Quiz", quizSchema);