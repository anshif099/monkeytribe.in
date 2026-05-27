import creativeMonkeys from '../assets/creative-monkeys.webp'
import face from '../assets/face.webp'
import logo2 from '../assets/logo2.webp'
import './hero.css'

const tracks = [
  {
    className: 'prompt',
    label: 'PromptX',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l1.8 5.3L19 10l-5.2 1.7L12 17l-1.8-5.3L5 10l5.2-1.7L12 3z" />
        <path d="M5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15z" />
      </svg>
    ),
  },
  {
    className: 'growth',
    label: 'GrowthX',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 16l5-5 4 4 7-8" />
        <path d="M14 7h6v6" />
      </svg>
    ),
  },
  {
    className: 'brand',
    label: 'BrandX',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l8 4-8 4-8-4 8-4z" />
        <path d="M4 12l8 4 8-4" />
        <path d="M4 17l8 4 8-4" />
      </svg>
    ),
  },
  {
    className: 'copy',
    label: 'CopyCraft',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 4l10 5-4 3-3 7L6 7l2-3z" />
        <path d="M8 4l3 8 7-3" />
      </svg>
    ),
  },
]

function Hero({ onNavigate }) {
  return (
    <section className="hero-section" id="home">
      <img className="hero-section__face" src={face} alt="" aria-hidden="true" width="400" height="369" fetchpriority="high" loading="eager" />

      <div className="hero-section__copy">
        <div className="hero-section__eyebrow">
          <span></span>
          Education by Creative Monkeys
        </div>

        <h1>
          <span>Master the</span>
          <strong>Future of AI.</strong>
        </h1>

        <p>
          Monkey Tribe is the education &amp; training division of Creative Monkeys
          Advertising &mdash; bringing advertising intelligence and AI expertise
          together in programmes built for the real world.
        </p>

        <div className="hero-section__tracks" aria-label="Course tracks">
          {tracks.map((track) => (
            <a
              className={`hero-track hero-track--${track.className}`}
              href={['prompt', 'growth', 'brand', 'copy'].includes(track.className) ? '#' : '#courses'}
              onClick={(e) => {
                if (track.className === 'prompt') {
                  e.preventDefault();
                  if (onNavigate) onNavigate('promptx');
                } else if (track.className === 'growth') {
                  e.preventDefault();
                  if (onNavigate) onNavigate('growthx');
                } else if (track.className === 'brand') {
                  e.preventDefault();
                  if (onNavigate) onNavigate('brandx');
                } else if (track.className === 'copy') {
                  e.preventDefault();
                  if (onNavigate) onNavigate('copycraft');
                }
              }}
              key={track.label}
            >
              {track.icon}
              <span>{track.label}</span>
              <svg className="hero-track__arrow" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h13" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      <div className="hero-section__marks" aria-hidden="true">
        <img className="hero-section__creative" src={creativeMonkeys} alt="" width="200" height="266" loading="lazy" />
        <img className="hero-section__logo2" src={logo2} alt="" width="300" height="375" loading="lazy" />
      </div>

      {/* <div className="hero-section__scroll" aria-hidden="true">
        <span>Scroll</span>
      </div> */}
    </section>
  )
}

export default Hero
