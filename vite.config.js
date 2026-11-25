import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

const target = process.env.BUILD_TARGET || 'gh'
const base = process.env.BASE_PATH ?? (target === 'gh' ? '/' : '/')

// Upwork version (BUILD_TARGET=upwork): same site, no means of direct contact.
// Upwork ToS §7.2 (effective 20 Jul 2026): no phone, email, contact forms, social
// handles, or links to sites where those can be found. See docs/upwork/.
const UPWORK = target === 'upwork'
const MAIN_SITE = 'https://ndumiso-y.github.io'
const UPWORK_SITE = (process.env.UPWORK_SITE_URL || '').replace(/\/$/, '')
const GA_MAIN = 'G-2ZPD8342CY'
const GA_UPWORK = 'G-2LHZQ26FFS' // separate property, as in the Dec 2025 Upwork build

// Files that exist only to hand over contact details
const CONTACT_FILES = ['assets/Embark-Digitals.vcf', 'assets/QRcodeECard.png', 'assets/QRcodeBusiness.jpg']

function upworkHtml() {
  return {
    name: 'upwork-html',
    transformIndexHtml(html) {
      let out = html.replaceAll(GA_MAIN, GA_UPWORK)
        .replaceAll(' Contact Ndumiso Yedwa on WhatsApp or email.', '')
      if (UPWORK_SITE) {
        out = out.replaceAll(MAIN_SITE, UPWORK_SITE)
      } else {
        // No public address yet: drop absolute links back to the main site
        out = out
          .replace(/\s*<link rel="canonical"[^>]*>/g, '')
          .replace(/\s*<meta (property|name)="(og|twitter):url"[^>]*>/g, '')
          .replaceAll(`${MAIN_SITE}/assets/`, '/assets/')
      }
      return out
    },
    closeBundle() {
      for (const f of CONTACT_FILES) fs.rmSync(path.resolve(__dirname, 'dist-upwork', f), { force: true })
    }
  }
}

// Upwork build: website projects show as screenshots without live links. Most client
// sites credit "Embark Digitals" with a link to embarkdigitals.com (contact details),
// and Dr Benzi sits on the main portfolio's address (scanned 25 Nov 2026).
// The agency's own site is left out (it advertises services outside Upwork).
function upworkContent() {
  return {
    name: 'upwork-content',
    enforce: 'pre',
    transform(code, id) {
      const file = id.split('\\').join('/')
      if (!/\/src\/content\/[^/]+\.json$/.test(file)) return null
      const own = u => /ndumiso-y\.github\.io|embarkdigitals\.com/.test(u || '')
      let data = JSON.parse(code)
      if (file.endsWith('/websites.json')) {
        data = data
          .filter(s => !/embarkdigitals\.com/.test(s.url || ''))
          .map(({ url, ...s }) => {
            let host = ''
            try { host = new URL(url).hostname.replace(/^www\./, '') } catch {}
            return own(url) ? s : { ...s, host }
          })
      } else {
        // Any other content file: drop links that lead to the main site or the agency site
        const scrub = v => Array.isArray(v) ? v.map(scrub)
          : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, typeof x === 'string' && own(x) && /^https?:/.test(x) ? '' : scrub(x)]))
          : v
        data = scrub(data)
      }
      return { code: JSON.stringify(data), map: null }
    }
  }
}

export default defineConfig({
  plugins: [react(), UPWORK && upworkContent(), UPWORK && upworkHtml()].filter(Boolean),
  server: { port: 5173 },
  base,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // Second page: standalone e-card at /card/ (own static link-preview tags)
  build: {
    outDir: UPWORK ? 'dist-upwork' : 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        card: path.resolve(__dirname, 'card/index.html')
      }
    }
  },
  define: {
    'import.meta.env.VITE_HOST_TARGET': JSON.stringify(target),
    'import.meta.env.VITE_UPWORK': JSON.stringify(UPWORK),
    'import.meta.env.VITE_GA_ID': JSON.stringify(UPWORK ? GA_UPWORK : GA_MAIN)
  }
})
