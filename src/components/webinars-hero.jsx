import './webinars-hero.css'

function WebinarsHero() {
  return (
    <section className="webinars-hero" aria-label="Webinars Hero">
      {/* Grid texture */}
      <div className="webinars-hero__grid" aria-hidden="true" />

      <div className="webinars-hero__container">

        {/* ── Left: copy ── */}
        <div className="webinars-hero__left">

          {/* Coming Soon badge */}
          <div className="webinars-hero__badge">
            <span className="webinars-hero__badge-dot" aria-hidden="true" />
            <span className="webinars-hero__badge-text">Coming Soon</span>
          </div>

          {/* Heading */}
          <h1 className="webinars-hero__heading">
            Live expert<br />webinars.<br />
            <span className="webinars-hero__heading-accent">Coming soon.</span>
          </h1>

          {/* Description */}
          <p className="webinars-hero__desc">
            Monthly live sessions with AI practitioners — real-world applications, deep dives, and open Q&amp;A. Built for professionals who want to stay ahead.
          </p>

          {/* Notify button */}
          <a 
            href="#webinars-notify" 
            className="webinars-hero__btn"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('webinars-notify')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            Notify Me When Live
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* ── Right: webinar preview card ── */}
        <div className="webinars-hero__card" role="complementary" aria-label="Next Webinar Preview">

          {/* Card top */}
          <div className="webinars-hero__card-top">
            <div className="webinars-hero__card-label">
              <div className="webinars-hero__card-icon">
                {/* Video / play icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <div className="webinars-hero__card-label-text">
                <span className="webinars-hero__card-label-title">Next Webinar</span>
                <span className="webinars-hero__card-label-sub">Date TBA</span>
              </div>
            </div>
            <span className="webinars-hero__card-status">Upcoming</span>
          </div>

          {/* Card body */}
          <h2 className="webinars-hero__card-title">
            Prompt Engineering for Marketers
          </h2>
          <p className="webinars-hero__card-desc">
            How to write prompts that produce campaign-ready copy, briefs, and creative concepts — every time.
          </p>

          {/* Meta info */}
          <div className="webinars-hero__card-meta">
            <div className="webinars-hero__card-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              90 Minutes
            </div>
            <div className="webinars-hero__card-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
              Live Online
            </div>
            <div className="webinars-hero__card-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Limited Seats
            </div>
          </div>

          <hr className="webinars-hero__card-divider" />

          {/* Footer: avatars + registration text */}
          <div className="webinars-hero__card-footer">
            <div className="webinars-hero__avatars" aria-label="Registered attendees">
              {['A', 'B', 'C', 'D'].map((letter) => (
                <div key={letter} className="webinars-hero__avatar">{letter}</div>
              ))}
              <div className="webinars-hero__avatar webinars-hero__avatar--plus">+</div>
            </div>
            <span className="webinars-hero__reg-text">Registrations open soon</span>
          </div>

        </div>
      </div>
    </section>
  )
}

export default WebinarsHero
