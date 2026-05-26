import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import WebinarsHero from '../components/webinars-hero.jsx'
import WebinarsExpect from '../components/webinars-expect.jsx'
import WebinarsTopics from '../components/webinars-topics.jsx'
import WebinarsNotify from '../components/webinars-notify.jsx'
import WebinarsExplore from '../components/webinars-explore.jsx'
import './webinars.css'

function Webinars({ onNavigate }) {
  return (
    <main className="webinars-page">
      {/* Header — same as contact page */}
      <Header onNavigate={onNavigate} currentPage="webinars" />

      {/* Webinars Hero */}
      <WebinarsHero />

      {/* What to Expect from Webinars */}
      <WebinarsExpect />

      {/* Planned Topics we are building */}
      <WebinarsTopics />

      {/* Register interest / Waitlist Form */}
      <WebinarsNotify />

      {/* Bottom redirection card CTAs */}
      <WebinarsExplore onNavigate={onNavigate} />

      {/* Footer — same as contact page */}
      <Footer />
    </main>
  )
}

export default Webinars
