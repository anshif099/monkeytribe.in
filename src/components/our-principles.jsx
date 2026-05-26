import React from 'react';
import './our-principles.css';

function OurPrinciples() {
  const principles = [
    {
      id: 'principle-practitioner',
      title: 'Practitioner-Led',
      desc: 'Every course is built and taught by professionals actively using AI in real campaigns, briefs, and business problems — not just academics.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )
    },
    {
      id: 'principle-outcome',
      title: 'Outcome-Focused',
      desc: 'We measure success by what you can do after the course, not what you know. Every module is designed around real-world application.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <line x1="9" y1="18" x2="15" y2="18" />
          <line x1="10" y1="22" x2="14" y2="22" />
        </svg>
      )
    },
    {
      id: 'principle-community',
      title: 'Community-Driven',
      desc: 'Learning is better together. Monkey Tribe students join a growing community of AI-fluent professionals across industries.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      id: 'principle-evolving',
      title: 'Constantly Evolving',
      desc: 'AI moves fast. Our curriculum is updated continuously to reflect the latest tools, models, and best practices — always current, never stale.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      )
    }
  ];

  return (
    <section className="our-principles" aria-labelledby="our-principles-heading">
      <div className="our-principles__container">
        
        {/* Header Block */}
        <div className="our-principles__header">
          <span className="our-principles__eyebrow">WHAT WE STAND FOR</span>
          <h2 id="our-principles-heading" className="our-principles__title">
            Our principles.
          </h2>
        </div>

        {/* 2x2 Grid of Cards */}
        <div className="our-principles__grid">
          {principles.map((p) => (
            <div key={p.id} className="our-principles__card">
              <div className="our-principles__card-icon" aria-hidden="true">
                {p.icon}
              </div>
              <h3 className="our-principles__card-title">{p.title}</h3>
              <p className="our-principles__card-desc">{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default OurPrinciples;
