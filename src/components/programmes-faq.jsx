import { useState } from 'react'
import './programmes-faq.css'

const FAQS = [
  {
    id: 'q1',
    question: 'Who are the residential programmes designed for?',
    answer:
      'Our programmes are designed for working professionals, marketers, entrepreneurs, and business leaders who want to develop practical AI skills in an immersive, focused environment. No prior AI experience is required.',
  },
  {
    id: 'q2',
    question: 'What is included in the residential programme fee?',
    answer:
      'All residential programmes include accommodation, all meals and refreshments, course materials, workshop sessions, and post-programme community access. Travel to the venue is not included.',
  },
  {
    id: 'q3',
    question: 'How do I register my interest?',
    answer:
      'Fill in the waitlist form below with your name, email, and preferred programme. We\'ll notify you as soon as dates and pricing are confirmed.',
  },
  {
    id: 'q4',
    question: 'Can my company send a group?',
    answer:
      'Absolutely. We offer group rates for organisations sending multiple participants. For larger teams, our Corporate AI Training programme may be a better fit — reach out to discuss.',
  },
  {
    id: 'q5',
    question: 'Will the content overlap with the online courses?',
    answer:
      'The residential programmes go significantly deeper than the online courses. They include live facilitation, peer collaboration, real-time feedback, and personalised sessions that aren\'t possible in a self-paced format.',
  },
]

const ChevronIcon = () => (
  <svg
    className="prog-faq__chevron"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

function ProgrammesFaq() {
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <section className="prog-faq" aria-label="Frequently Asked Questions">
      <div className="prog-faq__container">

        {/* Header */}
        <span className="prog-faq__eyebrow">FAQ</span>
        <h2 className="prog-faq__heading">Common questions.</h2>

        {/* Accordion list */}
        <div className="prog-faq__list" role="list">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id
            return (
              <div
                key={faq.id}
                className={`prog-faq__item${isOpen ? ' prog-faq__item--open' : ''}`}
                role="listitem"
              >
                <button
                  className="prog-faq__question"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  id={`faq-btn-${faq.id}`}
                >
                  <span className="prog-faq__question-text">{faq.question}</span>
                  <ChevronIcon />
                </button>

                <div
                  className="prog-faq__answer"
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${faq.id}`}
                >
                  <div className="prog-faq__answer-inner">
                    <p className="prog-faq__answer-text">{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default ProgrammesFaq
