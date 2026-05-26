import { useEffect, useRef, useState } from 'react'
import './copycraft-skills.css'

const skillsData = [
  {
    title: 'Consumer Psychology',
    description: 'Understand how people think, feel, and decide — and write copy that speaks directly to those instincts.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
      </svg>
    ),
  },
  {
    title: 'Brand Voice Mastery',
    description: 'Learn how great brands speak and develop the ability to write in any voice, for any brand.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'High-Converting Ad Copy',
    description: 'Write social ads, search ads, and display copy that drives clicks, leads, and sales.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: 'Digital Copywriting',
    description: 'Master copy for every digital channel — social media, email, landing pages, and beyond.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: 'AI-Powered Writing',
    description: 'Use AI tools to accelerate your creative process without losing the human edge that makes copy great.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: 'Storytelling for Brands',
    description: 'Craft narratives that build emotional connection, brand loyalty, and long-term customer relationships.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.8 5.3L19 10l-5.2 1.7L12 17l-1.8-5.3L5 10l5.2-1.7L12 3z" />
        <path d="M5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15z" />
      </svg>
    ),
  },
]

function CopyCraftSkills() {
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
      className={`copycraft-skills ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="copycraft-skills__container footer-container">
        {/* Skills Header (Mockup matching) */}
        <span className="copycraft-skills__eyebrow">What you'll learn</span>
        <h2 className="copycraft-skills__title">Six skills that make great copywriters.</h2>

        {/* Pillars Grid */}
        <div className="copycraft-skills__grid">
          {skillsData.map((skill, index) => (
            <div
              className="copycraft-skills__card"
              key={index}
              style={{ '--card-index': index }}
            >
              <div className="copycraft-skills__card-icon">{skill.icon}</div>
              <div className="copycraft-skills__card-content">
                <h4 className="copycraft-skills__card-title">{skill.title}</h4>
                <p className="copycraft-skills__card-desc">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CopyCraftSkills
