// src/components/SocialMgmt.jsx
import React, { useEffect, useState } from "react";
import { content } from "../content";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

function PlatformBadge({ type }) {
  const t = (type || "").toLowerCase();
  const Icon = t.includes("facebook") ? FaFacebook : t.includes("linkedin") ? FaLinkedin : FaInstagram;
  const label = t.charAt(0).toUpperCase() + t.slice(1);
  return (
    <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border border-slate-200 bg-white">
      <Icon className="text-slate-600" />
      <span>{label}</span>
    </span>
  );
}

function SocialLink({ type, url }) {
  const t = (type || "").toLowerCase();
  let Icon = FaFacebook, color = "#4267B2";
  if (t.includes("linkedin")) { Icon = FaLinkedin; color = "#0A66C2"; }
  if (t.includes("instagram")) { Icon = FaInstagram; color = "#E1306C"; }
  const label = (type || "Link").charAt(0).toUpperCase() + (type || "Link").slice(1);
  return (
    <a href={url || "#"} target="_blank" rel="noreferrer"
       className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white transition"
       style={{ color }}
       onMouseEnter={(e)=>{ e.currentTarget.style.backgroundColor=color; e.currentTarget.style.color="white"; }}
       onMouseLeave={(e)=>{ e.currentTarget.style.backgroundColor="white"; e.currentTarget.style.color=color; }}>
      <Icon /><span className="underline">{label}</span>
    </a>
  );
}

function Thumb({ src, brand, aspect="16/9" }) {
  const aspectClass = aspect==="4/3" ? "aspect-[4/3]" : aspect==="1/1" ? "aspect-[1/1]" : aspect==="3/2" ? "aspect-[3/2]" : "aspect-[16/9]";
  return (
    <div className={`relative w-full ${aspectClass} bg-slate-100 overflow-hidden`}>
      {src ? (
        <img src={src} alt={brand||""} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-3xl text-white" style={{ background:"#48aab7" }}>
          {(brand||"").split(" ").map(w=>w[0]).join("").slice(0,3).toUpperCase() || "—"}
        </div>
      )}
    </div>
  );
}

export default function SocialMgmt() {
  const items = Array.isArray(content?.social) ? content.social : [];
  const intro = content?.sectionIntros?.social;
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
  const visible = expanded || isDesktop ? items : items.slice(0,1);

  const collapse = () => {
    setExpanded(false);
    const el = document.getElementById("social");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="social" className="bg-white section-offset">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-bold">Social Media Management</h2>
        {intro && <p className="mt-2 text-slate-600 max-w-3xl">{intro}</p>}

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((s, i) => {
            const links = Array.isArray(s?.links) ? s.links : [];
            const platforms = Array.isArray(s?.platforms) ? s.platforms : [];
            const thumb = s?.thumb || content?.socialThumbs?.[s?.thumbKey];
            const aspect = s?.aspect || "16/9";
            return (
              <article key={s?.brand || i} className="rounded-2xl border border-slate-200 bg-white shadow-soft overflow-hidden flex flex-col">
                <Thumb src={thumb} brand={s?.brand} aspect={aspect} />
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold">{s?.brand || "Untitled"}</h3>
                    <div className="flex flex-wrap gap-1">
                      {platforms.map((p, idx) => <PlatformBadge type={p} key={idx} />)}
                    </div>
                  </div>
                  {s?.desc && <p className="mt-2 text-sm text-slate-700">{s.desc}</p>}
                  <div className="mt-auto pt-4 flex gap-3 flex-wrap">
                    {links.length ? links.map((l, j)=> <SocialLink key={j} type={l?.type} url={l?.url} />)
                                   : <span className="text-slate-500 text-xs">(Add links in content.social)</span>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile controls */}
        {!isDesktop && items.length>1 && !expanded && (
          <div className="mt-3 flex items-center gap-2">
            {items.slice(1,5).map((s, idx)=>(
              <button key={idx} onClick={()=>setExpanded(true)} className="w-9 h-9 rounded-md overflow-hidden border border-slate-200">
                <img src={s.thumb || content?.socialThumbs?.[s.thumbKey]} alt="" className="w-full h-full object-cover"/>
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
    </section>
  );
}
