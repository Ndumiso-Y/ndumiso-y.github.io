// src/components/Projects.jsx
import { withBase } from '../lib/withBase';
import React, { useEffect, useState } from "react";
import { content } from "../content";

export default function Projects() {
  const items = Array.isArray(content?.projects) ? content.projects : [];
  const intro = content?.sectionIntros?.projects;
  const brand = content?.brandColor || "#48aab7";

  const [expanded, setExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [modalProject, setModalProject] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => { setIsDesktop(mq.matches); setExpanded(mq.matches); };
    set(); mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  if (!items.length) return null;
  const visible = expanded || isDesktop ? items : items.slice(0,1);

  const clip = (p) => {
    if (p.preview) return p.preview;
    if (!p.desc) return "";
    return p.desc.length > 160 ? p.desc.slice(0, 160).trim() + "…" : p.desc;
  };

  const collapse = () => {
    setExpanded(false);
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="projects" className="bg-white section-offset">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-bold">Projects</h2>
        {intro && <p className="mt-2 text-slate-600 max-w-3xl">{intro}</p>}

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {visible.map((p, i)=>(
            <article key={p.name || i} className="rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-sm flex flex-col">
              {p.thumb && (
                <picture>
                  <source srcSet={p.thumb.replace(/\.[^/.]+$/, '.avif')} type="image/avif" />
                  <source srcSet={p.thumb.replace(/\.[^/.]+$/, '.webp')} type="image/webp" />
                  <img src={p.thumb} alt={p.name||"Project"} className="w-full aspect-[16/9] object-cover bg-slate-100" loading="lazy" />
                </picture>
              )}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold">{p.name || "—"}</h3>
                {p.audio && (
                  <div className="mt-2">
                    <audio controls src={p.audio} className="w-full" preload="none" />
                    {p.audioDesc && <div className="text-xs text-slate-500 mt-1">{p.audioDesc}</div>}
                  </div>
                )}
                {clip(p) && (
                  <p className="mt-3 text-sm text-slate-700">
                    {clip(p)}{" "}
                    {p.desc && p.desc.length > (p.preview?.length || 160) && (
                      <button 
                        onClick={() => setModalProject(p)}
                        className="inline cursor-pointer underline" 
                        style={{ color: brand }}
                      >
                        Read more
                      </button>
                    )}
                  </p>
                )}
                <div className="mt-auto pt-4">
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noreferrer"
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
        {!isDesktop && items.length>1 && !expanded && (
          <div className="mt-3 flex items-center gap-2">
            {items.slice(1,5).map((s, idx)=>(
              <button key={idx} onClick={()=>setExpanded(true)} className="w-9 h-9 rounded-md overflow-hidden border border-slate-200">
                <img src={s.thumb} alt="" className="w-full h-full object-cover"/>
              </button>
            ))}
            <button onClick={()=>setExpanded(true)} className="ml-2 text-xs underline" style={{ color: brand }}>View more</button>
          </div>
        )}

        {!isDesktop && items.length>1 && expanded && (
          <div className="mt-4">
            <button onClick={collapse} className="text-xs underline" style={{ color: brand }}>
              Show less
            </button>
          </div>
        )}
      </div>

      {/* Read More Modal */}
      {modalProject && (
        <div
          className="fixed inset-0 z-50 bg-black/70 p-4 flex items-center justify-center"
          onClick={() => setModalProject(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold">{modalProject.name}</h3>
              <button 
                onClick={() => setModalProject(null)}
                className="text-slate-500 hover:text-slate-700 text-xl leading-none"
              >
                ×
              </button>
            </div>
            
            {modalProject.thumb && (
              <div className="mb-4">
                <picture>
                  <source srcSet={modalProject.thumb.replace(/\.[^/.]+$/, '.avif')} type="image/avif" />
                  <source srcSet={modalProject.thumb.replace(/\.[^/.]+$/, '.webp')} type="image/webp" />
                  <img 
                    src={modalProject.thumb} 
                    alt={modalProject.name||"Project"} 
                    className="w-full aspect-[16/9] object-cover bg-slate-100 rounded-lg" 
                  />
                </picture>
              </div>
            )}
            
            <div className="prose prose-sm max-w-none">
              <p className="text-slate-700 leading-relaxed">
                {modalProject.desc}
              </p>
              
              {modalProject.url && (
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <a 
                    href={modalProject.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50"
                    style={{ color: brand }}
                  >
                    Go to website →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
