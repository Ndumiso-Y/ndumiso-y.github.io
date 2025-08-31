// src/components/Hero.jsx
import React, { useEffect, useRef } from "react";
import { content } from "../content";
import AccentFX from "./AccentFX";

export default function Hero() {
  const h = content.hero || {};
  const brand = content.brandColor || "#48aab7";
  const ref = useRef(null);

  // tiny parallax on pointer move
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // normalized range [-1, 1]
      const rx = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2)));
      const ry = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2)));
      el.style.setProperty("--rx", rx.toFixed(3));
      el.style.setProperty("--ry", ry.toFixed(3));
    };
    const onLeave = () => {
      el.style.setProperty("--rx", "0");
      el.style.setProperty("--ry", "0");
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <header id="home" className="relative overflow-hidden hero-bg">
      <AccentFX />

      {/* floating orbs */}
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
      <div className="hero-orb orb-3" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="grid md:grid-cols-[1.15fr_1fr] gap-12 items-center">

          {/* LEFT – Copy */}
          <div className="reveal">
            <span className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-slate-600">
              Hello! I’m
              <span className="inline-block h-[6px] w-[6px] rounded-full" style={{ backgroundColor: brand }} />
            </span>

            {/* Big, bold name with animated halo + parallax nudge */}
            <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-[1.05]">
              <span className="relative inline-block parallax-name">
                <span
                  aria-hidden
                  className="halo-brand halo-pulse"
                  style={{
                    background: `radial-gradient(72% 62% at 50% 60%, ${brand}, transparent 66%)`,
                  }}
                />
                <span className="shine relative z-10">{h.name || "Ndumiso Yedwa"}</span>
              </span>
            </h1>

            <p className="mt-3 text-base md:text-lg text-slate-700">
              {h.role || "Web Designer & Front-End Developer"}
            </p>

            <p className="mt-5 text-slate-700 text-[15px] md:text-base max-w-prose">
              Founder of <span className="font-semibold">Embark Digitals</span> — building fast, modern
              websites, branding, and digital assets.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#projects" className="cta-primary">Let’s Talk</a>
              <a href="#websites" className="cta-ghost">View Work</a>
              {content.contact?.ecard && (
                <a href={content.contact.ecard} target="_blank" rel="noreferrer" className="cta-ghost">
                  e-Card
                </a>
              )}
            </div>

            {/* Value bullets */}
            <ul className="mt-6 grid gap-2 text-sm md:text-[15px] text-slate-800">
              <li className="flex items-start gap-2"><span>✓</span><span>Clean UI & brand consistency</span></li>
              <li className="flex items-start gap-2"><span>✓</span><span>Conversion-focused messaging</span></li>
              <li className="flex items-start gap-2"><span>✓</span><span>Reliable delivery</span></li>
            </ul>

            {/* Quick stats strip */}
            <div className="mt-8 flex flex-wrap gap-4 text-slate-900">
              <div className="chip-stat">
                <span className="text-xl font-extrabold">{content?.about?.stats?.years || 3}+</span>
                <span className="text-sm">years coding</span>
              </div>
              <div className="chip-stat">
                <span className="text-xl font-extrabold">{content?.about?.stats?.activeClients || 4}</span>
                <span className="text-sm">active clients</span>
              </div>
            </div>

            {/* scroll cue */}
            <div className="mt-10 hidden md:flex items-center gap-2 text-xs text-slate-500">
              <span className="scroll-dot" />
              <span>Scroll</span>
            </div>
          </div>

          {/* RIGHT – Portrait with stronger ring + parallax */}
          <div className="relative justify-self-center reveal">
            <div
              className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-70"
              style={{ background: `radial-gradient(45% 45% at 50% 50%, ${brand}33, transparent 70%)` }}
            />
            <div
              className="relative w-60 h-60 md:w-[19rem] md:h-[19rem] rounded-full p-[6px] ring-glow parallax-portrait"
              style={{ background: `linear-gradient(145deg,#fff,${brand}66)` }}
            >
              <img
                src={h.portrait || "/assets/ndu-portrait.jpg"}
                alt={h.name}
                className="w-full h-full rounded-full object-cover bg-slate-100"
              />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
