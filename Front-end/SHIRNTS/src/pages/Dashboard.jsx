import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import DashboardNavAdmin from "../components/DashboardNav-admin";
import SearchFilter from "../components/SearchFilter";
import IssueGrid from "../components/IssueGrid";
import { dashboardAPI, getUser } from "../utils/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterVal, setFilterVal] = useState({ type: "", status: "" });

  const user = getUser();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await dashboardAPI.getAllComplaints();
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

  const handleSearch = (term) => apply(term, null);
  const handleFilter = ({ type, status }) => apply(null, { type, status });

  if (!user) return null;
  if (loading) return <p>Loading complaints...</p>;

  return (
    <>
      {user.role === "admin" ? <DashboardNavAdmin /> : <DashboardNav />}
      <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
      <IssueGrid complaints={filtered} setComplaints={setFiltered} />
    </>
  );
};

export default Dashboard;