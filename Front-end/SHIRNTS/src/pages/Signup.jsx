import { useState } from "react";
import "./Signup.css";
import Navbar from "../components/Navbar";

const Signup = () => {
  const [role, setRole] = useState("student");

  return (
    <>
      <Navbar />
      <div className="signup-page">
        <div className="signup-card">
          {/* LEFT */}
          <div className="signup-left">
            <h2>Create Account</h2>
            <p className="subtitle">
              {role === "student"
                ? "Register as a student"
                : "Register as an admin"}
            </p>

            {/* TOGGLE */}
            <div className="role-toggle">
              <button
                className={role === "student" ? "active" : ""}
                onClick={() => setRole("student")}
              >
                Student
              </button>
              <button
                className={role === "admin" ? "active" : ""}
                onClick={() => setRole("admin")}
              >
                Admin
              </button>
            </div>

            {/* STUDENT FORM */}
            {role === "student" && (
              <>
                <input type="text" placeholder="Full Name" />
                <input type="text" placeholder="Roll Number" />
                <input type="email" placeholder="Email Address" />
                <input type="password" placeholder="Password" />
    
              </>
            )}

            {/* ADMIN FORM */}
            {role === "admin" && (
              <>
                <input type="text" placeholder="Admin ID" />
                <input type="text" placeholder="Hostel Name" />
                <input type="password" placeholder="Password" />
              </>
            )}

            <button className="signup-btn">Sign Up</button>
          </div>

          {/* RIGHT */}
          <div className="signup-right">
            <h1>Smart Hostel Issue Reporting</h1>
            <br></br>
              <p>
              Report issues, track progress, and get faster resolutions with full
              transparency.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
