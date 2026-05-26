import './ai-journey.css'

const journeyLinks = [
  {
    key: 'prompt',
    label: 'PromptX',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l1.8 5.3L19 10l-5.2 1.7L12 17l-1.8-5.3L5 10l5.2-1.7L12 3z" />
        <path d="M5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15z" />
      </svg>
    ),
  },
  {
    key: 'growth',
    label: 'GrowthX',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 16l5-5 4 4 7-8" />
        <path d="M14 7h6v6" />
      </svg>
    ),
  },
  {
    key: 'brand',
    label: 'BrandX',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l8 4-8 4-8-4 8-4z" />
        <path d="M4 12l8 4 8-4" />
        <path d="M4 17l8 4 8-4" />
      </svg>
    ),
  },
  {
    key: 'copy',
    label: 'CopyCraft',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 4l10 5-4 3-3 7L6 7l2-3z" />
        <path d="M8 4l3 8 7-3" />
      </svg>
    ),
  },
]

function AiJourney({ onNavigate }) {
  return (
    <section className="ai-journey">
      <div className="ai-journey__target" aria-hidden="true"></div>

      <div className="ai-journey__inner footer-container">
        <h2>
          Your AI journey
          <span>starts here.</span>
        </h2>

        <div className="ai-journey__content">
          <p>
            Join hundreds of professionals already learning with Monkey Tribe.
            Choose your course and take the first step toward AI mastery.
          </p>

          <div className="ai-journey__actions" aria-label="Choose a course">
            {journeyLinks.map((link) => (
              <a
                className={`ai-journey__button ai-journey__button--${link.key}`}
                href={['prompt', 'growth', 'brand', 'copy'].includes(link.key) ? '#' : '#courses'}
                onClick={(e) => {
                  if (link.key === 'prompt') {
                    e.preventDefault();
                    if (onNavigate) onNavigate('promptx');
                  } else if (link.key === 'growth') {
                    e.preventDefault();
                    if (onNavigate) onNavigate('growthx');
                  } else if (link.key === 'brand') {
                    e.preventDefault();
                    if (onNavigate) onNavigate('brandx');
                  } else if (link.key === 'copy') {
                    e.preventDefault();
                    if (onNavigate) onNavigate('copycraft');
                  }
                }}
                key={link.key}
              >
                {link.icon}
                <span>{link.label}</span>
                <svg className="ai-journey__arrow" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h13" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AiJourney
