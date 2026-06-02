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

          {/* Duration */}
          <div className="growthx-hero__meta-item">
            <div className="growthx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="growthx-hero__meta-text">
              <strong>30 Hours</strong>
              <span>Online Training</span>
            </div>
          </div>

          {/* Strategy */}
          <div className="growthx-hero__meta-item">
            <div className="growthx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <div className="growthx-hero__meta-text">
              <strong>Branding</strong>
              <span>& Content Strategy</span>
            </div>
          </div>

          {/* Projects */}
          <div className="growthx-hero__meta-item">
            <div className="growthx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div className="growthx-hero__meta-text">
              <strong>Real-World</strong>
              <span>Projects</span>
            </div>
          </div>

          {/* Specialization */}
          <div className="growthx-hero__meta-item">
            <div className="growthx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </div>
            <div className="growthx-hero__meta-text">
              <strong>Social Media</strong>
              <span>Management</span>
            </div>
          </div>

          {/* Marketing */}
          <div className="growthx-hero__meta-item">
            <div className="growthx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 7L13.5 15.5L8.5 10.5L2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            </div>
            <div className="growthx-hero__meta-text">
              <strong>Advertising</strong>
              <span>& Campaign Optimization</span>
            </div>
          </div>

          {/* Certification */}
          <div className="growthx-hero__meta-item">
            <div className="growthx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>
            <div className="growthx-hero__meta-text">
              <strong>Certification</strong>
              <span>Included</span>
            </div>
          </div>

          {/* AI Techniques */}
          <div className="growthx-hero__meta-item">
            <div className="growthx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
              </svg>
            </div>
            <div className="growthx-hero__meta-text">
              <strong>AI-Powered</strong>
              <span>Marketing</span>
            </div>
          </div>

          {/* Analytics */}
          <div className="growthx-hero__meta-item">
            <div className="growthx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <div className="growthx-hero__meta-text">
              <strong>Analysis</strong>
              <span>& Automation</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default GrowthXHero
