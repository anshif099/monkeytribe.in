import { useEffect, useRef, useState } from 'react'
import { saveEnrollment } from '../lib/firebase'
import './brandx-enrol.css'

function BrandXEnrol() {
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
        course: 'BrandX',
        status: 'lead'
      })
      setSubmitted(true)
    } catch (err) {
      console.error("Failed to submit brandx lead: ", err)
      alert("There was an issue submitting your request. Please try again.")
    }
  }


  return (
    <section
      id="enrol-section"
      className={`brandx-enrol ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      {/* Background Grid Pattern */}
      <div className="brandx-enrol__grid-overlay" aria-hidden="true"></div>

      <div className="brandx-enrol__container footer-container">
        {/* Left Column Info */}
        <div className="brandx-enrol__info">
          <span className="brandx-enrol__eyebrow">Enrol in BrandX</span>
          <h2>
            Build a brand
            <span className="accent"> that lasts.</span>
          </h2>
          <p className="brandx-enrol__desc">
            Whether you're launching a new business, rebranding an existing one,
            or learning brand strategy as a professional — BrandX gives you the complete playbook.
          </p>

          <div className="brandx-enrol__bullets">
            <div className="brandx-enrol__bullet">
              <div className="brandx-enrol__bullet-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span>10 comprehensive modules</span>
            </div>

            <div className="brandx-enrol__bullet">
              <div className="brandx-enrol__bullet-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span>Practitioner-led instruction</span>
            </div>

            <div className="brandx-enrol__bullet">
              <div className="brandx-enrol__bullet-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span>Real-world brand projects</span>
            </div>

            <div className="brandx-enrol__bullet">
              <div className="brandx-enrol__bullet-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span>Lifetime access to materials</span>
            </div>
          </div>
        </div>

        {/* Right Column Card Form */}
        <div className="brandx-enrol__card-wrapper">
          <form className="brandx-enrol__card" onSubmit={handleSubmit}>
            <h3>Register Your Interest</h3>

            {submitted ? (
              <div className="brandx-enrol__success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <h4>Enrolment Request Received!</h4>
                <p>Thank you for your interest in BrandX. Our team will reach out to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="brandx-enrol__row">
                  <div className="brandx-enrol__field">
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="brandx-enrol__field">
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="brandx-enrol__field">
                  <input
                    type="tel"
                    placeholder="Phone number (optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="brandx-enrol__field">
                  <input
                    type="text"
                    required
                    placeholder="Your profession / industry"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  />
                </div>

                <div className="brandx-enrol__field">
                  <textarea
                    placeholder="Tell us about your brand goals (optional)"
                    rows="4"
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="brandx-enrol__submit-btn">
                  <span>Enrol in BrandX</span>
                  <svg className="brandx-enrol__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

export default BrandXEnrol
