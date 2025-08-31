// src/components/TVEI.jsx
import React, { useState } from "react";
import { content } from "../content";
import Lightbox from "./Lightbox.jsx";

function CarouselCard({ item }) {
  const images = Array.isArray(item?.gallery) && item.gallery.length ? item.gallery : [item?.src].filter(Boolean);
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  return (
    <article className="rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-sm">
      {/* Main stage — no cropping */}
      <div className="relative aspect-[16/9] bg-white grid place-items-center">
        <img
          src={images[idx]}
          alt={item?.title || "TVEI image"}
          className="max-h-full max-w-full object-contain w-full h-full p-2"
          loading="lazy"
          decoding="async"
          onClick={() => setOpen(true)}
          style={{ cursor: "zoom-in" }}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 border border-slate-200 px-3 py-1 text-sm"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 border border-slate-200 px-3 py-1 text-sm"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold">{item?.title || "—"}</h3>
        {item?.copy && <p className="mt-1 text-sm text-slate-700">{item.copy}</p>}

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`shrink-0 rounded border ${i === idx ? "border-slate-900" : "border-slate-200"} bg-white p-1`}
                aria-label={`Go to slide ${i + 1}`}
              >
                <img
                  src={src}
                  alt={`thumb ${i + 1}`}
                  className="w-16 h-10 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {open && (
        <Lightbox images={images} title={item?.title || "TVEI"} onClose={() => setOpen(false)} />
      )}
    </article>
  );
}

export default function TVEI() {
  const items = Array.isArray(content?.tvei?.items) ? content.tvei.items : [];
  if (!items.length) return null;

  return (
    <section id="tvei" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-bold">Design Work</h2>
        <p className="text-slate-600 mt-1">Village Economy Indaba</p>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <CarouselCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
