# Copy review — reply to ChatGPT (copy everything inside the box)

```text
REPLY TO "NDUMISO YEDWA — PORTFOLIO COPY REVIEW" (V3) — from Claude, independent reviewer. Date: 16 Nov 2026.
Mode followed: read-only. Nothing in the website, repository or deployment was changed.
Standard applied: Embark Digitals Living Web Experience Playbook ED-WEB-001 — this is Gate 4 (content) work for owner approval; no layout, motion or hero changes; no content, link, asset, anchor or analytics loss; only authentic, verifiable claims; real DOM text; accessible controls (≥44 px, ≥12 px text, AA contrast); anything beyond text needs separate design approval.

WHAT I INSPECTED
- Active composition (src/AppModern.jsx): HeroModern, AboutModern, WorkShowcase, GraphicsModern, SocialModern, LearningModern, ContactModern + footer. App.jsx, src/components/* and src/features/{hero,about,websites,contact} are legacy and not rendered.
- Copy actually displayed:
  - Hero text is hard-coded in HeroModern.jsx (hero.json mirrors it).
  - About lead and bullets come from about.json; its "title" field is NOT displayed anywhere.
  - Contact copy is in ContactModern.jsx.
  - Meta and social text are in index.html.
- Approved software evidence:
  - JNL demo: README and docs/BUSINESS_SCOPE_AND_LIMITATIONS.md. Live demo returns 200.
  - Dr Tebeila tracker: index.html (216 KB). Live page returns 200.
  - Neither project contains any AI functionality.

1. VERDICT ON YOUR STRATEGY
I agree with:
- Preserving the existing copy and evidence; the gap is positioning, not quality.
- Keeping the hero out of this task.
- Keeping AI-assisted development separate from AI features. This matters: neither project has AI features.
- About and Contact as the first, safest integration points.
Where I disagree (your self-criticism is correct; V3 is too conservative):
a) Where the message sits. Before a visitor reaches About's second paragraph, they see websites-only messages:
   - hero tagline: "websites, branding, and digital assets"
   - "What I do" band: Web Design / Branding / Social
   - "Websites That Convert."
   - the meta description shown in Google/WhatsApp/LinkedIn previews: "websites with React, Vite, and Tailwind"
   Software would appear once, late on the page.
b) The V3 paragraph lists products, not outcomes. "Custom apps, business dashboards and tracking systems" are nouns with no job. Positioning against the real alternative (Dunford) means saying what it replaces: spreadsheets and paperwork.
c) "I use AI-assisted development tools where they add value" describes the builder's process, reads slightly defensive and gives the customer nothing. Make it optional, or rely on the Skills list, which already shows Claude Code and Lovable.
d) "The JNL Traders business management demo" undersells the work. Calling it a live system would overclaim. Name what it does and call it a "working demonstration".
e) No software evidence is visible anywhere. All 10 cards under "Websites That Convert" are websites. A claim with nothing to look at is weak (Hormozi: perceived likelihood of success). The real fix is visual and needs design approval (row 8 below).

2. EXISTING WORDING — KEY FINDINGS
- Hero eyebrow "WEB DESIGNER & FRONT-END DEVELOPER": accurate but incomplete. "Front-end" is a trade term customers don't search for. (Hero is under separate review.)
- "What I do" band: the best customer-language copy on the site. It is only missing a fourth service.
- About lead: good, but "Founder of Embark Digitals" now appears three times close together (hero tagline, lead, bullet 2).
- About bullet 4 ("Blend of copy, design, and code so clients get websites that are clear, on-brand, and ready to use."): the clearest value line on the page. The single word "websites" limits it.
- Contact line "Fast, modern websites, branding, and digital assets — tailored to your goals.": nearly repeats the hero tagline. Software is absent at the moment of decision.
- Meta description: the most technical copy on the site and websites-only. It is protected (P0) metadata, so changing it needs separate approval.
- "5+ Years Experience" chip and "Websites That Convert" / "conversion-focused": unverified claims. They are existing copy; the owner should confirm them, and no figures should ever be added without data.

3. RECOMMENDED POSITIONING
Statement: "I build websites that help businesses get found and contacted, and custom business software that replaces spreadsheets and paperwork, for South African small businesses, practices and organisations."
Title: "Web Designer & Front-End Developer" is no longer sufficient as the primary title. For the hero review I recommend "Websites & Business Software" as the eyebrow, or "Web & Software Developer" if a job title is preferred. "Front-end" stays in About bullet 1 as evidence.

4. FINAL PROPOSED COPY (text only, no layout change)
ABOUT (about.json, rendered by AboutModern.jsx)
- Heading — unchanged: Building Digital Experiences That Matter.
- Lead — unchanged: Founder of Embark Digitals. I build fast, modern websites and brand assets for SMEs—combining clean UI, conversion-focused messaging, and reliable delivery.
- New paragraph (replaces the V3 paragraph):
  "I also build custom business software: apps and dashboards that replace spreadsheets and paperwork. For JNL Traders, I built a working demonstration of a business management system covering quotations, invoices, purchase approvals, and fleet and property records. For Dr Tebeila Dental Studio, I built an action-plan tracker that shows who owns each task, when it is due and how far it has progressed."
- Optional, only if the owner wants AI named in prose: "I use AI-assisted development tools to build and test efficiently."
- Bullets 1–3 — unchanged.
- Bullet 4 — one-word scope edit: "Blend of copy, design, and code so clients get websites and software that are clear, on-brand, and ready to use."
- CTA — unchanged: Let's Work Together.
CONTACT (ContactModern.jsx)
- Heading — unchanged: Let's work together.
- Existing line — unchanged.
- New sentence: "Need an app, dashboard or system to run part of your business? Tell me what it needs to do."

5. CHANGE REGISTER
1) New About paragraph | about.json (new field) + one <p> in AboutModern.jsx | the software offer, the problem it solves and two pieces of evidence | owner copy approval — approach approved
2) Bullet 4: "websites" → "websites and software" | about.json bullets[3] | extends the strongest value line | approach approved
3) New Contact sentence | ContactModern.jsx | a next step for software buyers (StoryBrand call to action) | approach approved
4) Optional AI sentence | about.json | names AI accurately as a method | owner choice — pending
5) Fourth "What I do" service, "Business Apps & Dashboards — Custom tools that replace spreadsheets and paperwork: quotes, invoices, approvals, tracking and reports." | HeroModern.jsx band | makes software a peer service | design approval; decide with the hero review (the hero proposal already moves this band into About)
6) Meta/og/twitter description: "Websites, branding and custom business software for South African small businesses and organisations, by Ndumiso Yedwa, founder of Embark Digitals." (148 chars) | index.html | link previews and search | owner approval (P0 metadata)
7) Hero eyebrow → "Websites & Business Software" | HeroModern.jsx | primary title | hero review only
8) Two "Business Software" proof cards (screenshot + one line; link to the JNL demo only) | new block | proof beats claims | design approval + client consent
Smallest correction that answers your self-criticism: 1–3 now; 5 and 6 together with the hero review; 7 and 8 later.

6. MUST REMAIN UNCHANGED
- About heading, lead, bullets 1–3 and the CTA.
- All 11 skills, the 3 recognition items and their modals.
- Contact heading, existing line, WhatsApp-first order, Email, Call, Save Contact, e-Card, socials and all analytics events.
- All 10 website cards, every graphics item and PDF, both social case studies, all 8 Treehouse projects with audio and video.
- Section structure, anchors, nav, layout, spacing and motion; the hero (separate review).

7. RISKS AND OWNER DECISIONS
- Tracker: do NOT link the Dr Tebeila tracker or its repository from the portfolio. Its privacy and access are being handled as a separate project.
- Client name confirmed by the owner: "Dr Tebeila Dental Studio".
- JNL (owner agreed): describe it only as a working demonstration with fictional data, never as a system JNL uses. It is a discovery prototype for a prospective client.
- AI: neither project has AI features. Use only "AI-assisted development", never "AI-powered app".
- "5+ Years Experience" needs owner confirmation; "Websites That Convert" stays intent, not proof.

OWNER STATUS (16 Nov 2026): The owner approved the approach (rows 1–3). They will be implemented once wording is final after your reply. Rows 4–8 are open.

WHAT I'D LIKE FROM YOU
1. Where do you disagree with the above, and why?
2. Your view on rows 5–8, especially the hero eyebrow ("Websites & Business Software"), so it can be folded into the hero minimalism review you already have.
3. Confirm or improve the exact wording of the new About paragraph and Contact sentence before implementation.
```
