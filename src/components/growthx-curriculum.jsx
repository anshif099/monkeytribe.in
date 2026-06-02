import { useEffect, useRef, useState } from 'react'
import './growthx-curriculum.css'

const curriculumData = [
  {
    number: '01',
    title: 'Introduction to Digital Marketing & Social Media Management',
  },
  {
    number: '02',
    title: 'AI Tools for Social Media Content Creation',
  },
  {
    number: '03',
    title: 'Social Media Branding & Visual Identity',
  },
  {
    number: '04',
    title: 'Social Media Strategy & Audience Growth',
  },
  {
    number: '05',
    title: 'AI-Powered Social Media Management Tools',
  },
  {
    number: '06',
    title: 'Social Media Advertising & Paid Campaigns',
  },
  {
    number: '07',
    title: 'Influencer Marketing & Community Management',
  },
  {
    number: '08',
    title: 'Analytics, Insights & Consumer Behavior',
  },
  {
    number: '09',
    title: 'AI Automation & Advanced Social Media Workflows',
  },
  {
    number: '10',
    title: 'Capstone Project & Real-World Applications',
  },
]

function GrowthXCurriculum() {
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
      className={`growthx-curriculum ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="growthx-curriculum__container footer-container">
        <span className="growthx-curriculum__eyebrow">Curriculum</span>
        <h2 className="growthx-curriculum__title">10 modules. Real-world results.</h2>

        <div className="growthx-curriculum__grid">
          {curriculumData.map((module, index) => (
            <div
              className={`growthx-curriculum__card ${
                module.number === '10' ? 'growthx-curriculum__card--highlight' : ''
              }`}
              key={index}
              style={{ '--card-index': index }}
            >
              <div className="growthx-curriculum__card-number">{module.number}</div>
              <div className="growthx-curriculum__card-content">
                <h3 className="growthx-curriculum__card-title">{module.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GrowthXCurriculum
