const express = require(`express`);
const router = express.Router();
const {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} = require("../controllers/announcementController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", authMiddleware(), getAllAnnouncements);

router.post("/", authMiddleware(), adminMiddleware, createAnnouncement);
router.put("/:id", authMiddleware(), adminMiddleware, updateAnnouncement);
router.delete("/:id", authMiddleware(), adminMiddleware, deleteAnnouncement);

module.exports = router;