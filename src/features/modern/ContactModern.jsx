import React, { useMemo } from 'react'
import { FaWhatsapp, FaEnvelope, FaPhone, FaLinkedin, FaFacebook, FaInstagram, FaDownload, FaIdCard } from 'react-icons/fa'
import { content } from '../../content'
import { withBase } from '../../lib/withBase'
import { UPWORK, UPWORK_PROFILE_URL } from '../../lib/upwork'
import { trackWhatsAppClick, trackEmailClick, trackLinkedInClick, trackECardClick, trackEvent } from '../../lib/analytics'

// Contact — static redesign. Charcoal closing band (pairs with Websites). WhatsApp-first,
// then Email; Call, Save Contact (VCF) and the existing e-Card; then the three social profiles.

const btn = 'inline-flex items-center justify-center gap-3 min-h-[52px] px-6 rounded-full text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#10191b]'
const btnLine = `${btn} border border-white/25 text-white hover:bg-white/10`

export default function ContactModern() {
  const c = content?.contact || {}

  // Fallback vCard (only used if no VCF file is configured), as before
  const vcardUrl = useMemo(() => {
    if (UPWORK) return ''
    const lines = [
      'BEGIN:VCARD', 'VERSION:3.0', 'N:Yedwa;Ndumiso;;;', `FN:${c.name || 'Ndumiso Yedwa'}`,
      c.title ? `TITLE:${c.title}` : '', c.email ? `EMAIL;TYPE=INTERNET:${c.email}` : '',
      c.phone ? `TEL;TYPE=CELL:${c.phone}` : '',
      c.location && !/remote/i.test(c.location) ? `ADR;TYPE=WORK:;;${(c.location || '').replaceAll(',', '\\,')};;;;` : '',
      c.linkedin ? `URL:${c.linkedin}` : '', c.ecard ? `URL;TYPE=ECARD:${c.ecard}` : '', 'END:VCARD'
    ].filter(Boolean).join('\n')
    return `data:text/vcard;charset=utf-8;base64=${btoa(unescape(encodeURIComponent(lines)))}`
  }, [c])

  const socials = [
    c.linkedin && { href: c.linkedin, label: 'LinkedIn', Icon: FaLinkedin, ctx: 'contact' },
    c.facebook && { href: c.facebook, label: 'Facebook', Icon: FaFacebook, ctx: 'facebook' },
    c.instagram && { href: c.instagram, label: 'Instagram', Icon: FaInstagram, ctx: 'instagram' }
  ].filter(Boolean)

  return (
    // Inline style: overrides the legacy `#contact` rule in index.css (ID specificity)
    <section id="contact" className="relative text-white py-16 lg:py-28 overflow-hidden" style={{ background: '#10191b', borderTop: 0 }}>
      <img src={withBase(c.icon || '/assets/ndu-icon.png')} alt="" aria-hidden="true"
        className="hidden lg:block absolute -left-20 -bottom-24 w-[380px] opacity-[0.05] invert select-none pointer-events-none" />

      <div className="relative max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-[clamp(32px,5vw,88px)]">
        <div className="grid gap-10 lg:grid-cols-[6fr_6fr] lg:gap-16 xl:gap-24 items-center">
          {/* Message */}
          <div>
            <p className="flex items-center gap-4 text-[13px] font-semibold tracking-[0.22em] uppercase text-white/85">
              <span className="block w-10 h-[3px] bg-[#41b3bc] rounded-full" aria-hidden="true" />
              {UPWORK ? 'Work With Me' : 'Contact'}
            </p>
            <h2 className="hero-display mt-5 text-[clamp(40px,10vw,56px)] lg:text-[clamp(52px,5vw,84px)] leading-[0.98] tracking-[-0.025em]">
              Let's work <span className="text-[#6fd0d7]">together</span><span className="text-[#41b3bc]" aria-hidden="true">.</span>
            </h2>
            <p className="mt-6 text-[18px] lg:text-[20px] text-white/75 max-w-[40ch] leading-relaxed">
              Fast, modern websites, branding, and digital assets — tailored to your goals.
            </p>
            <p className="mt-3 text-[16px] lg:text-[18px] text-white/75 max-w-[40ch] leading-relaxed">
              Need an app, dashboard or business system? Tell me what you need it to do.
            </p>
            {c.location && (
              <p className="mt-6 inline-flex items-center gap-2.5 text-[15px] text-white/70">
                <svg className="w-4 h-4 text-[#6fd0d7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 010 18M12 3a14 14 0 000 18" /></svg>
                {c.location}
              </p>
            )}
          </div>

          {/* Actions card */}
          <div className="rounded-[28px] bg-white/[0.04] border border-white/10 p-5 sm:p-8 lg:p-10">
            <div className="flex items-center gap-4">
              <span className="flex-none w-12 h-12 rounded-xl bg-white p-2">
                <img src={withBase(c.icon || '/assets/ndu-icon.png')} alt="Ndumiso icon" className="w-full h-full object-contain" />
              </span>
              <div>
                <p className="text-[17px] font-semibold">{c.name || 'Ndumiso Yedwa'}</p>
                <p className="text-[14px] text-white/60">Embark Digitals</p>
              </div>
            </div>

            {UPWORK ? (
              // Upwork/Fiverr build: no means of direct contact; all conversation stays on the platform
              <div className="mt-7">
                {UPWORK_PROFILE_URL ? (
                  <a href={UPWORK_PROFILE_URL} target="_blank" rel="noopener noreferrer"
                    onClick={() => trackEvent('upwork_profile_click', { link_location: 'contact' })}
                    className={`${btn} w-full bg-[#41b3bc] text-[#0b1214] hover:bg-[#6fd0d7]`}>
                    Hire me on Upwork <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : null}
                <p className={`${UPWORK_PROFILE_URL ? 'mt-5' : ''} text-[16px] text-white/75 leading-relaxed`}>
                  Send me a message on the platform where you found me, and I'll reply there.
                </p>
              </div>
            ) : (<>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {c.whatsapp && (
                <a href={c.whatsapp} onClick={trackWhatsAppClick} target="_blank" rel="noreferrer" aria-label="WhatsApp me"
                  className={`${btn} bg-[#25D366] text-[#0b1214] hover:bg-[#3ee07a] sm:col-span-2`}>
                  <FaWhatsapp className="w-5 h-5" aria-hidden="true" /> WhatsApp
                </a>
              )}
              {c.email && (
                <a href={`mailto:${c.email}`} onClick={trackEmailClick} aria-label="Email me"
                  className={`${btn} bg-[#41b3bc] text-[#0b1214] hover:bg-[#6fd0d7] sm:col-span-2`}>
                  <FaEnvelope className="w-4 h-4" aria-hidden="true" /> Email
                </a>
              )}
              {c.phone && (
                <a href={`tel:${(c.phone || '').replace(/\s+/g, '')}`} aria-label="Call me" className={btnLine}>
                  <FaPhone className="w-4 h-4" aria-hidden="true" /> Call
                </a>
              )}
              <a href={c.vcf ? withBase(c.vcf) : vcardUrl} target="_blank" rel="noreferrer" aria-label="Save contact" className={btnLine}>
                <FaDownload className="w-4 h-4" aria-hidden="true" /> Save Contact
              </a>
              {c.ecard && (
                <a href={c.ecard} onClick={trackECardClick} target="_blank" rel="noreferrer" className={`${btnLine} sm:col-span-2`}>
                  <FaIdCard className="w-4 h-4" aria-hidden="true" /> e-Card <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>

            {/* QR e-card (moved from the hero, 2026-11-17): scan from another device */}
            {c.ecard && (
              <figure className="mt-6 flex items-center gap-4 rounded-2xl bg-white/[0.04] border border-white/10 p-3">
                <span className="flex-none w-[104px] bg-white rounded-xl p-1.5">
                  <img src={withBase('/assets/QRcodeECard.png')} alt="QR code that opens Ndumiso's e-card" width="574" height="574" loading="lazy" className="w-full h-auto rounded-md" />
                </span>
                <figcaption>
                  <span className="block text-[16px] font-semibold">My e-card</span>
                  <span className="block mt-1 text-[14px] text-white/70 leading-snug">Scan to open my e-card and save my contact details.</span>
                </figcaption>
              </figure>
            )}

            {socials.length > 0 && (
              <div className="mt-8 pt-7 border-t border-white/10">
                <h3 className="text-[13px] font-semibold tracking-[0.2em] uppercase text-white/60">Follow</h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {socials.map(({ href, label, Icon, ctx }) => (
                    <a key={label} href={href} onClick={() => trackLinkedInClick(ctx)} target="_blank" rel="noreferrer" aria-label={label}
                      className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                      <Icon className="w-4 h-4" aria-hidden="true" /> {label}
                    </a>
                  ))}
                </div>
              </div>
            )}
            </>)}
          </div>
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-[#0b1214] text-white/60 border-t border-white/10">
      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-[clamp(32px,5vw,88px)] py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[14px]">
        <p>© {new Date().getFullYear()} Ndumiso Yedwa. Built with React &amp; Tailwind CSS.</p>
        <a href="#hero" className="inline-flex items-center gap-2 min-h-[44px] px-3 rounded-full hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
          Back to top
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        </a>
      </div>
    </footer>
  )
}
