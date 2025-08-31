// src/components/Contact.jsx
import React, { useMemo, useState } from "react";
import { content } from "../content";

// Reusable safe image: falls back to a styled badge if the image can't load
function SafeLogo({ src, alt = "", className = "", fallbackType = "badge" }) {
  const [ok, setOk] = useState(true);

  if (ok && src) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setOk(false)}
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  }

  if (fallbackType === "none") return null;

  

  // Default fallback: a neat "NY" badge so the UI never breaks
  const initials = "NY";
  return (
    <div
      className={`grid place-items-center bg-white text-slate-700 ${className}`}
      aria-label="Logo fallback"
      style={{ border: "1px solid rgba(148,163,184,0.5)", borderRadius: "1rem" }}
    >
      <span className="font-semibold">{initials}</span>
    </div>
  );
}

function ActionButton({ href, onClick, children, variant = "solid", ariaLabel }) {
  const base = "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm transition";
  const solid = "bg-slate-900 text-white hover:bg-slate-800";
  const outline = "border border-slate-200 hover:bg-slate-50";
  const cls = `${base} ${variant === "solid" ? solid : outline}`;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

export default function Contact() {
  const c = content?.contact || {};
  const brand = content?.brandColor || "#48aab7";
  const [openPreview, setOpenPreview] = useState(false);

  // Build a .vcf (vCard) data URL so users can save your contact
  const vcardUrl = useMemo(() => {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:Yedwa;Ndumiso;;;`,
      `FN:${c.name || "Ndumiso Yedwa"}`,
      c.title ? `TITLE:${c.title}` : "",
      c.email ? `EMAIL;TYPE=INTERNET:${c.email}` : "",
      c.phone ? `TEL;TYPE=CELL:${c.phone}` : "",
      c.location ? `ADR;TYPE=WORK:;;${(c.location || "").replaceAll(",", "\\,")};;;;` : "",
      c.linkedin ? `URL:${c.linkedin}` : "",
      c.ecard ? `URL;TYPE=ECARD:${c.ecard}` : "",
      "END:VCARD"
    ].filter(Boolean).join("\n");
    const b64 = typeof window !== "undefined"
      ? btoa(unescape(encodeURIComponent(lines)))
      : "";
    return `data:text/vcard;charset=utf-8;base64=${b64}`;
  }, [c]);

  return (
    <section id="contact" className="relative">
      {/* soft brand background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 400px at 10% -10%, rgba(72,170,183,0.15), transparent 60%), radial-gradient(1200px 400px at 90% 110%, rgba(72,170,183,0.15), transparent 60%)"
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 items-stretch">
          {/* Left: Hero-ish contact card */}
          <article className="relative rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-6 md:p-8 overflow-hidden">
            {/* ndu-icon watermark (hidden automatically if image fails) */}
            <SafeLogo
              src={c.icon}
              alt=""
              fallbackType="none"
              className="pointer-events-none select-none absolute -right-10 -bottom-10 w-56 md:w-72 opacity-10"
            />

            <div className="flex items-center gap-4">
              {/* Small logo square with safe fallback */}
              <SafeLogo
                src={c.icon}
                alt="Ndumiso icon"
                className="shrink-0 w-16 h-16 rounded-2xl object-contain"
              />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Let’s work together</h2>
                <p className="text-slate-600">
                  Fast, modern websites, branding, and digital assets — tailored to your goals.
                </p>
              </div>
            </div>

            {/* Contact actions */}
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {c.ecard && (
                <ActionButton href={c.ecard} variant="solid" ariaLabel="Open e-card">
                  <span>💳</span> <span>View e-Card</span>
                </ActionButton>
              )}
              {c.email && (
                <ActionButton href={`mailto:${c.email}`} variant="outline" ariaLabel="Email me">
                  <span>✉️</span> <span>{c.email}</span>
                </ActionButton>
              )}
              {c.whatsapp && (
                <ActionButton href={c.whatsapp} variant="outline" ariaLabel="WhatsApp me">
                  <span>💬</span> <span>WhatsApp me</span>
                </ActionButton>
              )}
              {c.phone && (
                <ActionButton href={`tel:${(c.phone || "").replace(/\s+/g, "")}`} variant="outline" ariaLabel="Call me">
                  <span>📞</span> <span>{c.phone}</span>
                </ActionButton>
              )}
              {c.linkedin && (
                <ActionButton href={c.linkedin} variant="outline" ariaLabel="Open LinkedIn">
                  <span>🔗</span> <span>LinkedIn</span>
                </ActionButton>
              )}
              <ActionButton href={vcardUrl} variant="outline" ariaLabel="Save contact">
                <span>💾</span> <span>Save contact (.vcf)</span>
              </ActionButton>
            </div>

            {/* Inline e-Card preview trigger */}
            {c.ecard && (
              <div className="mt-4">
                <button
                  onClick={() => setOpenPreview(true)}
                  className="underline text-sm"
                  style={{ color: brand }}
                >
                  Preview e-Card in page
                </button>
              </div>
            )}
          </article>

          {/* Right: profile/details */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <div className="flex items-start gap-4">
              {c.headshot || content?.about?.headshot ? (
                <img
                  src={c.headshot || content.about.headshot}
                  alt={c.name || content?.about?.name || "Profile"}
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-200"
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
              <div>
                <h3 className="text-lg font-semibold">{c.name || content?.about?.name}</h3>
                <p className="text-slate-600">{c.title || content?.about?.title}</p>
                {c.location && <p className="text-slate-600 mt-1">{c.location}</p>}
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-700">
              I combine clean UI, conversion-focused messaging, and reliable delivery to build brand-ready
              web experiences for SMEs and founders.
            </p>

            <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full" style={{ background: brand }} />
                <span>Websites & landing pages</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full" style={{ background: brand }} />
                <span>Logos & brand kits</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full" style={{ background: brand }} />
                <span>Design systems</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full" style={{ background: brand }} />
                <span>Social media assets</span>
              </li>
            </ul>
          </aside>
        </div>
      </div>

      {/* e-Card Preview Modal */}
      {openPreview && c.ecard && (
        <div
          className="fixed inset-0 z-50 bg-black/70 p-4 grid place-items-center"
          role="dialog"
          aria-modal="true"
          aria-label="e-Card preview"
          onClick={() => setOpenPreview(false)}
        >
          <div
            className="max-w-4xl w-full rounded-2xl bg-white overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenPreview(false)}
              className="absolute top-3 right-3 z-10 rounded-full border border-slate-200 bg-white px-2 py-1 text-sm"
            >
              ✕
            </button>
            <div className="h-[70vh]">
              <iframe
                title="Ndumiso e-Card"
                src={c.ecard}
                className="w-full h-full"
                style={{ border: "0" }}
              />
            </div>
            <div className="p-3 border-t border-slate-200 flex items-center gap-3">
              <a
                href={c.ecard}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-sm"
              >
                Open e-Card in new tab
              </a>
              <span className="text-xs text-slate-500">
                If the preview doesn’t load, the e-Card site may block embedding — use the button.
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
