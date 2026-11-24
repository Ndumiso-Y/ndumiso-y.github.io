import React from 'react'
import { createRoot } from 'react-dom/client'
import './ecard.css'
import ECard from './ECard.jsx'
import { trackPageView } from '../lib/analytics'

trackPageView('/card/', 'E-card')

createRoot(document.getElementById('card-root')).render(
  <React.StrictMode>
    <ECard />
  </React.StrictMode>
)
