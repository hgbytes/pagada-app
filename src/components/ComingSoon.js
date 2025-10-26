import React from 'react';

const ComingSoon = () => {
  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <h1 className="coming-soon-title">Coming Soon!</h1>
        <p className="coming-soon-subtitle">We're working hard to bring you something amazing.</p>
        <p className="coming-soon-description">
          This feature is currently under development. Stay tuned for exciting updates!
        </p>
        <a href="#/" className="coming-soon-btn">Back to Home</a>
      </div>
      <div className="coming-soon-decoration"></div>
    </div>
  );
};

export default ComingSoon;
