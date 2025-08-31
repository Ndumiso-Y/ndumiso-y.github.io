// src/components/Websites.jsx
import { withBase } from '../lib/withBase';
import React, { useEffect, useState } from "react";
import { content } from "../content";

export default function Websites() {
  const items = Array.isArray(content?.websites) ? content.websites : [];
  const intro = content?.sectionIntros?.websites;
  const brand = content?.brandColor || "#48aab7";

  const [expanded, setExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => { setIsDesktop(mq.matches); setExpanded(mq.matches); };
    set(); mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  if (!items.length) return null;

  const visible = expanded || isDesktop ? items : items.slice(0, 1);

  const collapse = () => {
    setExpanded(false);
    const el = document.getElementById("websites");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="websites" className="bg-white section-offset">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-bold">Websites</h2>
        {intro && <p className="mt-2 text-slate-600 max-w-3xl">{intro}</p>}

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((w, i) => (
            <article key={w.name || i} className="rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-sm">
              {w.thumb && (
                <img
                  src={w.thumb}
                  alt={w.name || "Website"}
                  className="w-full aspect-[16/9] object-cover bg-slate-100"
                  loading="lazy" decoding="async"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold">{w.name || "—"}</h3>
                {w.brief && <p className="mt-1 text-sm text-slate-700">{w.brief}</p>}
                <div className="mt-3">
                  {w.url && (
                    <a href={w.url} target="_blank" rel="noreferrer"
                       className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200"
                       style={{ color: brand }}>
                      Go to website
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile controls */}
        {!isDesktop && items.length > 1 && !expanded && (
          <div className="mt-4 flex items-center gap-2">
            {items.slice(1, 5).map((s, idx) => (
              <button key={idx} onClick={() => setExpanded(true)}
                      className="w-9 h-9 rounded-md overflow-hidden border border-slate-200">
                <img src={s.thumb} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
            <button onClick={() => setExpanded(true)} className="ml-2 text-xs underline" style={{ color: brand }}>
              View more
            </button>
          </div>
        )}

        {!isDesktop && items.length > 1 && expanded && (
          <div className="mt-4">
            <button onClick={collapse} className="text-xs underline" style={{ color: brand }}>
              Show less
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
