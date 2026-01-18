import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="brand">Smart Hostel</span>
        <span className="divider">|</span>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Contact</a>
      </div>

      <p className="copyright">
        © 2026 Smart Hostel. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
