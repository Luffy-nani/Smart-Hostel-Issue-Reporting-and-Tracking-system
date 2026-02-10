const Announcement = require(`../models/announcementsSchema`);

exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch announcements" });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, category, priority, target } = req.body;

    const announcement = await Announcement.create({
      title,
      message,
      category,
      priority,
      target,
      createdBy: req.user.id
    });

    res.status(201).json(announcement);
  } catch (err) {
    res.status(500).json({ message: "Failed to create announcement" });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update the announcement" });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete announcement" });
  }
};