import React, { useState } from 'react';
import './webinars-notify.css';

function WebinarsNotify() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    topics: {
      promptEngineering: false,
      aiMarketing: false,
      brandStrategy: false,
      aiTools: false,
      analyticsData: false,
      industryTrends: false
    }
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (topicKey) => {
    setFormData((prev) => ({
      ...prev,
      topics: {
        ...prev.topics,
        [topicKey]: !prev.topics[topicKey]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    // Success state
    setSubmitted(true);
  };

  return (
    <section className="webinars-notify" id="webinars-notify" aria-labelledby="webinars-notify-heading">
      
      {/* Grid Overlay */}
      <div className="webinars-notify__grid-overlay" aria-hidden="true" />

      <div className="webinars-notify__container">
        
        {/* Left Side Info */}
        <div className="webinars-notify__info">
          
          {/* Eyebrow badge */}
          <div className="webinars-notify__badge">
            <svg className="webinars-notify__badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="webinars-notify__badge-text">Get Notified</span>
          </div>

          {/* Heading */}
          <h2 id="webinars-notify-heading" className="webinars-notify__heading">
            Be first in <br />
            <span className="webinars-notify__heading-accent">the room.</span>
          </h2>

          {/* Description */}
          <p className="webinars-notify__desc">
            Webinar seats will be limited. Register your interest now and we'll notify you the moment sessions go live — before public announcement.
          </p>

          {/* Bullet List */}
          <ul className="webinars-notify__list">
            <li className="webinars-notify__list-item">
              <span className="webinars-notify__bullet" aria-hidden="true">•</span>
              <span className="webinars-notify__list-text">Early access to session registrations</span>
            </li>
            <li className="webinars-notify__list-item">
              <span className="webinars-notify__bullet" aria-hidden="true">•</span>
              <span className="webinars-notify__list-text">Exclusive pre-launch pricing</span>
            </li>
            <li className="webinars-notify__list-item">
              <span className="webinars-notify__bullet" aria-hidden="true">•</span>
              <span className="webinars-notify__list-text">Replay access for all sessions you register for</span>
            </li>
          </ul>

        </div>

        {/* Right Side Form Card */}
        <div className="webinars-notify__form-card">
          {submitted ? (
            <div className="webinars-notify__success">
              <div className="webinars-notify__success-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="webinars-notify__success-title">You're on the list!</h3>
              <p className="webinars-notify__success-desc">
                Thank you for your interest, <strong>{formData.name}</strong>. We've registered your email (<strong>{formData.email}</strong>) and will notify you as soon as our live webinars go online.
              </p>
              <button 
                className="webinars-notify__reset-btn"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    profession: '',
                    topics: {
                      promptEngineering: false,
                      aiMarketing: false,
                      brandStrategy: false,
                      aiTools: false,
                      analyticsData: false,
                      industryTrends: false
                    }
                  });
                }}
              >
                Register another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="webinars-notify__form" noValidate>
              <h3 className="webinars-notify__form-title">Register Your Interest</h3>

              {error && (
                <div className="webinars-notify__error-message" role="alert">
                  <svg className="webinars-notify__error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Grid for Name & Email */}
              <div className="webinars-notify__form-grid">
                <div className="webinars-notify__input-group">
                  <label htmlFor="notify-name" className="sr-only">Full name</label>
                  <input
                    type="text"
                    id="notify-name"
                    name="name"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="webinars-notify__input"
                    required
                  />
                </div>
                <div className="webinars-notify__input-group">
                  <label htmlFor="notify-email" className="sr-only">Email address</label>
                  <input
                    type="email"
                    id="notify-email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="webinars-notify__input"
                    required
                  />
                </div>
              </div>

              {/* Full Width Profession */}
              <div className="webinars-notify__input-group webinars-notify__input-group--full">
                <label htmlFor="notify-profession" className="sr-only">Your profession / Industry (optional)</label>
                <input
                  type="text"
                  id="notify-profession"
                  name="profession"
                  placeholder="Your profession / Industry (optional)"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="webinars-notify__input"
                />
              </div>

              {/* Checkbox Section */}
              <div className="webinars-notify__checkbox-section">
                <h4 className="webinars-notify__checkbox-heading">Topics you're most interested in</h4>
                
                <div className="webinars-notify__checkbox-grid">
                  
                  {/* Row 1 */}
                  <label className="webinars-notify__checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.topics.promptEngineering}
                      onChange={() => handleCheckboxChange('promptEngineering')}
                      className="webinars-notify__checkbox-input"
                    />
                    <span className="webinars-notify__checkbox-custom" />
                    <span className="webinars-notify__checkbox-text">Prompt Engineering</span>
                  </label>

                  <label className="webinars-notify__checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.topics.aiMarketing}
                      onChange={() => handleCheckboxChange('aiMarketing')}
                      className="webinars-notify__checkbox-input"
                    />
                    <span className="webinars-notify__checkbox-custom" />
                    <span className="webinars-notify__checkbox-text">AI Marketing</span>
                  </label>

                  {/* Row 2 */}
                  <label className="webinars-notify__checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.topics.brandStrategy}
                      onChange={() => handleCheckboxChange('brandStrategy')}
                      className="webinars-notify__checkbox-input"
                    />
                    <span className="webinars-notify__checkbox-custom" />
                    <span className="webinars-notify__checkbox-text">Brand Strategy</span>
                  </label>

                  <label className="webinars-notify__checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.topics.aiTools}
                      onChange={() => handleCheckboxChange('aiTools')}
                      className="webinars-notify__checkbox-input"
                    />
                    <span className="webinars-notify__checkbox-custom" />
                    <span className="webinars-notify__checkbox-text">AI Tools & Workflows</span>
                  </label>

                  {/* Row 3 */}
                  <label className="webinars-notify__checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.topics.analyticsData}
                      onChange={() => handleCheckboxChange('analyticsData')}
                      className="webinars-notify__checkbox-input"
                    />
                    <span className="webinars-notify__checkbox-custom" />
                    <span className="webinars-notify__checkbox-text">Analytics & Data</span>
                  </label>

                  <label className="webinars-notify__checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.topics.industryTrends}
                      onChange={() => handleCheckboxChange('industryTrends')}
                      className="webinars-notify__checkbox-input"
                    />
                    <span className="webinars-notify__checkbox-custom" />
                    <span className="webinars-notify__checkbox-text">Industry Trends</span>
                  </label>

                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="webinars-notify__submit-btn">
                <svg className="webinars-notify__submit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                Notify Me When Live
                <svg className="webinars-notify__submit-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <p className="webinars-notify__disclaimer">
                No spam. Only webinar announcements.
              </p>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}

export default WebinarsNotify;
