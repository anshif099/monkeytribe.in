import { useEffect, useRef, useState } from 'react'
import './copycraft-curriculum.css'

const curriculumData = [
  {
    number: '01',
    title: 'The Art & Science of Copywriting',
  },
  {
    number: '02',
    title: 'Consumer Psychology & Persuasion',
  },
  {
    number: '03',
    title: 'How Brands Speak',
  },
  {
    number: '04',
    title: 'Writing for Social Media',
  },
  {
    number: '05',
    title: 'Ad Copywriting Fundamentals',
  },
  {
    number: '06',
    title: 'Long-Form & Content Writing',
  },
  {
    number: '07',
    title: 'Email Copywriting',
  },
  {
    number: '08',
    title: 'Landing Page & Conversion Copy',
  },
  {
    number: '09',
    title: 'AI-Powered Copywriting',
  },
  {
    number: '10',
    title: 'Building Your Copywriting Portfolio',
  },
]

function CopyCraftCurriculum() {
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
      className={`copycraft-curriculum ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="copycraft-curriculum__container footer-container">
        <span className="copycraft-curriculum__eyebrow">Curriculum</span>
        <h2 className="copycraft-curriculum__title">10 modules.<br />One complete copywriter.</h2>

        <div className="copycraft-curriculum__grid">
          {curriculumData.map((module, index) => (
            <div
              className="copycraft-curriculum__card"
              key={index}
              style={{ '--card-index': index }}
            >
              <div className="copycraft-curriculum__card-number">{module.number}</div>
              <div className="copycraft-curriculum__card-content">
                <h3 className="copycraft-curriculum__card-title">{module.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CopyCraftCurriculum
