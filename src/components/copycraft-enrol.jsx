import { useEffect, useRef, useState } from 'react'
import { saveEnrollment } from '../lib/firebase'
import './copycraft-enrol.css'

function CopyCraftEnrol() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    goals: '',
  })
  const [submitted, setSubmitted] = useState(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.profession) return
    try {
      await saveEnrollment({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        profession: formData.profession,
        goals: formData.goals,
        course: 'CopyCraft',
        status: 'lead'
      })
      setSubmitted(true)
    } catch (err) {
      console.error("Failed to submit copycraft lead: ", err)
      alert("There was an issue submitting your request. Please try again.")
    }
  }


  return (
    <section
      id="enrol-section"
      className={`copycraft-enrol ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      {/* Background Grid Pattern */}
      <div className="copycraft-enrol__grid-overlay" aria-hidden="true"></div>

      <div className="copycraft-enrol__container footer-container">
        {/* Left Column Info */}
        <div className="copycraft-enrol__info">
          <span className="copycraft-enrol__eyebrow">Enrol in CopyCraft</span>
          <h2>
            Write copy that
            <span className="accent"> moves people.</span>
          </h2>
          <p className="copycraft-enrol__desc">
            Join CopyCraft Mastery and develop the creative communication skills that modern brands,
            agencies, and businesses are actively looking for.
          </p>

          <div className="copycraft-enrol__bullets">
            <div className="copycraft-enrol__bullet">
              <div className="copycraft-enrol__bullet-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span>10 comprehensive modules</span>
            </div>

            <div className="copycraft-enrol__bullet">
              <div className="copycraft-enrol__bullet-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span>Psychology-first approach</span>
            </div>

            <div className="copycraft-enrol__bullet">
              <div className="copycraft-enrol__bullet-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span>AI-powered writing techniques</span>
            </div>

            <div className="copycraft-enrol__bullet">
              <div className="copycraft-enrol__bullet-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span>Real campaign briefs & projects</span>
            </div>
          </div>
        </div>

        {/* Right Column Card Form */}
        <div className="copycraft-enrol__card-wrapper">
          <form className="copycraft-enrol__card" onSubmit={handleSubmit}>
            <h3>Register Your Interest</h3>

            {submitted ? (
              <div className="copycraft-enrol__success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <h4>Enrolment Request Received!</h4>
                <p>Thank you for your interest in CopyCraft. Our team will reach out to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="copycraft-enrol__row">
                  <div className="copycraft-enrol__field">
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="copycraft-enrol__field">
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="copycraft-enrol__field">
                  <input
                    type="tel"
                    placeholder="Phone number (optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="copycraft-enrol__field">
                  <input
                    type="text"
                    required
                    placeholder="Your profession / industry"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  />
                </div>

                <div className="copycraft-enrol__field">
                  <textarea
                    placeholder="What do you want to write better? (optional)"
                    rows="4"
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="copycraft-enrol__submit-btn">
                  <span>Enrol in CopyCraft</span>
                  <svg className="copycraft-enrol__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default CopyCraftEnrol
