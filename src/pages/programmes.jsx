import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import ProgrammesHero from '../components/programmes-hero.jsx'
import ProgrammesList from '../components/programmes-list.jsx'
import ProgrammesExperience from '../components/programmes-experience.jsx'
import ProgrammesFaq from '../components/programmes-faq.jsx'
import ProgrammesWaitlist from '../components/programmes-waitlist.jsx'
import ProgrammesOnlineCta from '../components/programmes-online-cta.jsx'
import './programmes.css'

function Programmes({ onNavigate }) {
  return (
    <main className="programmes-page">
      {/* Header — same as home page */}
      <Header onNavigate={onNavigate} currentPage="programmes" />

      {/* Programmes Hero */}
      <ProgrammesHero />

      {/* Three ways to learn in person */}
      <ProgrammesList />

      {/* The Experience — dark stats section */}
      <ProgrammesExperience />

      {/* FAQ accordion */}
      <ProgrammesFaq />

      {/* Waitlist registration */}
      <ProgrammesWaitlist />

      {/* Bottom banner: redirect to online courses */}
      <ProgrammesOnlineCta onNavigate={onNavigate} />

      {/* Footer — same as home page */}
      <Footer />
    </main>
  )
}

export default Programmes
