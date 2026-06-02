import { useEffect, useRef, useState } from 'react'
import './promptx-curriculum.css'

const curriculumData = [
  {
    number: '01',
    title: 'Introduction to Artificial Intelligence & Prompt Engineering',
  },
  {
    number: '02',
    title: 'Fundamentals of Effective Prompt Writing',
  },
  {
    number: '03',
    title: 'Advanced Prompt Engineering Techniques',
  },
  {
    number: '04',
    title: 'Prompt Engineering for Content Creation',
  },
  {
    number: '05',
    title: 'Prompt Engineering for Education & Research',
  },
  {
    number: '06',
    title: 'Prompt Engineering for Business & Productivity',
  },
  {
    number: '07',
    title: 'Prompt Engineering for Programming & Technical Tasks',
  },
  {
    number: '08',
    title: 'Prompt Engineering for Image & Multimedia Generation',
  },
  {
    number: '09',
    title: 'Ethics, Safety & Responsible AI Prompting',
  },
  {
    number: '10',
    title: 'Capstone Projects & Real-World Applications',
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
        <h2 className="promptx-curriculum__title">10 modules. Zero fluff.</h2>

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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PromptxCurriculum
