import Header from '../components/header.jsx'
import BrandXHero from '../components/brandx-hero.jsx'
import BrandXSkills from '../components/brandx-skills.jsx'
import BrandXCurriculum from '../components/brandx-curriculum.jsx'
import BrandXEnrol from '../components/brandx-enrol.jsx'
import BrandXMarketing from '../components/brandx-marketing.jsx'
import Footer from '../components/footer.jsx'

function BrandX({ onNavigate }) {
  return (
    <main className="brandx-page" style={{ background: '#1a0d05', minHeight: '100vh' }}>
      <Header onNavigate={onNavigate} currentPage="brandx" />
      <BrandXHero />
      <BrandXSkills />
      <BrandXCurriculum />
      <BrandXEnrol />
      <BrandXMarketing onNavigate={onNavigate} />
      <Footer />
    </main>
  )
}

export default BrandX
