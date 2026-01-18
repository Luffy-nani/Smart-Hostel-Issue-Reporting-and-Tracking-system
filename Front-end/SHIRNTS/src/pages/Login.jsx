import { useState } from "react";
import "./Login.css";
import Navbar from "../components/Navbar";

function Login() {
  const [role, setRole] = useState("student");

  return (
    <>
      {/* NAVBAR (reuse same navbar component if you have one) */}
      <Navbar />

      {/* PAGE */}
      <div className="login-page">
        <div className="login-card">

          {/* LEFT */}
          <div className="login-left">
            <h2>Welcome Back</h2>
            <p className="subtitle">Login to continue</p>

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

            {role === "student" ? (
              <>
                <input type="email" placeholder="Student Email ID" />
                <input type="password" placeholder="Password" />
              </>
            ) : (
              <>
                <input type="text" placeholder="Admin Unique ID" />
                <input type="password" placeholder="Password" />
              </>
            )}

            <button className="login-btn">Login</button>
          </div>

          {/* RIGHT */}
          <div className="login-right">
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
}

export default Login;
