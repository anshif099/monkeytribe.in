import { useEffect, useRef, useState } from 'react'
import './brandx-marketing.css'

const exploreTracks = [
  {
    key: 'promptx',
    title: 'PromptX',
    subtitle: 'AI Prompt Engineering Mastery',
    icon: (
      <svg className="brandx-marketing__card-icon brandx-marketing__card-icon--prompt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg className="brandx-marketing__card-icon brandx-marketing__card-icon--growth" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 16l5-5 4 4 7-8" />
        <path d="M14 7h6v6" />
      </svg>
    ),
  },
  {
    key: 'copycraft',
    title: 'CopyCraft',
    subtitle: 'CopyCraft Mastery',
    icon: (
      <svg className="brandx-marketing__card-icon brandx-marketing__card-icon--copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
]

function BrandXMarketing({ onNavigate }) {
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
      className={`brandx-marketing ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="brandx-marketing__container footer-container">
        <span className="brandx-marketing__eyebrow">Also Explore</span>

        <div className="brandx-marketing__grid">
          {exploreTracks.map((track) => (
            <div
              className="brandx-marketing__card"
              key={track.key}
              onClick={() => {
                if (onNavigate) {
                  onNavigate(track.key)
                }
              }}
            >
              <div className="brandx-marketing__card-left">
                <div className="brandx-marketing__icon-wrapper">
                  {track.icon}
                </div>
                <div className="brandx-marketing__card-text">
                  <h4>{track.title}</h4>
                  <span>{track.subtitle}</span>
                </div>
              </div>

              <div className="brandx-marketing__arrow-wrapper">
                <svg className="brandx-marketing__card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

export default BrandXMarketing
