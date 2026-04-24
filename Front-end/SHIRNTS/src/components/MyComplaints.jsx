import { useState, useEffect } from "react";
import "./MyComplaints.css";
import SearchFilter from "./SearchFilter";
import "./SearchFilter.css";
import DashboardNav from "./DashboardNav";
import { complaintAPI } from "../utils/api";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filterVal, setFilterVal] = useState({ type: "", status: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await complaintAPI.getMyComplaints();
        setComplaints(data);
        setFiltered(data);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const apply = (newSearch, newFilter) => {
    const s = newSearch !== null ? newSearch : search;
    const f = newFilter !== null ? newFilter : filterVal;

    if (newSearch !== null) setSearch(newSearch);
    if (newFilter !== null) setFilterVal(newFilter);

    let result = [...complaints];

    if (s) {
      result = result.filter((c) =>
        c.title.toLowerCase().includes(s.toLowerCase())
      );
    }
    if (f.type) {
      result = result.filter(
        (c) => c.category.toLowerCase() === f.type.toLowerCase()
      );
    }
    if (f.status) {
      result = result.filter(
        (c) => c.status.toLowerCase() === f.status.toLowerCase()
      );
    }

    setFiltered(result);
  };

  return (
    <>
      <DashboardNav />

      <div className="my-complaints-page">
        <div className="page-header">
          <h1>My Complaints</h1>
          <p>Track and manage all your reported issues</p>
        </div>

        <div className="Se">
          <SearchFilter
            onSearch={(val) => apply(val, null)}
            onFilter={(val) => apply(null, val)}
          />
        </div>

        <div className="my-complaints-grid">
          {loading ? (
            <p>Loading...</p>
          ) : filtered.length > 0 ? (
            filtered.map((complaint) => (
              <div key={complaint._id} className="my-complaint-card">
                <div className="complaint-header">
                  <h3 className="complaint-title">{complaint.title}</h3>
                  <span className={`status-badge ${complaint.status.toLowerCase().replace(" ", "-")}`}>
                    {complaint.status}
                  </span>
                </div>

                <p className="complaint-meta">
                  {complaint.category} • {complaint.location}
                </p>

                <span className={`priority-badge ${complaint.priority.toLowerCase()}`}>
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
    </>
  );
};

export default MyComplaints;