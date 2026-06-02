import { useEffect, useRef, useState } from 'react'
import './growthx-curriculum.css'

const curriculumData = [
  {
    number: '01',
    title: 'Introduction to Digital Marketing & Social Media Management',
    description: 'Understand the digital marketing ecosystem and the role of social media. Learn how AI is transforming brand communication, audience engagement, and content strategy.',
  },
  {
    number: '02',
    title: 'AI Tools for Social Media Content Creation',
    description: 'Use AI-powered tools to generate compelling captions, visuals, reels scripts, and posts at scale — faster and smarter than ever before.',
  },
  {
    number: '03',
    title: 'Social Media Branding & Visual Identity',
    description: 'Build a consistent and recognisable brand presence across platforms. Learn design principles, colour psychology, and AI-assisted visual identity creation.',
  },
  {
    number: '04',
    title: 'Social Media Strategy & Audience Growth',
    description: 'Develop data-driven social media strategies tailored for growth. Understand algorithms, content calendars, and AI-driven audience targeting techniques.',
  },
  {
    number: '05',
    title: 'AI-Powered Social Media Management Tools',
    description: 'Master tools like Buffer, Hootsuite, Later, and AI-native platforms to automate scheduling, track performance, and manage multiple accounts efficiently.',
  },
  {
    number: '06',
    title: 'Social Media Advertising & Paid Campaigns',
    description: 'Run high-performing paid campaigns on Instagram, Facebook, and LinkedIn. Use AI for ad copy, audience segmentation, bid optimisation, and creative testing.',
  },
  {
    number: '07',
    title: 'Influencer Marketing & Community Management',
    description: 'Identify the right influencers using AI tools, build partnerships, and manage brand communities that drive loyalty and organic reach.',
  },
  {
    number: '08',
    title: 'Analytics, Insights & Consumer Behavior',
    description: 'Interpret social media data using AI-powered analytics dashboards. Track KPIs, understand consumer behaviour, and make smarter campaign decisions.',
  },
  {
    number: '09',
    title: 'AI Automation & Advanced Social Media Workflows',
    description: 'Build end-to-end automated workflows for content publishing, engagement responses, lead generation, and reporting using AI and no-code tools.',
  },
  {
    number: '10',
    title: 'Capstone Project & Real-World Applications',
    description: 'Plan and present a complete AI-powered social media marketing campaign for a real or simulated brand — from strategy to execution to results.',
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
