// src/components/VideoModal.jsx
import React, { useEffect, useRef, useState } from 'react'

export default function VideoModal({ title = 'Promo Video', poster = '', mp4 = '', webm = '', onClose }) {
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 bg-black/80 p-3 md:p-4 grid place-items-center" onClick={onClose}>
      <div className="relative max-w-5xl w-full" onClick={(e)=>e.stopPropagation()}>
        <div className="flex items-center justify-between text-white/90 text-sm mb-2">
          <div className="font-semibold">{title}</div>
          <div className="hidden md:block opacity-75">Press Esc to close</div>
        </div>

        <div className="relative bg-black/20 rounded-xl border border-white/10 overflow-hidden">
          {mounted && (
            <video
              ref={videoRef}
              controls
              playsInline
              preload="metadata"
              poster={poster || undefined}
              className="w-full h-auto max-h-[80vh] bg-black"
            >
              {webm ? <source src={webm} type="video/webm" /> : null}
              {mp4 ? <source src={mp4} type="video/mp4" /> : null}
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className="mt-3 text-right">
          <button onClick={onClose} className="px-4 py-1.5 rounded bg-white/10 text-white border border-white/30">Close</button>
        </div>
      </div>
    </div>
  )
}
