import "./ComplaintCard.css";

const ComplaintCard = () => {
  return (
    <div className="raise-page">
      {/* Page Header */}
      <div className="page-header">
        <h1>Raise a Complaint</h1>
        <p>Report an issue in your hostel. Track its status in real time.</p>
        <div className="header-accent"></div>
      </div>

      {/* Form Card */}
      <div className="complaint-card">
        <form>
          {/* Title */}
          <div className="form-group">
            <label>Complaint Title</label>
            <input
              type="text"
              placeholder="Enter complaint title"
            />
          </div>

          {/* Category & Priority */}
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select>
                <option>Water</option>
                <option>Electricity</option>
                <option>Cleaning</option>
                <option>Wi-Fi</option>
                <option>Security</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select>
                <option>Medium</option>
                <option>High</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="form-group">
            <label>Location / Room Number</label>
            <input
              type="text"
              placeholder="Block B - Room 203"
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Describe the issue in detail..."
            />
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label>Upload Images (optional)</label>
            <input type="file" multiple />
            <small>JPG or PNG, up to 3 images</small>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button type="button" className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintCard;