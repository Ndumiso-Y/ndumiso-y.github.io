# UI behaviour map

| Trigger | Location | Implementation and expected result | Dependencies | Responsive difference | Priority |
|---|---|---|---|---|---|
| Initial mount | Hero | 200 ms timer reveals left, portrait, services and QR with staggered CSS transitions | React state, Tailwind classes | Same sequencing; different grid/order | P1/P3 |
| Page scroll | Floating nav | `scrollY > 50` shifts nav from top-6 to top-4; bounding rectangles set active section at the 100px line | scroll listener, section IDs | Text links hidden below 768px | P1 |
| Nav/CTA click | Hero/nav/About | Plain anchor links update the hash and target section; analytics events fire on tracked links | Router, IDs, GA4 | Mobile has only nav logo, hero/About CTAs | P1 |
| Website hover/click | WorkShowcase | Image scales, teal overlay appears, arrow moves; whole card opens external URL in a new tab and emits `web_project_view_click` | JSON, GA4 | 1/2/3 column grid | P1/P2 |
| Badge card/button click | AboutModern | Opens snippet or zoom modal; overlay click and close button dismiss; zoom range 1–3 in 0.25 steps | content.js media | Same modal; viewport max-height 70vh | P1 |
| Badge image context menu | AboutModern modal | `preventDefault` suppresses the image context menu | DOM event | Same | P3 |
| Graphics card hover | LogoShowCase | Border changes to brand color, grayscale drops, image may scale, overlay fades | inline pointer handlers/CSS | Desktop shows all; mobile only first by default | P2/P3 |
| Graphics View more/less | LogoShowCase | Below 768px expands/collapses logos/design items; collapse smooth-scrolls `#graphics` to start | `matchMedia`, state, `scrollIntoView` | Mobile/tablet behavior only (<768) | P1 |
| TVEI opening timer | LogoShowCase | Auto-advances six gallery images every 3 s; previous/next buttons and dots update state | interval, content gallery | Same card when visible | P1/P2 |
| Design card click | LogoShowCase | Opening item launches gallery; other items launch zoom modal | state, data | Same | P1 |
| Gallery keyboard | LogoShowCase modal | Escape closes; Left/Right arrows cycle; controls wrap around; thumbnail selects image; zoom 1–3 | window keydown listener | Same | P1 |
| Social hover/click | SocialMgmt | Card overlay; link background adopts platform color; external new tab; `social_profile_click` | react-icons, GA4 | Mobile shows first card then View more/less | P1/P2 |
| Project arrows | ProjectCarousel | Scroll horizontal container ±400px with smooth behavior | ref, CSS overflow | Same; fixed 350px cards can overflow narrow screens by design | P1 |
| Project audio | MiniAudioPlayer | Play/pause, metadata duration, time updates, click-to-seek progress | HTMLAudioElement | Same | P1/P2 |
| Intro video | ProjectCarousel | Controls + autoplay + muted + loop + playsInline + preload auto; 16:9 video is cropped by object-cover in a portrait-ratio wrapper | HTML video | Wrapper becomes desktop 7/12 column but remains portrait ratio | P1/P2 |
| Contact action | Contact | WhatsApp/email/phone open protocol/external targets; VCF opens/downloads via local path; social profiles open new tabs | content.js, withBase | 1 column → 2 columns at sm | P0/P1 |
| Contact logo error | Contact | Falls back to NY badge for foreground logo; watermark disappears when configured with no fallback | local error state | Same | P1 |
| E-card preview | Contact | Dormant modal/iframe code exists, but no current control calls `setOpenPreview(true)` | state, external e-card | Not reachable | P4 |
| Focus | Hero CTAs and native controls | Hero CTAs have explicit focus-visible rings; many other links rely on browser/global styles | CSS/native | Same | P1 |
| Reduced motion | Global CSS | `prefers-reduced-motion: reduce` makes animations/transitions near-instant and disables smooth scrolling | media query | Preference-driven | P1 |

## Loading, success, error, and disabled states

- There is no form submission, API fetch, app loading screen, toast, success state, or application error screen in the active tree.
- `ErrorBoundary.jsx` exists but is not mounted.
- Images mostly use normal browser failure behavior; `Contact.SafeLogo` is the only explicit active image fallback.
- Badge/logo/social images are lazy where specified; hero is eager; site/project carousel images have no explicit `loading` attribute; intro video preloads fully.
- No disabled buttons exist. MiniAudioPlayer handles unavailable duration as `0:00`.

## Analytics behavior attached to interactions

Tracked: hero Get in touch/View work/QR; navigation; website cards; graphics PDF links; social profiles; WhatsApp; email; contact LinkedIn/Facebook/Instagram. Not tracked: project demo clicks, audio playback, video playback, VCF save, phone call, badge links/modals, gallery interaction, and About CTA. Facebook/Instagram contact links call the LinkedIn wrapper and therefore emit `contact_linkedin_click` with a different label; preserve/document before any deliberate analytics correction.
