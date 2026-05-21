import "./Section.css";
import { useNavigate } from "react-router-dom";

const Section = () => {
    const navigate=useNavigate();
    return (
        <section className="container">
            <h1 className="heading">Smart Hostel Issue Reporting System</h1>
            <p className="para">Report, track, and resolve hostel issues transparently</p>

            <div className="btn-group">
                <button onClick={()=>navigate("/login")} className="btn login-btn">Login</button>
                <button onClick={()=>navigate("/signup")} className="btn signup-btn">Sign Up - It's Free</button>
            </div>
        </section>
    );
};

export default Section;
