// Modern Portfolio Layout
import React from 'react'
import FloatingNav from './components/modern/FloatingNav'
import HeroModern from './features/modern/HeroModern'
import AboutModern from './features/modern/AboutModern'
import WorkShowcase from './features/modern/WorkShowcase'
import GraphicsModern from './features/modern/GraphicsModern'
import SocialModern from './features/modern/SocialModern'
import LearningModern from './features/modern/LearningModern'
import ContactModern, { SiteFooter } from './features/modern/ContactModern'
import { useScrollReveal } from './lib/useScrollReveal'

export default function AppModern() {
  useScrollReveal()
  return (
    <div className="min-h-screen" style={{ background: '#0b1214' }}>
      <FloatingNav />
      <main>
        <HeroModern />
        <AboutModern />
        <WorkShowcase />
        <GraphicsModern />
        <SocialModern />
        <LearningModern />
        <ContactModern />
      </main>
      <SiteFooter />
    </div>
  )
}
