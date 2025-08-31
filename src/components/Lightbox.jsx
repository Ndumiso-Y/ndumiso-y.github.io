// src/components/Lightbox.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react'

export default function Lightbox({ images, start = 0, title = '', onClose }) {
  const items = useMemo(() => {
    if (!images || !images.length) return []
    if (typeof images[0] === 'string') return images.map((src) => ({ src, caption: '' }))
    return images
  }, [images])

  const [index, setIndex] = useState(Math.min(Math.max(start, 0), Math.max(items.length - 1, 0)))
  const thumbsRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % items.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [items.length, onClose])

  useEffect(() => {
    const wrap = thumbsRef.current
    if (!wrap) return
    const active = wrap.querySelector('[data-active="true"]')
    if (!active) return
    const aw = active.offsetWidth, al = active.offsetLeft, sw = wrap.scrollLeft, vw = wrap.clientWidth
    if (al < sw || al + aw > sw + vw) wrap.scrollTo({ left: al - (vw - aw) / 2, behavior: 'smooth' })
  }, [index])

  if (!items.length) return null
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)
  const next = () => setIndex((i) => (i + 1) % items.length)
  const current = items[index]

  return (
    <div className="fixed inset-0 z-50 bg-black/80 p-3 md:p-4" onClick={onClose}>
      <div className="relative max-w-6xl mx-auto" onClick={(e)=>e.stopPropagation()}>
        <div className="flex items-center justify-between text-white/90 text-sm mb-2">
          <div className="flex items-center gap-2">
            {title && <div className="font-semibold">{title}</div>}
            {items.length > 1 && <div className="opacity-80">{index+1} / {items.length}</div>}
          </div>
          <div className="hidden md:block opacity-75">Use ← → to navigate</div>
        </div>

        <div className="relative bg-black/20 rounded-xl border border-white/10 overflow-hidden">
          <img src={current.src} alt="Preview" className="mx-auto w-auto max-w-full max-h-[80vh] object-contain" />
          {items.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded bg-white/10 text-white border border-white/30" aria-label="Previous">‹</button>
              <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded bg-white/10 text-white border border-white/30" aria-label="Next">›</button>
            </>
          )}
        </div>

        {current.caption && <div className="mt-2 text-white/80 text-sm">{current.caption}</div>}

        {items.length > 1 && (
          <div ref={thumbsRef} className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {items.map((it, i) => (
              <button
                key={i}
                onClick={()=>setIndex(i)}
                data-active={i===index ? 'true' : 'false'}
                className={`flex-shrink-0 border rounded-md overflow-hidden ${i===index ? 'border-white' : 'border-white/30 opacity-80'}`}
                aria-label={`Go to ${i+1}`}
                title={`Image ${i+1}`}
              >
                <img src={it.src} alt={`Thumb ${i+1}`} className="h-14 w-20 object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="mt-3 text-right">
          <button onClick={onClose} className="px-4 py-1.5 rounded bg-white/10 text-white border border-white/30">Close</button>
        </div>
      </div>
    </div>
  )
}
