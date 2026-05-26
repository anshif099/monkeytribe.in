import './brandx-hero.css'

function BrandXHero() {
  return (
    <section className="brandx-hero">
      <div className="brandx-hero__container">
        <div className="brandx-hero__content">
          <div className="brandx-hero__eyebrow">
            <svg viewBox="0 0 24 24" className="brandx-hero__layers" aria-hidden="true">
              <path d="M12 3l8 4-8 4-8-4 8-4z" />
              <path d="M4 12l8 4 8-4" />
              <path d="M4 17l8 4 8-4" />
            </svg>
            <span>BRANDX</span>
          </div>

          <h1>
            <span>Brand Builder</span>
            <span className="accent">Pro.</span>
          </h1>

          <p className="brandx-hero__description">
            Learn how to build a brand from scratch — positioning,
            identity, storytelling, and audience connection.
          </p>

          <p className="brandx-hero__sub-description">
            The complete brand-building playbook for the modern era. Built by
            advertising professionals, for anyone who wants to create brands
            that last.
          </p>

          <div className="brandx-hero__actions">
            <button
              className="brandx-hero__btn-enrol"
              onClick={() => {
                document.getElementById('enrol-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Enrol Now</span>
              <svg className="brandx-hero__arrow" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h13" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </button>
            <a href="#curriculum" className="brandx-hero__link-curriculum">
              View Curriculum &darr;
            </a>
          </div>
        </div>
      </div>

      <div className="brandx-hero__meta-bar">
        <div className="brandx-hero__meta-container">
          <div className="brandx-hero__meta-item">
            <div className="brandx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="brandx-hero__meta-text">
              <strong>8 Weeks</strong>
              <span>Duration</span>
            </div>
          </div>

          <div className="brandx-hero__meta-item">
            <div className="brandx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <div className="brandx-hero__meta-text">
              <strong>Online, Self-paced</strong>
              <span>Structure</span>
            </div>
          </div>

          <div className="brandx-hero__meta-item">
            <div className="brandx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <div className="brandx-hero__meta-text">
              <strong>Beginner to Advanced</strong>
              <span>Skill Level</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrandXHero
