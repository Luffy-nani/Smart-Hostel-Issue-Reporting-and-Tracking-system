import "./MyComplaints.css";
import SearchFilter from "./SearchFilter";
import "./SearchFilter.css"

const MyComplaints = () => {
  const userComplaints = [
    {
      id: 1,
      title: "Water leakage in bathroom",
      category: "Plumbing",
      priority: "high",
      status: "in-progress",
      room: "B-203",
    },
    {
      id: 2,
      title: "WiFi not working",
      category: "Internet",
      priority: "medium",
      status: "pending",
      room: "C-110",
    },
    {
      id: 3,
      title: "AC not cooling",
      category: "Electrical",
      priority: "high",
      status: "resolved",
      room: "B-203",
   
    }
  ];

  return (
    <div className="my-complaints-page">
      {/* PAGE HEADER */}
      <div className="page-header">
        <h1>My Complaints</h1>
        <p>Track and manage all your reported issues</p>
      </div>
    <div className="Se">
        <SearchFilter/>
    </div>
      {/* COMPLAINTS GRID */}
      <div className="my-complaints-grid">
        {userComplaints.length > 0 ? (
          userComplaints.map((complaint) => (
            <div key={complaint.id} className="my-complaint-card">
              <div className="complaint-header">
                <h3 className="complaint-title">{complaint.title}</h3>
                <span className={`status-badge ${complaint.status}`}>
                  {complaint.status.replace("-", " ")}
                </span>
              </div>

              <p className="complaint-meta">
                {complaint.category} • Room {complaint.room}
              </p>

              <span className={`priority-badge ${complaint.priority}`}>
                {complaint.priority} Priority
              </span>

             
            </div>
          ))
        ) : (
          <div className="no-complaints">
            <div className="no-complaints-icon">📋</div>
            <h3>No Complaints Found</h3>
            <p>You haven't reported any issues yet</p>
            <button className="create-complaint-btn">
              Raise Your First Complaint
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComplaints;
