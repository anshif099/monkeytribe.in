import React from 'react';
import './webinars-topics.css';

function WebinarsTopics() {
  const topics = [
    {
      id: 'prompt-marketing',
      title: 'Prompt Engineering for Marketers',
      description: 'How to write prompts that produce campaign-ready copy, briefs, and creative concepts — every time.',
      series: 'PromptX Series',
      seriesType: 'promptx',
      footerText: 'Date TBA — Register to be notified',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )
    },
    {
      id: 'ai-social',
      title: 'AI-Powered Social Media Strategy',
      description: 'Build a full month of social content in a single session using AI tools and smart workflows.',
      series: 'GrowthX Series',
      seriesType: 'growthx',
      footerText: 'Date TBA — Register to be notified',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    },
    {
      id: 'campaign-analytics',
      title: 'Using AI for Campaign Analytics',
      description: 'Turn raw data into actionable insights faster than ever — live walkthrough with real campaign data.',
      series: 'GrowthX Series',
      seriesType: 'growthx',
      footerText: 'Date TBA — Register to be notified',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      id: 'prompt-chains',
      title: 'Advanced Prompt Chains & Agents',
      description: 'Go beyond single prompts — build multi-step AI workflows that automate complex creative tasks.',
      series: 'PromptX Series',
      seriesType: 'promptx',
      footerText: 'Date TBA — Register to be notified',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      )
    },
    {
      id: 'brand-strategy',
      title: 'AI for Brand Strategy',
      description: 'How to use AI for audience research, positioning, and competitive intelligence without losing the human edge.',
      series: 'Strategy Series',
      seriesType: 'strategy',
      footerText: 'Date TBA — Register to be notified',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
        </svg>
      )
    },
    {
      id: 'advertising-future',
      title: 'The Future of AI in Advertising',
      description: 'A live panel with industry practitioners on where AI is taking the advertising and marketing profession.',
      series: 'Industry Series',
      seriesType: 'industry',
      footerText: 'Date TBA — Register to be notified',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    }
  ];

  return (
    <section className="webinars-topics" aria-labelledby="webinars-topics-heading">
      <div className="webinars-topics__container">

        {/* Section Header */}
        <div className="webinars-topics__header">
          <span className="webinars-topics__eyebrow">Planned Topics</span>
          <h2 id="webinars-topics-heading" className="webinars-topics__heading">
            Sessions we're building.
          </h2>
          <p className="webinars-topics__desc">
            Here's a preview of what's coming. Register below to be notified when each session goes live.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="webinars-topics__grid">
          {topics.map((topic) => (
            <article key={topic.id} className="webinars-topics__card">
              
              {/* Card Header row: Icon & Badge */}
              <div className="webinars-topics__card-header">
                <div className="webinars-topics__icon-wrapper" aria-hidden="true">
                  {topic.icon}
                </div>
                <span className={`webinars-topics__badge webinars-topics__badge--${topic.seriesType}`}>
                  {topic.series}
                </span>
              </div>

              {/* Card Main Content */}
              <h3 className="webinars-topics__card-title">{topic.title}</h3>
              <p className="webinars-topics__card-desc">{topic.description}</p>

              {/* Card Footer */}
              <div className="webinars-topics__card-footer">
                <span className="webinars-topics__footer-dot" aria-hidden="true"></span>
                <span className="webinars-topics__footer-text">{topic.footerText}</span>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WebinarsTopics;
