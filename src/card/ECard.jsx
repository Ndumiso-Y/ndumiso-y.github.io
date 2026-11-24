import React from 'react'
import { content } from '../content'
import { withBase } from '../lib/withBase'
import { trackEvent, trackWhatsAppClick, trackEmailClick } from '../lib/analytics'

// Gate 1 (static): owner approved 23 Nov 2026. Wording follows the site;
// Website opens embarkdigitals.com, View Profile opens the portfolio; no verified tick.
const { contact } = content
const EMBARK_URL = 'https://www.embarkdigitals.com'

const Arrow = () => (
  <svg className="ec-arrow" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const icons = {
  globe: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9s1.2-6.4 3.8-9z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#25D366" d="M12 2.2A9.8 9.8 0 0 0 3.6 17l-1.3 4.8 4.9-1.3A9.8 9.8 0 1 0 12 2.2zm0 17.9a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1 1 12 20.1z" />
      <path fill="#25D366" d="M16.5 14.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c.8-4 4-6 8-6s7.2 2 8 6" />
    </svg>
  ),
  save: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  ),
}

const actions = [
  { key: 'website', label: 'Website', icon: icons.globe, href: EMBARK_URL, external: true, primary: true,
    onClick: () => trackEvent('ecard_website_click', { label: 'E-card Website' }) },
  { key: 'whatsapp', label: 'WhatsApp', icon: icons.whatsapp, href: contact.whatsapp, external: true,
    onClick: trackWhatsAppClick },
  { key: 'email', label: 'Email', icon: icons.mail, href: `mailto:${contact.email}`,
    onClick: trackEmailClick },
  { key: 'profile', label: 'View Profile', icon: icons.user, href: withBase('/'),
    onClick: () => trackEvent('ecard_profile_click', { label: 'E-card View Profile' }) },
]

export default function ECard() {
  return (
    <main className="ec-page">
      <article className="ec-frame" aria-label="Ndumiso Yedwa digital business card">
        <div className="ec-card">
          <div className="ec-photo">
            {/* Glass squares behind the portrait */}
            <span className="ec-glass ec-g1" aria-hidden="true" />
            <span className="ec-glass ec-g2" aria-hidden="true" />
            <span className="ec-glass ec-g3" aria-hidden="true" />
            <span className="ec-glass ec-g4" aria-hidden="true" />
            <img
              className="ec-portrait"
              src={withBase('/assets/ecard-portrait.webp')}
              alt="Ndumiso Yedwa"
              width="1024"
              height="820"
              draggable={false}
            />
            {/* Pair in front of the shoulder, as in the approved target */}
            <span className="ec-glass ec-g5" aria-hidden="true" />
            <span className="ec-glass ec-g6" aria-hidden="true" />
          </div>

          <section className="ec-panel">
            <h1 className="ec-name">{contact.name}</h1>
            <p className="ec-role">
              Founder, <span className="ec-brand">Embark Digitals</span>
            </p>
            <span className="ec-bar" aria-hidden="true" />
            <p className="ec-line">
              Websites, business software &amp; <span className="ec-nowrap">AI-assisted</span> development for growing businesses.
            </p>

            <nav className="ec-actions" aria-label="Contact Ndumiso">
              {actions.map(a => (
                <a
                  key={a.key}
                  className={`ec-btn${a.primary ? ' ec-btn--primary' : ''}`}
                  href={a.href}
                  onClick={a.onClick}
                  {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className={`ec-icon ec-icon--${a.key}`}>{a.icon}</span>
                  <span className="ec-label">{a.label}</span>
                  <Arrow />
                </a>
              ))}
            </nav>

            <a
              className="ec-save"
              href={withBase(contact.vcf)}
              download="Ndumiso-Yedwa.vcf"
              onClick={() => trackEvent('ecard_save_contact_click', { label: 'E-card Save Contact' })}
            >
              {icons.save}
              Save contact
            </a>
          </section>
        </div>
      </article>
    </main>
  )
}
