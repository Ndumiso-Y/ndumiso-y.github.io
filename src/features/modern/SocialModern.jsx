import React from 'react'
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { content } from '../../content'
import { withBase } from '../../lib/withBase'
import { lighter } from '../../lib/lighter'
import { trackSocialProfileClick } from '../../lib/analytics'

// Social Media Management — static redesign. Deep-teal band; each client is a case study
// with its original social visual shown whole, its platforms and the same profile links.

const ICONS = { facebook: FaFacebook, linkedin: FaLinkedin, instagram: FaInstagram }
const iconFor = t => {
  const k = (t || '').toLowerCase()
  return ICONS[Object.keys(ICONS).find(n => k.includes(n))] || FaFacebook
}
const NAMES = { linkedin: 'LinkedIn', facebook: 'Facebook', instagram: 'Instagram' }
const label = t => NAMES[(t || '').toLowerCase()] || (t || 'Link').charAt(0).toUpperCase() + (t || 'Link').slice(1)

export default function SocialModern() {
  const items = Array.isArray(content?.social) ? content.social : []
  const intro = content?.sectionIntros?.social
  if (!items.length) return null

  return (
    // Inline style: overrides the legacy `#social` rule in index.css (ID specificity)
    <section id="social" className="relative text-white py-14 lg:py-28 overflow-hidden" style={{ background: '#0e5c66', borderTop: 0 }}>
      <img src={withBase('/assets/ndu-icon.png')} alt="" aria-hidden="true"
        className="hidden lg:block absolute -bottom-16 -left-10 w-[360px] opacity-[0.07] mix-blend-multiply select-none pointer-events-none" />

      <div className="relative max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-[clamp(32px,5vw,88px)]">
        <div className="grid gap-6 lg:grid-cols-[5fr_7fr] lg:gap-16 xl:gap-24 items-end">
          <div>
            <p className="flex items-center gap-4 text-[13px] font-semibold tracking-[0.22em] uppercase text-white/85">
              <span className="block w-10 h-[3px] bg-[#9fe3e8] rounded-full" aria-hidden="true" />
              Social Strategy
            </p>
            <h2 className="hero-display mt-5 text-[clamp(34px,8.2vw,46px)] lg:text-[clamp(44px,4vw,64px)] leading-[1.02] tracking-[-0.02em]">
              Social Media <span className="text-[#9fe3e8]">Management</span><span className="text-[#9fe3e8]" aria-hidden="true">.</span>
            </h2>
          </div>
          {intro && <p className="text-[17px] lg:text-[18px] text-white/80 max-w-[52ch]">{intro}</p>}
        </div>

        <div className="mt-10 lg:mt-16 space-y-12 lg:space-y-20">
          {items.map((s, i) => {
            const links = Array.isArray(s?.links) ? s.links : []
            const platforms = Array.isArray(s?.platforms) ? s.platforms : []
            const thumb = s?.thumb || content?.socialThumbs?.[s?.thumbKey]
            const flip = i % 2 === 1
            return (
              <article key={s?.brand || i} className={`grid gap-6 lg:gap-14 xl:gap-20 items-center ${flip ? 'lg:grid-cols-[5fr_7fr]' : 'lg:grid-cols-[7fr_5fr]'}`}>
                <div className={`${flip ? 'lg:order-2' : ''} rounded-[20px] lg:rounded-[24px] overflow-hidden bg-[#0b4c55] border border-white/15 shadow-[0_30px_60px_-34px_rgba(0,0,0,0.7)]`}>
                  {thumb ? (
                    <div className="aspect-[1131/623] flex items-center justify-center">
                      <img src={withBase(lighter(thumb))} alt={`${s?.brand} social media posts`} loading="lazy" decoding="async" className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] grid place-items-center text-4xl font-bold">{(s?.brand || '').split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()}</div>
                  )}
                </div>
                <div className={flip ? 'lg:order-1' : ''}>
                  <span className="hero-display text-[#9fe3e8] text-[15px] tracking-[0.12em]">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="hero-display mt-1.5 text-[26px] sm:text-[32px] xl:text-[40px] leading-[1.08] tracking-[-0.01em]">{s?.brand || 'Untitled'}</h3>
                  {platforms.length > 0 && (
                    <p className="mt-3 text-[13px] font-semibold tracking-[0.16em] uppercase text-white/70">
                      <span className="sr-only">Platforms managed: </span>{platforms.map(label).join(' · ')}
                    </p>
                  )}
                  {s?.desc && <p className="mt-4 text-[17px] lg:text-[18px] leading-relaxed text-white/85 max-w-[46ch]">{s.desc}</p>}
                  {links.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {links.map((l, j) => {
                        const Icon = iconFor(l?.type)
                        return (
                          <a key={j} href={l?.url || '#'} onClick={() => trackSocialProfileClick(l?.type, s?.brand)} target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full bg-white text-[#0e5c66] text-[15px] font-semibold hover:bg-[#e6f6f7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e5c66]">
                            <Icon className="w-4 h-4" aria-hidden="true" /> {label(l?.type)}
                            <span className="sr-only">— {s?.brand} (opens in a new tab)</span>
                          </a>
                        )
                      })}
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
