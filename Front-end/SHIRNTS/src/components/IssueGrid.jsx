  // src/components/IssueGrid.jsx
  import IssueCard from "./IssueCard";
  import "./Issues.css";
  import { getUser, dashboardAPI } from "../utils/api";

  const IssueGrid = ({ complaints = [], setComplaints }) => {
    const user = getUser();
    const isAdmin = user?.role === "admin";

    if (!Array.isArray(complaints)) return null;

    const handleResolve = async (id) => {
      try {
        await dashboardAPI.resolveComplaint(id);
        setComplaints((prev) =>
          prev.filter((c) => (c._id || c.id) !== id)
        );
      } catch (err) {
        console.error("Failed to delete complaint:", err);
      }
    };

    return (
      <div className="dashboard-page">
        <div className="issues-grid">
          {complaints.length > 0 ? (
            complaints.map((issue) => (
              <IssueCard
                key={issue._id || issue.id}
                issue={issue}
                isAdmin={isAdmin}
                onResolve={handleResolve}
              />
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