import './programmes-hero.css'

function ProgrammesHero() {
  return (
    <section className="programmes-hero" aria-label="Residential Programmes Hero">

      {/* ── Main body content ── */}
      <div className="programmes-hero__body">

        {/* Eyebrow badge */}
        <div className="programmes-hero__badge">
          <span className="programmes-hero__badge-dot" aria-hidden="true" />
          <span className="programmes-hero__badge-text">Residential Programmes</span>
        </div>

        {/* Headline */}
        <h1 className="programmes-hero__title">
          Learn deeply.<br />
          <span className="programmes-hero__title-accent">Away from the noise.</span>
        </h1>

        {/* Description */}
        <p className="programmes-hero__desc">
          Immersive multi-day residential programmes designed for professionals who want to go beyond the basics — in curated environments built for focus, learning, and transformation.
        </p>

        {/* CTA buttons */}
        <div className="programmes-hero__ctas">
          <a href="#" className="programmes-hero__btn-primary">
            View Programmes
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          <a href="#" className="programmes-hero__btn-secondary">
            {/* Bell icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            Join Waitlist
          </a>
        </div>
      </div>

      {/* ── Feature strip ── */}
      <div className="programmes-hero__strip">
        <div className="programmes-hero__strip-inner">

          {/* Curated Venues */}
          <div className="programmes-hero__feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="programmes-hero__feature-text">Curated Venues</span>
          </div>

          {/* High-Speed Wi-Fi */}
          <div className="programmes-hero__feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
            <span className="programmes-hero__feature-text">High-Speed Wi-Fi</span>
          </div>

          {/* All Materials Included */}
          <div className="programmes-hero__feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
            <span className="programmes-hero__feature-text">All Materials Included</span>
          </div>

          {/* Meals & Refreshments */}
          <div className="programmes-hero__feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
            <span className="programmes-hero__feature-text">Meals &amp; Refreshments</span>
          </div>

          {/* Small Group Sizes */}
          <div className="programmes-hero__feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="programmes-hero__feature-text">Small Group Sizes</span>
          </div>

          {/* Expert Facilitators */}
          <div className="programmes-hero__feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="programmes-hero__feature-text">Expert Facilitators</span>
          </div>

        </div>
      </div>

    </section>
  )
}

export default ProgrammesHero
