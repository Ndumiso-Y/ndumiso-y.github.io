// src/components/About.jsx
import React, { useState, useEffect } from "react";
import { content } from "../content";
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss,
  SiCanva, SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign,
  SiAdobepremierepro
} from "react-icons/si";
import { TbCircleLetterC } from "react-icons/tb"; // Claude
import { AiFillHeart } from "react-icons/ai";     // Lovable
import { HiInformationCircle } from "react-icons/hi2"; // Info icon for mobile

// Map skill labels to icon + brand colors
function getSkillSpec(label = "") {
  const n = label.trim().toLowerCase();
  const spec = (C, bg, txt = "#fff") => ({ C, bg, txt });

  // Core web
  if (n === "html" || n === "html5")               return spec(SiHtml5,          "#E34F26");
  if (n === "css"  || n === "css3")                return spec(SiCss3,           "#1572B6");
  if (n === "javascript" || n === "js")            return spec(SiJavascript,     "#F7DF1E", "#000");
  if (n === "react")                                return spec(SiReact,          "#61DAFB", "#000");
  if (n === "tailwind" || n === "tailwind css")     return spec(SiTailwindcss,    "#38BDF8", "#000");

  // Design apps
  if (n === "canva")                                return spec(SiCanva,          "#00C4CC");
  if (n === "adobe photoshop" || n === "photoshop" || n === "ps")
                                                    return spec(SiAdobephotoshop, "#31A8FF");
  if (n === "adobe illustrator" || n === "illustrator" || n === "ai")
                                                    return spec(SiAdobeillustrator, "#FF9A00");
  if (n === "adobe indesign" || n === "indesign" || n === "id")
                                                    return spec(SiAdobeindesign,  "#FF3366");
  if (n === "premiere pro" || n === "adobe premiere pro" || n === "pr")
                                                    return spec(SiAdobepremierepro, "#9999FF", "#000");

  // Extras
  if (n === "claude" || n === "claude.ai" || n === "claude code" || n === "anthropic")
                                                    return spec(TbCircleLetterC,  "#101010");
  if (n === "lovable" || n === "loveable")          return spec(AiFillHeart,      "#EC4899");

  return spec(null, "#0f172a");
}

function SkillPill({ skill, onMobileToggle, showMobileDescription, isMobile }) {
  const skillName = typeof skill === 'string' ? skill : skill.name;
  const description = typeof skill === 'string' ? null : skill.description;
  const { C, bg, txt } = getSkillSpec(skillName);

  if (isMobile) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => onMobileToggle(skillName)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-sm transition-all duration-200 hover:shadow-sm"
          style={{ backgroundColor: bg, color: txt }}
        >
          {C ? <C /> : null}
          <span className="font-medium">{skillName}</span>
          {description && (
            <HiInformationCircle className="w-3 h-3 opacity-70" />
          )}
        </button>
        
        {showMobileDescription && description && (
          <div className="mt-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 transition-all duration-200">
            {description}
          </div>
        )}
      </div>
    );
  }

  // Desktop version with hover tooltip
  return (
    <div className="relative group">
      <span
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-sm cursor-help transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-0.5"
        style={{ backgroundColor: bg, color: txt }}
      >
        {C ? <C /> : null}
        <span className="font-medium">{skillName}</span>
      </span>
      
      {/* Tooltip for desktop */}
      {description && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
          {description}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
        </div>
      )}
    </div>
  );
}

export default function About() {
  const a = content.about || {};
  const brand = content.brandColor || "#48aab7";
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMobileToggle = (skillName) => {
    setExpandedSkill(expandedSkill === skillName ? null : skillName);
  };

  return (
    <section id="about" className="bg-white section-offset">
      <div className="max-w-6xl mx-auto px-4 py-14 md:py-18">
        {/* Heading + subtitle */}
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold">About</h2>
          {a.title && <p className="mt-1 text-slate-700">{a.title}</p>}

          {a.name && (
            <div className="mt-2">
              <span className="relative inline-block text-xl font-semibold">
                <span
                  aria-hidden
                  className="halo-brand"
                  style={{
                    background: `radial-gradient(60% 50% at 50% 58%, ${brand}, transparent 65%)`,
                  }}
                />
                <span className="relative z-10">{a.name}</span>
              </span>
            </div>
          )}
        </div>

        {/* Bio — wider and more relaxed */}
        {a.bio && (
          <p className="mt-5 text-slate-700 max-w-3xl leading-relaxed">
            {a.bio}
          </p>
        )}

        {/* Stats in roomy chips */}
        {(a.stats?.years || a.stats?.activeClients) && (
          <div className="mt-6 flex flex-wrap gap-6 text-slate-800">
            {a.stats?.years && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-slate-50">
                <span className="text-2xl font-extrabold">{a.stats.years}+</span>
                <span className="text-sm">years coding</span>
              </div>
            )}
            {a.stats?.activeClients && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-slate-50">
                <span className="text-2xl font-extrabold">{a.stats.activeClients}</span>
                <span className="text-sm">active clients</span>
              </div>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="mt-8 mb-6 h-px bg-slate-200" />

        {/* Skills — spread out, wrap nicely */}
        {Array.isArray(a.skills) && a.skills.length > 0 && (
          <>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Skills</h3>
              {isMobile && (
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <HiInformationCircle className="w-3 h-3" />
                  Tap to learn more
                </span>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 max-w-5xl">
              {a.skills.map((skill, i) => {
                const skillName = typeof skill === 'string' ? skill : skill.name;
                return (
                  <SkillPill 
                    key={i} 
                    skill={skill}
                    onMobileToggle={handleMobileToggle}
                    showMobileDescription={expandedSkill === skillName}
                    isMobile={isMobile}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
