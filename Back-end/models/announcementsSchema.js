const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    category: {
      type: String,
      enum: ["MAINTENANCE", "INTERNET", "GENERAL"],
      required: true
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low"
    },

    target: {
      type: String,
      default: "All Blocks"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
