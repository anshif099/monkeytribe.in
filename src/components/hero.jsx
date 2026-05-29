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
    id: 'promptx',
    className: 'prompt',
    defaultLabel: 'PromptX',
    pageId: 'promptx',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l1.8 5.3L19 10l-5.2 1.7L12 17l-1.8-5.3L5 10l5.2-1.7L12 3z" />
        <path d="M5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15z" />
      </svg>
    ),
  },
  {
    id: 'growthx',
    className: 'growth',
    defaultLabel: 'GrowthX',
    pageId: 'growthx',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 16l5-5 4 4 7-8" />
        <path d="M14 7h6v6" />
      </svg>
    ),
  },
  {
    id: 'brandx',
    className: 'brand',
    defaultLabel: 'BrandX',
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
    id: 'copycraft',
    className: 'copy',
    defaultLabel: 'CopyCraft',
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
const LS_CUSTOM   = 'mt_custom_courses'
const LS_STATIC   = 'mt_static_track_overrides'   // { [id]: { label?, hidden? } }

function loadCustomCourses() {
  try { return JSON.parse(localStorage.getItem(LS_CUSTOM) || '[]') } catch { return [] }
}
function saveCustomCourses(list) {
  localStorage.setItem(LS_CUSTOM, JSON.stringify(list))
}
function loadStaticOverrides() {
  try { return JSON.parse(localStorage.getItem(LS_STATIC) || '{}') } catch { return {} }
}
function saveStaticOverrides(obj) {
  localStorage.setItem(LS_STATIC, JSON.stringify(obj))
}

// ── Shared SVG icons for controls ────────────────────────────────────────────
const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
)
const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)
const ArrowIcon = () => (
  <svg className="hero-track__arrow" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13" />
    <path d="M13 6l6 6-6 6" />
  </svg>
)
const CustomIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
)

// ── Shared edit/delete toolbar ────────────────────────────────────────────────
function TrackControls({ onEdit, onDelete }) {
  return (
    <div className="hero-track-controls mt-cms">
      <button
        className="hero-track-ctrl hero-track-ctrl--edit"
        title="Rename track label"
        onClick={onEdit}
      >
        <EditIcon />
      </button>
      <button
        className="hero-track-ctrl hero-track-ctrl--delete"
        title="Remove from hero"
        onClick={onDelete}
      >
        <DeleteIcon />
      </button>
    </div>
  )
}

