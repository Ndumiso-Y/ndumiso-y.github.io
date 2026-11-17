import React, { useEffect, useRef, useState } from 'react'
import { content } from '../../content'
import { withBase } from '../../lib/withBase'
import { lighter } from '../../lib/lighter'
import { trackGraphicsSlidesClick } from '../../lib/analytics'

// Graphics & Branding — static redesign. Light gallery on the hero's off-white canvas.
// Every image keeps its native aspect ratio (no cropping). Same items, PDF links,
// opening-event carousel (3 s auto-advance), gallery/zoom modal and mobile reveal as before.

const src = p => withBase(lighter(p))

const pill = 'inline-flex items-center justify-center gap-2 min-h-[44px] px-4 rounded-full text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e5c66] focus-visible:ring-offset-2'
const pillSolid = `${pill} bg-[#0e5c66] text-white hover:bg-[#0b4c55]`
const pillLine = `${pill} border border-[#c9d0d1] text-[#121417] bg-white hover:border-[#0e5c66]`

// Native ratios of the existing artwork (width / height)
const RATIO = {
  '/assets/tvei-opening.jpg': 1,
  '/assets/tvei-vine-bottle.jpg': 800 / 1131,
  '/assets/hakem-banner.jpg': 1600 / 1200,
  '/assets/hakem-bike.jpg': 1920 / 1344
}

function SlidesIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4M10 8.5v5l4-2.5-4-2.5z" />
    </svg>
  )
}

function PdfIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  )
}

function Chevron({ dir }) {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 6l6 6-6 6'} />
    </svg>
  )
}

function Eyebrow({ children }) {
  return (
    <h3 className="flex items-center gap-4 text-[13px] font-semibold tracking-[0.22em] uppercase text-[#0e5c66]">
      <span className="block w-10 h-[3px] bg-[#48aab7] rounded-full" aria-hidden="true" />
      {children}
    </h3>
  )
}

function RevealButton({ expanded, onClick, count, what, controls }) {
  return (
    <button type="button" onClick={onClick} aria-expanded={expanded} aria-controls={controls} className={`${pillLine} mt-6 md:hidden`}>
      {expanded ? 'Show less' : `View all ${count} ${what}`}
    </button>
  )
}

