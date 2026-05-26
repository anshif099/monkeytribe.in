import { useEffect } from 'react'
import './our-courses.css'

const courses = [
  {
    key: 'promptx',
    label: 'PromptX',
    title: 'AI Prompt Engineering Mastery',
    description:
      'Learn to communicate with AI at an expert level. Design powerful prompts, build AI workflows, and unlock capabilities that most professionals never discover.',
    features: [
      'Master prompt design patterns',
      'Build AI-powered workflows',
      'Chain complex reasoning tasks',
      'Deploy prompts in real projects',
    ],
  },
  {
    key: 'growthx',
    label: 'GrowthX',
    title: 'AI Digital Marketing Mastery',
    description:
      'Harness AI to supercharge your marketing. From content generation to campaign optimisation — learn to grow brands faster with intelligent automation.',
    features: [
      'AI-driven content strategy',
      'Automated campaign management',
      'Data-led audience targeting',
      'Performance analytics with AI',
    ],
  },
  {
    key: 'brandx',
    label: 'BrandX',
    title: 'Brand Builder Pro',
    description:
      'Learn how to build a brand from scratch — positioning, identity, storytelling, and audience connection. The complete brand-building playbook for the modern era.',
    features: [
      'Define brand positioning & purpose',
      'Build a compelling visual identity',
      'Craft a brand story that resonates',
      'Connect deeply with your audience',
    ],
  },
  {
    key: 'copycraft',
    label: 'CopyCraft',
    title: 'CopyCraft Mastery',
    description:
      'A complete creative communication program designed to transform ordinary thinkers into persuasive storytellers and modern advertisers.',
    features: [
      'Write high-converting ad copy',
      'Master storytelling for brands',
      'Understand consumer psychology',
      'Create social & digital campaigns',
    ],
  },
]

function CourseIcon({ type }) {
  if (type === 'promptx') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l1.8 5.3L19 10l-5.2 1.7L12 17l-1.8-5.3L5 10l5.2-1.7L12 3z" />
        <path d="M5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15z" />
      </svg>
    )
  }

  if (type === 'growthx') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 16l5-5 4 4 7-8" />
        <path d="M14 7h6v6" />
      </svg>
    )
  }

  if (type === 'brandx') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l8 4-8 4-8-4 8-4z" />
        <path d="M4 12l8 4 8-4" />
        <path d="M4 17l8 4 8-4" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 4l10 5-4 3-3 7L6 7l2-3z" />
      <path d="M8 4l3 8 7-3" />
    </svg>
  )
}

function OurCourses({ onNavigate }) {
  useEffect(() => {
    const cards = document.querySelectorAll('.course-card')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.18 },
    )

    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="our-courses" id="courses">
      <div className="our-courses__inner footer-container">
        <div className="our-courses__header">
          <div>
            <p className="our-courses__eyebrow">Our Courses</p>
            <h2>
              Four courses.
              <span>Infinite potential.</span>
            </h2>
          </div>

          <a
            className="our-courses__view-all"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('courses');
            }}
          >
            View all courses
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="our-courses__grid">
          {courses.map((course, index) => (
            <article
              className={`course-card course-card--${course.key}`}
              style={{ '--reveal-delay': `${Math.min(index, 1) * 100}ms` }}
              key={course.key}
            >
              <div className="course-card__mark" aria-hidden="true"></div>

              <div className="course-card__label">
                <span className="course-card__icon">
                  <CourseIcon type={course.key} />
                </span>
                {course.label}
              </div>

              <h3>{course.title}</h3>
              <p>{course.description}</p>

              <ul>
                {course.features.map((feature) => (
                  <li key={feature}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 12l2.5 2.5L16 9" />
                      <circle cx="12" cy="12" r="8" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                className="course-card__button"
                href={['promptx', 'growthx', 'brandx', 'copycraft'].includes(course.key) ? '#' : '#register'}
                onClick={(e) => {
                  if (course.key === 'promptx') {
                    e.preventDefault()
                    if (onNavigate) {
                      onNavigate('promptx')
                    }
                  } else if (course.key === 'growthx') {
                    e.preventDefault()
                    if (onNavigate) {
                      onNavigate('growthx')
                    }
                  } else if (course.key === 'brandx') {
                    e.preventDefault()
                    if (onNavigate) {
                      onNavigate('brandx')
                    }
                  } else if (course.key === 'copycraft') {
                    e.preventDefault()
                    if (onNavigate) {
                      onNavigate('copycraft')
                    }
                  }
                }}
              >
                Enrol Now
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h13" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurCourses
