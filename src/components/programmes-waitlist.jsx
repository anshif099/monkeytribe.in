import { useState } from 'react'
import './programmes-waitlist.css'

function ProgrammesWaitlist() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    programme: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.programme) return
    setIsSubmitted(true)
  }

  return (
    <section id="programmes-waitlist" className="prog-waitlist" aria-label="Join the Waitlist">
      <div className="prog-waitlist__container">

        {/* ── Left: copy ── */}
        <div className="prog-waitlist__left">

          {/* Pill badge */}
          <div className="prog-waitlist__badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="prog-waitlist__badge-text">Join the Waitlist</span>
          </div>

          {/* Heading */}
          <h2 className="prog-waitlist__heading">
            Be first to<br />
            <span className="prog-waitlist__heading-accent">know.</span>
          </h2>

          {/* Description */}
          <p className="prog-waitlist__desc">
            Dates and pricing for our residential programmes will be announced soon. Register your interest and we'll reach out to you first — before public launch.
          </p>
        </div>

        {/* ── Right: form card ── */}
        <div className="prog-waitlist__card">
          <h3 className="prog-waitlist__card-title">Register Your Interest</h3>

          {isSubmitted ? (
            <div className="prog-waitlist__success">
              <svg className="prog-waitlist__success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <h3>You're on the list!</h3>
              <p>We'll notify you as soon as dates and pricing are confirmed — before anyone else.</p>
            </div>
          ) : (
            <form className="prog-waitlist__form" onSubmit={handleSubmit} noValidate>

              {/* Row 1: Name + Email */}
              <div className="prog-waitlist__row">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  aria-label="Full name"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-label="Email address"
                />
              </div>

              {/* Phone */}
              <input
                type="text"
                name="phone"
                placeholder="Phone number (optional)"
                value={formData.phone}
                onChange={handleChange}
                aria-label="Phone number"
              />

              {/* Programme select */}
              <select
                name="programme"
                value={formData.programme}
                onChange={handleChange}
                required
                aria-label="Programme of Interest"
              >
                <option value="" disabled>Programme of Interest</option>
                <option value="ai-immersion">AI Immersion Retreat — Flagship</option>
                <option value="ai-leadership">AI Leadership Intensive — Executive</option>
                <option value="corporate">Corporate AI Training — Custom</option>
              </select>

              {/* Message */}
              <textarea
                name="message"
                placeholder="Anything you'd like us to know? (optional)"
                value={formData.message}
                onChange={handleChange}
                aria-label="Additional message"
              />

              {/* Submit */}
              <button type="submit" className="prog-waitlist__submit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                Register My Interest
                <svg className="prog-waitlist__submit-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <span className="prog-waitlist__disclaimer">
                No commitment required. We'll only contact you about programmes.
              </span>

            </form>
          )}
        </div>

      </div>
    </section>
  )
}

export default ProgrammesWaitlist
