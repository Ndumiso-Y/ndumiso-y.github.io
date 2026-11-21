import React, { useState, useEffect, useRef } from 'react'
import aboutData from '@/content/about.json'
import { content } from '../../content'
import { withBase } from '../../lib/withBase'
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss,
  SiCanva, SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign
} from 'react-icons/si'
import { TbCircleLetterC } from 'react-icons/tb'
import { AiFillHeart } from 'react-icons/ai'

// About — Gate 1 static proposal, extending the accepted hero's design language
// (off-white canvas, flat teal field, Montserrat display, glass accents).

function getSkillIcon(label) {
  const n = label.trim().toLowerCase()
  if (n === 'html' || n === 'html5') return { Icon: SiHtml5, color: '#E34F26' }
  if (n === 'css' || n === 'css3') return { Icon: SiCss3, color: '#1572B6' }
  if (n === 'javascript' || n === 'js') return { Icon: SiJavascript, color: '#d9b800' }
  if (n === 'react') return { Icon: SiReact, color: '#149eca' }
  if (n === 'tailwind' || n === 'tailwind css') return { Icon: SiTailwindcss, color: '#0ea5e9' }
  if (n === 'canva') return { Icon: SiCanva, color: '#00a8b0' }
  if (n === 'adobe photoshop' || n === 'photoshop' || n === 'ps')
    return { Icon: SiAdobephotoshop, color: '#1f7ad6' }
  if (n === 'adobe illustrator' || n === 'illustrator' || n === 'ai')
    return { Icon: SiAdobeillustrator, color: '#e68a00' }
  if (n === 'adobe indesign' || n === 'indesign' || n === 'id')
    return { Icon: SiAdobeindesign, color: '#e2335c' }
  if (n === 'claude' || n === 'claude.ai' || n === 'claude code' || n === 'anthropic')
    return { Icon: TbCircleLetterC, color: '#0e5c66' }
  if (n === 'lovable' || n === 'loveable') return { Icon: AiFillHeart, color: '#EC4899' }
  return { Icon: null, color: '#0e5c66' }
}

