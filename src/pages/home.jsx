import AiJourney from '../components/ai-journey.jsx'
import ComingSoon from '../components/comingsoon.jsx'
import Footer from '../components/footer.jsx'
import Header from '../components/header.jsx'
import HomeCarousel from '../components/home-carousel.jsx'
import Hero from '../components/hero.jsx'
import OurHeritage from '../components/Our-Heritage.jsx'
import OurCourses from '../components/our-courses.jsx'
import './home.css'

function Home({ onNavigate }) {
  return (
    <main className="home-page">
      <Header onNavigate={onNavigate} currentPage="home" />
      <HomeCarousel />
      <Hero onNavigate={onNavigate} />
      <OurCourses onNavigate={onNavigate} />
      <OurHeritage />
      <ComingSoon />
      <AiJourney onNavigate={onNavigate} />
      <Footer />
    </main>
  )
}

export default Home
