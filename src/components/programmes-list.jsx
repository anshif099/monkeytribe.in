import './programmes-list.css'

/* ── SVG icon helpers ── */
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const GroupIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const FormatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

/* ── Programme data ── */
const PROGRAMMES = [
  {
    id: 'flagship',
    badge: 'Flagship',
    badgeVariant: 'flagship',
    title: 'AI Immersion Retreat',
    subtitle: '3-Day Residential Programme',
    desc: 'A fully immersive, distraction-free residential experience designed for deep AI learning. Step away from the everyday and spend three focused days mastering AI tools, workflows, and strategy — surrounded by like-minded professionals.',
    statusDot: 'yellow',
    statusText: 'Dates Announced Soon',
    details: [
      { icon: <ClockIcon />, label: 'Duration', value: '3 Days / 2 Nights' },
      { icon: <GroupIcon />, label: 'Group Size', value: 'Max 20 Participants' },
      { icon: <LocationIcon />, label: 'Location', value: 'Curated Retreat Venues, India' },
      { icon: <FormatIcon />, label: 'Format', value: 'Residential — All Inclusive' },
    ],
    included: [
      'Hands-on PromptX & GrowthX workshops',
      'Live AI workflow building sessions',
      'Expert-led masterclasses each evening',
      'Peer learning and networking',
      'Personalised AI strategy session',
      'Post-retreat community access',
    ],
    ctaLabel: 'Join Waitlist',
  },
  {
    id: 'executive',
    badge: 'Executive',
    badgeVariant: 'executive',
    title: 'AI Leadership Intensive',
    subtitle: '5-Day Executive Programme',
    desc: 'Designed for senior professionals and business leaders who need to understand AI at a strategic level. This intensive residential programme covers AI adoption, team transformation, and competitive positioning in the AI era.',
    statusDot: 'yellow',
    statusText: 'Coming Q3 2025',
    details: [
      { icon: <ClockIcon />, label: 'Duration', value: '5 Days / 4 Nights' },
      { icon: <GroupIcon />, label: 'Group Size', value: 'Max 12 Participants' },
      { icon: <LocationIcon />, label: 'Location', value: 'Premium Venue, India' },
      { icon: <FormatIcon />, label: 'Format', value: 'Residential — All Inclusive' },
    ],
    included: [
      'AI strategy for business leaders',
      'Building AI-ready teams',
      'Case studies from real campaigns',
      'One-on-one advisory sessions',
      'AI tools evaluation framework',
      'Lifetime alumni network access',
    ],
    ctaLabel: 'Join Waitlist',
  },
  {
    id: 'corporate',
    badge: 'Corporate',
    badgeVariant: 'corporate',
    title: 'Corporate AI Training',
    subtitle: 'Custom In-House Programme',
    desc: 'Bring Monkey Tribe training directly to your organisation. We design and deliver bespoke AI training programmes tailored to your team\'s goals, tools, and industry — at your premises or at a venue of your choice.',
    statusDot: 'green',
    statusText: 'Available Now',
    details: [
      { icon: <ClockIcon />, label: 'Duration', value: 'Customisable (1–5 Days)' },
      { icon: <GroupIcon />, label: 'Group Size', value: 'Teams of 10–100+' },
      { icon: <LocationIcon />, label: 'Location', value: 'Your Premises or Chosen Venue' },
      { icon: <FormatIcon />, label: 'Format', value: 'In-House or Residential' },
    ],
    included: [
      'Fully customised curriculum',
      'Industry-specific AI applications',
      'Hands-on tool training',
      'Pre and post assessments',
      'Ongoing support package',
      'Dedicated account manager',
    ],
    ctaLabel: 'Enquire Now',
  },
]

function ProgrammesList() {
  return (
    <section className="prog-list" aria-label="Our Programmes">
      <div className="prog-list__container">

        {/* Section header */}
        <div className="prog-list__header">
          <span className="prog-list__eyebrow">Our Programmes</span>
          <h2 className="prog-list__heading">
            Three ways to learn<br />in person.
          </h2>
        </div>

        {/* Programme rows */}
        <div className="prog-list__rows">
          {PROGRAMMES.map((prog) => (
            <article key={prog.id} className="prog-row">

              {/* ── Col 1: Card ── */}
              <div className="prog-row__card">
                <span className={`prog-row__badge prog-row__badge--${prog.badgeVariant}`}>
                  {prog.badge}
                </span>

                <h3 className="prog-row__title">{prog.title}</h3>
                <p className="prog-row__subtitle">{prog.subtitle}</p>
                <p className="prog-row__desc">{prog.desc}</p>

                <div className="prog-row__status">
                  <span className={`prog-row__status-dot prog-row__status-dot--${prog.statusDot}`} />
                  {prog.statusText}
                </div>
              </div>

              {/* ── Col 2: Programme Details ── */}
              <div className="prog-row__details">
                <span className="prog-row__col-heading">Programme Details</span>
                <ul className="prog-row__detail-list">
                  {prog.details.map((detail) => (
                    <li key={detail.label} className="prog-row__detail-item">
                      <span className="prog-row__detail-icon">{detail.icon}</span>
                      <span className="prog-row__detail-text">
                        <span className="prog-row__detail-label">{detail.label}</span>
                        <span className="prog-row__detail-value">{detail.value}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Col 3: What's Included ── */}
              <div className="prog-row__included">
                <span className="prog-row__col-heading">What's Included</span>
                <ul className="prog-row__included-list">
                  {prog.included.map((item) => (
                    <li key={item} className="prog-row__included-item">
                      <span className="prog-row__included-dot" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  className="prog-row__cta"
                  onClick={() => {
                    const el = document.getElementById('programmes-waitlist')
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                >
                  {prog.ctaLabel}
                  <ArrowIcon />
                </button>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ProgrammesList
