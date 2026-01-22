import DashboardNav from "../components/DashboardNav";
import SearchFilter from "../components/SearchFilter";
import IssueGrid from "../components/IssueGrid";

const Dashboard = () => {
  const complaints = [
  {
    id: 1,
    title: "Water leakage in bathroom",
    category: "Plumbing",
    priority: "High",
    room: "B-203",
    description: "Water leaking continuously from the tap.",
    images: ["https://via.placeholder.com/300"]
  },
  {
    id: 2,
    title: "WiFi not working",
    category: "Internet",
    priority: "Medium",
    room: "C-110",
    description: "WiFi disconnects after 10 PM.",
    images: []
  }
];

  return (
    <>
      <DashboardNav />
      <SearchFilter />
      <IssueGrid complaints={complaints} />
    </>
  );
};

export default Dashboard;
