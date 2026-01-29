import { useState } from "react";
import "./Login.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("student");

  const [email, setEmail] = useState("");
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    // STUDENT LOGIN
    if (role === "student") {
      if (email === "student@gmail.com" && password === "1234") {
        setError("");
        navigate("/dashboard");
      } else {
        setError("Invalid student email or password");
      }
    }

    // ADMIN LOGIN
    if (role === "admin") {
      if (adminId === "admin01" && password === "admin123") {
        setError("");
        navigate("/dashboard");
      } else {
        setError("Invalid admin credentials");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-page">
        <div className="login-card">

          {/* LEFT SECTION */}
          <div className="login-left">
            <h2>Welcome Back</h2>
            <p className="subtitle">Login to continue</p>

            <div className="role-toggle">
              <button
                className={role === "student" ? "active" : ""}
                onClick={() => {
                  setRole("student");
                  setError("");
                }}
              >
                Student
              </button>

              <button
                className={role === "admin" ? "active" : ""}
                onClick={() => {
                  setRole("admin");
                  setError("");
                }}
              >
                Admin
              </button>
            </div>

            {/* INPUTS */}
            {role === "student" ? (
              <>
                <input
                  type="email"
                  placeholder="Student Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Admin Unique ID"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            )}

            {error && <p className="error-text">{error}</p>}

            <button onClick={handleLogin} className="login-btn">
              Login
            </button>
          </div>

          {/* RIGHT SECTION */}
          <div className="login-right">
            <h1>Smart Hostel Issue Reporting</h1>
            <br />
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
