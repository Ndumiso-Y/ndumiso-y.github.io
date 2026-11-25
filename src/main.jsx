import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter, useLocation } from 'react-router-dom'
import './index.css'
import './styles/modern.css'
import AppModern from './AppModern.jsx'
import { trackPageView } from './lib/analytics'

// Use HashRouter for GitHub Pages, BrowserRouter for cPanel/Netlify
const target = import.meta.env.VITE_HOST_TARGET || 'gh'
const Router = target === 'web' ? BrowserRouter : HashRouter // gh and upwork are static hosts

// Component to track page views on route changes
function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    // Track page view on initial load and route changes
    const path = location.pathname + location.hash
    trackPageView(path)
  }, [location])

  return null
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AnalyticsTracker />
      <AppModern />
    </Router>
  </React.StrictMode>
)
