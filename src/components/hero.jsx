import { useState, useEffect } from 'react'
import './hero.css'

// ── Colours cycled for new custom tracks ──────────────────────────────────────
const PALETTE = [
  '#1a6b3c', '#b5420d', '#0d4fa8', '#7b1f8a', '#0d7a7a',
  '#a83217', '#3a3aaa', '#2d6e1b', '#8a6e00', '#1e4d6b',
]

// ── Static built-in tracks ────────────────────────────────────────────────────
const STATIC_TRACKS = [
  {
    className: 'prompt',
    label: 'PromptX',
    pageId: 'promptx',
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
    pageId: 'growthx',
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
    pageId: 'brandx',
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
    pageId: 'copycraft',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 4l10 5-4 3-3 7L6 7l2-3z" />
        <path d="M8 4l3 8 7-3" />
      </svg>
    ),
  },
]

// ── localStorage helpers ──────────────────────────────────────────────────────
function loadCustomCourses() {
  try {
    return JSON.parse(localStorage.getItem('mt_custom_courses') || '[]')
  } catch {
    return []
  }
}

function saveCustomCourses(list) {
  localStorage.setItem('mt_custom_courses', JSON.stringify(list))
}

// ── Icon for custom courses ───────────────────────────────────────────────────
function CustomIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  )
}

