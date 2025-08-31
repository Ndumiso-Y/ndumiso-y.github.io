// src/components/Footer.jsx
import React from "react";

export default function Footer(){
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/assets/ndu-icon.png" alt="Ndumiso icon" className="w-8 h-8 rounded-full ring-1 ring-slate-200" />
          <div>
            <p className="font-semibold">Ndumiso Yedwa</p>
            <p className="text-xs text-slate-500">© {new Date().getFullYear()} — Designed by Embark Digitals</p>
          </div>
        </div>
        <nav className="flex items-center gap-5 text-sm">
          <a href="#home" className="hover:text-yellow-400">Home</a>
          <a href="#about" className="hover:text-yellow-400">About</a>
          <a href="#work" className="hover:text-yellow-400">Sectors</a>
          <a href="#contact" className="hover:text-yellow-400">Contact</a>
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="hover:text-yellow-400">Facebook</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-yellow-400">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
