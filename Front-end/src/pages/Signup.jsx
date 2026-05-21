import { useState } from "react";
import "./Signup.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    email: "",
    password: "",
    adminId: "",
    adminEmail: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload =
      role === "student"
        ? {
            role,
            email: formData.email,
            password: formData.password,
            rollNumber: formData.rollNumber
          }
        : {
            role,
            email: formData.adminEmail,
            adminId: formData.adminId,
            password: formData.password
          };

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      // Save token to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Signup successful!");
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Backend not reachable. Make sure the server is running on port 3000");
    } finally {
      setLoading(false);
    }
  };

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

            {/* ROLE TOGGLE */}
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
                <input
                  type="text"
                  name="rollNumber"
                  placeholder="Roll Number"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            {/* ADMIN FORM */}
            {role === "admin" && (
              <>
                <input
                  type="text"
                  name="adminId"
                  placeholder="Admin ID"
                  value={formData.adminId}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="adminEmail"
                  placeholder="Admin Email"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <button 
              className="signup-btn" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <p style={{ marginTop: "15px", textAlign: "center" }}>
              Already have an account?{" "}
              <span
                style={{ color: "#4CAF50", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>

          {/* RIGHT */}
          <div className="signup-right">
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
};

export default Signup;