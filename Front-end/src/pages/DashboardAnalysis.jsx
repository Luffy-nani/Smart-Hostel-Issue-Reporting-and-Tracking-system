import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavAdmin from "../components/DashboardNav-admin";
import { dashboardAPI, getUser } from "../utils/api";
import "./DashboardAnalysis.css";

const DashboardAnalysis = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      navigate("/dashboard");
      return;
    }

    const fetchComplaints = async () => {
      try {
        const data = await dashboardAPI.getAllComplaints();
        setComplaints(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [navigate, user]);

  const analysis = useMemo(() => {
    const statusCounts = { Pending: 0, "In Progress": 0, Resolved: 0 };
    const priorityCounts = { High: 0, Medium: 0, Low: 0 };
    const categoryCounts = {};

    complaints.forEach((complaint) => {
      const status = complaint?.status || "Pending";
      const priority = complaint?.priority || "Low";
      const category = complaint?.category || "Other";

      statusCounts[status] = (statusCounts[status] || 0) + 1;
      priorityCounts[priority] = (priorityCounts[priority] || 0) + 1;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    const total = complaints.length;
    const resolved = statusCounts.Resolved || 0;
    const resolutionRate = total ? Math.round((resolved / total) * 100) : 0;

    return { total, statusCounts, priorityCounts, categoryCounts, resolutionRate };
  }, [complaints]);

  if (!user || user.role !== "admin") return null;

  return (
    <>
      <DashboardNavAdmin />
      <div className="analysis-page">
        <h1>Dashboard Analysis</h1>
        {loading ? (
          <p>Loading analysis...</p>
        ) : (
          <>
            <div className="analysis-cards">
              <div className="analysis-card">
                <h3>Total Complaints</h3>
                <p>{analysis.total}</p>
              </div>
              <div className="analysis-card">
                <h3>Resolved</h3>
                <p>{analysis.statusCounts.Resolved || 0}</p>
              </div>
              <div className="analysis-card">
                <h3>Pending</h3>
                <p>{analysis.statusCounts.Pending || 0}</p>
              </div>
              <div className="analysis-card">
                <h3>Resolution Rate</h3>
                <p>{analysis.resolutionRate}%</p>
              </div>
            </div>

            <div className="analysis-sections">
              <section className="analysis-section">
                <h2>Status Breakdown</h2>
                <ul>
                  {Object.entries(analysis.statusCounts).map(([status, count]) => (
                    <li key={status}>
                      <span>{status}</span>
                      <strong>{count}</strong>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="analysis-section">
                <h2>Priority Breakdown</h2>
                <ul>
                  {Object.entries(analysis.priorityCounts).map(([priority, count]) => (
                    <li key={priority}>
                      <span>{priority}</span>
                      <strong>{count}</strong>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="analysis-section">
                <h2>Category Breakdown</h2>
                <ul>
                  {Object.entries(analysis.categoryCounts).map(([category, count]) => (
                    <li key={category}>
                      <span>{category}</span>
                      <strong>{count}</strong>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DashboardAnalysis;
