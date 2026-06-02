import { useEffect, useRef, useState } from 'react'
import './promptx-curriculum.css'

const curriculumData = [
  {
    number: '01',
    title: 'Introduction to Artificial Intelligence & Prompt Engineering',
    description: 'Understand how AI and large language models work, their capabilities, and limitations. Build the mental model you need to prompt effectively and communicate with AI like a pro.',
  },
  {
    number: '02',
    title: 'Fundamentals of Effective Prompt Writing',
    description: 'Master the essential prompt structures — zero-shot, few-shot, chain-of-thought, role prompting, and more. Learn the building blocks of clear, precise, and powerful prompts.',
  },
  {
    number: '03',
    title: 'Advanced Prompt Engineering Techniques',
    description: 'Design multi-step prompts, reasoning chains, and iterative refinement strategies that guide AI through complex tasks with precision and reliability.',
  },
  {
    number: '04',
    title: 'Prompt Engineering for Content Creation',
    description: "Unlock AI's creative potential — generate blogs, social media copy, scripts, ad campaigns, and content at scale with expert-crafted prompts.",
  },
  {
    number: '05',
    title: 'Prompt Engineering for Education & Research',
    description: 'Use AI to accelerate learning, summarise research, generate study materials, design lesson plans, and conduct in-depth analysis across any subject.',
  },
  {
    number: '06',
    title: 'Prompt Engineering for Business & Productivity',
    description: 'Automate reports, emails, proposals, and workflows. Apply prompt engineering to boost business productivity, streamline operations, and save hours every week.',
  },
  {
    number: '07',
    title: 'Prompt Engineering for Programming & Technical Tasks',
    description: 'Leverage AI for code generation, debugging, documentation, and technical problem-solving. Make AI your most productive coding partner.',
  },
  {
    number: '08',
    title: 'Prompt Engineering for Image & Multimedia Generation',
    description: 'Master prompt crafting for AI image, audio, and video generation tools. Create stunning visuals and multimedia assets using well-structured creative prompts.',
  },
  {
    number: '09',
    title: 'Ethics, Safety & Responsible AI Prompting',
    description: 'Understand bias, hallucinations, and responsible use of AI. Learn to prompt safely, avoid misuse, and apply ethical frameworks in real-world AI interactions.',
  },
  {
    number: '10',
    title: 'Capstone Projects & Real-World Applications',
    description: 'Design and deploy complete AI-powered workflows solving real-world problems in your field. Build a personal prompt library and present your capstone project.',
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
