import { useEffect, useRef, useState } from 'react'
import './brandx-curriculum.css'

const curriculumData = [
  {
    number: '01',
    title: 'What is a Brand?',
  },
  {
    number: '02',
    title: 'Brand Purpose & Vision',
  },
  {
    number: '03',
    title: 'Market Positioning',
  },
  {
    number: '04',
    title: 'Audience Research & Personas',
  },
  {
    number: '05',
    title: 'Visual Identity Systems',
  },
  {
    number: '06',
    title: 'Brand Voice & Messaging',
  },
  {
    number: '07',
    title: 'Brand Storytelling',
  },
  {
    number: '08',
    title: 'Digital Brand Presence',
  },
  {
    number: '09',
    title: 'Brand Experience Design',
  },
  {
    number: '10',
    title: 'Brand Growth & Evolution',
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandXCurriculum
