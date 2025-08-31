// src/components/Badges.jsx
import React, { useState } from "react";
import { content } from "../content";

export default function Badges() {
  const items = Array.isArray(content?.badges) ? content.badges : [];
  const intro = content?.sectionIntros?.badges;
  const [modal, setModal] = useState({ open:false, idx:-1, mode:null, scale:1 });

  if (!items.length) return null;

  const openSnippet = (idx)=>setModal({ open:true, idx, mode:"snippet", scale:1 });
  const openZoom    = (idx)=>setModal({ open:true, idx, mode:"zoom",    scale:1 });
  const close       = ()=>setModal({ open:false, idx:-1, mode:null, scale:1 });
  const zoomIn = ()=>setModal(m=>({ ...m, scale: Math.min(3, +(m.scale+0.25).toFixed(2)) }));
  const zoomOut= ()=>setModal(m=>({ ...m, scale: Math.max(1, +(m.scale-0.25).toFixed(2)) }));
  const zoomReset=()=>setModal(m=>({ ...m, scale:1 }));

  return (
    <section id="badges" className="bg-white section-offset">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-bold">Badges & Recognition</h2>
        {intro && <p className="mt-2 text-slate-600 max-w-3xl">{intro}</p>}

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {items.map((b, i) => {
            const isSnippet = !!b.snippetImg || !!b.snippet;
            const isZoom = !!b.zoom;
            const onCardClick = isSnippet ? ()=>openSnippet(i) : isZoom ? ()=>openZoom(i) : undefined;
            const aspectClass = b.aspect === "4/3" ? "aspect-[4/3]" : "aspect-[16/9]";
            return (
              <article key={b.name || i} className={`rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-sm ${onCardClick ? "cursor-zoom-in" : ""}`} onClick={onCardClick}>
                <img src={b.img} alt={b.name || "Badge"} className={`w-full ${aspectClass} object-cover bg-slate-100`} loading="lazy" decoding="async" />
                <div className="p-4">
                  <h3 className="font-semibold">{b.name || "—"}</h3>
                  {b.note && <p className="mt-1 text-sm text-slate-700">{b.note}</p>}
                  <div className="mt-3 flex flex-wrap gap-3 text-sm">
                    {b.url && <a className="underline" href={b.url} target="_blank" rel="noreferrer" style={{ color: content?.brandColor || "#48aab7" }} onClick={(e)=>e.stopPropagation()}>Visit site</a>}
                    {b.post && <a className="underline" href={b.post} target="_blank" rel="noreferrer" style={{ color: content?.brandColor || "#48aab7" }} onClick={(e)=>e.stopPropagation()}>See LinkedIn post</a>}
                    {isSnippet && <button className="underline" style={{ color: content?.brandColor || "#48aab7" }} onClick={(e)=>{e.stopPropagation(); openSnippet(i);}}>View letter snippet</button>}
                    {isZoom && <button className="underline" style={{ color: content?.brandColor || "#48aab7" }} onClick={(e)=>{e.stopPropagation(); openZoom(i);}}>Zoom image</button>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {modal.open && items[modal.idx] && (
        <div className="fixed inset-0 z-50 bg-black/70 p-4 grid place-items-center" onClick={close} role="dialog" aria-modal="true">
          <div className="max-w-3xl w-full rounded-xl bg-white p-5 relative" onClick={(e)=>e.stopPropagation()}>
            <button onClick={close} className="absolute top-3 right-3 rounded-full border border-slate-200 bg-white px-2 py-1 text-sm">✕</button>
            <h3 className="text-lg font-semibold">{items[modal.idx].name}</h3>

            {modal.mode === "snippet" && (
              <>
                {items[modal.idx].snippet && <p className="mt-3 text-sm text-slate-700 whitespace-pre-line">{items[modal.idx].snippet}</p>}
                {items[modal.idx].snippetImg && (
                  <>
                    <div className="mt-3 border border-slate-200 rounded-xl overflow-auto bg-slate-50">
                      <div className="w-full grid place-items-center" style={{ minHeight: 320 }}>
                        <img src={items[modal.idx].snippetImg} alt="Acceptance letter snippet"
                          onContextMenu={(e)=>e.preventDefault()}
                          style={{ transform:`scale(${modal.scale})`, transformOrigin:"center center", transition:"transform 120ms ease" }}
                          className="max-w-full max-h-[70vh] object-contain" />
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button onClick={zoomOut} className="px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-sm">− Zoom out</button>
                      <button onClick={zoomIn} className="px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-sm">+ Zoom in</button>
                      <button onClick={zoomReset} className="px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-sm">Reset</button>
                    </div>
                  </>
                )}
              </>
            )}

            {modal.mode === "zoom" && (
              <>
                <div className="mt-3 border border-slate-200 rounded-xl overflow-auto bg-slate-50">
                  <div className="w-full grid place-items-center" style={{ minHeight: 360 }}>
                    <img
                      src={items[modal.idx].modalImg || items[modal.idx].img}
                      alt={items[modal.idx].name}
                      onContextMenu={(e)=>e.preventDefault()}
                      style={{ transform:`scale(${modal.scale})`, transformOrigin:"center center", transition:"transform 120ms ease" }}
                      className="max-w-full max-h-[70vh] object-contain"
                    />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button onClick={zoomOut} className="px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-sm">− Zoom out</button>
                  <button onClick={zoomIn} className="px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-sm">+ Zoom in</button>
                  <button onClick={zoomReset} className="px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-sm">Reset</button>
                  {items[modal.idx].post && (
                    <a href={items[modal.idx].post} target="_blank" rel="noreferrer" className="ml-auto px-3 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-sm">See LinkedIn post</a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
