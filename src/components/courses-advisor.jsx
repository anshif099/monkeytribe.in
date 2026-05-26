import './courses-advisor.css'

function CoursesAdvisor({ onNavigate }) {
  return (
    <section className="courses-advisor-section">
      <div className="courses-advisor-container">
        <h2 className="courses-advisor__title">Not sure which course to pick?</h2>
        <p className="courses-advisor__desc">
          All courses are designed for professionals at all levels.<br />
          Start with the one that matches your immediate goal.
        </p>
        <a
          className="courses-advisor__btn"
          href="#"
          onClick={(e) => {
            e.preventDefault()
            if (onNavigate) onNavigate('contact')
          }}
        >
          <span>Talk to an Advisor</span>
          <svg className="courses-advisor__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </section>
  )
}

export default CoursesAdvisor
