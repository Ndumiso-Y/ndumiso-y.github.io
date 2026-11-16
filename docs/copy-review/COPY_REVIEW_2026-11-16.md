# Portfolio copy review — independent assessment

**Reviewer:** Claude (independent review requested by the owner) · **Date:** 16 Nov 2026 · **Mode:** read-only. Nothing in the site, repository or deployment has been changed.
**Reference:** ED-WEB-001 (Gate 4 is the content gate: this is a proposal for owner approval, not an implementation).

## What I inspected

- **Active composition** (`src/AppModern.jsx`): HeroModern, AboutModern, WorkShowcase, GraphicsModern, SocialModern, LearningModern and ContactModern, plus the SiteFooter. `App.jsx`, `src/components/*` and `src/features/{hero,about,websites,contact}` are legacy and not rendered.
- **Copy sources actually displayed:**
  - Hero text is hard-coded in `HeroModern.jsx`; `hero.json` mirrors it.
  - About lead and bullets come from `about.json`. Its `title` field is **not displayed** anywhere.
  - Contact copy is in `ContactModern.jsx`.
  - Meta and social text are in `index.html`.
- **The two approved software projects:**
  - **JNL Traders demo:** read the README and `docs/BUSINESS_SCOPE_AND_LIMITATIONS.md`. The live demo returns 200.
  - **Dr Tebeila tracker:** read `index.html` (216 KB); the live page returns 200.
  - Neither project contains AI features.

## 1. Verdict on ChatGPT's strategy

**I agree with:**
- Preserving the existing copy and evidence.
- That the gap is positioning, not content quality.
- Keeping the hero out of this task.
- Keeping AI-assisted *development* separate from AI *features*. This matters here because neither project has any AI functionality.
- About and Contact as the first, safest place for new text.

**Where I disagree:**
1. **V3 is too conservative.** This is a real weakness, not a stylistic one, because of where it puts the message. A business owner skimming the page meets these lines before they reach About's second paragraph, and every one says "websites":
   - Hero tagline: "websites, branding, and digital assets".
   - "What I do": Web Design, Branding, Social.
   - "Websites That Convert".
   - The Google/WhatsApp link preview: "websites with React, Vite, and Tailwind".

   Custom software would appear once, as a sentence in the 4th paragraph-level block of the page.
2. **The proposed paragraph lists products, not outcomes.** "Custom apps, business dashboards and tracking systems" are three nouns with no job attached. April Dunford's test asks what it replaces: spreadsheets, paperwork, WhatsApp threads, an old Access database. The copy should say so.
3. **"I use AI-assisted development tools where they add value"** is about the builder's process, sounds slightly defensive, and gives the customer nothing. Either state a plain benefit or leave AI to the Skills list, where Claude Code and Lovable already appear.
4. **"The JNL Traders business management demo"** undersells it ("demo" reads as a toy). Calling it a live system would overclaim, so name what it does and call it a "working demonstration".
5. **No software evidence is visible anywhere on the page.** All 10 cards in "Websites That Convert" are websites. Copy that claims software with nothing to look at is the weakest kind of claim (Hormozi: perceived likelihood of success). The smallest real fix is visual and needs design approval; see Section 5.

## 2. Review of the existing live wording

| Where | Current text | Assessment |
|---|---|---|
| Hero eyebrow | WEB DESIGNER & FRONT-END DEVELOPER | Accurate but incomplete. "Front-end" is a trade term customers don't search for. Hero is under separate review. |
| Hero tagline | Founder of Embark Digitals — building fast, modern websites, branding, and digital assets. | Clear. Websites only. |
| "What I do" band | Web Design & Development / Branding & Graphics / Social & Digital Content, with customer-language descriptions | The best customer-facing copy on the site. It is simply missing the fourth service. |
| About heading | Building Digital Experiences That Matter. | Keep. It is broad enough to cover software. |
| About lead | Founder of Embark Digitals. I build fast, modern websites and brand assets for SMEs—combining clean UI, conversion-focused messaging, and reliable delivery. | Good. "Founder of Embark Digitals" now appears three times nearby (hero tagline, lead, bullet 2). |
| About bullet 1 | Front-end specialist: HTML, CSS, JavaScript with React/Tailwind builds. | Evidence of competence; keep. |
| About bullet 2 | Founder of Embark Digitals, working with SMEs, non-profits, and community projects. | Repeats the lead, but the audience list is useful. Keep (brief says preserve). |
| About bullet 3 | Treehouse … Techdegree graduate (CodeForward sponsorship). | Strong, verifiable credential; keep. |
| About bullet 4 | Blend of copy, design, and code so clients get websites that are clear, on-brand, and ready to use. | The clearest value line on the page. One word ("websites") limits it. |
| About chip | 5+ Years Experience | A claim the brief says not to assume. It is existing copy; the owner must confirm it. |
| Websites heading and subtitle | Websites That Convert. / Modern, fast, and built for results… | Acceptable as intent. No conversion data is shown, so it stays a promise, not a proof. |
| Contact | Let's work together. / Fast, modern websites, branding, and digital assets — tailored to your goals. | Near-duplicate of the hero tagline. Software is absent at the exact moment someone decides to get in touch. |
| Meta description (`index.html`) | I build fast, brand-true websites with React, Vite, and Tailwind, turning business goals into clear UI, accessible UX, and measurable outcomes. | The most technical copy on the site, and it is what WhatsApp, LinkedIn and Google show. Websites only. It is a protected metadata value (P0), so changing it needs separate owner approval. |

