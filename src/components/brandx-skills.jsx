import { useEffect, useRef, useState } from 'react'
import './brandx-skills.css'

const skillsData = [
  {
    title: 'Brand Positioning',
    description: 'Define where your brand stands in the market and why customers should choose you over anyone else.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: 'Visual Identity',
    description: 'Build a cohesive visual system — logo, colour, typography, and design language that speaks without words.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: 'Brand Storytelling',
    description: 'Craft a brand narrative that creates emotional connection and turns customers into loyal advocates.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: 'Audience Connection',
    description: 'Understand your audience at a deep level and build brand experiences that resonate and retain.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Brand Voice & Tone',
    description: 'Develop a consistent, distinctive voice across every touchpoint — from social posts to packaging.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    ),
  },
  {
    title: 'Brand Strategy',
    description: 'Build a long-term brand strategy that guides every decision, campaign, and communication.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
]

function BrandXSkills() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      className={`brandx-skills ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="brandx-skills__container footer-container">
        <span className="brandx-skills__eyebrow">What you'll learn</span>
        <h2 className="brandx-skills__title">Six pillars of brand mastery.</h2>

        <div className="brandx-skills__grid">
          {skillsData.map((skill, index) => (
            <div
              className="brandx-skills__card"
              key={index}
              style={{ '--card-index': index }}
            >
              <div className="brandx-skills__card-icon">{skill.icon}</div>
              <div className="brandx-skills__card-content">
                <h4 className="brandx-skills__card-title">{skill.title}</h4>
                <p className="brandx-skills__card-desc">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandXSkills
