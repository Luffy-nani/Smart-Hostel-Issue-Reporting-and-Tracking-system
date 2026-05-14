// src/App.jsx
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import RaiseComplaint from "./pages/RaiseComplaint";
import UserComplaints from "./pages/UserComplaints";
import Announcements from "./components/Announcements";
import MakeAnnouncement from "./pages/MakeAnnouncement";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/raise" element={<RaiseComplaint />} />
      <Route path="/dashboard/complaints" element={<UserComplaints />} />

      {/* Both paths render the same Announcements component */}
      <Route path="/dashboard/announcements" element={<Announcements />} />
      <Route path="/dashboard/admin-announcements" element={<Announcements />} />

      <Route path="/dashboard/make-announcement" element={<MakeAnnouncement />} />
    </Routes>
  );
}

export default App;