## 3. Recommended client-facing positioning

**Statement (for internal alignment and to guide all copy):**
> I build websites that help businesses get found and contacted, and custom business software that replaces spreadsheets and paperwork, for South African small businesses, practices and organisations.

**Professional title:** "Web Designer & Front-End Developer" is no longer sufficient as the primary title. Recommended for the hero review: **"Websites & Business Software"** as the eyebrow, or "Web & Software Developer" if a job-title form is preferred.
- "Front-end" stays in About bullet 1, where it serves as evidence.
- This is a hero change, so it belongs to the hero/GPT review, not this task.

## 4. Final proposed copy (text only, no layout change)

### About (`src/content/about.json`, rendered by `AboutModern.jsx`)

- **Heading — unchanged:** Building Digital Experiences That Matter.
- **Lead — unchanged:** Founder of Embark Digitals. I build fast, modern websites and brand assets for SMEs—combining clean UI, conversion-focused messaging, and reliable delivery.
- **New supporting paragraph** (replaces ChatGPT's V3 paragraph):
  > I also build custom business software: apps and dashboards that replace spreadsheets and paperwork. For JNL Traders, I built a working demonstration of a business management system covering quotations, invoices, purchase approvals, and fleet and property records. For Dr Tebeila Dental Studio, I built an action-plan tracker that shows who owns each task, when it is due and how far it has progressed.
- **Optional AI sentence**, only if the owner wants AI named in prose:
  > I use AI-assisted development tools to build and test efficiently.
- **Bullets 1–3:** unchanged.
- **Bullet 4, one-word-scope edit:** Blend of copy, design, and code so clients get websites **and software** that are clear, on-brand, and ready to use.
- **CTA — unchanged:** Let's Work Together.

### Contact (`src/features/modern/ContactModern.jsx`)

- **Heading — unchanged:** Let's work together.
- **Existing line — unchanged:** Fast, modern websites, branding, and digital assets — tailored to your goals.
- **New sentence:**
  > Need an app, dashboard or system to run part of your business? Tell me what it needs to do.

## 5. Change register

| # | Existing text | Proposed text | File | Reason | Approval needed |
|---|---|---|---|---|---|
| 1 | *(none)* | New paragraph (Section 4) | `about.json` (new `software` field) + one `<p>` in `AboutModern.jsx` | Puts the software offer, the problem it solves and two pieces of evidence into words a business owner understands | Owner copy approval, plus JNL and Dr Tebeila consent to be named (see 7) |
| 2 | …so clients get websites that are clear… | …so clients get websites and software that are clear… | `about.json` bullets[3] | Extends the strongest value line to the new offer with one word | Owner copy approval |
| 3 | *(none)* | Need an app, dashboard or system to run part of your business? Tell me what it needs to do. | `ContactModern.jsx` | Gives the software buyer a next step at the moment of contact (StoryBrand call to action) | Owner copy approval |
| 4 | *(none)* | Optional AI sentence | `about.json` | Names AI accurately as a development method | Owner choice |
| 5 | Three "What I do" services | Add a fourth: **Business Apps & Dashboards**. "Custom tools that replace spreadsheets and paperwork: quotes, invoices, approvals, tracking and reports." | `HeroModern.jsx` (band below the first screen) | The smallest change that makes software visible as a peer service. **The hero proposal already moves this band into About, so decide it together with the hero review.** | Design approval (3 → 4 columns) |
| 6 | Meta description (websites only, React/Vite/Tailwind) | Websites, branding and custom business software for South African small businesses and organisations, by Ndumiso Yedwa, founder of Embark Digitals. (148 characters) | `index.html` (description, og, twitter) | It is what people see in link previews and search results | Owner approval (protected P0 metadata) |
| 7 | Hero eyebrow | Websites & Business Software | `HeroModern.jsx` | Primary title | Hero review only |
| 8 | *(no software evidence on the page)* | Two "Business Software" proof cards (screenshot + one line + link to the JNL demo only) | New block, Websites or About | Proof beats claims | Design approval, plus client consent |

Rows 1–4 are text-only and can be implemented without layout or design changes. Rows 5–8 need separate approval.

**Smallest correction that answers ChatGPT's self-criticism:** rows 1–3 now; row 5 decided together with the hero review; row 6 alongside it. Rows 7–8 are the larger, later wins.

## 6. Must remain unchanged

- About heading, lead, bullets 1–3 and the "Let's Work Together" CTA.
- All 11 skills and descriptions, the three recognition items and their modals.
- Contact heading, the existing supporting line, WhatsApp-first order, Email, Call, Save Contact, e-Card, the three social links and all analytics events.
- All 10 website cards (names, outcomes, URLs, order), every graphics item and PDF, both social case studies, all 8 Treehouse projects with audio and video.
- Section structure, anchors, nav labels, visual composition, spacing and motion.
- The hero, which is under the separate design review.

## 7. Unsupported claims and risks for owner review

1. **Dr Tebeila tracker is publicly reachable.**
   - The live tracker (`ndumiso-y.github.io/DrTracking---/`) opens with no login. The public repository also contains the practice's strategic action plan as PDF and Word files.
   - **Do not link the tracker or its repo from the portfolio.**
   - Separately from this copy task, decide whether the repo should be private and the live page access-protected. It is a client's confidential plan.
   - Get the practice's permission before naming it.
2. **Naming:** the app's own title says "Dr. Tebeila Dental *Practice*"; the brief says "Dental *Studio*". Confirm the client's preferred name. **Owner confirmed 16 Nov 2026: "Dental Studio".** The copy above now uses it.
3. **JNL demo is a discovery prototype for a prospective client.**
   - Its own documentation says it "carries no production commitment".
   - Describe it only as a working demonstration with fictional data. Never call it a system JNL uses.
   - Confirm JNL is comfortable being named. They are already a public website client on the portfolio, which lowers but doesn't remove the risk.
4. **AI:** neither project has AI features. Use only "AI-assisted development", never "AI-powered app", unless a future project actually has AI functionality.
5. **"5+ Years Experience"** (About chip): existing claim, needs the owner's confirmation.
6. **"Websites That Convert" / "conversion-focused messaging":** no conversion figures support these. Acceptable as intent; never add numbers without data.
7. **Easy Documents Instagram link** is still a placeholder handle (content issue, outside this task).

## Owner decisions (16 Nov 2026)

- Approach approved: text changes 1–3 in Section 4; the other items will be worked on later.
- Client name confirmed: **Dr Tebeila Dental Studio**.
- JNL: agreed to describe it only as a working demonstration with fictional data, never as a system JNL uses.
- Tracker repo: the owner asked for it to be made private. Before doing so, the owner was told that on a free GitHub plan this also takes the live tracker page offline.

## ChatGPT reconciliation and implementation (16 Nov 2026)

ChatGPT agreed with this review and refined the wording:
- **Spreadsheets and paperwork** are now framed as the problem the software addresses, not as a verified JNL outcome.
- **The paragraph is shorter.**
- **AI stays in the Skills list.** Row 4 is dropped from prose.

Claude had no further editorial objections. Rows 1–3 were implemented with ChatGPT's final wording:
1. **About, new paragraph** (`about.json` → `software`, rendered under the lead in `AboutModern.jsx`): "I also build custom business software—apps and dashboards that bring everyday work into one place instead of spreading it across spreadsheets and paperwork. For JNL Traders, I created a working demonstration covering quotations, invoices, approvals, fleet and property records. For Dr Tebeila Dental Studio, I built a strategic action-plan tracker showing task owners, deadlines and progress."
2. **About, bullet 4:** "…so clients get websites and software that are clear, on-brand, and ready to use."
3. **Contact** (`ContactModern.jsx`, under the existing line): "Need an app, dashboard or business system? Tell me what you need it to do."

Nothing else changed. There are no links to either software project, and the hero, metadata, service band, layout, assets and analytics are untouched.

### Rows 5–8: ChatGPT's position, for the hero review
- **Row 5:** a software service is needed. Wording: "Business Software & Dashboards — Custom apps that bring quotations, records, approvals, tasks and reports into one place." Do not add a fourth card automatically; decide this in the hero review.
- **Row 6:** direction approved, pending owner authorisation. Wording: "Ndumiso Yedwa builds websites, custom business software and dashboards for South African businesses and organisations. Founder of Embark Digitals."
- **Row 7:** "Websites & Business Software" is recommended. Where it sits (headline, eyebrow or supporting text) is decided in the hero review.
- **Row 8:** agreed in principle; needs design approval. A JNL demo link needs client and marketing permission first. Nothing from the Dr Tebeila tracker may be published.
