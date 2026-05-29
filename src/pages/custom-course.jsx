import Header from '../components/header.jsx'
import CopyCraftHero from '../components/copycraft-hero.jsx'
import CopyCraftAbout from '../components/copycraft-about.jsx'
import CopyCraftSkills from '../components/copycraft-skills.jsx'
import CopyCraftCurriculum from '../components/copycraft-curriculum.jsx'
import CopyCraftEnrol from '../components/copycraft-enrol.jsx'
import CopyCraftMarketing from '../components/copycraft-marketing.jsx'
import Footer from '../components/footer.jsx'

/**
 * Generic custom course page — a full CopyCraft clone.
 * courseId: the unique id (e.g. "custom-course-1")
 * courseName: display label (e.g. "My New Course")
 * All sections are fully editable via the CMS in edit mode.
 */
function CustomCourse({ onNavigate, courseId, courseName }) {
  return (
    <main
      className="copycraft-page custom-course-page"
      style={{ background: '#12051d', minHeight: '100vh' }}
      data-course-id={courseId}
    >
      <Header onNavigate={onNavigate} currentPage={courseId} />
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

export default CustomCourse