// ── Main Hero component ───────────────────────────────────────────────────────
function Hero({ onNavigate }) {
  const [customCourses, setCustomCourses]     = useState(loadCustomCourses)
  const [staticOverrides, setStaticOverrides] = useState(loadStaticOverrides)
  const [isEditMode, setIsEditMode]           = useState(false)

  // null | { type: 'add' | 'edit-static' | 'edit-custom', id?: string, value: string }
  const [modal, setModal] = useState(null)

  // ── Watch CMS edit mode class ──────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsEditMode(document.body.classList.contains('mt-cms-edit-active'))
    const obs = new MutationObserver(check)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    check()
    return () => obs.disconnect()
  }, [])

  // ── Cross-tab storage sync ─────────────────────────────────────────────────
  useEffect(() => {
    const onStorage = () => {
      setCustomCourses(loadCustomCourses())
      setStaticOverrides(loadStaticOverrides())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // ── Static track helpers ───────────────────────────────────────────────────
  const getStaticLabel = (track) =>
    staticOverrides[track.id]?.label ?? track.defaultLabel

  const isStaticHidden = (track) =>
    staticOverrides[track.id]?.hidden === true

  const hiddenStaticTracks = STATIC_TRACKS.filter(isStaticHidden)

  const handleStaticEdit = (e, track) => {
    e.preventDefault(); e.stopPropagation()
    setModal({ type: 'edit-static', id: track.id, value: getStaticLabel(track) })
  }

  const handleStaticDelete = (e, track) => {
    e.preventDefault(); e.stopPropagation()
    if (!window.confirm(`Hide "${getStaticLabel(track)}" from the hero section?\nThe page itself is kept — you can restore it anytime.`)) return
    const updated = { ...staticOverrides, [track.id]: { ...staticOverrides[track.id], hidden: true } }
    saveStaticOverrides(updated)
    setStaticOverrides(updated)
  }

  const handleRestoreStatic = (e, trackId) => {
    e.preventDefault(); e.stopPropagation()
    const updated = { ...staticOverrides, [trackId]: { ...staticOverrides[trackId], hidden: false } }
    saveStaticOverrides(updated)
    setStaticOverrides(updated)
  }

  // ── Custom course helpers ──────────────────────────────────────────────────
  const handleCustomEdit = (e, course) => {
    e.preventDefault(); e.stopPropagation()
    setModal({ type: 'edit-custom', id: course.id, value: course.label })
  }

  const handleCustomDelete = (e, courseId) => {
    e.preventDefault(); e.stopPropagation()
    if (!window.confirm('Delete this custom course page completely? This cannot be undone.')) return
    const updated = customCourses.filter(c => c.id !== courseId)
    saveCustomCourses(updated)
    setCustomCourses(updated)
    try {
      const cms = JSON.parse(localStorage.getItem('mt_cms_data') || '{}')
      delete cms[courseId]
      localStorage.setItem('mt_cms_data', JSON.stringify(cms))
    } catch {}
  }

  // ── Add new course ─────────────────────────────────────────────────────────
  const handleAddCourse = () => {
    setModal({ type: 'add', value: 'New Course' })
  }

  // ── Modal confirm ──────────────────────────────────────────────────────────
  const handleModalConfirm = () => {
    const label = modal.value.trim()
    if (!label) return

    if (modal.type === 'add') {
      const id = `custom-course-${Date.now()}`
      const colorIndex = customCourses.length % PALETTE.length
      const newCourse = { id, label, color: PALETTE[colorIndex] }
      const updated = [...customCourses, newCourse]
      saveCustomCourses(updated)
      setCustomCourses(updated)
      setModal(null)
      if (onNavigate) onNavigate(id)

    } else if (modal.type === 'edit-static') {
      const updated = { ...staticOverrides, [modal.id]: { ...staticOverrides[modal.id], label } }
      saveStaticOverrides(updated)
      setStaticOverrides(updated)
      setModal(null)

    } else if (modal.type === 'edit-custom') {
      const updated = customCourses.map(c => c.id === modal.id ? { ...c, label } : c)
      saveCustomCourses(updated)
      setCustomCourses(updated)
      setModal(null)
    }
  }

  const handleModalKeyDown = (e) => {
    if (e.key === 'Enter') handleModalConfirm()
    if (e.key === 'Escape') setModal(null)
  }

  // ── Visible static tracks ──────────────────────────────────────────────────
  const visibleStaticTracks = STATIC_TRACKS.filter(t => !isStaticHidden(t))

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

          {/* ── Static tracks (with edit/delete in edit mode) ─────────── */}
          {visibleStaticTracks.map((track) => (
            <div className="hero-track-wrapper" key={track.id}>
              {isEditMode && (
                <TrackControls
                  onEdit={(e) => handleStaticEdit(e, track)}
                  onDelete={(e) => handleStaticDelete(e, track)}
                />
              )}
              <a
                className={`hero-track hero-track--${track.className}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (onNavigate) onNavigate(track.pageId)
                }}
              >
                {track.icon}
                <span>{getStaticLabel(track)}</span>
                <ArrowIcon />
              </a>
            </div>
          ))}

          {/* ── Custom course tracks (with edit/delete in edit mode) ───── */}
          {customCourses.map((course) => (
            <div className="hero-track-wrapper" key={course.id}>
              {isEditMode && (
                <TrackControls
                  onEdit={(e) => handleCustomEdit(e, course)}
                  onDelete={(e) => handleCustomDelete(e, course.id)}
                />
              )}
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
                <ArrowIcon />
              </a>
            </div>
          ))}

          {/* ── + New Course button (edit mode only) ──────────────────── */}
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

        {/* ── Restore hidden static tracks (edit mode, if any are hidden) ── */}
        {isEditMode && hiddenStaticTracks.length > 0 && (
          <div className="hero-restore-row mt-cms">
            <span className="hero-restore-label">Hidden tracks:</span>
            {hiddenStaticTracks.map(track => (
              <button
                key={track.id}
                className="hero-restore-btn mt-cms"
                onClick={(e) => handleRestoreStatic(e, track.id)}
                title={`Restore ${getStaticLabel(track)}`}
              >
                + {getStaticLabel(track)}
              </button>
            ))}
          </div>
        )}
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

      {/* ── Modal ─────────────────────────────────────────────────────────── */}
      {modal && (
        <div className="hero-course-modal-backdrop mt-cms" onClick={() => setModal(null)}>
          <div className="hero-course-modal mt-cms" onClick={(e) => e.stopPropagation()}>
            <h3>
              {modal.type === 'add'
                ? '✦ New Course Page'
                : '✎ Rename Track'}
            </h3>
            <p>
              {modal.type === 'add'
                ? 'A new CopyCraft-style page will be created. You can fully edit every section in CMS mode.'
                : 'Update the label shown on this course track button.'}
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
                {modal.type === 'add' ? 'Create Page' : 'Save Name'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero
