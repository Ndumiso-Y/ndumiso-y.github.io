// src/components/LogoShowCase.jsx
import { withBase } from '../lib/withBase';
import React, { useEffect, useState } from "react";
import { content } from "../content";

function Chip({ children }) {
  return (
    <span className="text-[11px] px-2 py-1 rounded-full border border-slate-200 bg-white">
      {children}
    </span>
  );
}

export default function LogoShowCase() {
  const brand = content?.brandColor || "#48aab7";
  const intro = content?.sectionIntros?.graphics;
  const logos = Array.isArray(content?.logos) ? content.logos : [];
  const tvei  = Array.isArray(content?.tvei?.items) ? content.tvei.items : [];

  // separate expand states so each block can expand/collapse independently
  const [expandedLogos, setExpandedLogos]   = useState(false);
  const [expandedDesign, setExpandedDesign] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => {
      const desk = mq.matches;
      setIsDesktop(desk);
      // desktop: both expanded; mobile: both collapsed by default
      setExpandedLogos(desk);
      setExpandedDesign(desk);
    };
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const pdfLink = (href) => (href ? `${withBase(href)}#view=FitH` : null);

  // ----- Modal & gallery for TVEI -----
  const [modal, setModal] = useState({ open:false, mode:null, itemIdx:-1, imgIdx:0, scale:1 });
  const openGallery = (itemIdx, startAt=0) => setModal({ open:true, mode:"gallery", itemIdx, imgIdx:startAt, scale:1 });
  const openZoom = (itemIdx) => setModal({ open:true, mode:"zoom", itemIdx, imgIdx:0, scale:1 });
  const closeModal = () => setModal({ open:false, mode:null, itemIdx:-1, imgIdx:0, scale:1 });
  const nextImg = () => {
    if (modal.mode!=="gallery") return;
    const g = tvei[modal.itemIdx]?.gallery||[]; if(!g.length) return;
    setModal(m=>({ ...m, imgIdx:(m.imgIdx+1)%g.length }));
  };
  const prevImg = () => {
    if (modal.mode!=="gallery") return;
    const g = tvei[modal.itemIdx]?.gallery||[]; if(!g.length) return;
    setModal(m=>({ ...m, imgIdx:(m.imgIdx-1+g.length)%g.length }));
  };
  const setZoom = (val)=> setModal(m=>({ ...m, scale: Math.max(1, Math.min(3, val)) }));
  const zoomIn = ()=> setZoom(parseFloat((modal.scale+0.25).toFixed(2)));
  const zoomOut= ()=> setZoom(parseFloat((modal.scale-0.25).toFixed(2)));
  const zoomReset=()=> setZoom(1);
  useEffect(()=> {
    const onKey=(e)=>{ if(!modal.open) return;
      if(e.key==="Escape") closeModal();
      if(modal.mode==="gallery"){ if(e.key==="ArrowRight") nextImg(); if(e.key==="ArrowLeft") prevImg(); }
    };
    window.addEventListener("keydown", onKey); return ()=> window.removeEventListener("keydown", onKey);
  }, [modal.open, modal.mode, modal.itemIdx, modal.imgIdx, tvei]);

  // TVEI opening carousel thumb
  const hasOpeningGallery = !!(tvei[0]?.gallery && tvei[0].gallery.length);
  const [carouselIdx, setCarouselIdx] = useState(0);
  useEffect(()=>{
    if(!hasOpeningGallery) return;
    const total = tvei[0].gallery.length;
    const id=setInterval(()=> setCarouselIdx(i=> (i+1)%total ), 3000);
    return ()=> clearInterval(id);
  }, [hasOpeningGallery, tvei]);

  const goCarouselNext = ()=> hasOpeningGallery && setCarouselIdx(i=> (i+1)%tvei[0].gallery.length);
  const goCarouselPrev = ()=> hasOpeningGallery && setCarouselIdx(i=> (i-1+tvei[0].gallery.length)%tvei[0].gallery.length);

  // visible slices per block
  const logosVisible  = expandedLogos  || isDesktop ? logos : logos.slice(0,1);
  const designVisible = expandedDesign || isDesktop ? tvei  : tvei.slice(0,1);

  const collapseLogos = () => {
    setExpandedLogos(false);
    const el = document.getElementById("graphics");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const collapseDesign = () => {
    setExpandedDesign(false);
    const el = document.getElementById("graphics");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="graphics" className="bg-white section-offset">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-bold">Graphics</h2>
        {intro && <p className="mt-2 text-slate-600 max-w-3xl">{intro}</p>}

        {/* ================= LOGO DESIGNS ================= */}
        {logos.length>0 && <p className="text-slate-600 mt-6">Logo Designs</p>}
        {logos.length>0 && (
          <>
            <div className="mt-2 grid md:grid-cols-3 gap-6">
              {logosVisible.map((it, idx) => {
                const cover = it.cover || it.thumb || "/assets/nduproj-01.jpg";
                return (
                  <article key={`logo-${idx}`} className="rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-sm">
                    <div className="relative">
                      <img src={cover} alt={it.name||"Logo"} className="w-full aspect-[16/9] object-contain bg-slate-50" loading="lazy" />
                      <div className="absolute top-2 left-2 flex gap-1">
                        <Chip>Logo</Chip>{it.client && <Chip>{it.client}</Chip>}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold">{it.name||"—"}</h3>
                        {it.year && <span className="text-xs text-slate-500">{it.year}</span>}
                      </div>
                      {it.note && <p className="mt-1 text-sm text-slate-700">{it.note}</p>}
                      <div className="mt-2 flex gap-4 text-sm">
                        {it.download && (
                          <a href={pdfLink(it.download)} target="_blank" rel="noreferrer" className="underline" style={{ color: brand }}>
                            View slides
                          </a>
                        )}
                        {it.brief && (
                          <a href={pdfLink(it.brief)} target="_blank" rel="noreferrer" className="text-slate-700 underline">
                            Download brief
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Mobile tiny strip + controls (LOGOS) */}
            {!isDesktop && logos.length>1 && !expandedLogos && (
              <div className="mt-3 flex items-center gap-2">
                {logos.slice(1,5).map((l, i)=>(
                  <button key={`logo-mini-${i}`} onClick={()=>setExpandedLogos(true)} className="w-9 h-9 rounded-md overflow-hidden border border-slate-200">
                    <img src={l.cover||l.thumb} alt="" className="w-full h-full object-cover"/>
                  </button>
                ))}
                <button onClick={()=>setExpandedLogos(true)} className="ml-2 text-xs underline" style={{ color: brand }}>
                  View more
                </button>
              </div>
            )}
            {!isDesktop && logos.length>1 && expandedLogos && (
              <div className="mt-3">
                <button onClick={collapseLogos} className="text-xs underline" style={{ color: brand }}>
                  Show less
                </button>
              </div>
            )}
          </>
        )}

        {/* ================= DESIGN WORK (TVEI etc.) ================= */}
        {tvei.length>0 && <h3 className="text-lg font-semibold mt-10">Design Work</h3>}
        {tvei.length>0 && (
          <>
            <div className="mt-4 grid md:grid-cols-3 gap-6">
              {designVisible.map((d, i) => {
                const realIndex = tvei.indexOf(d); // stable index for modal
                const isOpening = (realIndex===0) && Array.isArray(d.gallery) && d.gallery.length>0;
                const openingSrc = isOpening ? d.gallery[carouselIdx] : (d.src || "/assets/nduproj-02.jpg");
                return (
                  <article
                    key={`design-${realIndex}`}
                    className={`rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-sm ${isOpening ? "cursor-pointer" : "cursor-zoom-in"}`}
                    onClick={() => (isOpening ? openGallery(0, 0) : openZoom(realIndex))}
                  >
                    <div className="relative">
                      <img src={openingSrc} alt={d.title||"Design"} className="w-full aspect-[16/9] object-contain bg-slate-50" loading="lazy" />
                      {isOpening && (
                        <>
                          <button className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 border border-slate-200 px-2 py-1 text-sm"
                                  onClick={(e)=>{e.stopPropagation(); goCarouselPrev();}}>‹</button>
                          <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 border border-slate-200 px-2 py-1 text-sm"
                                  onClick={(e)=>{e.stopPropagation(); goCarouselNext();}}>›</button>
                          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                            {d.gallery.map((_, dotIdx)=>(
                              <span key={dotIdx} className={`w-1.5 h-1.5 rounded-full ${dotIdx===carouselIdx?"bg-slate-800":"bg-slate-300"}`} />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold">{d.title||"—"}</h4>
                      {d.copy && <p className="mt-1 text-sm text-slate-700">{d.copy}</p>}
                      {isOpening && <p className="mt-2 text-xs text-slate-500">Click to open gallery</p>}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Mobile tiny strip + controls (DESIGN) */}
            {!isDesktop && tvei.length>1 && !expandedDesign && (
              <div className="mt-3 flex items-center gap-2">
                {tvei.slice(1,5).map((d, i)=>(
                  <button key={`design-mini-${i}`} onClick={()=>setExpandedDesign(true)} className="w-9 h-9 rounded-md overflow-hidden border border-slate-200">
                    <img src={d.src || d.gallery?.[0]} alt="" className="w-full h-full object-cover"/>
                  </button>
                ))}
                <button onClick={()=>setExpandedDesign(true)} className="ml-2 text-xs underline" style={{ color: brand }}>
                  View more
                </button>
              </div>
            )}
            {!isDesktop && tvei.length>1 && expandedDesign && (
              <div className="mt-3">
                <button onClick={collapseDesign} className="text-xs underline" style={{ color: brand }}>
                  Show less
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ======= Modal ======= */}
      {modal.open && tvei[modal.itemIdx] && (
        <div className="fixed inset-0 z-50 bg-black/80 p-4 grid place-items-center" onClick={closeModal}>
          <div className="max-w-5xl w-full rounded-xl bg-white overflow-hidden relative" onClick={(e)=>e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-3 right-3 z-10 rounded-full border border-slate-200 bg-white px-2 py-1 text-sm">✕</button>
            <div className="p-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold">{tvei[modal.itemIdx]?.title || "Design Work"}</h3>
              {tvei[modal.itemIdx]?.copy && <p className="text-sm text-slate-600 mt-1">{tvei[modal.itemIdx].copy}</p>}
            </div>
            <div className="p-4">
              {modal.mode==="gallery" ? (
                <>
                  <div className="relative border border-slate-200 rounded-lg bg-slate-50">
                    <img src={tvei[modal.itemIdx].gallery[modal.imgIdx]} alt="Gallery item"
                         className="w-full max-h-[70vh] object-contain"
                         style={{ transform:`scale(${modal.scale})`, transition:"transform 120ms ease" }}/>
                    <button className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-slate-200 px-2 py-1 text-sm" onClick={prevImg}>‹</button>
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-slate-200 px-2 py-1 text-sm" onClick={nextImg}>›</button>
                  </div>
                  <div className="mt-3 flex gap-2 overflow-x-auto">
                    {tvei[modal.itemIdx].gallery.map((src, idx)=>(
                      <button key={idx}
                              className={`shrink-0 border rounded-md p-1 ${idx===modal.imgIdx?"border-slate-600":"border-slate-200"}`}
                              onClick={()=> setModal(m=>({ ...m, imgIdx: idx }))}>
                        <img src={src} alt={`thumb ${idx+1}`} className="w-20 h-14 object-contain bg-white" />
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <button onClick={zoomOut} className="px-3 py-1.5 rounded-full border border-slate-200 text-sm">− Zoom out</button>
                    <button onClick={zoomIn}  className="px-3 py-1.5 rounded-full border border-slate-200 text-sm">+ Zoom in</button>
                    <button onClick={zoomReset} className="px-3 py-1.5 rounded-full border border-slate-200 text-sm">Reset</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative border border-slate-200 rounded-lg bg-slate-50">
                    <img src={tvei[modal.itemIdx]?.src || "/assets/nduproj-02.jpg"} alt={tvei[modal.itemIdx]?.title||"Design"}
                         className="w-full max-h-[70vh] object-contain"
                         style={{ transform:`scale(${modal.scale})`, transition:"transform 120ms ease" }}/>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <button onClick={zoomOut} className="px-3 py-1.5 rounded-full border border-slate-200 text-sm">− Zoom out</button>
                    <button onClick={zoomIn}  className="px-3 py-1.5 rounded-full border border-slate-200 text-sm">+ Zoom in</button>
                    <button onClick={zoomReset} className="px-3 py-1.5 rounded-full border border-slate-200 text-sm">Reset</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
