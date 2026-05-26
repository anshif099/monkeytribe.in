import './programmes-online-cta.css'

function ProgrammesOnlineCta({ onNavigate }) {
  return (
    <div className="prog-online-cta">
      <div className="prog-online-cta__container">

        {/* Left: copy */}
        <div className="prog-online-cta__copy">
          <span className="prog-online-cta__eyebrow">Can't wait for a residential?</span>
          <p className="prog-online-cta__text">Start with our online courses today.</p>
        </div>

        {/* Right: CTA button → navigates to Courses page */}
        <button
          className="prog-online-cta__btn"
          onClick={() => {
            if (onNavigate) onNavigate('courses')
          }}
        >
          Explore Online Courses
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

      </div>
    </div>
  )
}

export default ProgrammesOnlineCta
