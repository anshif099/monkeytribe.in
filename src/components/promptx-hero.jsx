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
            The definitive course for professionals who want to harness the full
            power of AI. Learn to design prompts that produce expert-level
            results — every time.
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
          <div className="promptx-hero__meta-item">
            <div className="promptx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="promptx-hero__meta-text">
              <strong>8 Weeks</strong>
              <span>Duration</span>
            </div>
          </div>

          <div className="promptx-hero__meta-item">
            <div className="promptx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <div className="promptx-hero__meta-text">
              <strong>Online</strong>
              <span>Self-paced</span>
            </div>
          </div>

          <div className="promptx-hero__meta-item">
            <div className="promptx-hero__meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <div className="promptx-hero__meta-text">
              <strong>All Levels</strong>
              <span>Beginner to Pro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PromptXHero
