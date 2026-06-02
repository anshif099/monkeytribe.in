import './courses-list.css'

const coursesData = [
  {
    key: 'promptx',
    label: 'PROMPTX',
    title: 'AI Prompt Engineering Mastery',
    description: 'A comprehensive 30-hours course to Master Prompt Engineering and AI interaction techniques, learn to communicate effectively with AI tools to boost productivity, creativity, research, automation, content generation, and business workflows.',
    features: [
      'Master Prompt Engineering',
      'Communicate Effectively with AI',
      'Enhance Productivity & Creativity',
      'Automate Workflows & Business Tasks',
    ],
    details: [
      { label: 'DURATION',        value: '30 Hours Intensive Training' },
      { label: 'MODULES',         value: '10 Practical Modules' },
      { label: 'APPLICATIONS',    value: 'Real-World AI Applications' },
      { label: 'PRACTICE',        value: 'Hands-on Exercises' },
      { label: 'LEARNING',        value: 'Industry-Oriented Learning' },
      { label: 'CERTIFICATION',   value: 'Certification Included' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.8 5.3L19 10l-5.2 1.7L12 17l-1.8-5.3L5 10l5.2-1.7L12 3z" />
        <path d="M5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15z" />
      </svg>
    ),
  },
  {
    key: 'growthx',
    label: 'GROWTHX',
    title: 'AI Digital Marketing Mastery',
    description: 'A specialized 30-hours course in AI-integrated Digital Marketing with a strong focus on Social Media Management. Learn to build powerful digital strategies using AI tools, creativity, analytics, automation, and audience insights.',
    features: [
      'AI-Powered Digital Marketing',
      'Social Media Management Skills',
      'Data-Driven Strategy & Analytics',
      'Automation & Audience Growth Techniques',
    ],
    details: [
      { label: 'DURATION',       value: '30 Hours Online Training' },
      { label: 'STRATEGY',       value: 'Branding & Content Strategy' },
      { label: 'PROJECTS',       value: 'Real-World Projects' },
      { label: 'SPECIALIZATION', value: 'Social Media Management' },
      { label: 'MARKETING',      value: 'Advertising & Campaign Optimization' },
      { label: 'CERTIFICATION',  value: 'Certification Included' },
      { label: 'AI TECHNIQUES',  value: 'AI-Powered Marketing' },
      { label: 'ANALYTICS',      value: 'Analysis & Automation' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 7L13.5 15.5L8.5 10.5L2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    key: 'brandx',
    label: 'BRANDX',
    title: 'Brand Builder Pro',
    description: 'Learn how to build a brand from scratch — positioning, identity, storytelling, and audience connection. The complete brand-building playbook for the modern era.',
    features: [
      'Define brand positioning & purpose',
      'Build a compelling visual identity',
      'Craft a brand story that resonates',
      'Connect deeply with your audience',
    ],
    details: [
      { label: 'DURATION', value: '8 Weeks' },
      { label: 'FORMAT',   value: 'Online, Self-paced' },
      { label: 'LEVEL',    value: 'Beginner to Advanced' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    key: 'copycraft',
    label: 'COPYCRAFT',
    title: 'CopyCraft Mastery',
    description: 'A complete creative communication program designed to transform ordinary thinkers into persuasive storytellers and modern advertisers. Master the psychology, creativity, and AI-powered techniques behind modern copywriting.',
    features: [
      'Write high-converting ad copy',
      'Master storytelling for brands',
      'Understand consumer psychology',
      'Create social & digital campaigns',
    ],
    details: [
      { label: 'DURATION', value: '10 Weeks' },
      { label: 'FORMAT',   value: 'Online, Self-paced' },
      { label: 'LEVEL',    value: 'Beginner to Advanced' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
]

function CoursesList({ onNavigate }) {
  return (
    <section className="courses-list-section">
      <div className="courses-list-section__container">
        {coursesData.map((course) => (
          <div className={`courses-list-card courses-list-card--${course.key}`} key={course.key}>
            
            {/* Column 1: Brand Info */}
            <div className="courses-list-card__col courses-list-card__col--brand">
              <div className="courses-list-card__icon-box">
                {course.icon}
              </div>
              <span className="courses-list-card__label">{course.label}</span>
              <h3 className="courses-list-card__title">{course.title}</h3>
              <p className="courses-list-card__desc">{course.description}</p>
              
              <a
                className="courses-list-card__btn"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (onNavigate) {
                    onNavigate(course.key)
                  }
                }}
              >
                <span>View Course</span>
                <svg className="courses-list-card__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            {/* Column 2: What You'll Learn */}
            <div className="courses-list-card__col courses-list-card__col--learn">
              <span className="courses-list-card__section-title">WHAT YOU'LL LEARN</span>
              <ul className="courses-list-card__bullets">
                {course.features.map((feature) => (
                  <li className="courses-list-card__bullet" key={feature}>
                    <svg className="courses-list-card__checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="7 12 10 15 17 8" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Course Details */}
            <div className="courses-list-card__col courses-list-card__col--details">
              <span className="courses-list-card__section-title">COURSE DETAILS</span>
              
              <div className="courses-list-card__meta-group">
                {course.details.map((detail) => (
                  <div className="courses-list-card__meta-item" key={detail.label}>
                    <span className="courses-list-card__meta-label">{detail.label}</span>
                    <span className="courses-list-card__meta-value">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}

export default CoursesList
