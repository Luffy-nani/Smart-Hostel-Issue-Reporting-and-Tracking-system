import IssueCard from "./IssueCard";
import "./Issues.css";

const IssueGrid = ({ complaints = [] }) => {
  if (!Array.isArray(complaints)) return null;

  return (
    <div className="dashboard-page">
      <div className="issues-grid">
        {complaints.length > 0 ? (
          complaints.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))
        ) : (
          <div className="no-complaints">
            <h3>No Complaints Yet</h3>
            <p>All issues will appear here once reported</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueGrid;