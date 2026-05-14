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
      enum: ["Maintenance", "Water", "Electricity", "Internet", "Security", "Cleaning", "Event", "Other"],
      required: true
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low"
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