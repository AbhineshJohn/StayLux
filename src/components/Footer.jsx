export default function Footer() {
  const footerLinks = {
    Company: ["About Us", "Careers", "Press & Media", "Investor Relations"],
    "For Travelers": ["How It Works", "Loyalty Program", "Gift Cards", "Mobile App"],
    Support: ["Help Center", "Contact Us", "Cancellation Policy", "Terms of Service"],
    Destinations: ["Goa", "Jaipur", "Mumbai", "Kerala", "Shimla", "Bangalore"],
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">
            <span>🏨</span>
            <div>
              <span className="footer-logo-main">StayLux</span>
              <span className="footer-logo-sub">Premium Hotels</span>
            </div>
          </div>
          <p className="footer-tagline">
            Curating exceptional hotel experiences across India's most beautiful
            destinations since 2020.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-btn" aria-label="Instagram">📸</a>
            <a href="#" className="social-btn" aria-label="Twitter">🐦</a>
            <a href="#" className="social-btn" aria-label="Facebook">💼</a>
            <a href="#" className="social-btn" aria-label="YouTube">▶️</a>
          </div>
        </div>

        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section} className="footer-col">
            <h4 className="footer-col-title">{section}</h4>
            <ul className="footer-links">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="footer-link">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>© 2026 StayLux Hotels Pvt. Ltd. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#" className="footer-bottom-link">Privacy Policy</a>
          <a href="#" className="footer-bottom-link">Terms & Conditions</a>
          <a href="#" className="footer-bottom-link">Cookie Policy</a>
        </div>
        <div className="footer-payments">
          <span className="payment-icon">💳</span>
          <span className="payment-icon">📱</span>
          <span className="payment-icon">🏦</span>
        </div>
      </div>
    </footer>
  );
}
