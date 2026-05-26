import { useEffect, useRef, useState } from 'react'
import './copycraft-curriculum.css'

const curriculumData = [
  {
    number: '01',
    title: 'The Art & Science of Copywriting',
    description: 'What separates great copy from average writing — and the mindset shift that makes all the difference.',
  },
  {
    number: '02',
    title: 'Consumer Psychology & Persuasion',
    description: 'The psychological principles behind influence, persuasion, and decision-making in advertising.',
  },
  {
    number: '03',
    title: 'How Brands Speak',
    description: 'Deconstructing brand voice — how the world\'s best brands communicate and how to replicate that craft.',
  },
  {
    number: '04',
    title: 'Writing for Social Media',
    description: 'Captions, hooks, CTAs, and content formats that stop the scroll and drive engagement.',
  },
  {
    number: '05',
    title: 'Ad Copywriting Fundamentals',
    description: 'The anatomy of a great ad — headlines, body copy, CTAs, and the structure that converts.',
  },
  {
    number: '06',
    title: 'Long-Form & Content Writing',
    description: 'Blog posts, articles, and long-form content that builds authority and drives organic growth.',
  },
  {
    number: '07',
    title: 'Email Copywriting',
    description: 'Subject lines, sequences, and campaigns that get opened, read, and acted upon.',
  },
  {
    number: '08',
    title: 'Landing Page & Conversion Copy',
    description: 'Writing pages that convert visitors into leads and customers — with proven frameworks.',
  },
  {
    number: '09',
    title: 'AI-Powered Copywriting',
    description: 'How to use AI tools as a creative partner — accelerating output without sacrificing quality.',
  },
  {
    number: '10',
    title: 'Building Your Copywriting Portfolio',
    description: 'Creating a body of work that demonstrates your skills and opens doors to real opportunities.',
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
                <p className="copycraft-curriculum__card-desc">{module.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CopyCraftCurriculum
