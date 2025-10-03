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
            {/*<span className="brand-name">Pagada</span>*/}
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
              <a href="#company" className="nav-link">COMPANY</a>
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
              onMouseEnter={() => handleMouseEnter('careers')}
              onClick={closeMobileMenu}
            >
              <a href="#careers" className="nav-link">CAREERS</a>
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
            <p>We design digital solutions that make training,<br /> coaching, and league participation seamless</p>
          </div>
          <button className="explore-btn">EXPLORE</button>
        </div>
      </div>

      {/* Dropdown Menus */}
      {activeDropdown && (
        <div className="dropdown-overlay">
          <div className="dropdown-container">
            
            {/* Company Dropdown */}
            {activeDropdown === 'company' && (
              <div className="dropdown-content">
                <div className="dropdown-title">
                  <h2>Company</h2>
                </div>
                <div className="dropdown-nav">
                  <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="#conversations">Pagada Conversations</a></li>
                  </ul>
                </div>
                <div className="dropdown-featured">
                  <div className="featured-image company-bg"></div>
                  <div className="featured-content">
                    <h3>RESHAPING THE HEALTHCARE LANDSCAPE</h3>
                    <p>Technology must be co-developed with health systems. We believe in radical collaboration between technologists and healthcare leaders to deliver solutions that actually work.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Product Suite Dropdown */}
            {activeDropdown === 'product' && (
              <div className="dropdown-content">
                <div className="dropdown-title">
                  <h2>Our Products</h2>
                </div>
                <div className="dropdown-nav">
                  <ul>
                    <li><a href="#ambient-ai">Ambient AI</a></li>
                    <li><a href="#agents">Agents</a></li>
                    <li><a href="#rcm">RCM</a></li>
                    <li><a href="#rpm">RPM</a></li>
                    <li><a href="#engage">Engage</a></li>
                    <li><a href="#patientkeeper">PatientKeeper</a></li>
                    <li><a href="#strongline">Strongline</a></li>
                    <li><a href="#colab">CoLab</a></li>
                  </ul>
                </div>
                <div className="dropdown-featured">
                  <div className="featured-image product-bg"></div>
                  <div className="featured-content">
                    <h3>THE ATOMIC UNITS OF HEALTHCARE INFRASTRUCTURE</h3>
                    <p>On a mission to solve healthcare's biggest challenges with automated and AI-powered solutions to bring down the cost of care, reduce burnout and disparities, and improve community health.</p>
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
                    <li><a href="#customer-stories">Customer Stories</a></li>
                    <li><a href="#news">News</a></li>
                    <li><a href="#media">Media</a></li>
                    <li><a href="#webinars">Webinars</a></li>
                    <li><a href="#events">Events</a></li>
                    <li><a href="#whitepapers">Whitepapers</a></li>
                  </ul>
                </div>
                <div className="dropdown-featured">
                  <div className="featured-image resources-bg"></div>
                  <div className="featured-content">
                    <h3>REAL-WORLD IMPACT, INNOVATION, AND INSIGHT</h3>
                    <p>Discover Pagada's latest news, customer stories, expert insights, webinars, and more. Learn about our customers and the transformative impact we're making alongside healthcare.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Careers Dropdown */}
            {activeDropdown === 'careers' && (
              <div className="dropdown-content">
                <div className="dropdown-title">
                  <h2>Careers</h2>
                </div>
                <div className="dropdown-nav">
                  <ul>
                    <li><a href="#job-openings">Job Openings</a></li>
                    <li><a href="#life-at-pagada">Life at Pagada</a></li>
                  </ul>
                </div>
                <div className="dropdown-featured">
                  <div className="featured-image careers-bg"></div>
                  <div className="featured-content">
                    <h3>WE BUILD AI POWERED HEALTHCARE TECHNOLOGY.</h3>
                    <p>We design digital solutions that make training, coaching, and league participation seamless</p>
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