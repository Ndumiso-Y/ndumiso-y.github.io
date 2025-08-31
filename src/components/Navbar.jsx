// src/components/Navbar.jsx
import { withBase } from '../lib/withBase';
import React, { useState } from "react";
import { content } from "../content";

const links = [
  { href: "#about",    label: "About" },
  { href: "#websites", label: "Websites" },
  { href: "#graphics", label: "Graphics" },
  { href: "#social",   label: "Social Media Management" }, // must match section id
  { href: "#projects", label: "Projects" },
  { href: "#badges",   label: "Badges & Recognition" },
  { href: "#contact",  label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const icon = content?.contact?.icon ? withBase(content.contact.icon) : null;

{icon ? (
  <img src={icon} alt="logo" className="w-8 h-8 rounded-lg object-contain" />
) : (
  <div className="w-8 h-8 rounded-lg border border-slate-200 grid place-items-center text-xs">NY</div>
)}


  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <img src={icon} alt="logo" className="w-8 h-8 rounded-lg object-contain" />
          <span className="font-semibold">Ndumiso Yedwa</span>
        </a>

        <button
          className="md:hidden px-3 py-2 rounded-lg border border-slate-200"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="px-3 py-1 rounded-full hover:bg-black/5 transition">
              {l.label}
            </a>
          ))}
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 px-4 pb-3">
          <div className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="py-2"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
