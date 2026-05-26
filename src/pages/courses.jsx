import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import CoursesHero from '../components/courses-hero.jsx'
import CoursesList from '../components/courses-list.jsx'
import CoursesAdvisor from '../components/courses-advisor.jsx'
import './courses.css'

function Courses({ onNavigate }) {
  return (
    <main className="courses-page">
      {/* Header with Courses tab highlighted */}
      <Header onNavigate={onNavigate} currentPage="courses" />

      {/* New separated Courses Hero component */}
      <CoursesHero />

      {/* Themed high-fidelity course list grid catalog */}
      <CoursesList onNavigate={onNavigate} />

      {/* Call to action: talk to an advisor */}
      <CoursesAdvisor onNavigate={onNavigate} />

      {/* Footer */}
      <Footer />
    </main>
  )
}

export default Courses
