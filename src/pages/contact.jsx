import { useState } from 'react'
import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import './contact.css'

function Contact({ onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    enquiryType: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.enquiryType) newErrors.enquiryType = 'Please select an enquiry type'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Success
    setIsSubmitted(true)
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      enquiryType: '',
      message: '',
    })
  }

  return (
    <main className="contact-page">
      {/* Header */}
      <Header onNavigate={onNavigate} currentPage="contact" />

      {/* Contact Hero */}
      <section className="contact-hero">
        <div className="contact-hero__grid-overlay" aria-hidden="true"></div>
        <div className="contact-hero__container">
          <span className="contact-hero__eyebrow">Contact Us</span>
          <h1 className="contact-hero__title">Let’s talk.</h1>
          <p className="contact-hero__desc">
            Whether you're ready to enrol, exploring options, or want to bring Monkey Tribe training to your organisation — we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Grid */}
      <section className="contact-section">
        <div className="contact-section__container">
          
          {/* Left Column: Get In Touch */}
          <div className="contact-info">
            <h2 className="contact-info__main-title">Get in touch</h2>
            
            <div className="contact-info__list">
              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-info__details">
                  <span className="contact-info__label">EMAIL</span>
                  <a href="mailto:hello@monkeytribe.in" className="contact-info__value">hello@monkeytribe.in</a>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-info__details">
                  <span className="contact-info__label">PHONE</span>
                  <a href="tel:+910000000000" className="contact-info__value">+91 00000 00000</a>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-info__details">
                  <span className="contact-info__label">LOCATION</span>
                  <span className="contact-info__value">India</span>
                </div>
              </div>
            </div>

            <hr className="contact-info__divider" />

            {/* Follow Us */}
            <div className="contact-social">
              <span className="contact-info__section-title">FOLLOW US</span>
              <div className="contact-social__links">
                <a href="#" className="contact-social__link" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="#" className="contact-social__link" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href="#" className="contact-social__link" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </a>
                <a href="#" className="contact-social__link" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
              </div>
            </div>

            <hr className="contact-info__divider" />

            {/* Division of */}
            <div className="contact-division">
              <span className="contact-info__section-title">A DIVISION OF</span>
              <p className="contact-division__name">
                <a
                  href="https://creativemonkeys.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-division__link"
                >
                  Creative Monkeys Advertising Pvt. Ltd.
                </a>
              </p>
              <p className="contact-division__desc">Full-service advertising & brand strategy agency.</p>
            </div>

            <hr className="contact-info__divider" />

            {/* Explore Courses */}
            <div className="contact-courses">
              <span className="contact-info__section-title">EXPLORE COURSES</span>
              <div className="contact-courses__list">
                <a
                  href="#"
                  className="contact-course-card"
                  onClick={(e) => {
                    e.preventDefault()
                    if (onNavigate) onNavigate('promptx')
                  }}
                >
                  <div className="contact-course-card__content">
                    <svg className="contact-course-card__sparkle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3l1.8 5.3L19 10l-5.2 1.7L12 17l-1.8-5.3L5 10l5.2-1.7L12 3z" />
                      <path d="M5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15z" />
                    </svg>
                    <span>PromptX</span>
                  </div>
                  <svg className="contact-course-card__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>

                <a
                  href="#"
                  className="contact-course-card"
                  onClick={(e) => {
                    e.preventDefault()
                    if (onNavigate) onNavigate('growthx')
                  }}
                >
                  <div className="contact-course-card__content">
                    <svg className="contact-course-card__trend" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 7L13.5 15.5L8.5 10.5L2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                    <span>GrowthX</span>
                  </div>
                  <svg className="contact-course-card__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Send Us A Message Form */}
          <div className="contact-form-box">
            <h2 className="contact-form__title">Send us a message</h2>
            <p className="contact-form__subtitle">Fill in the form and we'll get back to you within 24 hours.</p>
            
            {isSubmitted ? (
              <div className="contact-form__success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for getting in touch. One of our course advisors will contact you shortly.</p>
                <button className="contact-form__reset-btn" onClick={() => setIsSubmitted(false)}>Send another message</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__row">
                  <div className="contact-form__group">
                    <label htmlFor="fullName">FULL NAME <span className="required">*</span></label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Your name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={errors.fullName ? 'error' : ''}
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                  </div>

                  <div className="contact-form__group">
                    <label htmlFor="email">EMAIL <span className="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                </div>

                <div className="contact-form__group">
                  <label htmlFor="phone">PHONE NUMBER</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-form__group">
                  <label htmlFor="enquiryType">ENQUIRY TYPE <span className="required">*</span></label>
                  <select
                    id="enquiryType"
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleChange}
                    className={errors.enquiryType ? 'error' : ''}
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="enrol">Enrol in a Programme</option>
                    <option value="corporate">Corporate Training</option>
                    <option value="partnership">Partnership Enquiry</option>
                    <option value="general">General Inquiry</option>
                  </select>
                  {errors.enquiryType && <span className="error-text">{errors.enquiryType}</span>}
                </div>

                <div className="contact-form__group">
                  <label htmlFor="message">MESSAGE <span className="required">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Tell us what you're looking for..."
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                  ></textarea>
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                <button type="submit" className="contact-form__submit-btn">
                  <span>Send Message</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="contact-form__send-icon">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

      {/* Yellow accent line above footer — matches Courses page pattern */}
      <div className="contact-footer-accent" aria-hidden="true" />

      {/* Footer */}
      <Footer />
    </main>
  )
}

export default Contact
