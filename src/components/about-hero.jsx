import React from 'react';
import './about-hero.css';

function AboutHero() {
  const stats = [
    {
      id: 'stat-courses',
      value: '2',
      label: 'Flagship Courses'
    },
    {
      id: 'stat-experience',
      value: '10+',
      label: 'Years of Agency Experience'
    },
    {
      id: 'stat-trained',
      value: '100+',
      label: 'Professionals Trained'
    },
    {
      id: 'stat-possibilities',
      value: '∞',
      label: 'Possibilities with AI'
    }
  ];

  return (
    <section className="about-hero" aria-labelledby="about-hero-heading">
      
      {/* Grid overlay texture */}
      <div className="about-hero__grid-overlay" aria-hidden="true" />

      <div className="about-hero__container">
        
        {/* Left Side: Copy Description */}
        <div className="about-hero__left">
          <span className="about-hero__eyebrow">About Us</span>
          <h1 id="about-hero-heading" className="about-hero__heading">
            Where advertising<br />
            meets the <span className="about-hero__heading-accent">AI era.</span>
          </h1>
          <p className="about-hero__desc">
            Monkey Tribe was built because we saw a gap — professionals who needed to understand AI not in theory, but in practice. So we built the courses we wished existed.
          </p>
        </div>

        {/* Right Side: 2x2 Glassmorphic Stats Grid */}
        <div className="about-hero__right" role="region" aria-label="Key statistics">
          <div className="about-hero__stats-grid">
            {stats.map((stat) => (
              <div key={stat.id} className="about-hero__stat-card">
                <span className="about-hero__stat-value">{stat.value}</span>
                <span className="about-hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutHero;
