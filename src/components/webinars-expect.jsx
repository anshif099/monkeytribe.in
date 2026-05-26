import React from 'react';
import './webinars-expect.css';

function WebinarsExpect() {
  const features = [
    {
      id: 'live-sessions',
      title: 'Live Sessions',
      description: 'Real-time learning with expert facilitators — not pre-recorded content.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M23 7l-7 5 7 5V7z" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      )
    },
    {
      id: 'live-qa',
      title: 'Live Q&A',
      description: 'Ask questions directly and get answers from practitioners in the room.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      )
    },
    {
      id: 'community-access',
      title: 'Community Access',
      description: 'Connect with fellow professionals before, during, and after each session.',
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
      id: 'recorded-replays',
      title: 'Recorded Replays',
      description: "Can't make it live? Every registered attendee gets access to the replay.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    },
    {
      id: 'fully-online',
      title: 'Fully Online',
      description: 'Join from anywhere in the world — all you need is a browser.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>
      )
    },
    {
      id: 'practical-focus',
      title: 'Practical Focus',
      description: 'Every webinar is built around real tools, real workflows, and real results.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    }
  ];

  return (
    <section className="webinars-expect" aria-labelledby="webinars-expect-heading">
      <div className="webinars-expect__container">
        
        {/* Section Header */}
        <div className="webinars-expect__header">
          <span className="webinars-expect__eyebrow">What to expect</span>
          <h2 id="webinars-expect-heading" className="webinars-expect__heading">
            Not your average webinar.
          </h2>
        </div>

        {/* 3x2 Grid */}
        <div className="webinars-expect__grid">
          {features.map((feat) => (
            <div key={feat.id} className="webinars-expect__card">
              <div className="webinars-expect__icon-wrapper" aria-hidden="true">
                {feat.icon}
              </div>
              <h3 className="webinars-expect__card-title">{feat.title}</h3>
              <p className="webinars-expect__card-desc">{feat.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WebinarsExpect;
