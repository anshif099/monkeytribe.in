import { useEffect, useRef, useState } from 'react'
import './growthx-curriculum.css'

const curriculumData = [
  {
    number: '01',
    title: 'AI & the Marketing Landscape',
    description: 'Understand how AI is reshaping digital marketing — from content to campaigns to customer journeys.',
  },
  {
    number: '02',
    title: 'AI-Powered Content Creation',
    description: 'Generate high-quality copy, visuals, and video scripts at scale using the latest AI tools.',
  },
  {
    number: '03',
    title: 'SEO & Content Strategy with AI',
    description: 'Use AI to research keywords, plan content calendars, and optimise for search at unprecedented speed.',
  },
  {
    number: '04',
    title: 'Social Media Automation',
    description: 'Build AI-driven social media workflows — scheduling, caption generation, trend monitoring, and engagement.',
  },
  {
    number: '05',
    title: 'Paid Advertising & AI Optimisation',
    description: 'Leverage AI for ad copy, audience targeting, bid optimisation, and performance analysis.',
  },
  {
    number: '06',
    title: 'Email Marketing with AI',
    description: 'Personalise email campaigns at scale — AI-driven segmentation, subject line testing, and automation flows.',
  },
  {
    number: '07',
    title: 'Analytics & Data-Driven Decisions',
    description: 'Use AI to interpret marketing data, identify trends, and make faster, smarter campaign decisions.',
  },
  {
    number: '08',
    title: 'Brand Strategy in the AI Age',
    description: 'Understand how AI changes brand positioning, audience research, and competitive intelligence.',
  },
  {
    number: '09',
    title: 'AI Tools Masterclass',
    description: 'Deep-dive into the top AI marketing tools — Jasper, Midjourney, Perplexity, HubSpot AI, and more.',
  },
  {
    number: '10',
    title: 'Capstone Campaign',
    description: 'Plan and present a complete AI-powered marketing campaign for a real or simulated brand.',
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
                <p className="growthx-curriculum__card-desc">{module.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GrowthXCurriculum
