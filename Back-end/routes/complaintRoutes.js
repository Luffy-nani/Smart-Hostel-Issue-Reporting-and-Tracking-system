const express = require(`express`);
const router = express.Router();

const complaint = require(`../models/complaintSchema`);
const authMiddleware = require(`../middleware/authMiddleware`);

router.get("/mycomplaints", authMiddleware(), async (req, res) => {
  try {
    const { search, status, category } = req.query;
    const query = {
      user: req.user.id
    };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (status && status !== "All") {
      query.status = status;
    }

    if (category && category !== "All") {
      query.category = category;
    }

    const complaints = await complaint.find(query).sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Error getting your complaints" });
  }
});

module.exports = router;