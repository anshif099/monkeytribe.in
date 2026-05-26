import './growthx-hero.css'

function GrowthXHero() {
  return (
    <section className="growthx-hero">
      <div className="growthx-hero__container">
        <div className="growthx-hero__content">
          <div className="growthx-hero__eyebrow">
            <svg viewBox="0 0 24 24" className="growthx-hero__trend" aria-hidden="true">
              <path d="M4 16l5-5 4 4 7-8" />
              <path d="M14 7h6v6" />
            </svg>
            <span>GROWTHX</span>
          </div>

          <h1>
            <span>AI Digital</span>
            <span>Marketing</span>
            <span className="accent">Mastery.</span>
          </h1>

          <p className="growthx-hero__description">
            The complete AI marketing course for professionals who want to
            grow brands faster, smarter, and with less effort. Built by
            marketers, for marketers.
          </p>

          <div className="growthx-hero__actions">
            <button
              className="growthx-hero__btn-enrol"
              onClick={() => {
                document.getElementById('enrol-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Enrol in GrowthX</span>
              <svg className="growthx-hero__arrow" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h13" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </button>
            <a href="#curriculum" className="growthx-hero__link-curriculum">
              View Curriculum
            </a>
          </div>
        </div>
      </div>

      <div className="growthx-hero__meta-bar">
        <div className="growthx-hero__meta-container">
          <div className="growthx-hero__meta-item">
            <div className="growthx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="growthx-hero__meta-text">
              <strong>10 Weeks</strong>
              <span>Duration</span>
            </div>
          </div>

          <div className="growthx-hero__meta-item">
            <div className="growthx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <div className="growthx-hero__meta-text">
              <strong>Online</strong>
              <span>Self-paced</span>
            </div>
          </div>

          <div className="growthx-hero__meta-item">
            <div className="growthx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <div className="growthx-hero__meta-text">
              <strong>All Levels</strong>
              <span>Beginner to Pro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GrowthXHero
