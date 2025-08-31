// src/components/VideoTeaser.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Teaser video:
 * - lazy sources only when visible
 * - load() + play() on enter viewport
 * - pauses when out of view
 * - muted + playsInline + autoPlay for mobile
 */
export default function VideoTeaser({ poster = "", mp4 = "", webm = "", onClick }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Observe visibility
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => setInView(e.isIntersecting)),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Load + play when visible
  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    if (inView) {
      if (!loaded) setLoaded(true); // add sources
      const id = setTimeout(() => {
        try { v.load(); v.play().catch(() => {}); } catch {}
      }, 0);
      return () => clearTimeout(id);
    } else {
      try { v.pause(); } catch {}
    }
  }, [inView, loaded]);

  const onCanPlay = () => {
    const v = ref.current;
    if (v && inView) v.play().catch(() => {});
  };

  const hasSources = loaded && (webm || mp4);

  return (
    <button
      type="button"
      className="block w-full relative group"
      onClick={onClick}
      aria-label="Open video"
    >
      <video
        ref={ref}
        muted
        playsInline
        autoPlay
        loop
        preload="none"
        poster={poster || undefined}
        onCanPlay={onCanPlay}
        className="w-full h-44 md:h-48 object-cover bg-black"
      >
        {hasSources && webm ? <source src={webm} type="video/webm" /> : null}
        {hasSources && mp4 ? <source src={mp4} type="video/mp4" /> : null}
      </video>

      <span className="absolute bottom-2 left-2 text-xs px-2 py-1 rounded-full bg-black/60 text-white">
        Preview (muted) — click for sound
      </span>
      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" aria-hidden="true" />
    </button>
  );
}
