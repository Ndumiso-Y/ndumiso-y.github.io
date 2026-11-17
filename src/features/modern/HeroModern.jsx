import React from 'react'
import {
  SiReact, SiTailwindcss, SiJavascript, SiHtml5,
  SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign, SiCanva
} from 'react-icons/si'
import { trackGetInTouchClick, trackViewWorkClick } from '../../lib/analytics'
import { content } from '../../content'
import { withBase } from '../../lib/withBase'

// Hero — Gate 1 static build of the owner-approved final reference
// (Ndumiso_Hero_Approved_Reference_Pack_2026-11-17/references/01_FINAL_HERO_APPROVED.png).
// Copy follows that pack's COPY_LOCK.md. The portrait is the real photo
// ("Ndu_Blue Background.png" cut out by scripts/make-hero-cutout.mjs); no generated imagery.
// No motion at this gate (ED-WEB-001 Gate 3 is separate).
// Relocated from the previous hero: the QR e-card now sits in Contact; the four section
// shortcut cards duplicated the nav and were removed; the full skills list stays in About.

const services = [
  {
    title: 'Web Design & Development',
    description: 'I design and build fast, modern websites that look sharp and convert visitors into clients.'
  },
  {
    title: 'Business Software & Dashboards',
    description: 'Custom apps that bring quotations, records, approvals, tasks and reports into one place.'
  },
  {
    title: 'Branding & Graphics',
    description: 'Logos, marketing visuals, and digital assets that keep your brand consistent and memorable.'
  },
  {
    title: 'Social & Digital Content',
    description: 'Social media visuals and simple campaigns that keep your audience engaged and informed.'
  }
]

const proofPoints = ['Clean UI & brand consistency', 'Conversion-focused messaging', 'Reliable delivery']

// Curated preview only — the full list of 11 skills stays in About → Skills & Tools.
// (The reference shows Figma, which is not one of Ndumiso's listed skills; HTML is shown instead.)
const coreSkills = [
  { name: 'React', Icon: SiReact, color: '#149eca' },
  { name: 'Tailwind', Icon: SiTailwindcss, color: '#0ea5e9' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#d9b400' },
  { name: 'HTML', Icon: SiHtml5, color: '#E34F26' },
  { name: 'Photoshop', Icon: SiAdobephotoshop, color: '#1f7ad6' },
  { name: 'Illustrator', Icon: SiAdobeillustrator, color: '#e68a00' },
  { name: 'InDesign', Icon: SiAdobeindesign, color: '#e2335c' },
  { name: 'Canva', Icon: SiCanva, color: '#00a8b0' }
]

// Glass blocks, positioned in % of the portrait box (measured from the reference).
// "front" blocks sit over the shoulders only — never the face, copy or controls.
// Gate 3: each block drifts 4–8 px on its own slow cycle (k = path, s = seconds, o = phase).
const glassBlocks = [
  { l: 19, t: 20, w: 13, h: 15, front: false, k: 'a', s: 19, o: -3 },
  { l: 76, t: 10, w: 29, h: 37, front: false, k: 'b', s: 24, o: -11 },
  { l: 96, t: 2, w: 11, h: 11, front: false, k: 'c', s: 16, o: -7 },
  { l: 92, t: 37, w: 19, h: 26, front: false, k: 'a', s: 22, o: -15 },
  { l: 85, t: 59, w: 9, h: 10, front: true, k: 'c', s: 17, o: -2 },
  { l: 68, t: 66, w: 20, h: 13, front: true, k: 'b', s: 26, o: -9 }
]

const icons = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  send: <path d="M21 3L10 14M21 3l-7 18-4-7-7-4 18-7z" />,
  building: <path d="M4 21V5l8-2v18M12 8h8v13M4 21h17M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2" />,
  pin: <path d="M12 21s-7-6.2-7-11.5A7 7 0 0112 2.5a7 7 0 017 7C19 14.8 12 21 12 21zm0-9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
}

