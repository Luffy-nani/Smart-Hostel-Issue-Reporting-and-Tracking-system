import "./DashboardNav.css";

export default function Navbar() {
  return (
  <nav className="navbar">
      <div className="logo">Smart Hostel</div>

      <div className="nav-right">
        <button className="nav-btn">My Complaints</button>
        <button className="nav-btn">Raise Complaint</button>
        <button className="nav-btn">Announcements</button>

        <div className="profile-wrapper">
          <div className="profile-avatar">EV</div>

          <div className="profile-dropdown">
            <button>Settings</button>
            <button className="logout">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
