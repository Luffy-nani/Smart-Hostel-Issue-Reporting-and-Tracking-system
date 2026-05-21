// src/pages/MakeAnnouncement.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../components/DashboardNav-admin";
import { announcementAPI, getUser } from "../utils/api";
import "./MakeAnnouncement.css";

const MakeAnnouncement = () => {
  const navigate = useNavigate();
  const user = getUser();

  const [formData, setFormData] = useState({
    title: "",
    category: "Maintenance",
    priority: "Medium",
    target: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        priority: formData.priority,
        target: formData.target,
        message: formData.message,
        postedBy: user.name || user.email || "Admin",
      };

      const result = await announcementAPI.create(payload);

      if (result && (result._id || result.id)) {
        setSuccess("Announcement posted successfully!");
        setFormData({
          title: "",
          category: "Maintenance",
          priority: "Medium",
          target: "",
          message: "",
        });
      } else if (result && result.message) {
        setError(result.message);
      } else {
        setError("Failed to post announcement.");
      }
    } catch (err) {
      console.error("Error posting announcement:", err);
      setError(err.message || "Failed to post announcement.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      category: "Maintenance",
      priority: "Medium",
      target: "",
      message: "",
    });
    setError("");
    setSuccess("");
  };

  return (
    <>
      <DashboardNav />

      <div className="ma-page">
        {/* Header */}
        <div className="page-header">
          <h1>Make Announcement</h1>
          <p>Post a new notice for all hostel residents.</p>
          <div className="header-accent"></div>
        </div>

        {/* Form Card */}
        <div className="ma-card">
          <form onSubmit={handleSubmit}>

            {/* Title */}
            <div className="form-group">
              <label>Announcement Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter announcement title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category + Priority */}
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="Maintenance">Maintenance</option>
                  <option value="Water">Water</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Internet">Internet</option>
                  <option value="Security">Security</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Event">Event</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            {/* Target */}
            <div className="form-group">
              <label>Target (optional)</label>
              <input
                type="text"
                name="target"
                placeholder="e.g. All Blocks, Block B, Common Room"
                value={formData.target}
                onChange={handleChange}
              />
            </div>

            {/* Message */}
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Write your announcement here..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* Feedback */}
            {error && <p className="form-error">⚠️ {error}</p>}
            {success && <p className="form-success">✅ {success}</p>}

            {/* Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancel}
                disabled={submitting}
              >
                Clear
              </button>
              <button
                type="submit"
                className="btn-submit"
                disabled={submitting}
              >
                {submitting ? "Posting..." : "Post Announcement"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default MakeAnnouncement;