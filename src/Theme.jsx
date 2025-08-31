// src/Theme.jsx
import React, { useEffect } from "react";
import { content } from "./content";

// tiny helpers
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
function hexToHsl(hex = "#48aab7") {
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map((x) => x + x).join("");
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > .5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
const HSL = (h, s, l, a=1) => `hsla(${h} ${s}% ${l}% / ${a})`;

export default function Theme() {
  useEffect(() => {
    const root = document.documentElement;

    // pull brand from content; fallback to teal
    const brand = content.brandColor || "#48aab7";
    const { h, s, l } = hexToHsl(brand);

    // optional manual palette override
    const p = content.palette || {};
    const ink = p.ink || "#0f172a";           // headings, dark text
    const paper = p.paper || "#ffffff";       // cards
    const canvas = p.canvas || "#f8fafc";     // page background

    // brand scale (lighter to darker)
    const scale = {
      50:  clamp(l + 38, 0, 100),
      100: clamp(l + 30, 0, 100),
      200: clamp(l + 22, 0, 100),
      300: clamp(l + 14, 0, 100),
      400: clamp(l + 6,  0, 100),
      500: l,
      600: clamp(l - 8,  0, 100),
      700: clamp(l - 16, 0, 100),
      800: clamp(l - 24, 0, 100),
      900: clamp(l - 32, 0, 100),
    };

    root.style.setProperty("--brand-h", `${h}`);
    root.style.setProperty("--brand-s", `${s}%`);
    Object.entries(scale).forEach(([k, lv]) => {
      root.style.setProperty(`--brand-${k}`, HSL(h, s, lv));
    });

    root.style.setProperty("--ink", ink);
    root.style.setProperty("--paper", paper);
    root.style.setProperty("--canvas", canvas);

    // subtle tints
    root.style.setProperty("--tint-1", HSL(h, s, clamp(l+34,0,100), .18));
    root.style.setProperty("--tint-2", HSL(h, s, clamp(l-6,0,100), .18));
  }, []);

  return null; // just sets CSS variables
}
