import React from 'react'
import {
  SiReact, SiTailwindcss, SiJavascript, SiHtml5,
  SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign, SiCanva
} from 'react-icons/si'
import { trackGetInTouchClick, trackViewWorkClick, trackECardClick } from '../../lib/analytics'
import { content } from '../../content'
import { withBase } from '../../lib/withBase'

// Hero — Gate 1 static build of the owner-approved reference
// (ndumiso_portfolio_design_reference_pack/approved_hero_reference.png).
// Every image is an existing repository asset; the portrait cut-out is generated
// from "Ndu_Blue Background.png" by scripts/make-hero-cutout.mjs.

const services = [
  {
    title: 'Web Design & Development',
    description: 'I design and build fast, modern websites that look sharp and convert visitors into clients.'
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

// Draft micro-copy for the shortcut cards is logged in docs/redesign-qa/hero-gate1/GATE1_REPORT.md
const shortcuts = [
  { href: '#websites', title: 'Websites', sub: 'Design · Build · Launch', img: '/assets/embark-shot.webp', icon: 'code' },
  { href: '#graphics', title: 'Graphics & Branding', sub: 'Logos · Brand guides · Print', img: '/assets/vlc-brief-cover.webp', icon: 'pen' },
  { href: '#social', title: 'Social Media Management', sub: 'Content · Design · Scheduling', img: '/assets/tvei-social.webp', icon: 'megaphone' },
  { href: '#projects', title: 'Learning Journey', sub: 'Treehouse · 8 projects', img: '/assets/p1-thumb.webp', icon: 'cap' }
]

// Curated preview only — the full list of 11 skills stays in the About section.
const coreSkills = [
  { name: 'React', Icon: SiReact, color: '#149eca' },
  { name: 'Tailwind', Icon: SiTailwindcss, color: '#0ea5e9' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#e8c400' },
  { name: 'HTML', Icon: SiHtml5, color: '#E34F26' },
  { name: 'Photoshop', Icon: SiAdobephotoshop, color: '#1f7ad6' },
  { name: 'Illustrator', Icon: SiAdobeillustrator, color: '#e68a00' },
  { name: 'InDesign', Icon: SiAdobeindesign, color: '#e2335c' },
  { name: 'Canva', Icon: SiCanva, color: '#00a8b0' }
]

const icons = {
  code: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  pen: <path d="M12 3l5 7-5 11-5-11 5-7zM12 3v8m0 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />,
  megaphone: <path d="M3 10v4h3l7 4V6L6 10H3zM16 9a4 4 0 010 6M19 7a7 7 0 010 10" />,
  cap: <path d="M2 9l10-5 10 5-10 5L2 9zM6 11v5c3 2 9 2 12 0v-5M22 9v6" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chat: <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.7A8 8 0 1121 12z" />,
  building: <path d="M4 21V5l8-2v18M12 8h8v13M4 21h17M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2" />,
  pin: <path d="M12 21s-7-6.2-7-11.5A7 7 0 0112 2.5a7 7 0 017 7C19 14.8 12 21 12 21zm0-9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />,
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" />
}

function Icon({ name, className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

function ECard({ compact = false }) {
  const ecard = content?.contact?.ecard
  return (
    <a
      href={ecard}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackECardClick}
      className={`hero-glass-light group block rounded-[22px] text-[#10262b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
        compact ? 'p-2.5 w-[132px]' : 'p-3.5 w-[188px]'
      }`}
    >
      <span className="block bg-white rounded-2xl p-2 shadow-sm">
        <img
          src={withBase('/assets/QRcodeBusiness.jpg')}
          alt="QR code that opens Ndumiso's e-card"
          width="370"
          height="370"
          className="w-full h-auto rounded-lg"
          loading="eager"
        />
      </span>
      <span className={`flex items-center justify-between gap-2 font-semibold ${compact ? 'mt-2 text-sm px-0.5' : 'mt-3 text-base px-1'}`}>
        My e-card
        <Icon name="external" className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
      {!compact && (
        <span className="block px-1 mt-1 text-[12px] leading-snug text-[#10262b]/75">
          Scan to open my e-card and save my contact details.
        </span>
      )}
    </a>
  )
}

export default function HeroModern() {
  return (
    <section id="hero" aria-label="Hero section" className="relative bg-[#f3f3f1] text-[#121417] overflow-hidden">
      {/* ===== First screen ===== */}
      <div className="relative xl:min-h-[max(100svh,760px)] xl:max-h-[1040px] flex flex-col">
        {/* Teal field (desktop): flat, matches the portrait's original backdrop */}
        <div className="hidden xl:block absolute inset-y-0 right-0 left-[60%] bg-[#48aab7]" aria-hidden="true">
          <img
            src={withBase('/assets/ndu-icon.png')}
            alt=""
            className="absolute top-[9%] right-[7%] w-[19vw] max-w-[300px] opacity-[0.13] mix-blend-multiply select-none"
          />
        </div>

        {/* Portrait (desktop): straddles the split, sits behind the cards */}
        <div
          className="hidden xl:block absolute top-[clamp(96px,12vh,124px)] bottom-0 left-[63%] -translate-x-1/2 aspect-square pointer-events-none"
        >
          <img
            src={withBase('/assets/ndu-hero-cutout.webp')}
            alt="Ndumiso Yedwa, founder of Embark Digitals"
            width="1080"
            height="1080"
            className="w-full h-full object-contain object-bottom drop-shadow-[0_24px_40px_rgba(9,40,46,0.25)]"
            loading="eager"
            fetchpriority="high"
          />
        </div>

        <div className="relative w-full max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-[clamp(32px,5vw,88px)] pt-[104px] lg:pt-[120px] xl:pt-[128px] flex-1 flex flex-col">
          <div className="lg:grid lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:items-center xl:block">
          {/* Copy */}
          <div className="relative z-10 xl:max-w-[46%]">
            <p className="flex items-center gap-4 text-[12px] sm:text-[13px] xl:text-[14px] font-semibold tracking-[0.16em] sm:tracking-[0.28em] uppercase text-[#1d2a2e]">
              <span className="block w-10 xl:w-14 h-[3px] bg-[#41b3bc] rounded-full flex-none" aria-hidden="true" />
              Web Designer &amp; Front-End Developer
            </p>

            <h1 className="hero-display mt-5 lg:mt-7 uppercase leading-[0.9] tracking-[-0.025em] text-[clamp(56px,15.5vw,120px)] lg:text-[80px] xl:text-[clamp(84px,6.9vw,128px)]">
              <span className="block text-[#121417]">Ndumiso</span>
              <span className="block text-[#0e5c66]">
                Yedwa<span className="text-[#41b3bc]" aria-hidden="true">.</span>
              </span>
            </h1>

            <p className="mt-5 lg:mt-6 max-w-[34ch] text-[17px] sm:text-lg xl:text-[clamp(18px,1.35vw,22px)] leading-relaxed text-[#3b4448]">
              Founder of Embark Digitals — building fast, modern websites, branding, and digital assets.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5 sm:gap-4">
              <a
                href="#websites"
                onClick={trackViewWorkClick}
                className="group inline-flex items-center justify-center gap-3 min-h-[52px] px-5 sm:px-9 rounded-full bg-[#0e5c66] text-white text-[16px] sm:text-[17px] font-semibold shadow-[0_10px_24px_-12px_rgba(14,92,102,0.8)] hover:bg-[#0b4c55] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0e5c66] focus-visible:ring-offset-[#f3f3f1]"
              >
                View Work
                <Icon name="arrow" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                onClick={trackGetInTouchClick}
                className="inline-flex items-center justify-center gap-3 min-h-[52px] px-5 sm:px-9 rounded-full border border-[#c9d0d1] bg-white/60 text-[#121417] text-[16px] sm:text-[17px] font-semibold hover:border-[#0e5c66] hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0e5c66] focus-visible:ring-offset-[#f3f3f1]"
              >
                <Icon name="chat" className="w-5 h-5 text-[#0e5c66]" />
                Get in Touch
              </a>
            </div>

            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-[#3b4448]">
              <li className="flex items-center gap-2"><Icon name="building" className="w-[18px] h-[18px] text-[#5f6b6f]" />Embark Digitals</li>
              <li className="hidden sm:block w-px h-5 bg-[#c9d0d1]" aria-hidden="true" />
              <li className="flex items-center gap-2"><Icon name="pin" className="w-[18px] h-[18px] text-[#5f6b6f]" />{content?.contact?.location || 'Johannesburg, South Africa'}</li>
            </ul>
          </div>

          {/* e-card (desktop) */}
          <div className="hidden xl:block absolute z-10 right-[clamp(32px,5vw,88px)] top-[36%]">
            <ECard />
          </div>

          {/* Portrait stage (mobile / tablet): composed separately, not a scaled desktop */}
          <div className="xl:hidden relative mt-8 -mx-5 sm:-mx-8 lg:m-0 lg:rounded-[28px] h-[min(108vw,560px)] lg:h-[480px] bg-[#48aab7] overflow-hidden">
            <img
              src={withBase('/assets/ndu-icon.png')}
              alt=""
              aria-hidden="true"
              className="absolute top-[6%] -right-[4%] w-[46%] max-w-[260px] opacity-[0.13] mix-blend-multiply select-none"
            />
            <img
              src={withBase('/assets/ndu-hero-cutout.webp')}
              alt="Ndumiso Yedwa, founder of Embark Digitals"
              width="1080"
              height="1080"
              className="absolute bottom-0 left-[42%] -translate-x-1/2 h-[96%] w-auto max-w-none"
              loading="eager"
            />
            <div className="absolute right-4 bottom-4 sm:right-8 sm:bottom-6">
              <ECard compact />
            </div>
          </div>
          </div>

          {/* Section shortcut cards */}
          <nav aria-label="Portfolio sections" className="relative z-10 mt-6 lg:mt-8 xl:mt-auto xl:pt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 xl:gap-6">
            {shortcuts.map(card => (
              <a
                key={card.href}
                href={card.href}
                className="group relative block overflow-hidden rounded-2xl xl:rounded-[22px] bg-[#dfe4e4] aspect-[4/3] sm:aspect-[16/9] shadow-[0_18px_36px_-24px_rgba(10,30,34,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0e5c66]"
              >
                <img
                  src={withBase(card.img)}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-[50%_30%] transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-3 sm:px-4 py-3 bg-[rgba(16,38,43,0.78)] backdrop-blur-md text-white min-h-[56%] sm:min-h-[48%]">
                  <Icon name={card.icon} className="hidden sm:block lg:hidden xl:block flex-none w-7 h-7 text-[#6fd0d7]" />
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold leading-tight text-[15px] sm:text-[17px]">{card.title}</span>
                    <span className="block mt-1 text-[12px] sm:text-[13px] text-white/75 leading-snug">{card.sub}</span>
                  </span>
                  <span className="hidden sm:flex lg:hidden xl:flex flex-none w-9 h-9 rounded-full border border-white/60 items-center justify-center transition-colors group-hover:bg-white group-hover:text-[#10262b]">
                    <Icon name="arrow" className="w-4 h-4" />
                  </span>
                </span>
              </a>
            ))}
          </nav>

          {/* Core skills strip — glass */}
          <div className="relative z-10 my-5 xl:mt-6 xl:mb-7 hero-glass-light rounded-[28px] xl:rounded-full px-5 xl:px-8 py-4 xl:py-3.5 flex flex-col xl:flex-row xl:items-center gap-3 xl:gap-6">
            <p className="font-semibold text-[16px] xl:text-[18px] whitespace-nowrap text-[#121417]">Core Skills &amp; Tools</p>
            <span className="hidden xl:block w-px h-8 bg-[#121417]/15" aria-hidden="true" />
            <ul className="flex flex-wrap gap-x-5 gap-y-2.5 xl:flex-1 xl:justify-between">
              {coreSkills.map(({ name, Icon: SkillIcon, color }) => (
                <li key={name} className="flex items-center gap-2 text-[14px] xl:text-[15px] text-[#26302f]">
                  <SkillIcon className="w-[18px] h-[18px] xl:w-5 xl:h-5" style={{ color }} aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
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
          <ol className="grid gap-8 sm:grid-cols-3 sm:gap-8">
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
