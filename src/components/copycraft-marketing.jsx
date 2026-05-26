import { useEffect, useRef, useState } from 'react'
import './copycraft-marketing.css'

const exploreTracks = [
  {
    key: 'promptx',
    title: 'PromptX',
    subtitle: 'AI Prompt Engineering Mastery',
    icon: (
      <svg className="copycraft-marketing__card-icon copycraft-marketing__card-icon--prompt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.8 5.3L19 10l-5.2 1.7L12 17l-1.8-5.3L5 10l5.2-1.7L12 3z" />
        <path d="M5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15z" />
      </svg>
    ),
  },
  {
    key: 'growthx',
    title: 'GrowthX',
    subtitle: 'AI Digital Marketing Mastery',
    icon: (
      <svg className="copycraft-marketing__card-icon copycraft-marketing__card-icon--growth" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 16l5-5 4 4 7-8" />
        <path d="M14 7h6v6" />
      </svg>
    ),
  },
  {
    key: 'brandx',
    title: 'BrandX',
    subtitle: 'Brand Builder Pro',
    icon: (
      <svg className="copycraft-marketing__card-icon copycraft-marketing__card-icon--brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 4-8 4-8-4 8-4z" />
        <path d="M4 12l8 4 8-4" />
        <path d="M4 17l8 4 8-4" />
      </svg>
    ),
  },
]

function CopyCraftMarketing({ onNavigate }) {
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
      className={`copycraft-marketing ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="copycraft-marketing__container footer-container">
        <span className="copycraft-marketing__eyebrow">Also Explore</span>

        <div className="copycraft-marketing__grid">
          {exploreTracks.map((track) => (
            <div
              className="copycraft-marketing__card"
              key={track.key}
              onClick={() => {
                if (onNavigate) {
                  onNavigate(track.key)
                }
              }}
            >
              <div className="copycraft-marketing__card-left">
                <div className="copycraft-marketing__icon-wrapper">
                  {track.icon}
                </div>
                <div className="copycraft-marketing__card-text">
                  <h4>{track.title}</h4>
                  <span>{track.subtitle}</span>
                </div>
              </div>

              <div className="copycraft-marketing__arrow-wrapper">
                <svg className="copycraft-marketing__card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CopyCraftMarketing
