import React, { useState } from 'react'
import websitesData from '@/content/websites.json'
import { trackWebProjectClick } from '../../lib/analytics'
import { withBase } from '../../lib/withBase'

// Websites — Gate 1 static proposal. Charcoal band for rhythm after the light About;
// screenshots are shown whole inside a browser frame (never cropped).

// Lighter WebP copies of the same screenshots (checked side by side:
// docs/redesign-qa/websites-gate1/jpg-vs-webp-*.png). Dr Benzi keeps its JPG because
// its WebP copy is larger. The JSON paths are unchanged.
const lighter = {
  '/assets/vlc-shot.jpg': '/assets/vlc-shot.webp',
  '/assets/tvei-shot.jpg': '/assets/tvei-shot.webp',
  '/assets/MakwelengThumbnail.png': '/assets/MakwelengThumbnail.webp'
}

function hostOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, '') } catch { return '' }
}

function SiteCard({ site, index, featured = false, flip = false }) {
  const src = withBase(lighter[site.thumb] || site.thumb)
  const host = site.host || hostOf(site.url)
  // Upwork build passes sites without a url: same card, shown as a screenshot only
  const live = Boolean(site.url)
  const Wrap = live ? 'a' : 'div'
  const linkProps = live
    ? { href: site.url, onClick: () => trackWebProjectClick(site.name), target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Wrap
      {...linkProps}
      className={`group block rounded-[24px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fd0d7] focus-visible:ring-offset-4 focus-visible:ring-offset-[#10191b] ${
        featured
          ? `lg:grid lg:gap-12 xl:gap-16 lg:items-center ${flip ? 'lg:grid-cols-[5fr_7fr]' : 'lg:grid-cols-[7fr_5fr]'}`
          : ''
      }`}
    >
      {/* Browser frame */}
      <div className={`${flip ? 'lg:order-2' : ''} rounded-[18px] lg:rounded-[22px] overflow-hidden bg-[#0b1214] border border-white/10 shadow-[0_30px_60px_-34px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none`}>
        <div className="flex items-center gap-3 px-4 h-9 border-b border-white/10 bg-[#152225]" aria-hidden="true">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
          </span>
          <span className="flex-1 truncate text-center text-[12px] text-white/55 tracking-wide">{host}</span>
          <span className="w-[42px]" />
        </div>
        <div className="aspect-[1200/625] bg-[#0b1214] flex items-center justify-center">
          <img
            src={src}
            alt={`${site.name} website`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Caption */}
      <div className={`${featured ? 'pt-5 lg:pt-0' : 'pt-4 sm:pt-5'} ${flip ? 'lg:order-1' : ''}`}>
        <span className="hero-display text-[#6fd0d7] text-[15px] tracking-[0.12em]">{String(index + 1).padStart(2, '0')}</span>
        <h3 className={`hero-display mt-1.5 text-white leading-[1.08] tracking-[-0.01em] ${featured ? 'text-[28px] sm:text-[34px] xl:text-[44px]' : 'text-[22px] sm:text-[26px]'}`}>
          {site.name}
        </h3>
        <p className={`mt-2.5 text-white/70 leading-relaxed ${featured ? 'text-[17px] lg:text-[19px] max-w-[40ch]' : 'text-[16px] max-w-[46ch]'}`}>
          {site.outcome}
        </p>
        {live && (
        <span className="mt-5 inline-flex items-center gap-2.5 min-h-[44px] px-5 rounded-full border border-white/25 text-white text-[15px] font-semibold transition-colors group-hover:bg-white group-hover:text-[#10191b]">
          View Website
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" />
          </svg>
          <span className="sr-only">(opens {host} in a new tab)</span>
        </span>
        )}
      </div>
    </Wrap>
  )
}

export default function WorkShowcase() {
  const [first, ...others] = websitesData
  // With an odd number left over, the last project closes the section full-width (mirrored)
  const closing = others.length % 2 === 1 ? others[others.length - 1] : null
  const rest = closing ? others.slice(0, -1) : others
  // Phones: show the first 4 sites, the rest behind a button (tablet and up always show all)
  const PHONE_LIMIT = 4
  const [showAll, setShowAll] = useState(false)
  const phoneHidden = i => (!showAll && i >= PHONE_LIMIT ? 'max-md:hidden' : '')
  const collapse = () => {
    setShowAll(false)
    document.getElementById('websites')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    // Inline style: legacy `#websites` rules in index.css (light gradient + an infinite
    // opacity pulse) would otherwise win over classes because of ID specificity.
    <section
      id="websites"
      className="relative text-white py-14 lg:py-28 overflow-hidden"
      style={{ background: '#10191b', animation: 'none', borderTop: 0 }}
    >
      {/* Watermark: the real personal icon, as in the hero */}
      <img
        src={withBase('/assets/ndu-icon.png')}
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute -top-10 right-[4%] w-[300px] opacity-[0.05] invert select-none pointer-events-none"
      />

      <div className="relative max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-[clamp(32px,5vw,88px)]">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[5fr_7fr] lg:gap-16 xl:gap-24 items-end">
          <div>
            <p className="flex items-center gap-4 text-[13px] font-semibold tracking-[0.22em] uppercase text-white/85">
              <span className="block w-10 h-[3px] bg-[#41b3bc] rounded-full" aria-hidden="true" />
              Websites
            </p>
            <h2 className="hero-display mt-5 text-[clamp(36px,8.6vw,46px)] lg:text-[clamp(44px,4vw,64px)] leading-[1.02] tracking-[-0.02em]">
              Websites That <span className="text-[#6fd0d7]">Convert</span><span className="text-[#41b3bc]" aria-hidden="true">.</span>
            </h2>
          </div>
          <p className="text-[17px] lg:text-[18px] text-white/70 max-w-[52ch]">
            Modern, fast, and built for results. Each project combines clean design with performance optimization.
          </p>
        </div>

        {/* Featured (first project in the existing order) */}
        {first && (
          <div className="mt-10 lg:mt-16">
            <SiteCard site={first} index={0} featured />
          </div>
        )}

        {/* Remaining projects, original order */}
        <div id="website-list" className="mt-12 lg:mt-20 grid gap-x-10 xl:gap-x-14 gap-y-10 lg:gap-y-16 md:grid-cols-2">
          {rest.map((site, i) => (
            <div key={site.name} className={phoneHidden(i + 1)}>
              <SiteCard site={site} index={i + 1} />
            </div>
          ))}
        </div>

        {closing && (
          <div className={`mt-10 lg:mt-20 ${phoneHidden(websitesData.length - 1)}`}>
            <SiteCard site={closing} index={websitesData.length - 1} featured flip />
          </div>
        )}

        {websitesData.length > PHONE_LIMIT && (
          <button
            type="button"
            onClick={() => (showAll ? collapse() : setShowAll(true))}
            aria-expanded={showAll}
            aria-controls="website-list"
            className="md:hidden mt-10 inline-flex items-center justify-center min-h-[44px] px-5 rounded-full border border-white/25 text-white text-[15px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fd0d7]"
          >
            {showAll ? 'Show fewer websites' : `View all ${websitesData.length} websites`}
          </button>
        )}
      </div>
    </section>
  )
}
