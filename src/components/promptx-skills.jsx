import { useEffect, useRef, useState } from 'react'
import './promptx-skills.css'

const skillsData = [
  {
    text: 'Write prompts that consistently produce expert-level outputs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v12M6 12h12" strokeDasharray="1 3" />
        <path d="M9.5 9.5c.8-.8 1.7-1 2.5-1s1.7.2 2.5 1 1 1.7 1 2.5-.2 1.7-1 2.5-1.7 1-2.5 1-1.7-.2-2.5-1-1-1.7-1-2.5.2-1.7 1-2.5z" />
      </svg>
    ),
  },
  {
    text: 'Build automated AI workflows that save hours every week',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    text: 'Use AI as a coding, writing, and research partner',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    text: 'Chain complex multi-step reasoning tasks reliably',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="3" x2="6" y2="15" />
        <circle cx="6" cy="18" r="3" />
        <line x1="18" y1="9" x2="18" y2="21" />
        <circle cx="18" cy="6" r="3" />
        <path d="M6 15a6 6 0 0 0 12-6" />
      </svg>
    ),
  },
  {
    text: 'Communicate with any LLM — GPT, Claude, Gemini, and more',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    text: 'Deploy prompts in real projects with measurable results',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
]

function PromptxSkills() {
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
        threshold: 0.15,
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
      className={`promptx-skills ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="promptx-skills__container footer-container">
        <span className="promptx-skills__eyebrow">What you'll achieve</span>
        <h2 className="promptx-skills__title">Skills you'll walk away with.</h2>

        <div className="promptx-skills__grid">
          {skillsData.map((skill, index) => (
            <div
              className="promptx-skills__card"
              key={index}
              style={{ '--card-index': index }}
            >
              <div className="promptx-skills__card-icon">{skill.icon}</div>
              <p className="promptx-skills__card-text">{skill.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PromptxSkills
