const express = require(`express`);
const router = express.Router();

const complaint = require("../models/complaintSchema");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/complaints", authMiddleware(), async (req, res) => {
  try {
    const complaints = await complaint.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
});

router.delete("/complaints/:id", authMiddleware(), adminMiddleware, async (req, res) => {
  try {
    const deleted = await complaint.findByIdAndDelete(req.params.id);
 
    if (!deleted) {
      return res.status(404).json({ message: "Complaint not found" });
    }
 
    res.status(200).json({ message: "Complaint deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete complaint" });
  }
});

module.exports = router;