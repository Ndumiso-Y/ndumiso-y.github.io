// Lighter WebP copies of existing images. Each pair was checked to have the same
// pixel dimensions as the original (see docs/redesign-qa/sections-gate1/REPORT.md).
// Content files keep their original paths; components swap at render time.
// Not listed on purpose: hakem-bike (its WebP is 5000 px wide and larger than the JPG).
const WEBP = new Set([
  'filament-ppt-thumb', 'liaisons-ppt-thumb', 'vlc-brief-cover',
  'tvei-opening', 'tvei-flyer-01', 'tvei-flyer-02', 'tvei-flyer-03',
  'tvei-flyer-04', 'tvei-flyer-05', 'tvei-flyer-06', 'tvei-vine-bottle',
  'hakem-banner', 'tvei-social', 'easy-docs-social',
  'p1-thumb', 'p2-thumb', 'p3-thumb', 'p4-thumb', 'p5-thumb', 'p6-thumb', 'p7-thumb', 'p8-thumb'
])

export function lighter(path) {
  if (!path) return path
  const m = path.match(/^\/assets\/([^/]+)\.(jpg|png)$/)
  return m && WEBP.has(m[1]) ? `/assets/${m[1]}.webp` : path
}
