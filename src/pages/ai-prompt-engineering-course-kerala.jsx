import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import promptxHero from '../assets/promptx-hero.webp'
import { usePageSeo } from '../lib/usePageSeo.js'
import './ai-prompt-engineering-course-kerala.css'

const pageTitle = 'AI Prompt Engineering Course Kerala | PromptX'
const pageDescription = 'Learn AI prompt engineering in Kerala with PromptX by Monkey Tribe. A practical 30-hour course for professionals, marketers, creators, students, and business owners who want to use AI tools with confidence.'
const canonicalUrl = 'https://monkeytribe.in/ai-prompt-engineering-course-kerala'

const courseHighlights = [
  '30 hours of practical AI training',
  '10 focused prompt engineering modules',
  'Hands-on ChatGPT, Gemini, Claude, and AI workflow practice',
  'Certificate included after course completion',
]

const learningOutcomes = [
  'Write precise prompts for research, content, coding, planning, and business tasks',
  'Use prompt frameworks for consistent professional outputs',
  'Build repeatable AI workflows for daily productivity',
  'Understand prompt safety, refinement, context, roles, and evaluation',
  'Apply AI prompting in marketing, education, operations, and creative work',
  'Create a small portfolio of real-world AI use cases',
]

const modules = [
  'Introduction to generative AI and prompt engineering',
  'Prompt structure, context, roles, constraints, and examples',
  'Advanced prompting patterns for expert-level responses',
  'Prompt engineering for content creation and marketing',
  'Prompt engineering for research, education, and analysis',
  'AI workflows for business productivity and automation',
  'Prompting for coding, technical tasks, and documentation',
  'Image, multimedia, and creative AI prompting',
  'Ethics, safety, bias, and responsible AI use',
  'Capstone project with real-world prompt systems',
]

const faqs = [
  {
    question: 'Is this AI prompt engineering course available in Kerala?',
    answer: 'Yes. PromptX is positioned as a practical AI prompt engineering course for learners and professionals in Kerala, with Monkey Tribe based in Kochi, Kerala.',
  },
  {
    question: 'Who can join this prompt engineering course?',
    answer: 'The course is useful for marketers, creators, students, founders, business owners, educators, and working professionals who want to use AI tools more effectively.',
  },
  {
    question: 'Do I need coding knowledge to learn prompt engineering?',
    answer: 'No. The course starts with practical prompting fundamentals and then moves into professional use cases. Coding knowledge helps in technical modules, but it is not required to begin.',
  },
  {
    question: 'Will I get a certificate?',
    answer: 'Yes. PromptX includes certification after completing the learning path and practical work.',
  },
]

const seoSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      name: 'AI Prompt Engineering Course in Kerala - PromptX',
      description: pageDescription,
      url: canonicalUrl,
      provider: {
        '@type': 'Organization',
        name: 'Monkey Tribe',
        url: 'https://monkeytribe.in/',
      },
      educationalCredentialAwarded: 'Certificate',
      teaches: learningOutcomes,
      coursePrerequisites: 'No coding knowledge required to begin',
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        courseWorkload: 'PT30H',
        location: {
          '@type': 'Place',
          name: 'Kerala, India',
        },
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
}

