import { useEffect, useRef, useState } from 'react'
import './copycraft-about.css'

function CopyCraftAbout() {
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
      className={`copycraft-about ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="copycraft-about__container footer-container">
        <span className="copycraft-about__eyebrow">The Course</span>
        <h2 className="copycraft-about__title">
          From social media captions to<br />
          high-converting ad campaigns.
        </h2>
        <p className="copycraft-about__desc">
          CopyCraft Mastery helps you master the psychology, creativity, and AI-powered
          techniques behind modern copywriting. Whether you're a marketer, entrepreneur,
          creative, or complete beginner — this course gives you the tools to write copy that works.
        </p>
      </div>
    </section>
  )
}

export default CopyCraftAbout
