import React from 'react';
import './webinars-explore.css';

function WebinarsExplore({ onNavigate }) {
  return (
    <section className="webinars-explore" aria-label="Explore other paths">
      <div className="webinars-explore__container">
        
        {/* Card 1: Online Courses */}
        <div className="webinars-explore__card">
          <div className="webinars-explore__copy">
            <span className="webinars-explore__eyebrow">Can't Wait?</span>
            <h3 className="webinars-explore__title">Start with our online courses</h3>
          </div>
          <button 
            className="webinars-explore__btn"
            onClick={() => {
              if (onNavigate) onNavigate('courses');
            }}
          >
            View Courses
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

        {/* Card 2: Residential Programmes */}
        <div className="webinars-explore__card">
          <div className="webinars-explore__copy">
            <span className="webinars-explore__eyebrow">Go Deeper</span>
            <h3 className="webinars-explore__title">Explore residential programmes</h3>
          </div>
          <button 
            className="webinars-explore__btn"
            onClick={() => {
              if (onNavigate) onNavigate('programmes');
            }}
          >
            View Programmes
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}

export default WebinarsExplore;
