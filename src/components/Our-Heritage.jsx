import aboutBrand from '../assets/about-brand.webp'
import './Our-Heritage.css'

function OurHeritage() {
  return (
    <section className="our-heritage" id="about">
      <div className="our-heritage__inner footer-container">
        <div className="our-heritage__content">
          <p className="our-heritage__eyebrow">Our Heritage</p>

          <h2>
            Born from a creative agency.
            <span>Built for the AI era.</span>
          </h2>

          <p>
            Monkey Tribe is the education &amp; training division of{' '}
            <strong>Creative Monkeys Advertising Pvt. Ltd.</strong> &mdash; a full-service
            advertising agency with deep roots in brand strategy, digital marketing, and
            creative communication.
          </p>

          <p>
            We don't just teach AI theory. We teach AI the way practitioners use it
            &mdash; with real campaigns, real briefs, and real outcomes. Our courses
            are built by professionals who use these tools every day.
          </p>
        </div>

        <div className="our-heritage__media">
          <img src={aboutBrand} alt="Creative Monkeys team in a studio" width="1200" height="800" loading="lazy" />

          <div className="our-heritage__badge">
            <span>A division of</span>
            <strong>Creative Monkeys Advertising</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurHeritage
