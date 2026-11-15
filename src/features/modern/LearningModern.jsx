import React, { useEffect, useRef } from 'react'
import projectsData from '@/content/projects.json'
import MiniAudioPlayer from '@/components/modern/MiniAudioPlayer'
import { withBase } from '../../lib/withBase'
import { lighter } from '../../lib/lighter'

// Learning Journey — static redesign. Same intro video, copy and all eight Treehouse projects
// in their original order, each with its audio walkthrough, stack and demo link.
// Phones: a swipeable row (no arrow buttons covering content). Tablet: 2 columns. Desktop: 4.

function ProjectCard({ project }) {
  const [num, ...rest] = project.name.split(' — ')
  const title = rest.length ? rest.join(' — ') : project.name
  return (
    <article className="h-full flex flex-col rounded-[20px] bg-white border border-[#121417]/[0.08] shadow-[0_20px_40px_-32px_rgba(18,20,23,0.45)] overflow-hidden">
      {project.thumb && (
        <div className="aspect-[1280/662] bg-[#eef1f1] border-b border-[#121417]/[0.06]">
          <img src={withBase(lighter(project.thumb))} alt={`${title} screenshot`} loading="lazy" decoding="async" className="w-full h-full object-contain" />
        </div>
      )}
      <div className="flex-1 flex flex-col p-5">
        <h3 className="text-[18px] font-semibold leading-snug text-[#121417]">
          {rest.length > 0 && <span className="hero-display block text-[14px] tracking-[0.12em] text-[#0e5c66]">{num}</span>}
          <span className="sr-only">{rest.length > 0 ? ' — ' : ''}</span>
          {title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[#4a5357]">{project.outcome}</p>
        {project.audio && (
          <div className="mt-4">
            <MiniAudioPlayer src={withBase(project.audio)} description={project.audioDesc} title={title} />
          </div>
        )}
        {project.stack && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Built with">
            {project.stack.map(t => (
              <li key={t} className="px-2.5 py-1 rounded-full bg-[#f3f3f1] border border-[#121417]/[0.08] text-[13px] text-[#26302f]">{t}</li>
            ))}
          </ul>
        )}
        {project.url && (
          <a href={project.url} target="_blank" rel="noopener noreferrer"
            className="group mt-auto pt-5 inline-flex items-center gap-2 min-h-[44px] self-start text-[15px] font-semibold text-[#0e5c66] hover:text-[#0b4c55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e5c66] rounded-full">
            View Project
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            <span className="sr-only">— {title} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  )
}

export default function LearningModern() {
  const videoRef = useRef(null)
  // Respect reduced-motion: don't autoplay the looping intro clip
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) videoRef.current?.pause()
  }, [])

  return (
    // Inline style: overrides the legacy `#projects` rules in index.css (ID specificity + pulse animation)
    <section id="projects" className="relative text-[#121417] py-14 lg:py-28 overflow-hidden" style={{ background: '#fbfbf9', animation: 'none', borderTop: 0 }}>
      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-[clamp(32px,5vw,88px)]">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[5fr_7fr] lg:gap-16 xl:gap-24 items-end">
          <div>
            <p className="flex items-center gap-4 text-[13px] font-semibold tracking-[0.22em] uppercase text-[#26302f]">
              <span className="block w-10 h-[3px] bg-[#48aab7] rounded-full" aria-hidden="true" />
              Treehouse Projects
            </p>
            <h2 className="hero-display mt-5 text-[clamp(36px,8.6vw,46px)] lg:text-[clamp(44px,4vw,64px)] leading-[1.02] tracking-[-0.02em]">
              Learning <span className="text-[#0e5c66]">Journey</span><span className="text-[#48aab7]" aria-hidden="true">.</span>
            </h2>
          </div>
          <p className="text-[17px] lg:text-[18px] text-[#4a5357] max-w-[52ch]">
            Eight projects demonstrating front-end fundamentals with interactive audio
            walkthroughs.
          </p>
        </div>

        {/* Intro video */}
        <div className="mt-10 lg:mt-16 grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 xl:gap-24 items-center">
          <div className="mx-auto w-full max-w-[420px] md:max-w-none">
            <div className="relative rounded-[24px] overflow-hidden bg-[#121417] shadow-[0_30px_60px_-34px_rgba(18,20,23,0.6)]" style={{ aspectRatio: '1080/1350' }}>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Intro clip from my front-end learning journey series"
              >
                <source src={withBase('/media/learning-journey-intro.mp4')} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div>
            <p className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#48aab7]/15 text-[#0e5c66] text-[13px] font-semibold tracking-[0.12em] uppercase">
              Documenting the Process
            </p>
            <h3 className="hero-display mt-5 text-[28px] sm:text-[34px] xl:text-[42px] leading-[1.1] tracking-[-0.01em]">
              Not just what I build, but how I get there
            </h3>
            <div className="mt-5 space-y-4 text-[17px] lg:text-[18px] leading-relaxed text-[#4a5357] max-w-[52ch]">
              <p>
                I believe in documenting the journey, not only the final designs. This video is a small piece of that: honest practice, figuring things out, and building consistency as a developer and designer.
              </p>
              <p>If you enjoy process, you'll appreciate the projects that follow.</p>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="mt-14 lg:mt-24">
          <p className="md:hidden text-[14px] text-[#4a5357] mb-3" aria-hidden="true">Swipe to see all {projectsData.length} projects →</p>
          <ul
            className="snap-row -mx-5 px-5 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 md:mx-0 md:px-0 md:pb-0 md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 xl:gap-8"
            aria-label={`${projectsData.length} Treehouse projects`}
            tabIndex={0}
          >
            {projectsData.map((project, i) => (
              <li key={i} className="flex-none w-[84%] sm:w-[60%] snap-start md:w-auto">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
