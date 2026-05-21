// src/components/IssueCard.jsx
import { useState } from "react";
import "./Issues.css";

const IssueCard = ({ issue, onResolve, isAdmin }) => {
  const [contextMenu, setContextMenu] = useState(false);

  if (!issue) return null;

  const {
    title = "No title",
    category = "Unknown",
    priority = "Low",
    location = "N/A",
    images = [],
  } = issue;

  const handleRightClick = (e) => {
    if (!isAdmin) return;
    e.preventDefault();
    e.stopPropagation();
    setContextMenu(true);
  };

  const handleResolve = () => {
    setContextMenu(false);
    if (onResolve) onResolve(issue._id || issue.id);
  };

  return (
    <>
      <div className="issue-card" onContextMenu={handleRightClick}>
        <div className="issue-header">
          <h3 className="issue-title">{title}</h3>
          <span className={`priority ${priority.toLowerCase()}`}>
            {priority}
          </span>
        </div>

        <p className="issue-meta">
          {category} • {location}
        </p>

        {images.length > 0 && (
          <img src={images[0]} alt="preview" className="issue-image" />
        )}

        {contextMenu && (
          <div className="context-menu">
            <button
              className="context-menu-item resolve"
              onClick={handleResolve}
            >
              ✓ Mark as Resolved
            </button>
          </div>
        )}
      </div>

      {contextMenu && (
        <div
          className="context-overlay"
          onClick={() => setContextMenu(false)}
        />
      )}
    </>
  );
};

export default IssueCard;