import './courses-hero.css'

function CoursesHero() {
  return (
    <section className="courses-hero">
      <div className="courses-hero__grid-overlay" aria-hidden="true"></div>
      <div className="courses-hero__container">
        <span className="courses-hero__eyebrow">Our Courses</span>
        <h1 className="courses-hero__title">All Programmes</h1>
        <p className="courses-hero__desc">
          Four courses. Designed by practitioners. Built to transform how you think, create, and grow.
        </p>
      </div>
    </section>
  )
}

export default CoursesHero
