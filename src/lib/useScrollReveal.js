import { useEffect } from 'react'

// Restrained scroll reveal (motion audit, 17 Nov 2026): section headings and cards below
// the hero fade up 14px once as they enter the viewport, matching the hero's entrance.
// Runs once per element, never loops, and is skipped entirely under reduced motion or
// without IntersectionObserver, so content is never left hidden. Learning cards are left
// out: on phones they sit in a sideways carousel and would fade in mid-swipe.
const TARGETS = [
  'main section:not(#hero) h2',
  '#websites a.group',
  '#graphics article',
  '#social article',
  '#about article',
  '#about [data-venture]',
  '#contact figure'
]

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const els = new Set()
    document.querySelectorAll(TARGETS.join(',')).forEach(el => {
      // A heading reveals together with its eyebrow, so animate the heading's block
      els.add(el.tagName === 'H2' ? el.parentElement : el)
    })

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        // Reveal on entry, or straight away if it is already above the viewport (anchor jumps)
        if (!e.isIntersecting && e.boundingClientRect.bottom > 0) return
        e.target.classList.add('is-revealed')
        io.unobserve(e.target)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 })

    els.forEach(el => {
      // Light stagger for cards that sit side by side in a grid (max 2 steps)
      const siblings = el.parentElement ? [...el.parentElement.children] : []
      const i = Math.min(siblings.indexOf(el) % 2, 1)
      el.style.setProperty('--reveal-delay', `${i * 90}ms`)
      el.classList.add('scroll-reveal')
      io.observe(el)
    })

    return () => {
      io.disconnect()
      els.forEach(el => el.classList.remove('scroll-reveal', 'is-revealed'))
    }
  }, [])
}
