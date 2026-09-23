const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
       
        },
        category: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            default: 0
        },

        thumbnail: {
            type: String,
            default: ""
        },

        level: {
            type: String,
            enum: ["beginner", "intermediate", "advanced"],
            default: "beginner"
        },duration: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Course", courseSchema);