import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ContactPopup from './components/ContactPopup';
import ComingSoon from './components/ComingSoon';
import Blogs from './components/Blogs';
import BlogDetail from './components/BlogDetail';
import Footer from './components/Footer';
import Loader from './components/Loader';
import { LoadingProvider, useLoading } from './context/LoadingContext';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const { isLoading } = useLoading();

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  // Handle navigation based on hash
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentPage(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Show Blog Detail page for individual blog posts
  if (currentPage.startsWith('blog/')) {
    return (
      <div className="App">
        {isLoading && (
          <div className="loader-overlay">
            <Loader />
          </div>
        )}
        <Navbar onContactClick={openContact} />
        <BlogDetail />
        <Footer onContactClick={openContact} />
        <ContactPopup isOpen={isContactOpen} onClose={closeContact} />
      </div>
    );
  }

  // Show Blogs page for blogs route
  if (currentPage === 'blogs') {
    return (
      <div className="App">
        {isLoading && (
          <div className="loader-overlay">
            <Loader />
          </div>
        )}
        <Navbar onContactClick={openContact} />
        <Blogs />
        <Footer onContactClick={openContact} />
        <ContactPopup isOpen={isContactOpen} onClose={closeContact} />
      </div>
    );
  }

  // Show Coming Soon page for other specific routes
  if (['pagada-go', 'pagada-ment', 'events'].includes(currentPage)) {
    return (
      <div className="App">
        {isLoading && (
          <div className="loader-overlay">
            <Loader />
          </div>
        )}
        <Navbar onContactClick={openContact} />
        <ComingSoon />
        <Footer onContactClick={openContact} />
        <ContactPopup isOpen={isContactOpen} onClose={closeContact} />
      </div>
    );
  }

  return (
    <div className="App">
      {isLoading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <Navbar onContactClick={openContact} />
      
      <main className="main-content">
        {/* Hero Content */}
        <div className="hero-container">
          <h1 className="hero-title">
            The innovation driving <br />
            next-generation sports systems.
          </h1>
        </div>
        
        {/* Right side decoration */}
        <div className="hero-decoration"></div>
      </main>

      {/* Pagada Conversations Section */}
      <section className="conversations-section">
        <div className="conversations-container">
          <div className="conversations-header">
            <h2 className="conversations-title">
              Icons Who Built Today. Insights to Shape Tomorrow.
            </h2>
            <div className="conversations-subtitle">
              <p>Be in the room for <strong>legendary conversations,</strong></p>
              <p>where <strong>athletics' future is taking shape.</strong></p>
            </div>
          </div>

          <div className="team-profiles">
            <div className="profile-card">
              <div className="profile-image placeholder-1"></div>
              <h3 className="profile-name">Dayakar</h3>
              <p className="profile-title">Co-Founder</p>
              <p className="profile-company">Athletic Capital</p>
            </div>

            <div className="profile-card">
              <div className="profile-image placeholder-2"></div>
              <h3 className="profile-name">Saranya Dayakar</h3>
              <p className="profile-title">Co-Founder</p>
              <p className="profile-company">Pagada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Popup */}
      <ContactPopup isOpen={isContactOpen} onClose={closeContact} />

      {/* Footer */}
      <Footer onContactClick={openContact} />
    </div>
  );
}

export default App;