import React, { useState, useEffect, useRef } from 'react'
import { content } from '../../content'
import { withBase } from '../../lib/withBase'
import { UPWORK } from '../../lib/upwork'
import { trackNavClick } from '../../lib/analytics'

// Anchors and analytics section keys are unchanged; only the "projects" label
// now reads "Learning" to match the approved hero reference.
const navLinks = [
  { href: '#about', label: 'About', section: 'about' },
  { href: '#websites', label: 'Websites', section: 'websites' },
  { href: '#graphics', label: 'Graphics', section: 'graphics' },
  { href: '#social', label: 'Social', section: 'social' },
  { href: '#projects', label: 'Learning', section: 'projects' },
  { href: '#contact', label: UPWORK ? 'Hire Me' : 'Contact', section: 'contact' },
]

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  const icon = content?.contact?.icon ? withBase(content.contact.icon) : null

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id)
        }
      })
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the mobile menu on Escape or outside tap
  useEffect(() => {
    if (!menuOpen) return
    const onKey = e => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onPointer = e => {
      if (!menuRef.current?.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [menuOpen])

  // Light glass over the light sections; dark glass over the charcoal (Websites, Contact)
  // and deep-teal (Social) bands
  const LIGHT_SECTIONS = ['hero', 'about', 'graphics', 'projects']
  const onLight = LIGHT_SECTIONS.includes(activeSection)
  const shell = onLight ? 'hero-glass-light text-[#121417]' : 'nav-glass-dark text-white'
  const linkIdle = onLight ? 'text-[#26302f] hover:text-[#0e5c66]' : 'text-white/75 hover:text-white'
  const linkActive = onLight ? 'text-[#0e5c66]' : 'text-[#41b3bc]'

  const handleLink = section => {
    trackNavClick(section)
    setMenuOpen(false)
  }

  return (
    <nav
      ref={menuRef}
      aria-label="Main"
      className="fixed z-50 top-3 md:top-5 left-3 right-3 md:left-1/2 md:right-auto md:-translate-x-1/2"
    >
      <div className={`${shell} rounded-full pl-2 pr-2 md:pr-3 py-2 flex items-center gap-2 md:gap-3 transition-colors duration-300`}>
        <a
          href="#hero"
          aria-label="Ndumiso Yedwa — back to top"
          className="flex-none w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#41b3bc]"
        >
          {icon ? <img src={icon} alt="" className="w-8 h-8 object-contain" /> : <span className="text-sm font-bold text-[#121417]">NY</span>}
        </a>

        <span className={`hidden md:block w-[2px] h-7 rounded-full ${onLight ? 'bg-[#0e5c66]' : 'bg-[#41b3bc]'}`} aria-hidden="true" />

        {/* Desktop / tablet links */}
        <ul className="hidden md:flex items-center">
          {navLinks.map(link => {
            const active = activeSection === link.section
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => handleLink(link.section)}
                  aria-current={active ? 'true' : undefined}
                  className={`relative flex items-center min-h-[44px] px-3 lg:px-5 text-[15px] lg:text-[16px] font-medium rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#41b3bc] ${active ? linkActive : linkIdle}`}
                >
                  {link.label}
                  {active && <span className="absolute left-3 right-3 lg:left-5 lg:right-5 bottom-2 h-[2px] rounded-full bg-current" aria-hidden="true" />}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile: menu button */}
        <span className="md:hidden flex-1 text-[15px] font-semibold">Ndumiso Yedwa</span>
        <button
          ref={buttonRef}
          type="button"
          className="md:hidden flex-none w-11 h-11 rounded-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#41b3bc]"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(o => !o)}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <ul id="mobile-menu" className={`md:hidden mt-2 ${shell} rounded-3xl p-2`}>
          {navLinks.map(link => {
            const active = activeSection === link.section
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => handleLink(link.section)}
                  aria-current={active ? 'true' : undefined}
                  className={`flex items-center min-h-[48px] px-4 rounded-2xl text-[17px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#41b3bc] ${active ? linkActive : linkIdle}`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </nav>
  )
}
