import React from 'react'
import { content } from '../content'

export default function NduCodes(){
  return (
    <section id="nducodes" className="bg-white">
      <div className="slash-divider" aria-hidden="true"></div>
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Ndu Codes — Learning in Public</h2>
        <p className="text-slate-700 mb-6">{content.nduCodes.intro}</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {content.nduCodes.projects.map((p,i)=>(
            <article key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <img src={p.screenshot} alt={p.title} loading="lazy" decoding="async"
                className="w-full aspect-[16/10] object-cover rounded-lg"/>
              <div className="mt-2 font-semibold">{p.title}</div>
              <p className="text-sm text-slate-600">{p.brief}</p>
              <div className="mt-2 flex gap-3 text-sm">
                {p.liveUrl && <a className="text-brand underline" href={p.liveUrl} target="_blank" rel="noreferrer">Live</a>}
                {p.repoUrl && <a className="text-slate-700 underline" href={p.repoUrl} target="_blank" rel="noreferrer">Repo</a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
