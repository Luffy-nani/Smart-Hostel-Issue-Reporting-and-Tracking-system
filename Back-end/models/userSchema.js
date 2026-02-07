const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["student", "admin"],
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    rollNumber: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    adminId: {
      type: String,
      required: function () {
        return this.role === "admin";
      },
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
