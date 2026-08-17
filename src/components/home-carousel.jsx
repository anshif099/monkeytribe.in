import { useEffect, useRef, useState } from 'react'
import './home-carousel.css'

const SLIDES = [
  { src: '/carosal-1.webp', alt: 'Artificial intelligence and digital creativity' },
  { src: '/carosal-2.webp', alt: 'AI-powered business growth' },
  { src: '/carosal-3.webp', alt: 'Strategy, creativity, and global opportunity' },
  { src: '/carosal-4.webp', alt: 'AI-powered content and creative learning' },
]

function HomeCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const touchStartX = useRef(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return undefined

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % SLIDES.length)
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [])

  const showPrevious = () => {
    setActiveSlide((current) => (current - 1 + SLIDES.length) % SLIDES.length)
  }

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % SLIDES.length)
  }

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return

    const distance = event.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null

    if (Math.abs(distance) < 45) return
    if (distance > 0) showPrevious()
    else showNext()
  }

  return (
    <section
      className="home-carousel"
      id="home"
      aria-label="Monkey Tribe highlights"
      aria-roledescription="carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="home-carousel__slides" aria-live="off">
        {SLIDES.map((slide, index) => (
          <div
            className={`home-carousel__slide${index === activeSlide ? ' is-active' : ''}`}
            aria-hidden={index !== activeSlide}
            key={slide.src}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              width="1672"
              height="941"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              decoding="async"
            />
          </div>
        ))}
      </div>

      <div className="home-carousel__dots" aria-label="Choose a slide">
        {SLIDES.map((slide, index) => (
          <button
            className={`home-carousel__dot${index === activeSlide ? ' is-active' : ''}`}
            type="button"
            onClick={() => setActiveSlide(index)}
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === activeSlide ? 'true' : undefined}
            key={slide.src}
          />
        ))}
      </div>

      <button
        className="home-carousel__scroll"
        type="button"
        onClick={() => document.getElementById('home-intro')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to the Monkey Tribe introduction"
      >
        <span>Discover</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </section>
  )
}

export default HomeCarousel
