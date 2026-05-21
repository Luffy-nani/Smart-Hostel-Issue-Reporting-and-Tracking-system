// src/components/Announcements.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Announcements.css";
import DashboardNav from "./DashboardNav";
import DashboardNavAdmin from "./DashboardNav-admin";
import { announcementAPI, getUser } from "../utils/api";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = getUser();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await announcementAPI.getAll();
      setAnnouncements(data);
    } catch (err) {
      console.error("Failed to fetch announcements:", err);
      setError("Failed to load announcements. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (!user) return null;

  return (
    <>
      {user.role === "admin" ? <DashboardNavAdmin /> : <DashboardNav />}

      <div className="announcements-page">
        {/* PAGE HEADER */}
        <div className="page-header">
          <h1>Announcements</h1>
          <p>Stay updated with the latest hostel news and updates</p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="announcements-container">
            <div className="no-announcements">
              <div className="no-announcements-icon">⏳</div>
              <h3>Loading...</h3>
              <p>Fetching latest announcements</p>
            </div>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="announcements-container">
            <div className="no-announcements">
              <div className="no-announcements-icon">⚠️</div>
              <h3>Something went wrong</h3>
              <p>{error}</p>
              <button className="retry-btn" onClick={fetchAnnouncements}>
                Retry
              </button>
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS LIST */}
        {!loading && !error && (
          <div className="announcements-container">
            {announcements.length > 0 ? (
              announcements.map((announcement) => (
                <div key={announcement._id || announcement.id} className="announcement-card">
                  <div className="announcement-content">

                    {/* Header with Title and Priority */}
                    <div className="announcement-header">
                      <h2 className="announcement-title">{announcement.title}</h2>
                      {announcement.priority && (
                        <span className={`priority-badge ${announcement.priority}`}>
                          {announcement.priority}
                        </span>
                      )}
                    </div>

                    {/* Meta Info: Category and Location */}
                    <div className="announcement-meta">
                      {announcement.category && (
                        <span className={`category-tag ${announcement.category.toLowerCase()}`}>
                          {announcement.category}
                        </span>
                      )}
                      {announcement.location && (
                        <span className="location-info">📍 {announcement.location}</span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="announcement-description">
                      {announcement.message || announcement.description || announcement.content}
                    </p>

                    {/* Footer */}
                    <div className="announcement-footer">
                      {announcement.postedBy && (
                        <span className="announcement-author">
                          👤 {announcement.postedBy}
                        </span>
                      )}
                      <span className="announcement-date">
                        📅 {formatDate(announcement.createdAt || announcement.date)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="no-announcements">
                <div className="no-announcements-icon">📢</div>
                <h3>No Announcements</h3>
                <p>There are no announcements at the moment. Check back later!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Announcements;