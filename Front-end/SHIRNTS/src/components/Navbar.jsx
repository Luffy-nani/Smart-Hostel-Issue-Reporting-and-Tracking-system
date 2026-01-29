import "./Navbar.css";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate=useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 onClick={()=>navigate("/")} className="logo">Smart Hostel</h1>
      </div>

      <ul className="navbar-menu">
        <li>Features</li>
        <li>Reviews</li>
        <li>About</li>
      </ul>

      <div className="navbar-right">
        <button onClick={()=>navigate("/login")} className="login-btn">Login</button>
        <button onClick={()=>navigate("/signup")} className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
