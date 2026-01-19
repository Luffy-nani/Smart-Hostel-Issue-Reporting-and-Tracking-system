import "./DashboardNav.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">Smart Hostel</div>
      </div>

      <ul className="navbar-menu">
        <li>My Complaints</li>
        <li>Raise Complaint</li>
        <li>Announcements</li>
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
