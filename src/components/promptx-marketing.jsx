import { useEffect, useRef, useState } from 'react'
import './promptx-marketing.css'

function PromptxMarketing({ onNavigate }) {
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
      className={`promptx-marketing ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="promptx-marketing__container footer-container">
        <div className="promptx-marketing__content">
          <span className="promptx-marketing__eyebrow">Also from Monkey Tribe</span>
          <h3 className="promptx-marketing__title">Interested in AI Digital Marketing?</h3>
        </div>

        <div className="promptx-marketing__action">
          <button
            className="promptx-marketing__btn"
            onClick={() => {
              if (onNavigate) {
                onNavigate('growthx')
              }
            }}
          >
            <span>Explore GrowthX</span>
            <svg className="promptx-marketing__arrow" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h13" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default PromptxMarketing
