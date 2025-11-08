import React, { useState, useEffect } from 'react';
import { addToNewsletter } from '../services/subscriberService';

const ComingSoon = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date('2026-01-24').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessageType('error');
      setSubscriptionMessage('Please enter your email');
      return;
    }

    setIsSubscribing(true);
    try {
      const result = await addToNewsletter(email);
      
      if (result.success) {
        setMessageType('success');
        setSubscriptionMessage('✅ Thanks for subscribing! Be the first to know when we launch.');
        setEmail('');
        
        // Clear message after 5 seconds
        setTimeout(() => {
          setSubscriptionMessage('');
        }, 5000);
      } else {
        setMessageType('error');
        setSubscriptionMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessageType('error');
      setSubscriptionMessage('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <h1 className="coming-soon-title">Coming Soon!</h1>
        
        <div className="countdown-container">
          <div className="countdown-timer">
            <div className="countdown-item">
              <span className="countdown-value">{String(countdown.days).padStart(2, '0')}</span>
              <span className="countdown-label">Days</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-item">
              <span className="countdown-value">{String(countdown.hours).padStart(2, '0')}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-item">
              <span className="countdown-value">{String(countdown.minutes).padStart(2, '0')}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-item">
              <span className="countdown-value">{String(countdown.seconds).padStart(2, '0')}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
        </div>

        <div className="newsletter-section">
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubscribing}
              className="newsletter-input"
              required
            />
            <button 
              type="submit" 
              className="newsletter-btn"
              disabled={isSubscribing}
            >
              {isSubscribing ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {subscriptionMessage && (
            <p className={`newsletter-message ${messageType}`}>
              {subscriptionMessage}
            </p>
          )}
          <p className="newsletter-hint">Be the first to know when we launch!</p>
        </div>
      </div>
      <div className="coming-soon-decoration"></div>
    </div>
  );
};

export default ComingSoon;
