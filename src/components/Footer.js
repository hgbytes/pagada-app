import React from 'react';

function Footer({ onContactClick }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <h3 className="footer-brand">PAGADA</h3>
            <p className="footer-tagline">The innovation driving next-generation sports systems.</p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#blogs">Blogs</a></li>
              <li><a href="#pagada-go">Pagada Go</a></li>
              <li><a href="#pagada-ment">Pagada Ment</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="#events">Events</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onContactClick(); }} role="button" tabIndex="0" onKeyPress={(e) => { if (e.key === 'Enter') onContactClick(); }}>Contact</a></li>
              <li><a href="/" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
              <li><a href="/" onClick={(e) => e.preventDefault()}>Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="footer-social">
              <a href="/" onClick={(e) => e.preventDefault()} className="social-link" title="LinkedIn">LinkedIn</a>
              <a href="/" onClick={(e) => e.preventDefault()} className="social-link" title="Twitter">Twitter</a>
              <a href="/" onClick={(e) => e.preventDefault()} className="social-link" title="Instagram">Instagram</a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} PAGADA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
