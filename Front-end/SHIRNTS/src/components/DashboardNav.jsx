import "./DashboardNav.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate=useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div onClick={()=>navigate("/dashboard")} className="logo">Smart Hostel</div>
      </div>

      <ul className="navbar-menu">
        <li onClick={()=>navigate("/dashboard/complaints")}>My Complaints</li>
        <li onClick={()=>navigate("/dashboard/raise")} >Raise Complaint</li>
        <li onClick={()=>navigate("/dashboard/announcements")}>Announcements</li>
      </ul>

      <div className="profile-wrapper">
        <div className="profile-avatar">EV</div>

        <div className="profile-dropdown">
          <button className="profile-btn">Settings</button>
          <button className="profile-btn logout">Logout</button>
        </div>
      </div>
    </nav>
  );
}
