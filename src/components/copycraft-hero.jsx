import './copycraft-hero.css'

function CopyCraftHero() {
  return (
    <section className="copycraft-hero">
      <div className="copycraft-hero__container">
        <div className="copycraft-hero__content">
          <div className="copycraft-hero__eyebrow">
            <svg viewBox="0 0 24 24" className="copycraft-hero__layers" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span>COPYCRAFT</span>
          </div>

          <h1>
            <span>CopyCraft</span>
            <span className="accent">Mastery.</span>
          </h1>

          <p className="copycraft-hero__description">
            Not just a writing course. A complete creative communication program.
          </p>

          <p className="copycraft-hero__sub-description">
            Designed to transform ordinary thinkers into persuasive storytellers and
            modern advertisers. Learn how brands speak, how ads influence people,
            and how powerful copy can build businesses in the digital era.
          </p>

          <div className="copycraft-hero__actions">
            <button
              className="copycraft-hero__btn-enrol"
              onClick={() => {
                // Future scroll to enrol section
                document.getElementById('enrol-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Enrol Now</span>
              <svg className="copycraft-hero__arrow" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h13" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </button>
            <a href="#curriculum" className="copycraft-hero__link-curriculum">
              View Curriculum &darr;
            </a>
          </div>
        </div>
      </div>

      <div className="copycraft-hero__meta-bar">
        <div className="copycraft-hero__meta-container">
          <div className="copycraft-hero__meta-item">
            <div className="copycraft-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="copycraft-hero__meta-text">
              <strong>10 Weeks</strong>
              <span>Duration</span>
            </div>
          </div>

          <div className="copycraft-hero__meta-item">
            <div className="copycraft-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <div className="copycraft-hero__meta-text">
              <strong>Online, Self-paced</strong>
              <span>Structure</span>
            </div>
          </div>

          <div className="copycraft-hero__meta-item">
            <div className="copycraft-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <div className="copycraft-hero__meta-text">
              <strong>Beginner to Advanced</strong>
              <span>Skill Level</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CopyCraftHero
