const express = require(`express`);
const router = express.Router();

const Complaint = require(`../models/complaintSchema`);
const authMiddleware = require(`../middleware/authMiddleware`);

// GET: logged-in user's complaints
// Final path: /api/mycomplaints  (mounted in app.js)
router.get("/", authMiddleware(), async (req, res) => {
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

    const complaints = await Complaint.find(query).sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Error getting your complaints" });
  }
});

// POST: create a new complaint for logged-in user
// Final path: /api/mycomplaints  (mounted in app.js)
router.post("/", authMiddleware(), async (req, res) => {
  try {
    const { title, category, priority, location, description, images = [] } =
      req.body;

    if (!title || !category || !priority || !location || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newComplaint = new Complaint({
      title,
      category,
      priority,
      location,
      description,
      images,
      user: req.user.id
    });

    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (err) {
    console.error("Error creating complaint:", err);
    res.status(500).json({ message: "Error creating complaint" });
  }
});

module.exports = router;