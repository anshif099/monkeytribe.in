import { useEffect, useRef, useState } from 'react'
import './brandx-curriculum.css'

const curriculumData = [
  {
    number: '01',
    title: 'What is a Brand?',
    description: 'Beyond logos and colours — understanding what a brand truly is and why it matters.',
  },
  {
    number: '02',
    title: 'Brand Purpose & Vision',
    description: 'Defining the why behind your brand — purpose, mission, and the vision that drives everything.',
  },
  {
    number: '03',
    title: 'Market Positioning',
    description: 'Finding your unique space in the market and articulating your competitive advantage.',
  },
  {
    number: '04',
    title: 'Audience Research & Personas',
    description: 'Deep-diving into who your audience is, what they want, and how they think.',
  },
  {
    number: '05',
    title: 'Visual Identity Systems',
    description: 'Building a complete visual identity — logo, palette, typography, and brand guidelines.',
  },
  {
    number: '06',
    title: 'Brand Voice & Messaging',
    description: 'Developing a consistent tone of voice and messaging framework across all channels.',
  },
  {
    number: '07',
    title: 'Brand Storytelling',
    description: 'Crafting origin stories, brand narratives, and emotional hooks that build lasting connection.',
  },
  {
    number: '08',
    title: 'Digital Brand Presence',
    description: 'Translating your brand identity into a powerful, consistent digital presence.',
  },
  {
    number: '09',
    title: 'Brand Experience Design',
    description: 'Designing every customer touchpoint to reinforce your brand promise.',
  },
  {
    number: '10',
    title: 'Brand Growth & Evolution',
    description: 'How to grow, adapt, and evolve your brand without losing its core identity.',
  },
]

function BrandXCurriculum() {
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
      id="curriculum"
      className={`brandx-curriculum ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="brandx-curriculum__container footer-container">
        <span className="brandx-curriculum__eyebrow">Curriculum</span>
        <h2 className="brandx-curriculum__title">10 modules. One complete brand.</h2>

        <div className="brandx-curriculum__grid">
          {curriculumData.map((module, index) => (
            <div
              className={`brandx-curriculum__card ${
                module.number === '05' ? 'brandx-curriculum__card--highlight' : ''
              }`}
              key={index}
              style={{ '--card-index': index }}
            >
              <div className="brandx-curriculum__card-number">{module.number}</div>
              <div className="brandx-curriculum__card-content">
                <h3 className="brandx-curriculum__card-title">{module.title}</h3>
                <p className="brandx-curriculum__card-desc">{module.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandXCurriculum
