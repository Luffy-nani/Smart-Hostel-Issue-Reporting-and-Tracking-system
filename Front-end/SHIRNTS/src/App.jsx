import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import RaiseComplaint from "./pages/RaiseComplaint";
import UserComplaints from "./pages/UserComplaints";
import Announcements from "./components/Announcements";
import { Routes, Route } from "react-router-dom";

function App() {
  return(
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/raise" element={<RaiseComplaint />} />
      <Route path="/dashboard/complaints" element={<UserComplaints />} />
      <Route path="/dashboard/announcements" element={<Announcements />} />
    </Routes>
  );

}

export default App;
