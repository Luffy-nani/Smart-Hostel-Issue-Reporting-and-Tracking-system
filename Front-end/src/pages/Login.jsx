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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    // Prepare payload based on role
    const payload =
      role === "student"
        ? { role, email, password }
        : { role, email, adminId, password };

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Save token and user info to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Backend not reachable. Make sure the server is running on port 3000");
    } finally {
      setLoading(false);
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
                  setEmail("");
                  setAdminId("");
                  setPassword("");
                }}
              >
                Student
              </button>

              <button
                className={role === "admin" ? "active" : ""}
                onClick={() => {
                  setRole("admin");
                  setError("");
                  setEmail("");
                  setAdminId("");
                  setPassword("");
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
                  type="email"
                  placeholder="Admin Email"
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
            )}

            {error && <p className="error-text">{error}</p>}

            <button 
              onClick={handleLogin} 
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p style={{ marginTop: "15px", textAlign: "center" }}>
              Don't have an account?{" "}
              <span
                style={{ color: "#4CAF50", cursor: "pointer" }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
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