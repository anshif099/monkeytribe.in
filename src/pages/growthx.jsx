import Header from '../components/header.jsx'
import GrowthXHero from '../components/growthx-hero.jsx'
import GrowthXSkills from '../components/growthx-skills.jsx'
import GrowthXCurriculum from '../components/growthx-curriculum.jsx'
import GrowthXEnrol from '../components/growthx-enrol.jsx'
import GrowthXMarketing from '../components/growthx-marketing.jsx'
import Footer from '../components/footer.jsx'

function GrowthX({ onNavigate }) {
  return (
    <main className="growthx-page" style={{ background: '#03170e', minHeight: '100vh' }}>
      <Header onNavigate={onNavigate} currentPage="growthx" />
      <GrowthXHero />
      <GrowthXSkills />
      <GrowthXCurriculum />
      <GrowthXEnrol />
      <GrowthXMarketing onNavigate={onNavigate} />
      <Footer />
    </main>
  )
}

export default GrowthX
