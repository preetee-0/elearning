const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
      // ✅ no "required: true"
    },
    name: {
      type: String,
      trim: true,
      default: "Anonymous"   // ✅ default value
    },
    comment: {
      type: String,
      required: true,        // ✅ this one SHOULD be required
      trim: true
    },
    imageUrl: {
      type: String,
      default: ""
    },
    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);