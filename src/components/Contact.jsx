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

function ActionButton({ href, onClick, children, variant = "solid", ariaLabel, isPrimary = false }) {
  const brand = content?.brandColor || "#48aab7";
  const base = "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95";
  const solid = isPrimary 
    ? `text-white shadow-lg hover:shadow-xl` 
    : "bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg";
  const outline = "border-2 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 shadow-sm hover:shadow-md";
  
  const primaryStyle = isPrimary ? { 
    background: `linear-gradient(135deg, ${brand} 0%, ${brand}dd 100%)`,
    boxShadow: `0 4px 20px ${brand}40`
  } : {};
  
  const cls = `${base} ${variant === "solid" ? solid : outline}`;
  
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls} style={primaryStyle} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls} style={primaryStyle} aria-label={ariaLabel}>
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

      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <div className="flex justify-center">
          {/* Main contact card */}
          <article className="relative rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white via-white to-slate-50/30 backdrop-blur-sm shadow-xl shadow-slate-900/5 p-8 md:p-10 overflow-hidden w-full max-w-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/10">
            {/* ndu-icon watermark (hidden automatically if image fails) */}
            <SafeLogo
              src={c.icon}
              alt=""
              fallbackType="none"
              className="pointer-events-none select-none absolute -right-10 -bottom-10 w-56 md:w-72 opacity-10"
            />

            <div className="flex items-center gap-6">
              {/* Enhanced logo with subtle glow */}
              <div className="relative">
                <div 
                  className="absolute inset-0 rounded-2xl blur-md opacity-20" 
                  style={{ backgroundColor: brand }}
                />
                <SafeLogo
                  src={c.icon}
                  alt="Ndumiso icon"
                  className="relative shrink-0 w-18 h-18 md:w-20 md:h-20 rounded-2xl object-contain shadow-lg ring-2 ring-white"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
                  Let's work together
                </h2>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                  Fast, modern websites, branding, and digital assets — tailored to your goals.
                </p>
                {/* Added subtle accent */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-12 h-0.5 rounded-full" style={{ backgroundColor: brand }} />
                  <span className="text-sm text-slate-500 font-medium">Ready to start?</span>
                </div>
              </div>
            </div>

            {/* Enhanced Contact actions */}
            <div className="mt-8 space-y-4">
              {/* Primary CTAs */}
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                {c.whatsapp && (
                  <ActionButton href={c.whatsapp} variant="solid" isPrimary={true} ariaLabel="WhatsApp me">
                    <span>💬</span> <span>WhatsApp</span>
                  </ActionButton>
                )}
                {c.email && (
                  <ActionButton href={`mailto:${c.email}`} variant="solid" ariaLabel="Email me">
                    <span>✉️</span> <span>Email</span>
                  </ActionButton>
                )}
              </div>
              
              {/* Secondary actions */}
              <div className="grid sm:grid-cols-2 gap-3">
                {c.ecard && (
                  <ActionButton href={c.ecard} variant="outline" ariaLabel="Open e-card">
                    <span>💳</span> <span>View e-Card</span>
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
