import { useEffect, useRef, useState } from 'react'
import './growthx-marketing.css'

function GrowthXMarketing({ onNavigate }) {
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
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      className={`growthx-marketing ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="growthx-marketing__container footer-container">
        <div className="growthx-marketing__content">
          <span className="growthx-marketing__eyebrow">Also from Monkey Tribe</span>
          <h3 className="growthx-marketing__title">Interested in AI Prompt Engineering?</h3>
        </div>

        <div className="growthx-marketing__action">
          <button
            className="growthx-marketing__btn"
            onClick={() => {
              if (onNavigate) {
                onNavigate('promptx')
              }
            }}
          >
            <span>Explore PromptX</span>
            <svg className="growthx-marketing__arrow" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h13" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default GrowthXMarketing