function AiPromptEngineeringCourseKerala({ onNavigate }) {
  usePageSeo({
    title: pageTitle,
    description: pageDescription,
    canonicalUrl,
    schema: seoSchema,
    schemaId: 'ai-prompt-engineering-course-kerala-schema',
  })

  const goToRegister = () => {
    if (onNavigate) {
      onNavigate('register')
    }
  }

  const goToPromptX = () => {
    if (onNavigate) {
      onNavigate('promptx')
    }
  }

  return (
    <main className="ai-prompt-kerala-page">
      <Header onNavigate={onNavigate} currentPage="ai-prompt-engineering-course-kerala" />

      <section className="ai-prompt-kerala-hero" aria-labelledby="ai-prompt-kerala-title">
        <div className="ai-prompt-kerala-hero__inner">
          <div className="ai-prompt-kerala-hero__copy">
            <p className="ai-prompt-kerala-hero__eyebrow">PromptX by Monkey Tribe</p>
            <h1 id="ai-prompt-kerala-title">AI Prompt Engineering Course in Kerala</h1>
            <p className="ai-prompt-kerala-hero__lead">
              Learn how to communicate with AI tools clearly, creatively, and professionally.
              PromptX is a practical 30-hour AI prompt engineering course in Kerala for people
              who want useful AI skills for real work.
            </p>

            <div className="ai-prompt-kerala-hero__actions">
              <button className="ai-prompt-kerala-btn ai-prompt-kerala-btn--primary" onClick={goToRegister}>
                <span>Register for PromptX</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h13" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </button>
              <button className="ai-prompt-kerala-btn ai-prompt-kerala-btn--ghost" onClick={goToPromptX}>
                View PromptX details
              </button>
            </div>
          </div>

          <div className="ai-prompt-kerala-hero__visual">
            <img src={promptxHero} alt="PromptX AI prompt engineering course visual" width="780" height="780" />
          </div>
        </div>
      </section>

      <section className="ai-prompt-kerala-strip" aria-label="Course highlights">
        {courseHighlights.map((highlight) => (
          <div className="ai-prompt-kerala-strip__item" key={highlight}>
            <span aria-hidden="true"></span>
            <p>{highlight}</p>
          </div>
        ))}
      </section>

      <section className="ai-prompt-kerala-section ai-prompt-kerala-section--light">
        <div className="ai-prompt-kerala-section__inner ai-prompt-kerala-grid">
          <div>
            <p className="ai-prompt-kerala-kicker">Why this course</p>
            <h2>Prompt engineering is now a core professional skill.</h2>
          </div>
          <div className="ai-prompt-kerala-copy">
            <p>
              Most people use AI with short, unclear commands and get average results.
              PromptX teaches the frameworks behind better AI responses: context, roles,
              constraints, examples, refinement, evaluation, and multi-step workflows.
            </p>
            <p>
              The course is built for Kerala learners who want practical AI skills for
              business, content, marketing, research, education, operations, and creative work.
            </p>
          </div>
        </div>
      </section>

      <section className="ai-prompt-kerala-section">
        <div className="ai-prompt-kerala-section__inner">
          <p className="ai-prompt-kerala-kicker">What you will learn</p>
          <h2>Skills covered in the AI prompt engineering course.</h2>
          <div className="ai-prompt-kerala-card-grid">
            {learningOutcomes.map((outcome) => (
              <article className="ai-prompt-kerala-card" key={outcome}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M7 12l3 3 7-7" />
                </svg>
                <p>{outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ai-prompt-kerala-section ai-prompt-kerala-section--light">
        <div className="ai-prompt-kerala-section__inner">
          <p className="ai-prompt-kerala-kicker">Curriculum</p>
          <h2>10 practical modules. No filler.</h2>
          <div className="ai-prompt-kerala-modules">
            {modules.map((module, index) => (
              <article className="ai-prompt-kerala-module" key={module}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{module}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ai-prompt-kerala-section">
        <div className="ai-prompt-kerala-section__inner ai-prompt-kerala-fit">
          <div>
            <p className="ai-prompt-kerala-kicker">Best for</p>
            <h2>Professionals and learners who want practical AI fluency.</h2>
          </div>
          <ul className="ai-prompt-kerala-audience">
            <li>Digital marketers and social media teams</li>
            <li>Students and graduates building AI-ready skills</li>
            <li>Business owners and founders using AI for productivity</li>
            <li>Content creators, copywriters, designers, and educators</li>
            <li>Working professionals who want faster research and execution</li>
          </ul>
        </div>
      </section>

      <section className="ai-prompt-kerala-section ai-prompt-kerala-section--faq">
        <div className="ai-prompt-kerala-section__inner">
          <p className="ai-prompt-kerala-kicker">FAQ</p>
          <h2>AI prompt engineering course Kerala questions.</h2>
          <div className="ai-prompt-kerala-faqs">
            {faqs.map((faq) => (
              <details className="ai-prompt-kerala-faq" key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="ai-prompt-kerala-cta">
        <div className="ai-prompt-kerala-cta__inner">
          <p className="ai-prompt-kerala-kicker">PromptX enrolment</p>
          <h2>Start learning AI prompt engineering in Kerala.</h2>
          <button className="ai-prompt-kerala-btn ai-prompt-kerala-btn--primary" onClick={goToRegister}>
            <span>Register Now</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h13" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default AiPromptEngineeringCourseKerala
