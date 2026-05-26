import React from 'react';
import './about-cta.css';

function AboutCTA({ onNavigate }) {
  return (
    <section className="about-cta" aria-labelledby="about-cta-heading">
      
      {/* Concentric rings background graphic on the right */}
      <div className="about-cta__decor" aria-hidden="true">
        <div className="about-cta__decor-ring about-cta__decor-ring--1" />
        <div className="about-cta__decor-ring about-cta__decor-ring--2" />
        <div className="about-cta__decor-ring about-cta__decor-ring--3" />
      </div>

      <div className="about-cta__container">
        
        {/* Left Column: Heading */}
        <div className="about-cta__left">
          <h2 id="about-cta-heading" className="about-cta__heading">
            Ready to learn<br />
            with us?
          </h2>
        </div>

        {/* Right Column: Copy & Actions */}
        <div className="about-cta__right">
          <p className="about-cta__text">
            Explore our flagship AI courses and take the first step toward becoming an AI-fluent professional.
          </p>
          
          <div className="about-cta__actions">
            <button 
              className="about-cta__btn about-cta__btn--promptx"
              onClick={() => onNavigate && onNavigate('promptx')}
            >
              <svg className="about-cta__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l1.8 5.3L19 10l-5.2 1.7L12 17l-1.8-5.3L5 10l5.2-1.7L12 3z" />
                <path d="M5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15z" />
              </svg>
              <span>PromptX →</span>
            </button>

            <button 
              className="about-cta__btn about-cta__btn--growthx"
              onClick={() => onNavigate && onNavigate('growthx')}
            >
              <svg className="about-cta__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 7L13.5 15.5L8.5 10.5L2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
              <span>GrowthX →</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutCTA;
