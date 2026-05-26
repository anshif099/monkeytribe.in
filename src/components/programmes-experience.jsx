import './programmes-experience.css'

const STATS = [
  { value: '3–5',   label: 'Days of Deep Focus' },
  { value: '20',    label: 'Max Group Size' },
  { value: '100%',  label: 'Hands-On Learning' },
  { value: '∞',     label: 'Post-Programme Access' },
]

function ProgrammesExperience() {
  return (
    <section className="prog-experience" aria-label="The Experience">
      <div className="prog-experience__container">

        {/* ── Left: copy ── */}
        <div className="prog-experience__left">
          <span className="prog-experience__eyebrow">The Experience</span>

          <h2 className="prog-experience__heading">
            More than a course.<br />A transformation.
          </h2>

          <div className="prog-experience__body">
            <p className="prog-experience__para">
              Residential learning is fundamentally different from online courses. When you remove distractions, surround yourself with peers, and have direct access to expert facilitators — the depth of learning is incomparable.
            </p>
            <p className="prog-experience__para">
              Every Monkey Tribe residential programme is carefully designed to balance structured learning with space for reflection, conversation, and genuine connection.
            </p>
          </div>
        </div>

        {/* ── Right: 2×2 stat cards ── */}
        <div className="prog-experience__right">
          {STATS.map((stat) => (
            <div key={stat.label} className="prog-experience__stat">
              <span className="prog-experience__stat-value">{stat.value}</span>
              <span className="prog-experience__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ProgrammesExperience
