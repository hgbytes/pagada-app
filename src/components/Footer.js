import React from 'react';

function Footer({ onContactClick }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section footer-brand-section">
            <div className="footer-logo">
              <img src="/Artboard 4.svg" alt="PAGADA Logo" className="footer-logo-img" />
            </div>
            <h3 className="footer-brand">PAGADA</h3>
            <p className="footer-tagline">The innovation driving next-generation sports systems.</p>
            <div className="footer-copyright-mobile">
              <p>&copy; {currentYear} PAGADA. All rights reserved.</p>
            </div>
            <div className="footer-legal">
              <a href="/" onClick={(e) => e.preventDefault()}>Terms of Service</a>
              <span className="separator">•</span>
              <a href="/" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#blogs">Blogs</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="/" onClick={(e) => e.preventDefault()}>Status</a></li>
            </ul>
          </div>

          {/* Product Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Product</h4>
            <ul className="footer-links">
              <li><a href="#pagada-go">Pagada Go</a></li>
              <li><a href="#pagada-ment">Pagada Ment</a></li>
              <li><a href="/" onClick={(e) => e.preventDefault()}>Careers</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onContactClick(); }}>Contact</a></li>
            </ul>
          </div>

          {/* Join the Community */}
          <div className="footer-section">
            <h4 className="footer-heading">Join the Community</h4>
            <div className="footer-social">
              <a href="/" onClick={(e) => e.preventDefault()} className="social-link" title="X / Twitter">X / Twitter</a>
              <a href="/" onClick={(e) => e.preventDefault()} className="social-link" title="GitHub">GitHub</a>
              <a href="/" onClick={(e) => e.preventDefault()} className="social-link" title="Discord">Discord</a>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Desktop Only */}
        <div className="footer-bottom">
          <p className="footer-status">🟢 All Systems Operational</p>
          <p className="footer-copyright">
            &copy; {currentYear} PAGADA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

