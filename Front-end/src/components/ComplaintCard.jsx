import { useState } from "react";
import "./ComplaintCard.css";
import { complaintAPI } from "../utils/api";

const ComplaintCard = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Water",
    priority: "Medium",
    location: "",
    description: "",
    images: []
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      images: files.map((file) => file.name)
    }));
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
        location: formData.location,
        description: formData.description,
        images: formData.images
      };

      const result = await complaintAPI.createComplaint(payload);

      if (result && result._id) {
        setSuccess("Complaint submitted successfully.");
        setFormData({
          title: "",
          category: "Water",
          priority: "Medium",
          location: "",
          description: "",
          images: []
        });
      } else if (result && result.message) {
        setError(result.message);
      } else {
        setError("Failed to submit complaint.");
      }
    } catch (err) {
      console.error("Error submitting complaint:", err);
      setError(err.message || "Failed to submit complaint.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="raise-page">
      <div className="page-header">
        <h1>Raise a Complaint</h1>
        <p>Report an issue in your hostel. Track its status in real time.</p>
        <div className="header-accent"></div>
      </div>

      <div className="complaint-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Complaint Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter complaint title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="Water">Water</option>
                <option value="Electricity">Electricity</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Internet">Internet</option>
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
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Location / Room Number</label>
            <input
              type="text"
              name="location"
              placeholder="Block B - Room 203"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Describe the issue in detail..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Images (optional)</label>
            <input type="file" multiple onChange={handleFileChange} />
            <small>JPG or PNG, up to 3 images</small>
          </div>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => {
                setFormData({
                  title: "",
                  category: "Water",
                  priority: "Medium",
                  location: "",
                  description: "",
                  images: []
                });
                setError("");
                setSuccess("");
              }}
              disabled={submitting}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Complaint"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintCard;