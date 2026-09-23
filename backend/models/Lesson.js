const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
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

        section: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
            required: true
        },

        videoUrl: {
            type: String,
            default: ""
        },

        duration: {
            type: String,
            default: ""
        },

        order: {
            type: Number,
            default: 0
        },

        isFree: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Lesson", lessonSchema);