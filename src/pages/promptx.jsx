import Header from '../components/header.jsx'
import PromptXHero from '../components/promptx-hero.jsx'
import PromptxSkills from '../components/promptx-skills.jsx'
import PromptxCurriculum from '../components/promptx-curriculum.jsx'
import PromptxEnrol from '../components/promptx-enrol.jsx'
import PromptxMarketing from '../components/promptx-marketing.jsx'
import Footer from '../components/footer.jsx'
import { usePageSeo } from '../lib/usePageSeo.js'

const promptxSeo = {
  title: 'AI Prompt Engineering Course Kerala | Monkey Tribe',
  description: 'Join PromptX, a practical AI prompt engineering course in Kerala by Monkey Tribe and Creative Monkeys Advertising. Learn expert prompting, AI workflows, and real-world AI applications.',
  canonicalUrl: 'https://monkeytribe.in/promptx',
  schemaId: 'promptx-course-schema',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'AI Prompt Engineering Course in Kerala - PromptX',
    description: 'Join PromptX, a practical AI prompt engineering course in Kerala by Monkey Tribe and Creative Monkeys Advertising. Learn expert prompting, AI workflows, and real-world AI applications.',
    provider: {
      '@type': 'Organization',
      name: 'Monkey Tribe',
      url: 'https://monkeytribe.in/',
    },
    url: 'https://monkeytribe.in/promptx',
    educationalCredentialAwarded: 'Certification',
    teaches: [
      'AI prompt engineering',
      'Prompt design patterns',
      'AI workflow building',
      'Real-world AI applications',
    ],
  },
}

function PromptX({ onNavigate }) {
  usePageSeo(promptxSeo)

  return (
    <main className="promptx-page" style={{ background: '#0e0c21', minHeight: '100vh' }}>
      <Header onNavigate={onNavigate} currentPage="promptx" />
      <PromptXHero />
      <PromptxSkills />
      <PromptxCurriculum />
      <PromptxEnrol />
      <PromptxMarketing onNavigate={onNavigate} />
      <Footer />
    </main>
  )
}

export default PromptX
