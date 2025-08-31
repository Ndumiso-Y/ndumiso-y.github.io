// src/components/GraphicsCarousel.jsx
import React from 'react'
import { content } from '../content'

export default function GraphicsSection() {
  return (
    <section className="bg-white">
      {/* tighter bottom padding to reduce space between TVEI and this section */}
      <div className="max-w-6xl mx-auto px-4 pb-6 md:pb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Logo Designs</h2>

        {/* PPT Showcase */}
        <div className="grid sm:grid-cols-3 gap-4">
          {content.graphicsPpts && content.graphicsPpts.map((p,i)=>(
            <a key={i} href={p.file} target="_blank" rel="noreferrer" className="block group">
              <img
                src={p.thumb}
                alt={p.title}
                loading="lazy"
                decoding="async"
                className="w-full aspect-video object-cover rounded-lg border border-slate-200 group-hover:shadow-soft transition"
              />
              <div className="mt-1 text-sm">{p.title}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
