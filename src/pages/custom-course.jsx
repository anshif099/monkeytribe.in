import { getCustomCourses } from '../lib/course-catalog';
import Header from '../components/header.jsx'
import CopyCraftHero from '../components/copycraft-hero.jsx'
import CopyCraftAbout from '../components/copycraft-about.jsx'
import CopyCraftSkills from '../components/copycraft-skills.jsx'
import CopyCraftCurriculum from '../components/copycraft-curriculum.jsx'
import CopyCraftMarketing from '../components/copycraft-marketing.jsx'
import Footer from '../components/footer.jsx'

/**
 * Generic custom course page — a full CopyCraft clone.
 * courseId: the unique id (e.g. "custom-course-1")
 * courseName: display label (e.g. "My New Course")
 * All sections are fully editable via the CMS in edit mode.
 */
function CustomCourse({ onNavigate, courseId, courseName }) {
  const course = getCustomCourses().find(c => c.id === courseId);
  const register = () => { window.location.href = `/register?course=${encodeURIComponent(courseId)}`; };
  return (
    <main
      className="copycraft-page custom-course-page"
      style={{ background: '#12051d', minHeight: '100vh' }}
      data-course-id={courseId}
    >
      <Header onNavigate={onNavigate} currentPage={courseId} />
      <CopyCraftHero course={course} onEnrol={register} />
      <CopyCraftAbout />
      <CopyCraftSkills />
      <CopyCraftCurriculum />
      <section className="copycraft-enrol" id="enrol-section"><div className="copycraft-enrol__container"><div><h2>{courseName}</h2><p>{course?.description}</p><p>{course?.duration} � ?{Number(course?.price || 11999).toLocaleString('en-IN')}</p><button className="copycraft-enrol__submit-btn" onClick={register}>Register &amp; Pay</button></div></div></section>
      <CopyCraftMarketing onNavigate={onNavigate} />
      <Footer />
    </main>
  )
}

export default CustomCourse
