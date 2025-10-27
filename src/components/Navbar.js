import React, { useState } from 'react';
import Logo from './Logo';

const Navbar = ({ onContactClick }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar" onMouseLeave={handleMouseLeave}>
      <div className="navbar-container">
        {/* Left - Logo */}
        <div className="navbar-left">
          <div className="navbar-logo">
            <Logo 
              variant="white" 
              size="medium"
              className="navbar-logo-svg"
            />
            <span className="brand-name">PAGADA</span>
          </div>
        </div>

        {/* Center - Navigation Menu */}
        <div className={`navbar-center ${isMobileMenuOpen ? 'navbar-center-open' : ''}`}>
          <ul className={`nav-menu ${isMobileMenuOpen ? 'nav-menu-open' : ''}`}>
           <li 
              className="nav-item"
              onMouseEnter={() => handleMouseEnter('company')}
              onClick={closeMobileMenu}
            >
              <a href="#home" className="nav-link">Home</a>
            </li>

            <li 
              className="nav-item"
              onMouseEnter={() => handleMouseEnter('product')}
              onClick={closeMobileMenu}
            >
              <a href="#product" className="nav-link">PRODUCT SUITE</a>
            </li>
            <li 
              className="nav-item"
              onMouseEnter={() => handleMouseEnter('resources')}
              onClick={closeMobileMenu}
            >
              <a href="#resources" className="nav-link">RESOURCES</a>
            </li>
            <li 
              className="nav-item"
              onClick={closeMobileMenu}
            >
              {/* CAREERS removed */}
            </li>
            <li className="nav-item" onClick={closeMobileMenu}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onContactClick();
                  closeMobileMenu();
                }}
                className="nav-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                CONTACT
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
        </div>

        {/* Right - Description and CTA */}
        <div className="navbar-right">
          <div className="navbar-description">
            <p>We empower athletes, coaches, and leagues with mentorship,<br />development and performance tools</p>
          </div>
          <button className="explore-btn">EXPLORE</button>
        </div>
      </div>

      {/* Dropdown Menus */}
      {activeDropdown && (
        <div className="dropdown-overlay">
          <div className="dropdown-container">
            
            {/* Product Suite Dropdown */}
            {activeDropdown === 'product' && (
              <div className="dropdown-content">
                <div className="dropdown-title">
                  <h2>Our Products</h2>
                </div>
                <div className="dropdown-nav">
                  <ul>
                    <li><a href="#pagada-go">Pagada Go</a></li>
                    <li><a href="#pagada-ment">Pagada Ment</a></li>
                  </ul>
                </div>
                <div className="dropdown-featured">
                  <div className="featured-image product-bg"></div>
                  <div className="featured-content">
                    <h3>THE ATOMIC UNITS OF SPORTS PERFORMANCE</h3>
                    <p>On a mission to build modular products that help teams and athletes train smarter, reduce injuries, and accelerate development.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Resources Dropdown */}
            {activeDropdown === 'resources' && (
              <div className="dropdown-content">
                <div className="dropdown-title">
                  <h2>Our Resources</h2>
                </div>
                <div className="dropdown-nav">
                  <ul>
                    <li><a href="#blogs">Blogs</a></li>
                    <li><a href="#events">Events</a></li>
                  </ul>
                </div>
                <div className="dropdown-featured">
                  <div className="featured-image resources-bg"></div>
                  <div className="featured-content">
                    <h3>REAL-WORLD IMPACT, INNOVATION, AND INSIGHT</h3>
                    <p>Discover PAGADA's latest news, customer stories, expert insights, webinars, and more. Learn about our work and the impact we're having across sports and athlete development.</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;