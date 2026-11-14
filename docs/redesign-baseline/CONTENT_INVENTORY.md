# Content inventory

Content is duplicated across a modern active path and alternate legacy paths. Preserve both unless a later migration is explicitly approved; visible-current content is identified below.

## Navigation and hero

| Content | Current value/source | Rendered by |
|---|---|---|
| Navigation labels | About; Websites; Graphics; Social; Projects; Contact — hardcoded `navLinks` | `FloatingNav.jsx` |
| Hero status | Web Developer — hardcoded | `HeroModern.jsx` |
| Hero heading | NDUMISO YEDWA — hardcoded | `HeroModern.jsx` |
| Hero role | Web Designer & Front-End Developer — hardcoded | `HeroModern.jsx` |
| Hero tagline | Founder of Embark Digitals — building fast, modern websites, branding, and digital assets. — hardcoded | `HeroModern.jsx` |
| Hero buttons | Get in touch; View work — hardcoded | `HeroModern.jsx` |
| Hero benefit bullets | Clean UI & brand consistency; Conversion-focused messaging; Reliable delivery — hardcoded | `HeroModern.jsx` |
| Services | Web Design & Development; Branding & Graphics; Social & Digital Content, with hardcoded descriptions | `HeroModern.jsx` |
| QR content | Connect; scan-to-open e-card copy — hardcoded | `HeroModern.jsx` |

`src/content/hero.json` and `content.hero` contain overlapping alternate hero copy and `/assets/ndu-portrait.jpg`, but `HeroModern` does not read them. The portrait remains active as Open Graph/Twitter media.

## About, expertise, recognition

- Active biography and four bullets: `src/content/about.json` → `AboutModern.jsx`.
- Active display title: “Building Digital Experiences That Matter”; CTA “Let's Work Together”; section labels “About Me”, “Skills & Tools”, “Technical Expertise”, “Achievements”, and “Badges & Recognition” are hardcoded in `AboutModern.jsx`.
- Skills (JSON): HTML, CSS, JavaScript, React, Tailwind, Canva, Adobe Photoshop, Adobe Illustrator, Adobe InDesign, Claude Code, Lovable, each with an exact description.
- Stats: a hardcoded floating “5+ Years Experience” badge.
- Recognition (`content.js`): Black Umbrellas ESD acceptance; Treehouse study award; Treehouse Front End Web Development Techdegree. Names, snippets, notes, links, and media paths must remain exact.
- No education timeline, employment timeline, testimonial, or legal-policy content is rendered.

## Websites

`src/content/websites.json` is the active source. Each item includes name, outcome, stack, thumbnail, and external URL:

1. Koketso Rakhudu Foundation
2. Dr Benzi
3. VLC Construction
4. The Village Economy Indaba
5. Makweleng Group
6. Embark Digitals

The title “Websites That Convert” and supporting sentence are hardcoded in `WorkShowcase.jsx`. React/Vite/Tailwind tags are intentionally filtered out, so the current cards show no stack badges because every active site has only those three values.

`content.websites` is a non-identical five-item alternate dataset and contains stale/missing `makweleng-shot.jpg`; do not merge the datasets silently.

## Graphics and branding

- Section introduction: `content.sectionIntros.graphics`.
- Logo entries: Filament Logo, Liaisons Logo, VLC Brand Brief. Each has client/year/note, thumbnail and PDF download in `content.logos`.
- Design work: TVEI Opening Event with six flyer gallery images; Vine to Bottle masterclass poster; Hakem banner; Hakem bicycle design in `content.tvei.items`.
- UI labels such as “Creative Work”, “Graphics & Branding”, “Logo Designs”, “Design Work”, “Slides”, “Brief”, “View more”, “Show less”, modal zoom labels are hardcoded in `LogoShowCase.jsx`.

## Social management

`content.social` supplies two brands, descriptions, platform labels, thumbnails, and exact external profile URLs:

- The Village Economy Indaba — Facebook and LinkedIn.
- Easy Documents — Facebook and Instagram. The Instagram URL literally contains `your-easy-docs-handle`; document as current content, do not correct during redesign.

The section introduction comes from `content.sectionIntros.social`; visible headings and expand/collapse text are hardcoded in `SocialMgmt.jsx`.

## Learning journey/projects

`src/content/projects.json` is active and contains eight Treehouse projects, each with name, outcome, technology stack, thumbnail, external demo URL, MP3 URL, and audio description. Preserve all eight and their order:

1. Personal Profile Page
2. Mobile-first Layout
3. Interactive Registration Form
4. Web Style Guide (Sass)
5. Photo Gallery
6. Game Show App
7. Web App Dashboard
8. API Employee Directory

`content.projects` contains longer alternate descriptions for the same projects. The project 7 URL is unusual (`.../https---github.com-Ndumiso-Y-Project7--WebAppDashBoard/`) in both datasets and must not be silently rewritten.

The intro-video heading/body, “Treehouse Projects”, “Learning Journey”, and “View Project” are hardcoded in `ProjectCarousel.jsx`. Audio player labels include Play/Pause controls and formatted time.

## Contact and footer

The active contact source is `content.contact`:

- Name: Ndumiso Yedwa
- Email: `contact@embarkdigitals.com`
- Phone: `+27 60 714 7939`
- Location: Johannesburg, South Africa
- WhatsApp, LinkedIn, Facebook, Instagram, Twitter, e-card, icon and VCF URLs/paths are preserved in the data file.
- Visible actions: WhatsApp, Email, Call, Save Contact, LinkedIn, Facebook, Instagram.
- Active contact copy: “Let's work together” and “Fast, modern websites, branding, and digital assets — tailored to your goals.”
- The current root footer is hardcoded in `AppModern.jsx`: dynamic current year, Ndumiso Yedwa, “Built with React & Tailwind CSS.”

The contact component contains an e-card preview modal implementation, but `openPreview` is never set to true in the current UI. Preserve it as dormant functionality. A dynamic vCard fallback is constructed only when `c.vcf` is absent; the current static VCF path wins.

## Alternate/inactive content

`content.upcoming`, long project descriptions, old section introductions, `contact.json`, `hero.json`, old components, `App.jsx`, and `ProjectsOld.jsx.bak` are not on the active render path. They include Ntombi Fashions, Funeka Placements, alternate contact/social UI, and older section copy. Classification: P4 for reachability plus P2 for the actual content/media. Removal or rewriting requires explicit approval.
