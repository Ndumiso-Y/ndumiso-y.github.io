import React, { useState, useRef, useEffect } from 'react'

// Audio walkthrough player. 44 px play button, keyboard-seekable progress, and only one
// walkthrough plays at a time (starting one pauses the others).
const EVT = 'ndu-audio-play'

const fmt = t => {
  if (!isFinite(t)) return '0:00'
  return `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, '0')}`
}

export default function MiniAudioPlayer({ src, description, title }) {
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [time, setTime] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onMeta = () => setDuration(a.duration)
    const onTime = () => setTime(a.currentTime)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onOther = e => { if (e.detail !== a) a.pause() }
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    a.addEventListener('ended', onPause)
    window.addEventListener(EVT, onOther)
    return () => {
      a.removeEventListener('loadedmetadata', onMeta)
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
      a.removeEventListener('ended', onPause)
      window.removeEventListener(EVT, onOther)
    }
  }, [])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      window.dispatchEvent(new CustomEvent(EVT, { detail: a }))
      a.play().catch(() => setPlaying(false))
    } else {
      a.pause()
    }
  }

  const name = title ? ` — ${title}` : ''

  return (
    <div className="rounded-2xl bg-[#eef4f4] border border-[#0e5c66]/10 p-3">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={`${playing ? 'Pause' : 'Play'} audio walkthrough${name}`}
          className="flex-none w-11 h-11 rounded-full bg-[#0e5c66] hover:bg-[#0b4c55] text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e5c66] focus-visible:ring-offset-2"
        >
          {playing ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
          ) : (
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
        <div className="flex-1 min-w-0">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(time, duration || 0)}
            onChange={e => { if (audioRef.current) audioRef.current.currentTime = +e.target.value }}
            aria-label={`Seek audio walkthrough${name}`}
            aria-valuetext={`${fmt(time)} of ${fmt(duration)}`}
            className="audio-range w-full"
            style={{ '--p': `${duration ? (time / duration) * 100 : 0}%` }}
          />
          <div className="flex items-center justify-between text-[12px] text-[#4a5357] tabular-nums">
            <span>{fmt(time)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>
      </div>
      {description && <p className="mt-2 text-[14px] text-[#26302f]">{description}</p>}
    </div>
  )
}
