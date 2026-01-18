import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">Smart Hostel</h1>
      </div>

      <ul className="navbar-menu">
        <li>Features</li>
        <li>Reviews</li>
        <li>About</li>
      </ul>

      <div className="navbar-right">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
