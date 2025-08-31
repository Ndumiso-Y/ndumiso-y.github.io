// src/components/Upcoming.jsx
import React from "react";
import { content } from "../content";

export default function Upcoming() {
  const items = Array.isArray(content?.upcoming) ? content.upcoming : [];
  if (!items.length) return null;

  return (
    <section id="upcoming" className="bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-bold">Upcoming Projects</h2>
        <p className="text-slate-600 mt-1 max-w-2xl">
          A preview of work in flight—new websites, social campaigns, and product experiments. Videos and teasers below.
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {items.map((it, i) => (
            <article key={i} className="rounded-2xl border border-slate-200 bg-white shadow-soft overflow-hidden">
              <div className="p-4">
                <h3 className="font-semibold">{it.name || "Untitled"}</h3>
                {it.note && <p className="text-xs text-slate-500 mt-1">{it.note}</p>}
                {it.details && <p className="text-sm text-slate-700 mt-2">{it.details}</p>}
                {Array.isArray(it.tags) && it.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {it.tags.map((t, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-1 rounded-full border border-slate-200 bg-white">{t}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Optional teaser video */}
              {it.video?.mp4 && (
                <div className="px-4 pb-4">
                  <video
                    controls
                    preload="metadata"
                    poster={it.video.poster}
                    className="w-full rounded-lg border border-slate-200"
                  >
                    <source src={it.video.webm} type="video/webm" />
                    <source src={it.video.mp4} type="video/mp4" />
                    Sorry—your browser doesn’t support HTML5 video.
                  </video>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
