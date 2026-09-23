const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            default: null
        },

        role: {
            type: String,
            enum: ["student", "instructor", "admin"],
            default: "student"
        },

        profileImage: {
            type: String,
            default: ""
        },

        bio: {
            type: String,
            default: ""
        },

        authProvider: {
            type: String,
            enum: ["local", "google", "github"],
            default: "local"
        },

        providerId: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);