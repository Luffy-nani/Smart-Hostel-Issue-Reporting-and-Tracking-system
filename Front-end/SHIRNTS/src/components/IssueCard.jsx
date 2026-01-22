
import "./Issues.css";
const IssueCard = ({ issue }) => {
  if (!issue) return null;

  const {
    title = "No title",
    category = "Unknown",
    priority = "Low",
    room = "N/A",
    images = []
  } = issue;

  return (
    <div className="issue-card">
      <div className="issue-header">
        <h3 className="issue-title">{title}</h3>
        <span className={`priority ${priority.toLowerCase()}`}>
          {priority}
        </span>
      </div>

      <p className="issue-meta">
        {category} • Room {room}
      </p>

      {images.length > 0 && (
        <img
          src={images[0]}
          alt="preview"
          className="issue-image"
        />
      )}
    </div>
  );
};

export default IssueCard;