export default function GraphicsModern() {
  const intro = content?.sectionIntros?.graphics
  const logos = Array.isArray(content?.logos) ? content.logos : []
  const tvei = Array.isArray(content?.tvei?.items) ? content.tvei.items : []

  // Mobile reveal (as before: phones show the first item of each block until expanded)
  const [isDesktop, setIsDesktop] = useState(true)
  const [moreLogos, setMoreLogos] = useState(false)
  const [moreDesign, setMoreDesign] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const set = () => setIsDesktop(mq.matches)
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])
  const collapse = setter => {
    setter(false)
    document.getElementById('graphics')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const logosVisible = isDesktop || moreLogos ? logos : logos.slice(0, 1)
  const designVisible = isDesktop || moreDesign ? tvei : tvei.slice(0, 1)

  // Opening-event carousel (auto-advances every 3 s; pauses on hover/focus and for reduced motion)
  const opening = tvei[0]?.gallery?.length ? tvei[0].gallery : null
  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (!opening || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setSlide(i => (i + 1) % opening.length), 3000)
    return () => clearInterval(id)
  }, [opening, paused])
  const step = d => opening && setSlide(i => (i + d + opening.length) % opening.length)

  // Modal: gallery (opening event) or zoom (single artwork)
  const [modal, setModal] = useState({ open: false, mode: null, itemIdx: -1, imgIdx: 0, scale: 1 })
  const closeRef = useRef(null)
  const lastTrigger = useRef(null)
  const openGallery = (itemIdx, startAt, el) => { lastTrigger.current = el; setModal({ open: true, mode: 'gallery', itemIdx, imgIdx: startAt, scale: 1 }) }
  // Logo slides open in the same viewer, view-only (no PDF link)
  const openSlides = (it, el) => {
    lastTrigger.current = el
    setModal({ open: true, mode: 'gallery', itemIdx: -1, imgIdx: 0, scale: 1,
      item: { title: `${it.name || 'Logo'} — slides`, galleryTitle: it.name || 'Logo slides', gallery: it.slides } })
  }
  const openZoom = (itemIdx, el) => { lastTrigger.current = el; setModal({ open: true, mode: 'zoom', itemIdx, imgIdx: 0, scale: 1 }) }
  const close = () => { setModal({ open: false, mode: null, itemIdx: -1, imgIdx: 0, scale: 1 }); lastTrigger.current?.focus?.() }
  const current = modal.open ? (modal.item || tvei[modal.itemIdx]) : null
  const galleryLen = modal.mode === 'gallery' ? (current?.gallery?.length || 0) : 0
  const go = d => galleryLen && setModal(m => ({ ...m, imgIdx: (m.imgIdx + d + galleryLen) % galleryLen, scale: 1 }))
  const zoom = v => setModal(m => ({ ...m, scale: Math.max(1, Math.min(3, +v.toFixed(2))) }))

  useEffect(() => {
    if (!modal.open) return
    closeRef.current?.focus()
    const onKey = e => {
      if (e.key === 'Escape') close()
      if (modal.mode === 'gallery') { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [modal.open, modal.mode, galleryLen])

  // Design-work tile (native aspect ratio; flex-grow = ratio so a row shares one height)
  // Called as a function (not <DesignTile/>) so carousel updates don't remount it and drop focus
  const renderTile = d => {
    const realIndex = tvei.indexOf(d)
    const isOpening = realIndex === 0 && !!opening
    const ratio = RATIO[d.src] || 4 / 3
    const imgSrc = isOpening ? opening[slide] : (d.src || '/assets/nduproj-02.jpg')
    return (
      <figure key={d.title} className="min-w-0" style={{ flex: `${ratio} 1 0%` }}>
        <div
          className="relative rounded-[18px] overflow-hidden bg-white border border-[#121417]/[0.08] shadow-[0_20px_40px_-30px_rgba(18,20,23,0.45)]"
          style={{ aspectRatio: String(ratio) }}
          onMouseEnter={isOpening ? () => setPaused(true) : undefined}
          onMouseLeave={isOpening ? () => setPaused(false) : undefined}
          onFocus={isOpening ? () => setPaused(true) : undefined}
          onBlur={isOpening ? () => setPaused(false) : undefined}
        >
          <button
            type="button"
            onClick={e => (isOpening ? openGallery(0, slide, e.currentTarget) : openZoom(realIndex, e.currentTarget))}
            className={`group absolute inset-0 w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0e5c66] ${isOpening ? 'cursor-pointer' : 'cursor-zoom-in'}`}
            aria-label={isOpening ? `Open ${d.galleryTitle || d.title} gallery (${opening.length} images)` : `Enlarge ${d.title}`}
          >
            <img src={src(imgSrc)} alt={d.title || 'Design'} loading="lazy" decoding="async" className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none" />
          </button>
          {isOpening && (
            <>
              <button type="button" onClick={() => step(-1)} aria-label="Previous flyer" className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full hero-glass-light text-[#121417] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e5c66]"><Chevron dir="left" /></button>
              <button type="button" onClick={() => step(1)} aria-label="Next flyer" className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full hero-glass-light text-[#121417] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e5c66]"><Chevron dir="right" /></button>
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 pointer-events-none" aria-hidden="true">
                {opening.map((_, i) => <span key={i} className={`h-1.5 rounded-full transition-all ${i === slide ? 'w-5 bg-[#0e5c66]' : 'w-1.5 bg-[#121417]/25'}`} />)}
              </div>
              <span className="sr-only" aria-live="polite">Flyer {slide + 1} of {opening.length}</span>
            </>
          )}
        </div>
        <figcaption className="pt-4">
          <p className="text-[17px] font-semibold leading-snug text-[#121417]">{d.title || '—'}</p>
          {d.copy && <p className="mt-1.5 text-[15px] leading-relaxed text-[#4a5357]">{d.copy}</p>}
          {isOpening && <p className="mt-2 text-[13px] font-semibold tracking-[0.12em] uppercase text-[#0e5c66]">Click to open gallery</p>}
        </figcaption>
      </figure>
    )
  }

  // Pair the four artworks: rows of two at md–lg, one row at xl (pair wrappers become `contents`)
  const pairs = []
  for (let i = 0; i < designVisible.length; i += 2) pairs.push(designVisible.slice(i, i + 2))

  return (
    // Inline style: overrides the legacy `#graphics` rule in index.css (ID specificity)
    <section id="graphics" className="relative text-[#121417] py-14 lg:py-28" style={{ background: '#f3f3f1', borderTop: 0 }}>
      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-[clamp(32px,5vw,88px)]">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[5fr_7fr] lg:gap-16 xl:gap-24 items-end">
          <div>
            <p className="flex items-center gap-4 text-[13px] font-semibold tracking-[0.22em] uppercase text-[#26302f]">
              <span className="block w-10 h-[3px] bg-[#48aab7] rounded-full" aria-hidden="true" />
              Creative Work
            </p>
            <h2 className="hero-display mt-5 text-[clamp(36px,8.6vw,46px)] lg:text-[clamp(44px,4vw,64px)] leading-[1.02] tracking-[-0.02em]">
              Graphics <span className="text-[#0e5c66]">&amp;</span> Branding<span className="text-[#48aab7]" aria-hidden="true">.</span>
            </h2>
          </div>
          {intro && <p className="text-[17px] lg:text-[18px] text-[#4a5357] max-w-[52ch]">{intro}</p>}
        </div>

        {/* ===== Logo designs ===== */}
        {logos.length > 0 && (
          <div className="mt-12 lg:mt-20">
            <Eyebrow>Logo Designs</Eyebrow>
            <div id="logo-list" className="mt-7 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {logosVisible.map((it, idx) => (
                <article key={`logo-${idx}`} className="flex flex-col">
                  <div className="aspect-[16/9] rounded-[18px] overflow-hidden bg-white border border-[#121417]/[0.08] shadow-[0_20px_40px_-30px_rgba(18,20,23,0.45)]">
                    <img src={src(it.cover || it.thumb || '/assets/nduproj-01.jpg')} alt={it.name || 'Logo'} loading="lazy" decoding="async" className="w-full h-full object-contain" />
                  </div>
                  <div className="pt-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase text-[#0e5c66]">
                      <span>Logo</span>
                      {it.client && <><span className="w-1 h-1 rounded-full bg-[#48aab7]" aria-hidden="true" /><span className="text-[#4a5357]">{it.client}</span></>}
                      {it.year && <span className="ml-auto text-[#4a5357] font-medium">{it.year}</span>}
                    </div>
                    <h4 className="hero-display mt-2 text-[22px] leading-tight">{it.name || '—'}</h4>
                    {it.note && <p className="mt-2 text-[15px] leading-relaxed text-[#4a5357]">{it.note}</p>}
                    {(it.slides?.length || it.brief) && (
                      <div className="mt-auto pt-5 flex flex-wrap gap-2.5">
                        {it.slides?.length > 0 && (
                          <button type="button" onClick={e => { trackGraphicsSlidesClick(it.name || 'Logo design'); openSlides(it, e.currentTarget) }} className={pillSolid}>
                            <SlidesIcon /> View slides <span className="sr-only">({it.slides.length} pages, opens a viewer)</span>
                          </button>
                        )}
                        {it.brief && (
                          <a href={withBase(it.brief)} onClick={() => trackGraphicsSlidesClick(`${it.name || 'Logo'} - Brief`)} target="_blank" rel="noreferrer" className={pillLine}>
                            <PdfIcon /> Brief <span className="sr-only">(PDF, opens in a new tab)</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
            {logos.length > 1 && (
              <RevealButton expanded={moreLogos} count={logos.length} what="logo designs" controls="logo-list"
                onClick={() => (moreLogos ? collapse(setMoreLogos) : setMoreLogos(true))} />
            )}
          </div>
        )}

        {/* ===== Design work ===== */}
        {tvei.length > 0 && (
          <div className="mt-14 lg:mt-24">
            <Eyebrow>Design Work</Eyebrow>
            <div id="design-list" className="mt-7 space-y-10 xl:space-y-0 xl:flex xl:gap-8">
              {pairs.map((pair, i) => (
                <div key={i} className="space-y-10 md:space-y-0 md:flex md:gap-6 xl:contents">
                  {pair.map(renderTile)}
                </div>
              ))}
            </div>
            {tvei.length > 1 && (
              <RevealButton expanded={moreDesign} count={tvei.length} what="design pieces" controls="design-list"
                onClick={() => (moreDesign ? collapse(setMoreDesign) : setMoreDesign(true))} />
            )}
          </div>
        )}
      </div>

      {/* ===== Modal (same gallery/zoom modes, arrows, thumbnails and 1×–3× zoom) ===== */}
      {current && (
        <div className="fixed inset-0 z-[60] bg-[#0b1416]/75 backdrop-blur-sm p-3 sm:p-4 grid place-items-center" onClick={close}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="graphics-modal-title"
            className="max-w-5xl w-full max-h-[94vh] overflow-auto rounded-[22px] bg-white text-[#121417] p-4 sm:p-6 relative shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button ref={closeRef} onClick={close} aria-label="Close" className="absolute top-3 right-3 z-10 w-11 h-11 rounded-full bg-[#eef1f1] hover:bg-[#dfe4e4] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e5c66]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            <h3 id="graphics-modal-title" className="pr-14 text-[20px] font-semibold">{current.title || 'Design Work'}</h3>
            {current.copy && <p className="mt-1 pr-14 text-[15px] text-[#4a5357]">{current.copy}</p>}

            <div className="mt-4 relative border border-[#121417]/10 rounded-xl overflow-auto bg-[#eef1f1]">
              <div className="w-full grid place-items-center" style={{ minHeight: 320 }}>
                <img
                  src={src(modal.mode === 'gallery' ? current.gallery[modal.imgIdx] : (current.src || '/assets/nduproj-02.jpg'))}
                  alt={modal.mode === 'gallery' ? `${current.galleryTitle || current.title} — image ${modal.imgIdx + 1} of ${galleryLen}` : current.title || 'Design'}
                  draggable={false}
                  onContextMenu={e => e.preventDefault()}
                  className="max-w-full max-h-[64vh] object-contain select-none"
                  style={{ transform: `scale(${modal.scale})`, transformOrigin: 'center center', transition: 'transform 120ms ease' }}
                />
              </div>
              {modal.mode === 'gallery' && (
                <>
                  <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 border border-[#c9d0d1] flex items-center justify-center"><Chevron dir="left" /></button>
                  <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 border border-[#c9d0d1] flex items-center justify-center"><Chevron dir="right" /></button>
                </>
              )}
            </div>

            {modal.mode === 'gallery' && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {current.gallery.map((g, idx) => (
                  <button key={idx} type="button" onClick={() => setModal(m => ({ ...m, imgIdx: idx, scale: 1 }))} aria-label={`Show image ${idx + 1}`} aria-current={idx === modal.imgIdx ? 'true' : undefined}
                    className={`shrink-0 rounded-lg p-1 border-2 ${idx === modal.imgIdx ? 'border-[#0e5c66]' : 'border-transparent hover:border-[#c9d0d1]'}`}>
                    <img src={src(g)} alt="" draggable={false} onContextMenu={e => e.preventDefault()} className="w-14 h-14 object-contain bg-white rounded select-none" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              <button onClick={() => zoom(modal.scale - 0.25)} className={pillLine}>− Zoom out</button>
              <button onClick={() => zoom(modal.scale + 0.25)} className={pillLine}>+ Zoom in</button>
              <button onClick={() => zoom(1)} className={pillLine}>Reset</button>
              {modal.mode === 'gallery' && <span className="sm:ml-auto text-[14px] text-[#4a5357]">{modal.imgIdx + 1} / {galleryLen}</span>}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