function Icon({ name, className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

const blockStyle = b => ({
  left: `${b.l}%`, top: `${b.t}%`, width: `${b.w}%`, height: `${b.h}%`,
  animationName: `hero-drift-${b.k}`, animationDuration: `${b.s}s`, animationDelay: `${b.o}s`
})

// Portrait with glass blocks behind and in front of the shoulders.
function PortraitStage({ className = '', eager = true }) {
  return (
    <div className={className}>
      {glassBlocks.filter(b => !b.front).map((b, i) => (
        <span key={`b${i}`} aria-hidden="true" className="hero-glass-block"
          style={blockStyle(b)} />
      ))}
      <img
        src={withBase('/assets/ndu-hero-cutout.webp')}
        alt="Ndumiso Yedwa, founder of Embark Digitals"
        width="1080"
        height="1080"
        className="hero-portrait relative w-full h-full object-contain object-bottom"
        loading={eager ? 'eager' : 'lazy'}
        fetchpriority={eager ? 'high' : undefined}
      />
      {glassBlocks.filter(b => b.front).map((b, i) => (
        <span key={`f${i}`} aria-hidden="true" className="hero-glass-block hero-glass-block--front"
          style={blockStyle(b)} />
      ))}
    </div>
  )
}

// Signature perspective lettering. Decorative: the name is in the h1 for assistive tech.
function PerspectiveName({ className = '' }) {
  return (
    <div className={`hero-name ${className}`} aria-hidden="true">
      <div className="hero-name__plane">
        <span className="hero-name__first">Ndumiso</span>
        <span className="hero-name__last">Yedwa<span className="hero-name__dot">.</span></span>
      </div>
      {/* Low-key floor reflection: the same plane mirrored about its bottom edge */}
      <div className="hero-name__mirror">
        <div className="hero-name__plane">
          <span className="hero-name__first">Ndumiso</span>
          <span className="hero-name__last">Yedwa<span className="hero-name__dot">.</span></span>
        </div>
      </div>
    </div>
  )
}

export default function HeroModern() {
  const location = content?.contact?.location || 'Johannesburg, South Africa'

  return (
    <section id="hero" aria-label="Hero section" className="relative bg-[#f3f3f1] text-[#121417] overflow-hidden">
      <div className="relative lg:min-h-[clamp(760px,100svh,1040px)] flex flex-col">
        {/* Background (desktop): soft teal field from the right + restrained technical grid */}
        <div className="hidden lg:block absolute inset-0 hero-teal-field" aria-hidden="true" />
        <div className="hidden lg:block absolute inset-0 hero-grid" aria-hidden="true" />

        {/* Portrait (desktop) */}
        <PortraitStage className="hero-settle hidden lg:block absolute z-[1] left-[64%] -translate-x-1/2 bottom-[clamp(120px,10vw,170px)] w-[min(52vw,calc(max(100svh,760px)-230px),800px)] aspect-square pointer-events-none" />

        <div className="relative z-[2] w-full max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-[clamp(32px,5vw,88px)] pt-[100px] lg:pt-[clamp(120px,15vh,156px)] flex-1 flex flex-col">
          {/* Copy */}
          <div className="lg:max-w-[54%]">
            <p style={{ '--i': 0 }} className="hero-enter flex items-start sm:items-center gap-3 sm:gap-4 text-[12px] sm:text-[13px] xl:text-[14px] font-bold tracking-[0.2em] sm:tracking-[0.24em] uppercase text-[#1d2a2e]">
              <span className="block w-9 xl:w-12 h-[4px] mt-[6px] sm:mt-0 bg-[#1c8c97] rounded-full flex-none" aria-hidden="true" />
              <span>Websites · Business Software<span className="xl:hidden"><br /></span><span className="hidden xl:inline"> · </span>AI-Assisted Development</span>
            </p>

            <h1 style={{ '--i': 1 }} className="hero-enter hero-display mt-4 lg:mt-5 uppercase leading-[0.95] tracking-[-0.03em] text-[clamp(40px,11.4vw,64px)] lg:text-[clamp(42px,4.3vw,80px)]">
              <span className="sr-only">Ndumiso Yedwa: </span>
              <span className="block lg:whitespace-nowrap text-[#121417]">Websites &amp;</span>{' '}
              <span className="block lg:whitespace-nowrap text-[#0e6d78]">Business Software</span>
            </h1>

            <p className="hero-enter hero-display mt-3 lg:mt-4 text-[20px] sm:text-[22px] lg:text-[clamp(20px,1.9vw,32px)] leading-tight tracking-[-0.01em] text-[#121417]" style={{ fontWeight: 700, '--i': 2 }}>
              Custom Apps, Dashboards &amp; Business&nbsp;Systems
            </p>
            <p style={{ '--i': 3 }} className="hero-enter mt-2.5 max-w-[38ch] sm:max-w-[44ch] text-[16px] sm:text-[18px] lg:text-[clamp(17px,1.45vw,23px)] leading-snug text-[#2b3336]">
              I build the websites your customers see and the software that helps you run your business.
            </p>

            <div style={{ '--i': 4 }} className="hero-enter mt-6 lg:mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#websites"
                onClick={trackViewWorkClick}
                className="group inline-flex items-center justify-center gap-3 min-h-[52px] px-9 rounded-full bg-gradient-to-b from-[#16808b] to-[#0b5a63] text-white text-[17px] font-semibold shadow-[0_12px_26px_-12px_rgba(14,92,102,0.85)] hover:from-[#13737d] hover:to-[#094d55] hover:-translate-y-0.5 transition motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0e5c66] focus-visible:ring-offset-[#f3f3f1]"
              >
                View Work
                <Icon name="arrow" className="w-5 h-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              </a>
              <a
                href="#contact"
                onClick={trackGetInTouchClick}
                className="inline-flex items-center justify-center gap-3 min-h-[52px] px-8 rounded-full border-[1.5px] border-[#121417] bg-white/40 text-[#121417] text-[17px] font-semibold hover:bg-white hover:-translate-y-0.5 transition motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0e5c66] focus-visible:ring-offset-[#f3f3f1]"
              >
                <Icon name="send" className="w-5 h-5" />
                Get in Touch
              </a>
            </div>

            <ul style={{ '--i': 5 }} className="hero-enter mt-5 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-[13px] sm:text-[15px] text-[#2b3336]">
              <li className="flex items-center gap-2"><Icon name="building" className="w-[18px] h-[18px] text-[#3b4448]" />Embark Digitals</li>
              <li className="w-px h-5 bg-[#121417]/25" aria-hidden="true" />
              <li className="flex items-center gap-2"><Icon name="pin" className="w-[18px] h-[18px] text-[#3b4448]" />{location}</li>
            </ul>
          </div>

          {/* Portrait stage (phone / tablet): composed separately, not a scaled desktop */}
          <div className="lg:hidden relative mt-8 -mx-5 sm:-mx-8 overflow-x-clip">
            <div className="absolute inset-0 hero-teal-field hero-teal-field--stage" aria-hidden="true" />
            <PortraitStage className="hero-settle relative mx-auto w-[86%] max-w-[560px] aspect-square" />
            <PerspectiveName className="hero-name-enter relative -mt-[19%] sm:-mt-[15%] px-3 text-[clamp(60px,19vw,140px)]" />
          </div>

          {/* Perspective name (desktop) */}
          <PerspectiveName className="hero-name-enter hidden lg:block relative z-[2] mt-auto -mr-[3vw] pl-[7vw] text-[clamp(120px,16vw,280px)]" />

          {/* Core skills — desktop glass strip */}
          <div className="hero-sheen hidden lg:flex relative mb-[clamp(20px,3vh,32px)] mt-1 hero-glass-light rounded-full px-[clamp(20px,2.4vw,36px)] py-3 items-center gap-[clamp(12px,1.6vw,24px)]">
            <p className="font-semibold italic text-[clamp(16px,1.35vw,20px)] whitespace-nowrap text-[#121417]">Core Skills &amp; Tools</p>
            <span className="w-px h-8 bg-[#121417]/15 flex-none" aria-hidden="true" />
            <ul className="flex flex-1 items-center justify-between gap-x-[clamp(10px,1.2vw,20px)]">
              {coreSkills.map(({ name, Icon: SkillIcon, color }) => (
                <li key={name} className="flex items-center gap-2 text-[clamp(13px,1vw,15px)] text-[#26302f] whitespace-nowrap">
                  <SkillIcon className="w-5 h-5 flex-none" style={{ color }} aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* Core skills — phone / tablet: one link to the full list in About */}
          <a
            href="#skills"
            className="hero-sheen lg:hidden relative mt-4 mb-8 hero-glass-light rounded-full min-h-[56px] px-7 flex items-center justify-center gap-4 font-semibold italic text-[18px] text-[#121417] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e5c66]"
          >
            Core Skills &amp; Tools
            <Icon name="arrow" className="w-5 h-5 not-italic" />
          </a>
        </div>
      </div>

      {/* ===== What I do (existing hero copy, kept below the first screen) ===== */}
      <div className="relative bg-[#f3f3f1] border-t border-[#121417]/10">
        <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-[clamp(32px,5vw,88px)] py-14 lg:py-20 grid gap-10 lg:grid-cols-[1fr_2.4fr] lg:gap-16">
          <div>
            <p className="flex items-center gap-4 text-[13px] font-semibold tracking-[0.22em] uppercase text-[#1d2a2e]">
              <span className="block w-10 h-[3px] bg-[#41b3bc] rounded-full" aria-hidden="true" />
              What I do
            </p>
            <ul className="mt-6 space-y-2.5 text-[16px] text-[#3b4448]">
              {proofPoints.map(p => (
                <li key={p} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#41b3bc] flex-none" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4 sm:gap-x-8 sm:gap-y-10">
            {services.map((s, i) => (
              <li key={s.title} className="border-t-2 border-[#121417] pt-5">
                <span className="hero-display text-[#0e5c66] text-[28px]">0{i + 1}</span>
                <h2 className="mt-2 text-[15px] font-bold uppercase tracking-[0.08em] text-[#121417]">{s.title}</h2>
                <p className="mt-2 text-[16px] leading-relaxed text-[#3b4448]">{s.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
