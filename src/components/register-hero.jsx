import React from 'react';
import './register-hero.css';

function RegisterHero() {
  return (
    <section className="register-hero" aria-labelledby="register-hero-heading">
      
      {/* Grid overlay texture */}
      <div className="register-hero__grid-overlay" aria-hidden="true" />

      <div className="register-hero__container">
        {/* Secure Enrolment Badge Pill */}
        <div className="register-hero__eyebrow-wrapper">
          <div className="register-hero__pill">
            <span className="register-hero__bullet">•</span>
            <span className="register-hero__pill-text">SECURE ENROLMENT</span>
          </div>
        </div>

        {/* Heading & Subtext */}
        <h1 id="register-hero-heading" className="register-hero__title">
          Register for a Course
        </h1>
        <p className="register-hero__desc">
          Three simple steps — choose your course, share your details, and complete payment online.
        </p>
      </div>

    </section>
  );
}

export default RegisterHero;
