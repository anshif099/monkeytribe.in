import Header from '../components/header.jsx'
import CopyCraftHero from '../components/copycraft-hero.jsx'
import CopyCraftAbout from '../components/copycraft-about.jsx'
import CopyCraftSkills from '../components/copycraft-skills.jsx'
import CopyCraftCurriculum from '../components/copycraft-curriculum.jsx'
import CopyCraftEnrol from '../components/copycraft-enrol.jsx'
import CopyCraftMarketing from '../components/copycraft-marketing.jsx'
import Footer from '../components/footer.jsx'

function CopyCraft({ onNavigate }) {
  return (
    <main className="copycraft-page" style={{ background: '#12051d', minHeight: '100vh' }}>
      <Header onNavigate={onNavigate} currentPage="copycraft" />
      <CopyCraftHero />
      <CopyCraftAbout />
      <CopyCraftSkills />
      <CopyCraftCurriculum />
      <CopyCraftEnrol />
      <CopyCraftMarketing onNavigate={onNavigate} />
      <Footer />
    </main>
  )
}

export default CopyCraft
