import './comingsoon.css'

const upcomingItems = [
  {
    type: 'Residential',
    title: 'AI Immersion Retreats',
    description:
      'Intensive multi-day residential programmes designed for deep, distraction-free learning in curated environments.',
  },
  {
    type: 'Webinar',
    title: 'Live Expert Sessions',
    description:
      'Monthly live webinars with industry practitioners — real-world AI applications, Q&A, and community learning.',
  },
  {
    type: 'Workshop',
    title: 'Corporate AI Workshops',
    description:
      'Tailored in-house training for teams and organisations ready to integrate AI into their workflows.',
  },
]

function ComingSoon() {
  return (
    <section className="coming-soon">
      <div className="coming-soon__inner footer-container">
        <div className="coming-soon__intro">
          <p className="coming-soon__pill">Coming Soon</p>
          <h2>
            What&apos;s next at
            <span>Monkey Tribe.</span>
          </h2>
        </div>

        <div className="coming-soon__cards">
          {upcomingItems.map((item) => (
            <article className="coming-soon-card" key={item.title}>
              <span>{item.type}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>

        <form className="coming-soon__form">
          <label htmlFor="coming-soon-email">Be the first to know when new programmes launch.</label>
          <div className="coming-soon__controls">
            <input id="coming-soon-email" type="email" placeholder="Enter your email" />
            <button type="submit">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
                <path d="M10 19a2 2 0 0 0 4 0" />
              </svg>
              Notify Me
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ComingSoon
