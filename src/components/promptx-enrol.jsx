import { useEffect, useRef, useState } from 'react'
import { saveEnrollment } from '../lib/firebase'
import './promptx-enrol.css'

function PromptxEnrol() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
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
    if (!formData.name || !formData.email) return
    try {
      await saveEnrollment({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        course: 'PromptX',
        status: 'lead'
      })
      setSubmitted(true)
    } catch (err) {
      console.error("Failed to submit promptx lead: ", err)
      alert("There was an issue submitting your request. Please try again.")
    }
  }


  return (
    <section
      id="enrol-section"
      className={`promptx-enrol ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="promptx-enrol__grid-overlay" aria-hidden="true"></div>

      <div className="promptx-enrol__container footer-container">
        {/* Left Column */}
        <div className="promptx-enrol__info">
          <h2>
            Ready to master
            <span className="accent"> AI prompting?</span>
          </h2>
          <p>
            Join PromptX and gain the skills that will define the next generation
            of AI-fluent professionals.
          </p>
        </div>

        {/* Right Column */}
        <div className="promptx-enrol__card-wrapper">
          <form className="promptx-enrol__card" onSubmit={handleSubmit}>
            <h3>Enrol in PromptX</h3>

            {submitted ? (
              <div className="promptx-enrol__success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <h4>Request Received!</h4>
                <p>Our team will reach out to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="promptx-enrol__field">
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="promptx-enrol__field">
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="promptx-enrol__field">
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <button type="submit" className="promptx-enrol__submit-btn">
                  Submit Enrolment Request
                </button>

                <span className="promptx-enrol__disclaimer">
                  Our team will reach out within 24 hours.
                </span>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default PromptxEnrol
