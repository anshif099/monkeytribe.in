import './promptx-hero.css'

function PromptXHero() {
  return (
    <section className="promptx-hero">
      <div className="promptx-hero__container">
        <div className="promptx-hero__content">
          <div className="promptx-hero__eyebrow">
            <svg viewBox="0 0 24 24" className="promptx-hero__sparkle" aria-hidden="true">
              <path d="M12 3l1.8 5.3L19 10l-5.2 1.7L12 17l-1.8-5.3L5 10l5.2-1.7L12 3z" />
              <path d="M5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15z" />
            </svg>
            <span>PROMPTX</span>
          </div>

          <h1>
            <span>AI Prompt</span>
            <span>Engineering</span>
            <span className="accent">Mastery.</span>
          </h1>

          <p className="promptx-hero__description">
            A practical AI prompt engineering course in Kerala for professionals
            who want to harness the full power of AI. Learn to design prompts
            that produce expert-level results every time.
          </p>

          <div className="promptx-hero__actions">
            <button
              className="promptx-hero__btn-enrol"
              onClick={() => {
                document.getElementById('enrol-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Enrol in PromptX</span>
              <svg className="promptx-hero__arrow" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h13" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </button>
            <a href="#curriculum" className="promptx-hero__link-curriculum">
              View Curriculum
            </a>
          </div>
        </div>
      </div>

      <div className="promptx-hero__meta-bar">
        <div className="promptx-hero__meta-container">

          {/* Duration */}
          <div className="promptx-hero__meta-item">
            <div className="promptx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="promptx-hero__meta-text">
              <strong>30 Hours</strong>
              <span>Intensive Training</span>
            </div>
          </div>

          {/* Modules */}
          <div className="promptx-hero__meta-item">
            <div className="promptx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <div className="promptx-hero__meta-text">
              <strong>10 Modules</strong>
              <span>Practical Modules</span>
            </div>
          </div>

          {/* Applications */}
          <div className="promptx-hero__meta-item">
            <div className="promptx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
              </svg>
            </div>
            <div className="promptx-hero__meta-text">
              <strong>Real-World</strong>
              <span>AI Applications</span>
            </div>
          </div>

          {/* Practice */}
          <div className="promptx-hero__meta-item">
            <div className="promptx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <div className="promptx-hero__meta-text">
              <strong>Hands-on</strong>
              <span>Exercises</span>
            </div>
          </div>

          {/* Learning */}
          <div className="promptx-hero__meta-item">
            <div className="promptx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div className="promptx-hero__meta-text">
              <strong>Industry</strong>
              <span>Oriented Learning</span>
            </div>
          </div>

          {/* Certification */}
          <div className="promptx-hero__meta-item">
            <div className="promptx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>
            <div className="promptx-hero__meta-text">
              <strong>Certification</strong>
              <span>Included</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default PromptXHero