// Draft group labels (new micro-copy, logged for owner approval). Every skill stays in its
// original order inside its group; anything not listed falls into the last group.
const skillGroups = [
  { label: 'Build', names: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind'] },
  { label: 'Design', names: ['Canva', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign'] },
  { label: 'AI-assisted tools', names: ['Claude Code', 'Lovable'] }
]

function groupSkills(skills) {
  const norm = s => (typeof s === 'string' ? { name: s, description: null } : s)
  const all = skills.map(norm)
  const used = new Set()
  const groups = skillGroups.map(g => {
    const items = all.filter(s => g.names.includes(s.name))
    items.forEach(s => used.add(s.name))
    return { label: g.label, items }
  })
  const rest = all.filter(s => !used.has(s.name))
  if (rest.length) groups[groups.length - 1].items.push(...rest)
  return groups.filter(g => g.items.length)
}

function Eyebrow({ children, light = false }) {
  return (
    <p className={`flex items-center gap-4 text-[13px] font-semibold tracking-[0.22em] uppercase ${light ? 'text-white' : 'text-[#1d2a2e]'}`}>
      <span className="block w-10 h-[3px] bg-[#41b3bc] rounded-full flex-none" aria-hidden="true" />
      {children}
    </p>
  )
}

const pill = 'inline-flex items-center justify-center gap-2 min-h-[44px] px-4 rounded-full text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e5c66] focus-visible:ring-offset-2'
const pillSolid = `${pill} bg-[#0e5c66] text-white hover:bg-[#0b4c55]`
const pillLine = `${pill} border border-[#c9d0d1] text-[#121417] bg-white hover:border-[#0e5c66]`

function ExtIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" />
    </svg>
  )
}

export default function AboutModern() {
  const items = Array.isArray(content?.badges) ? content.badges : []
  const [modal, setModal] = useState({ open: false, idx: -1, mode: null, scale: 1 })
  const closeRef = useRef(null)
  const [showDetails, setShowDetails] = useState(false)
  const lastTrigger = useRef(null)

  const openSnippet = (idx, el) => { lastTrigger.current = el; setModal({ open: true, idx, mode: 'snippet', scale: 1 }) }
  const openZoom = (idx, el) => { lastTrigger.current = el; setModal({ open: true, idx, mode: 'zoom', scale: 1 }) }
  const close = () => {
    setModal({ open: false, idx: -1, mode: null, scale: 1 })
    lastTrigger.current?.focus?.()
  }
  const zoomIn = () => setModal(m => ({ ...m, scale: Math.min(3, +(m.scale + 0.25).toFixed(2)) }))
  const zoomOut = () => setModal(m => ({ ...m, scale: Math.max(1, +(m.scale - 0.25).toFixed(2)) }))
  const zoomReset = () => setModal(m => ({ ...m, scale: 1 }))

  useEffect(() => {
    if (!modal.open) return
    closeRef.current?.focus()
    const onKey = e => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [modal.open])

  const groups = groupSkills(aboutData.skills || [])
  const current = modal.open ? items[modal.idx] : null

  return (
    <section id="about" className="relative bg-[#fbfbf9] text-[#121417] py-14 lg:py-28">
      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-[clamp(32px,5vw,88px)]">

        {/* ===== Intro ===== */}
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16 xl:gap-24 items-center">
          {/* Portrait panel — existing standing cut-out on the hero's flat teal */}
          <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
            <div className="relative aspect-[1/1] sm:aspect-[4/5] max-h-[560px] lg:max-h-none rounded-[28px] bg-[#48aab7] overflow-hidden">
              <img
                src={withBase('/assets/ndu-icon.png')}
                alt=""
                aria-hidden="true"
                className="absolute top-[6%] right-[5%] w-[34%] opacity-[0.13] mix-blend-multiply select-none"
              />
              <img
                src={withBase('/assets/ndu-standing-cutout.webp')}
                alt={aboutData.name}
                width="832"
                height="1248"
                loading="lazy"
                className="absolute bottom-[-2%] left-1/2 -translate-x-[70%] h-[100%] w-auto max-w-none drop-shadow-[0_24px_30px_rgba(9,40,46,0.3)]"
              />
            </div>
            {/* Experience chip */}
            <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 hero-glass-light rounded-2xl px-4 py-3 flex items-center gap-3">
              <span className="hero-display text-[34px] leading-none text-[#0e5c66]">5+</span>
              <span className="text-[14px] leading-tight">
                <span className="block font-semibold text-[#121417]">Years</span>
                <span className="block text-[#3b4448]">Experience</span>
              </span>
            </div>
          </div>

          {/* Copy */}
          <div>
            <Eyebrow>About Me</Eyebrow>
            <h2 className="hero-display mt-5 text-[clamp(36px,8.6vw,46px)] lg:text-[clamp(44px,4vw,64px)] leading-[1.02] tracking-[-0.02em]">
              Building Digital Experiences That <span className="text-[#0e5c66]">Matter</span><span className="text-[#41b3bc]" aria-hidden="true">.</span>
            </h2>
            <p className="mt-6 max-w-[56ch] text-[17px] lg:text-[19px] leading-relaxed text-[#3b4448]">{aboutData.lead}</p>
            {aboutData.software && (
              <p className="mt-4 max-w-[56ch] text-[16px] lg:text-[17px] leading-relaxed text-[#3b4448]">{aboutData.software}</p>
            )}

            <ul className="mt-7 border-t border-[#121417]/10">
              {aboutData.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-4 py-3 sm:py-4 border-b border-[#121417]/10">
                  <span className="mt-0.5 flex-none w-7 h-7 rounded-full bg-[#41b3bc]/15 text-[#0e5c66] flex items-center justify-center" aria-hidden="true">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-[16px] lg:text-[17px] leading-relaxed text-[#26302f]">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Venture: only the radar mark is shown, not the full logo (owner, 21 Nov 2026); no link until launch */}
            {aboutData.venture && (
              <div data-venture className="mt-7 rounded-[22px] bg-white border border-[#121417]/10 shadow-[0_18px_36px_-28px_rgba(10,30,34,0.5)] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="flex-none w-16 h-16 rounded-2xl bg-[#f4f6f6] border border-[#121417]/[0.06] flex items-center justify-center">
                  <img src={withBase(aboutData.venture.mark)} alt={`${aboutData.venture.name} logo mark`} width="44" height="44" loading="lazy" decoding="async" className="w-11 h-11" draggable={false} />
                </div>
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="hero-display text-[22px] sm:text-[24px] leading-tight text-[#121417]">{aboutData.venture.name}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#41b3bc]/15 text-[#0b4c55] px-3 py-1 text-[12px] font-semibold tracking-[0.12em] uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0e5c66]" aria-hidden="true" />
                      {aboutData.venture.status}
                    </span>
                  </p>
                  <p className="mt-1 text-[14px] font-semibold tracking-[0.14em] uppercase text-[#0e5c66]">{aboutData.venture.role}</p>
                  <p className="mt-2 text-[16px] leading-relaxed text-[#3b4448]">{aboutData.venture.desc}</p>
                </div>
              </div>
            )}

            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-3 min-h-[52px] px-8 rounded-full bg-[#0e5c66] text-white text-[16px] font-semibold shadow-[0_10px_24px_-12px_rgba(14,92,102,0.8)] hover:bg-[#0b4c55] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0e5c66]"
            >
              Let's Work Together
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
        </div>

        {/* ===== Skills & Tools ===== */}
        <div id="skills" className="scroll-mt-24 mt-14 lg:mt-28 pt-10 lg:pt-20 border-t border-[#121417]/10">
          <div className="grid gap-6 lg:grid-cols-[5fr_7fr] lg:gap-16 xl:gap-24 items-end">
            <div>
              <Eyebrow>Skills &amp; Tools</Eyebrow>
              <h3 className="hero-display mt-5 text-[clamp(32px,7.5vw,40px)] lg:text-[clamp(38px,3.2vw,52px)] leading-[1.05] tracking-[-0.02em]">
                Technical <span className="text-[#0e5c66]">Expertise</span><span className="text-[#41b3bc]" aria-hidden="true">.</span>
              </h3>
            </div>
            <p className="text-[17px] lg:text-[18px] text-[#3b4448]">Proficient in modern development tools and design platforms</p>
          </div>

          <button
            type="button"
            onClick={() => setShowDetails(v => !v)}
            aria-expanded={showDetails}
            className={`md:hidden mt-6 ${pillLine}`}
          >
            {showDetails ? 'Hide tool details' : 'Show tool details'}
          </button>

          <div className="mt-8 md:mt-10 grid gap-x-10 gap-y-8 md:gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {groups.map(group => (
              <div key={group.label}>
                <h4 className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#0e5c66] pb-3 border-b-2 border-[#121417]">{group.label}</h4>
                <ul className={showDetails ? '' : 'grid grid-cols-2 gap-x-4 md:block'}>
                  {group.items.map(skill => {
                    const { Icon, color } = getSkillIcon(skill.name)
                    return (
                      <li key={skill.name} className="flex items-start gap-3 md:gap-4 py-3 md:py-4 border-b border-[#121417]/10">
                        <span className="flex-none w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}1a` }} aria-hidden="true">
                          {Icon && <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color }} />}
                        </span>
                        <span>
                          <span className="block text-[15px] md:text-[16px] font-semibold leading-snug text-[#121417] pt-1.5 md:pt-0">{skill.name}</span>
                          {skill.description && <span className={`${showDetails ? 'block' : 'hidden md:block'} mt-0.5 text-[15px] leading-snug text-[#4a5458]`}>{skill.description}</span>}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Badges & Recognition ===== */}
        {items.length > 0 && (
          <div className="mt-14 lg:mt-28 pt-10 lg:pt-20 border-t border-[#121417]/10">
            <div className="grid gap-6 lg:grid-cols-[5fr_7fr] lg:gap-16 xl:gap-24 items-end">
              <div>
                <Eyebrow>Achievements</Eyebrow>
                <h3 className="hero-display mt-5 text-[clamp(32px,7.5vw,40px)] lg:text-[clamp(38px,3.2vw,52px)] leading-[1.05] tracking-[-0.02em]">
                  Badges &amp; <span className="text-[#0e5c66]">Recognition</span><span className="text-[#41b3bc]" aria-hidden="true">.</span>
                </h3>
              </div>
              {content?.sectionIntros?.badges && (
                <p className="text-[17px] lg:text-[18px] text-[#3b4448]">{content.sectionIntros.badges}</p>
              )}
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((b, i) => {
                const isSnippet = !!b.snippetImg || !!b.snippet
                const isZoom = !!b.zoom
                // Same priority as before: the evidence letter opens first, otherwise zoom
                const openMain = isSnippet ? el => openSnippet(i, el) : isZoom ? el => openZoom(i, el) : null

                const media = (
                  <img
                    src={withBase(b.img)}
                    alt={b.name || 'Badge'}
                    loading="lazy"
                    decoding="async"
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-sm transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                )

                return (
                  <article key={b.key || b.name || i} className="group grid grid-cols-[104px_1fr] md:flex md:flex-col rounded-[22px] bg-white border border-[#121417]/10 overflow-hidden shadow-[0_18px_36px_-28px_rgba(10,30,34,0.5)]">
                    {openMain ? (
                      <button
                        type="button"
                        onClick={e => openMain(e.currentTarget)}
                        className="relative md:aspect-[4/3] bg-[#eef1f1] p-3 md:p-7 flex items-center justify-center cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0e5c66]"
                        aria-label={`Open ${b.name}`}
                      >
                        {media}
                        <span className="hidden md:flex absolute right-3 top-3 w-10 h-10 rounded-full bg-white/90 text-[#0e5c66] items-center justify-center shadow-sm" aria-hidden="true">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5M11 8v6M8 11h6" /></svg>
                        </span>
                      </button>
                    ) : (
                      <div className="md:aspect-[4/3] bg-[#eef1f1] p-3 md:p-7 flex items-center justify-center">{media}</div>
                    )}

                    <div className="flex-1 flex flex-col p-4 md:p-6 border-l-4 md:border-l-0 md:border-t-4 border-[#41b3bc]">
                      <h4 className="text-[16px] md:text-[18px] font-semibold leading-snug text-[#121417]">{b.name || '—'}</h4>
                      {b.note && <p className="mt-2 text-[15px] leading-relaxed text-[#4a5458]">{b.note}</p>}
                      <div className="mt-auto pt-4 md:pt-5 flex flex-wrap gap-2">
                        {b.url && <a className={pillLine} href={b.url} target="_blank" rel="noreferrer">Visit site <ExtIcon /></a>}
                        {b.post && <a className={pillLine} href={b.post} target="_blank" rel="noreferrer">LinkedIn <ExtIcon /></a>}
                        {isSnippet && <button type="button" className={pillSolid} onClick={e => openSnippet(i, e.currentTarget)}>Letter</button>}
                        {isZoom && <button type="button" className={isSnippet ? pillLine : pillSolid} onClick={e => openZoom(i, e.currentTarget)}>Zoom</button>}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* ===== Modal (same modes and zoom controls as before) ===== */}
      {current && (
        <div className="fixed inset-0 z-[60] bg-[#0b1416]/70 backdrop-blur-sm p-4 grid place-items-center" onClick={close}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-modal-title"
            className="max-w-3xl w-full max-h-[92vh] overflow-auto rounded-[22px] bg-white text-[#121417] p-5 sm:p-7 relative shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              onClick={close}
              aria-label="Close"
              className="absolute top-3 right-3 w-11 h-11 rounded-full bg-[#eef1f1] hover:bg-[#dfe4e4] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e5c66]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            <h3 id="about-modal-title" className="pr-14 text-[20px] font-semibold">{current.name}</h3>

            {modal.mode === 'snippet' && current.snippet && (
              <p className="mt-3 text-[16px] leading-relaxed text-[#3b4448] whitespace-pre-line">{current.snippet}</p>
            )}

            {((modal.mode === 'snippet' && current.snippetImg) || modal.mode === 'zoom') && (
              <>
                <div className="mt-4 border border-[#121417]/10 rounded-xl overflow-auto bg-[#eef1f1]">
                  <div className="w-full grid place-items-center" style={{ minHeight: modal.mode === 'zoom' ? 360 : 320 }}>
                    <img
                      src={withBase(modal.mode === 'zoom' ? (current.modalImg || current.img) : current.snippetImg)}
                      alt={modal.mode === 'zoom' ? current.name : 'Acceptance letter snippet'}
                      onContextMenu={e => e.preventDefault()}
                      style={{ transform: `scale(${modal.scale})`, transformOrigin: 'center center', transition: 'transform 120ms ease' }}
                      className="max-w-full max-h-[70vh] object-contain"
                    />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  <button onClick={zoomOut} className={pillLine}>− Zoom out</button>
                  <button onClick={zoomIn} className={pillLine}>+ Zoom in</button>
                  <button onClick={zoomReset} className={pillLine}>Reset</button>
                  {modal.mode === 'zoom' && current.post && (
                    <a href={current.post} target="_blank" rel="noreferrer" className={`${pillSolid} sm:ml-auto`}>See LinkedIn post <ExtIcon /></a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
