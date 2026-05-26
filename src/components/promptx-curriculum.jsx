import { useEffect, useRef, useState } from 'react'
import './promptx-curriculum.css'

const curriculumData = [
  {
    number: '01',
    title: 'Foundations of AI & LLMs',
    description: 'Understand how large language models work, their capabilities, and limitations. Build the mental model you need to prompt effectively.',
  },
  {
    number: '02',
    title: 'Core Prompt Patterns',
    description: 'Master the essential prompt structures — zero-shot, few-shot, chain-of-thought, role prompting, and more.',
  },
  {
    number: '03',
    title: 'Advanced Reasoning Chains',
    description: 'Design multi-step prompts that guide AI through complex reasoning tasks with precision and reliability.',
  },
  {
    number: '04',
    title: 'Prompt Engineering for Creativity',
    description: "Unlock AI's creative potential — generate copy, concepts, campaigns, and content at scale.",
  },
  {
    number: '05',
    title: 'Building AI Workflows',
    description: 'Chain prompts into automated pipelines. Integrate AI into real tools and processes.',
  },
  {
    number: '06',
    title: 'Evaluation & Iteration',
    description: 'Learn to test, measure, and refine your prompts systematically. Build a personal prompt library.',
  },
  {
    number: '07',
    title: 'Domain-Specific Applications',
    description: 'Apply prompt engineering to marketing, coding, research, education, and business operations.',
  },
  {
    number: '08',
    title: 'Capstone Project',
    description: 'Design and deploy a complete AI-powered workflow solving a real-world problem in your field.',
  },
]

function PromptxCurriculum() {
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
      className={`promptx-curriculum ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="promptx-curriculum__container footer-container">
        <span className="promptx-curriculum__eyebrow">Curriculum</span>
        <h2 className="promptx-curriculum__title">8 modules. Zero fluff.</h2>

        <div className="promptx-curriculum__grid">
          {curriculumData.map((module, index) => (
            <div
              className="promptx-curriculum__card"
              key={index}
              style={{ '--card-index': index }}
            >
              <div className="promptx-curriculum__card-number">{module.number}</div>
              <div className="promptx-curriculum__card-content">
                <h3 className="promptx-curriculum__card-title">{module.title}</h3>
                <p className="promptx-curriculum__card-desc">{module.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PromptxCurriculum