// ── Main Hero component ───────────────────────────────────────────────────────
function Hero({ onNavigate }) {
  const [customCourses, setCustomCourses] = useState(loadCustomCourses)
  const [isEditMode, setIsEditMode] = useState(false)

  // ── Modal state ────────────────────────────────────────────────────────────
  const [modal, setModal] = useState(null) // null | { mode: 'add' | 'edit', courseId?: string, value: string }

  // Watch for CMS edit mode toggled from CmsManager's body class
  useEffect(() => {
    const check = () => setIsEditMode(document.body.classList.contains('mt-cms-edit-active'))
    const obs = new MutationObserver(check)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    check()
    return () => obs.disconnect()
  }, [])

  // ── Sync courses if another tab/component updates localStorage ─────────────
  useEffect(() => {
    const onStorage = () => setCustomCourses(loadCustomCourses())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // ── Create new course (copy of CopyCraft) ─────────────────────────────────
  const handleAddCourse = () => {
    setModal({ mode: 'add', value: 'New Course' })
  }

  const handleEditCourse = (e, courseId, currentLabel) => {
    e.preventDefault()
    e.stopPropagation()
    setModal({ mode: 'edit', courseId, value: currentLabel })
  }

  const handleDeleteCourse = (e, courseId) => {
    e.preventDefault()
    e.stopPropagation()
    if (!window.confirm('Delete this course page completely? This cannot be undone.')) return
    const updated = customCourses.filter(c => c.id !== courseId)
    saveCustomCourses(updated)
    setCustomCourses(updated)
    // Also clean up any CMS data for this course
    try {
      const cmsData = JSON.parse(localStorage.getItem('mt_cms_data') || '{}')
      delete cmsData[courseId]
      localStorage.setItem('mt_cms_data', JSON.stringify(cmsData))
    } catch {}
  }

  const handleModalConfirm = () => {
    const label = modal.value.trim()
    if (!label) return

    if (modal.mode === 'add') {
      const id = `custom-course-${Date.now()}`
      const colorIndex = customCourses.length % PALETTE.length
      const newCourse = { id, label, color: PALETTE[colorIndex] }
      const updated = [...customCourses, newCourse]
      saveCustomCourses(updated)
      setCustomCourses(updated)
      setModal(null)
      // Navigate to the new page
      if (onNavigate) onNavigate(id)
    } else {
      // Edit existing
      const updated = customCourses.map(c =>
        c.id === modal.courseId ? { ...c, label } : c
      )
      saveCustomCourses(updated)
      setCustomCourses(updated)
      setModal(null)
    }
  }

  const handleModalKeyDown = (e) => {
    if (e.key === 'Enter') handleModalConfirm()
    if (e.key === 'Escape') setModal(null)
  }

  return (
    <section className="hero-section" id="home">
      {/* LCP image */}
      <img
        className="hero-section__face"
        src="/face.webp"
        alt=""
        aria-hidden="true"
        width="420"
        height="387"
        fetchPriority="high"
        loading="eager"
        decoding="sync"
      />

      <div className="hero-section__copy">
        <a
          className="hero-section__eyebrow"
          href="https://creativemonkeys.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span></span>
          Education by Creative Monkeys
        </a>

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
          {/* ── Static tracks ──────────────────────────────────────────── */}
          {STATIC_TRACKS.map((track) => (
            <a
              className={`hero-track hero-track--${track.className}`}
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (onNavigate) onNavigate(track.pageId)
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

          {/* ── Custom course tracks ───────────────────────────────────── */}
          {customCourses.map((course) => (
            <div className="hero-track-wrapper" key={course.id}>
              <a
                className="hero-track hero-track--custom"
                href="#"
                style={{ background: course.color || '#1a6b3c' }}
                onClick={(e) => {
                  e.preventDefault()
                  if (onNavigate) onNavigate(course.id)
                }}
              >
                <CustomIcon />
                <span>{course.label}</span>
                <svg className="hero-track__arrow" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h13" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </a>

              {/* Edit / Delete — visible in edit mode only */}
              {isEditMode && (
                <div className="hero-track-controls mt-cms">
                  <button
                    className="hero-track-ctrl hero-track-ctrl--edit"
                    title="Rename course"
                    onClick={(e) => handleEditCourse(e, course.id, course.label)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                  <button
                    className="hero-track-ctrl hero-track-ctrl--delete"
                    title="Delete course"
                    onClick={(e) => handleDeleteCourse(e, course.id)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* ── Add new course button (edit mode only) ─────────────────── */}
          {isEditMode && (
            <button
              className="hero-track-add mt-cms"
              onClick={handleAddCourse}
              title="Add new course page (copy of CopyCraft)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>New Course</span>
            </button>
          )}
        </div>
      </div>

      <div className="hero-section__marks">
        <a
          href="https://creativemonkeys.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-section__creative-link"
          aria-label="Creative Monkeys"
        >
          <picture>
            <source type="image/webp" srcSet="/creative-monkeys-1x.webp" />
            <img className="hero-section__creative" src="/creative-monkeys.webp" alt="Creative Monkeys Logo" width="142" height="130" loading="lazy" decoding="async" />
          </picture>
        </a>
        <picture>
          <source type="image/webp" srcSet="/logo2-sm.webp 1x, /logo2.webp 2x" />
          <img className="hero-section__logo2" src="/logo2.webp" alt="" aria-hidden="true" width="214" height="267" loading="lazy" decoding="async" />
        </picture>
      </div>

      {/* ── Course name modal ─────────────────────────────────────────────── */}
      {modal && (
        <div className="hero-course-modal-backdrop mt-cms" onClick={() => setModal(null)}>
          <div className="hero-course-modal mt-cms" onClick={(e) => e.stopPropagation()}>
            <h3>{modal.mode === 'add' ? '✦ New Course Page' : '✎ Rename Course'}</h3>
            <p>
              {modal.mode === 'add'
                ? 'A new CopyCraft-style page will be created. You can fully edit it in CMS mode.'
                : 'Update the course name shown in the navigation track.'}
            </p>
            <input
              className="hero-course-modal__input"
              type="text"
              value={modal.value}
              onChange={(e) => setModal({ ...modal, value: e.target.value })}
              onKeyDown={handleModalKeyDown}
              placeholder="Course name..."
              autoFocus
            />
            <div className="hero-course-modal__actions">
              <button className="hero-course-modal__btn hero-course-modal__btn--cancel" onClick={() => setModal(null)}>
                Cancel
              </button>
              <button className="hero-course-modal__btn hero-course-modal__btn--confirm" onClick={handleModalConfirm}>
                {modal.mode === 'add' ? 'Create Page' : 'Save Name'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero
