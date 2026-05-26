import Header from '../components/header.jsx'
import PromptXHero from '../components/promptx-hero.jsx'
import PromptxSkills from '../components/promptx-skills.jsx'
import PromptxCurriculum from '../components/promptx-curriculum.jsx'
import PromptxEnrol from '../components/promptx-enrol.jsx'
import PromptxMarketing from '../components/promptx-marketing.jsx'
import Footer from '../components/footer.jsx'

function PromptX({ onNavigate }) {
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
