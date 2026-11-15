# Media inventory

Complete machine-readable fields for every asset are in `media-inventory.json`. This document is the human review index. No asset was changed.

## Counts

| Metric | Count |
|---|---:|
| Local assets/documents | 170 |
| Raster images | 156 |
| Videos | 2 |
| Audio | 8 |
| Documents/contact cards | 4 |
| Mapped to current render/metadata | 52 |
| Potentially inactive/legacy (preserve) | 118 |
| External embedded media | 0 |

Formats: 49 AVIF, 50 JPEG (47 normal + 3 malformed-suffix JPEGs), 49 WebP, 8 PNG, 2 MP4, 8 MP3, 3 PDF, and 1 VCF. No SVG, GIF, ICO, WebM, audio other than MP3, or externally hosted embedded media was found.

## Missing references

The following source paths do not exist on disk and are not active in `AppModern`: `/assets/ndu-headshot.jpg`, `/assets/makweleng-shot.jpg`, and `/assets/ntombis-1080.webm`. Document; do not repair during redesign.

## Important media behavior

- Hero: `NdumisoNobackground.png` is eager/preloaded, contain/bottom; QR is a 370?370 active image.
- About: `Ndu_Blue Background.png` is object-cover in a 3:4 frame; recognition cards/modals mix cover and contain.
- Websites: six wide screenshots are object-cover in 4:3 frames.
- Graphics: cards/modals use contain; TVEI gallery auto-advances and supports zoom.
- Projects: eight thumbnails and eight MP3s are active. The 1280?720 intro MP4 is placed in a 1080:1350 wrapper with object-cover, so it is cropped.
- Metadata: `ndu-portrait.jpg` is the Open Graph/Twitter image; `ndu-icon.png` is favicon, Apple icon, navigation/contact logo.
- Three malformed-suffix JPEG files and multiple 1?1 placeholders are P4 forensic evidence, not deletion candidates.

## Asset index

| Asset | Type | Bytes | Dimensions | Active role | References | Class |
|---|---|---:|---|---|---|---|
| `/assets/benzi-shot.avif` | image/heif | 89,266 | 1909x993 | No active role proven | none | P4 |
| `/assets/benzi-shot.jpg` | image/jpeg | 145,759 | 1200x624 | website thumbnail: Dr Benzi | `src/content/websites.json`, `src/content.js` | P2 |
| `/assets/benzi-shot.webp` | image/webp | 186,474 | 1909x993 | No active role proven | none | P4 |
| `/assets/black-umbrellas.avif` | image/heif | 1,721 | 200x200 | No active role proven | none | P4 |
| `/assets/black-umbrellas.jpg` | image/png | 39,187 | 200x200 | recognition card: Black Umbrellas | `src/content.js` | P2 |
| `/assets/black-umbrellas.webp` | image/webp | 2,356 | 200x200 | No active role proven | none | P4 |
| `/assets/bu-letter-snippet.avif` | image/heif | 23,963 | 618x295 | No active role proven | none | P4 |
| `/assets/bu-letter-snippet.jpg` | image/png | 79,044 | 618x295 | recognition snippet: Black Umbrellas | `src/content.js` | P2 |
| `/assets/bu-letter-snippet.webp` | image/webp | 18,608 | 618x295 | No active role proven | none | P4 |
| `/assets/easy-docs-social.avif` | image/heif | 24,906 | 1131x623 | No active role proven | none | P4 |
| `/assets/easy-docs-social.jpg` | image/png | 474,995 | 1131x623 | social management thumbnail: Easy Documents | `src/content.js` | P2 |
| `/assets/easy-docs-social.webp` | image/webp | 34,656 | 1131x623 | No active role proven | none | P4 |
| `/assets/Embark-Digitals.vcf` | contact-card/vcf | 18,954 | ? | active downloadable contact card | `src/content/contact.json`, `src/content.js` | P1 |
| `/assets/embark-logo.avif` | image/heif | 16,215 | 2189x1220 | No active role proven | none | P4 |
| `/assets/embark-logo.png` | image/png | 92,624 | 2189x1220 | No active role proven | none | P4 |
| `/assets/embark-logo.webp` | image/webp | 34,644 | 2189x1220 | No active role proven | none | P4 |
| `/assets/embark-shot.avif` | image/heif | 26,010 | 1904x993 | No active role proven | none | P4 |
| `/assets/embark-shot.jpg` | image/png | 248,560 | 1904x993 | website thumbnail: Embark Digitals | `src/content/websites.json`, `src/content.js` | P2 |
| `/assets/embark-shot.webp` | image/webp | 41,218 | 1904x993 | No active role proven | none | P4 |
| `/assets/filament-ppt-thumb.avif` | image/heif | 15,639 | 1920x1080 | No active role proven | none | P4 |
| `/assets/filament-ppt-thumb.jpg` | image/png | 156,646 | 1920x1080 | logo thumbnail: Filament Logo | `src/content.js` | P2 |
| `/assets/filament-ppt-thumb.webp` | image/webp | 30,632 | 1920x1080 | No active role proven | none | P4 |
| `/assets/filament-ppt.pdf` | document/pdf | 312,083 | ? | logo slide PDF: Filament Logo | `src/content.js` | P1 |
| `/assets/graphic-1.avif` | image/heif | 293 | 1x1 | No active role proven | none | P4 |
| `/assets/graphic-1.jpg` | image/jpeg | 106 | 1x1 | No active role proven | none | P4 |
| `/assets/graphic-1.webp` | image/webp | 44 | 1x1 | No active role proven | none | P4 |
| `/assets/graphic-2.avif` | image/heif | 293 | 1x1 | No active role proven | none | P4 |
| `/assets/graphic-2.jpg` | image/jpeg | 106 | 1x1 | No active role proven | `src/content.js` | P4 |
| `/assets/graphic-2.webp` | image/webp | 44 | 1x1 | No active role proven | none | P4 |
| `/assets/hakem-banner.avif` | image/heif | 152,722 | 1600x1200 | No active role proven | none | P4 |
| `/assets/hakem-banner.jpg` | image/jpeg | 333,878 | 1600x1200 | design card: Banner & Executive Banner — Hakem | `src/content.js` | P2 |
| `/assets/hakem-banner.jpg,,` | image/jpeg | 106 | 1x1 | No active role proven | none | P4 |
| `/assets/hakem-banner.webp` | image/webp | 210,880 | 1600x1200 | No active role proven | none | P4 |
| `/assets/hakem-bike.avif` | image/heif | 186,680 | 5000x3500 | No active role proven | none | P4 |
| `/assets/hakem-bike.jpg` | image/jpeg | 331,407 | 1920x1344 | design card: Bicycle Design — Hakem Energies | `src/content.js` | P2 |
| `/assets/hakem-bike.jpg,` | image/jpeg | 106 | 1x1 | No active role proven | none | P4 |
| `/assets/hakem-bike.webp` | image/webp | 338,680 | 5000x3500 | No active role proven | none | P4 |
| `/assets/krfthumbnail.png` | image/jpeg | 106,584 | 1200x680 | website thumbnail: Koketso Rakhudu Foundation | `src/content/websites.json` | P2 |
| `/assets/liaisons-ppt-thumb.avif` | image/heif | 24,183 | 1920x1080 | No active role proven | none | P4 |
| `/assets/liaisons-ppt-thumb.jpg` | image/png | 218,984 | 1920x1080 | logo thumbnail: Liaisons Logo | `src/content.js` | P2 |
| `/assets/liaisons-ppt-thumb.webp` | image/webp | 38,656 | 1920x1080 | No active role proven | none | P4 |
| `/assets/liaisons-ppt.pdf` | document/pdf | 434,257 | ? | logo slide PDF: Liaisons Logo | `src/content.js` | P1 |
| `/assets/lpg-day-logo.avif` | image/heif | 293 | 1x1 | No active role proven | none | P4 |
| `/assets/lpg-day-logo.jpg` | image/jpeg | 106 | 1x1 | No active role proven | none | P4 |
| `/assets/lpg-day-logo.webp` | image/webp | 44 | 1x1 | No active role proven | none | P4 |
| `/assets/MakwelengThumbnail.png` | image/jpeg | 75,698 | 1200x625 | website thumbnail: Makweleng Group | `src/content/websites.json` | P2 |
| `/assets/Ndu_Blue Background.png` | image/png | 548,438 | 1080x1080 | active About portrait | `src/content/about.json`, `src/features/modern/AboutModern.jsx` | P2 |
| `/assets/ndu-icon,.avif` | image/heif | 13,731 | 1024x1024 | No active role proven | none | P4 |
| `/assets/ndu-icon,.png` | image/png | 1,450,218 | 1024x1024 | No active role proven | none | P4 |
| `/assets/ndu-icon,.webp` | image/webp | 73,422 | 1024x1024 | No active role proven | none | P4 |
| `/assets/ndu-icon.avif` | image/heif | 12,937 | 1024x1024 | No active role proven | none | P4 |
| `/assets/ndu-icon.png` | image/png | 263,222 | 512x512 | active navigation/contact icon and favicon | `index.html`, `src/components/Footer.jsx`, `src/content/contact.json`, `src/content.js` | P0 |
| `/assets/ndu-icon.webp` | image/webp | 82,264 | 1024x1024 | No active role proven | none | P4 |
| `/assets/ndu-portrait.avif` | image/heif | 46,702 | 5184x2912 | No active role proven | none | P4 |
| `/assets/ndu-portrait.jpg` | image/jpeg | 72,994 | 1920x1079 | Open Graph and Twitter preview image | `index.html`, `src/content/hero.json`, `src/content.js` | P0 |
| `/assets/ndu-portrait.webp` | image/webp | 116,416 | 5184x2912 | No active role proven | none | P4 |
| `/assets/NdumisoNobackground.png` | image/png | 1,533,858 | 832x1248 | active hero transparent portrait and preload | `index.html`, `src/components/Hero.jsx`, `src/features/hero/Hero.jsx`, `src/features/modern/HeroModern.jsx` | P2 |
| `/assets/nduproj-01.avif` | image/heif | 293 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-01.jpg` | image/jpeg | 106 | 1x1 | No active role proven | `src/components/LogoShowCase.jsx` | P4 |
| `/assets/nduproj-01.webp` | image/webp | 44 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-02.avif` | image/heif | 293 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-02.jpg` | image/jpeg | 106 | 1x1 | No active role proven | `src/components/LogoShowCase.jsx` | P4 |
| `/assets/nduproj-02.webp` | image/webp | 44 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-03.avif` | image/heif | 293 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-03.jpg` | image/jpeg | 106 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-03.webp` | image/webp | 44 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-04.avif` | image/heif | 293 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-04.jpg` | image/jpeg | 106 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-04.webp` | image/webp | 44 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-05.avif` | image/heif | 293 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-05.jpg` | image/jpeg | 106 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-05.webp` | image/webp | 44 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-06.avif` | image/heif | 293 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-06.jpg` | image/jpeg | 106 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-06.webp` | image/webp | 44 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-07.avif` | image/heif | 293 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-07.jpg` | image/jpeg | 106 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-07.webp` | image/webp | 44 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-08.avif` | image/heif | 293 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-08.jpg` | image/jpeg | 106 | 1x1 | No active role proven | none | P4 |
| `/assets/nduproj-08.webp` | image/webp | 44 | 1x1 | No active role proven | none | P4 |
| `/assets/ntombis-1080.mp4` | video/h264 | 23,153,445 | 1920x1080 | No active role proven | `README.md`, `src/content.js` | P4 |
| `/assets/ntombis-thumb.avif` | image/heif | 293 | 1x1 | No active role proven | none | P4 |
| `/assets/ntombis-thumb.jpg` | image/jpeg | 106 | 1x1 | No active role proven | `scripts/transcode-videos.mjs`, `src/content.js` | P4 |
| `/assets/ntombis-thumb.webp` | image/webp | 44 | 1x1 | No active role proven | none | P4 |
| `/assets/p1-thumb.avif` | image/heif | 20,825 | 1280x662 | No active role proven | none | P4 |
| `/assets/p1-thumb.jpg` | image/png | 414,579 | 1280x662 | project thumbnail: 01 — Personal Profile Page | `src/content/projects.json`, `src/content.js` | P2 |
| `/assets/p1-thumb.webp` | image/webp | 27,304 | 1280x662 | No active role proven | none | P4 |
| `/assets/p1.mp3` | audio/mp3 | 268,704 | ? | project audio: 01 — Personal Profile Page | `src/content/projects.json`, `src/content.js` | P2 |
| `/assets/p2-thumb.avif` | image/heif | 13,233 | 1280x534 | No active role proven | none | P4 |
| `/assets/p2-thumb.jpg` | image/png | 198,846 | 1280x534 | project thumbnail: 02 — Mobile-first Layout | `src/content/projects.json`, `src/content.js` | P2 |
| `/assets/p2-thumb.webp` | image/webp | 16,538 | 1280x534 | No active role proven | none | P4 |
| `/assets/p2.mp3` | audio/mp3 | 208,512 | ? | project audio: 02 — Mobile-first Layout | `src/content/projects.json`, `src/content.js` | P2 |
| `/assets/p3-thumb.avif` | image/heif | 6,658 | 1280x658 | No active role proven | none | P4 |
| `/assets/p3-thumb.jpg` | image/png | 104,057 | 1280x658 | project thumbnail: 03 — Interactive Registration Form | `src/content/projects.json`, `src/content.js` | P2 |
| `/assets/p3-thumb.webp` | image/webp | 8,892 | 1280x658 | No active role proven | none | P4 |
| `/assets/p3.mp3` | audio/mp3 | 152,064 | ? | project audio: 03 — Interactive Registration Form | `src/content/projects.json`, `src/content.js` | P2 |
| `/assets/p4-thumb.avif` | image/heif | 16,595 | 1280x661 | No active role proven | none | P4 |
| `/assets/p4-thumb.jpg` | image/png | 261,907 | 1280x661 | project thumbnail: 04 — Web Style Guide (Sass) | `src/content/projects.json`, `src/content.js` | P2 |
| `/assets/p4-thumb.webp` | image/webp | 21,022 | 1280x661 | No active role proven | none | P4 |
| `/assets/p4.mp3` | audio/mp3 | 162,576 | ? | project audio: 04 — Web Style Guide (Sass) | `src/content/projects.json`, `src/content.js` | P2 |
| `/assets/p5-thumb.avif` | image/heif | 18,680 | 1280x662 | No active role proven | none | P4 |
| `/assets/p5-thumb.jpg` | image/png | 519,028 | 1280x662 | project thumbnail: 05 — Photo Gallery | `src/content/projects.json`, `src/content.js` | P2 |
| `/assets/p5-thumb.webp` | image/webp | 24,540 | 1280x662 | No active role proven | none | P4 |
| `/assets/p5.mp3` | audio/mp3 | 148,176 | ? | project audio: 05 — Photo Gallery | `src/content/projects.json`, `src/content.js` | P2 |
| `/assets/p6-thumb.avif` | image/heif | 2,139 | 1280x662 | No active role proven | none | P4 |
| `/assets/p6-thumb.jpg` | image/png | 43,125 | 1280x662 | project thumbnail: 06 — Game Show App | `src/content/projects.json`, `src/content.js` | P2 |
| `/assets/p6-thumb.webp` | image/webp | 4,388 | 1280x662 | No active role proven | none | P4 |
| `/assets/p6.mp3` | audio/mp3 | 331,200 | ? | project audio: 06 — Game Show App | `src/content/projects.json`, `src/content.js` | P2 |
| `/assets/p7-thumb.avif` | image/heif | 13,573 | 1280x671 | No active role proven | none | P4 |
| `/assets/p7-thumb.jpg` | image/png | 173,215 | 1280x671 | project thumbnail: 07 — Web App Dashboard | `src/content/projects.json`, `src/content.js` | P2 |
| `/assets/p7-thumb.webp` | image/webp | 18,138 | 1280x671 | No active role proven | none | P4 |
| `/assets/p7.mp3` | audio/mp3 | 115,488 | ? | project audio: 07 — Web App Dashboard | `src/content/projects.json`, `src/content.js` | P2 |
| `/assets/p8-thumb.avif` | image/heif | 11,932 | 1280x660 | No active role proven | none | P4 |
| `/assets/p8-thumb.jpg` | image/png | 158,244 | 1280x660 | project thumbnail: 08 — API Employee Directory | `src/content/projects.json`, `src/content.js` | P2 |
| `/assets/p8-thumb.webp` | image/webp | 14,766 | 1280x660 | No active role proven | none | P4 |
| `/assets/p8.mp3` | audio/mp3 | 176,544 | ? | project audio: 08 — API Employee Directory | `src/content/projects.json`, `src/content.js` | P2 |
| `/assets/QRcodeBusiness.jpg` | image/jpeg | 15,024 | 370x370 | active hero QR connect image | `src/components/Hero.jsx`, `src/features/hero/Hero.jsx`, `src/features/modern/HeroModern.jsx` | P2 |
| `/assets/techdegree.png` | image/png | 109,815 | 1196x927 | recognition card: Treehouse Techdegree – Front End Web Development | `src/content.js` | P2 |
| `/assets/treehouse-with-ndu-large.avif` | image/heif | 57,384 | 1080x1080 | No active role proven | none | P4 |
| `/assets/treehouse-with-ndu-large.jpg` | image/jpeg | 125,057 | 1080x1080 | recognition modal: Treehouse – Awarded to study Front-End Web Dev | `src/content.js` | P2 |
| `/assets/treehouse-with-ndu-large.webp` | image/webp | 69,824 | 1080x1080 | No active role proven | none | P4 |
| `/assets/treehouse-with-ndu.avif` | image/heif | 49,332 | 678x731 | No active role proven | none | P4 |
| `/assets/treehouse-with-ndu.jpg` | image/png | 636,480 | 678x731 | recognition card: Treehouse – Awarded to study Front-End Web Dev | `src/content.js` | P2 |
| `/assets/treehouse-with-ndu.jpg,` | image/jpeg | 106 | 1x1 | No active role proven | none | P4 |
| `/assets/treehouse-with-ndu.webp` | image/webp | 60,300 | 678x731 | No active role proven | none | P4 |
| `/assets/treehouse-with-ndu2.avif` | image/heif | 26,114 | 800x441 | No active role proven | none | P4 |
| `/assets/treehouse-with-ndu2.jpg` | image/png | 313,112 | 800x441 | No active role proven | none | P4 |
| `/assets/treehouse-with-ndu2.webp` | image/webp | 31,496 | 800x441 | No active role proven | none | P4 |
| `/assets/tvei-flyer-01.avif` | image/heif | 48,256 | 1080x1080 | No active role proven | none | P4 |
| `/assets/tvei-flyer-01.jpg` | image/png | 1,254,186 | 1080x1080 | design gallery: TVEI Opening Event | `src/content.js` | P2 |
| `/assets/tvei-flyer-01.webp` | image/webp | 77,368 | 1080x1080 | No active role proven | none | P4 |
| `/assets/tvei-flyer-02.avif` | image/heif | 38,222 | 1080x1080 | No active role proven | none | P4 |
| `/assets/tvei-flyer-02.jpg` | image/png | 1,014,820 | 1080x1080 | design gallery: TVEI Opening Event | `src/content.js` | P2 |
| `/assets/tvei-flyer-02.webp` | image/webp | 59,440 | 1080x1080 | No active role proven | none | P4 |
| `/assets/tvei-flyer-03.avif` | image/heif | 35,572 | 1080x1080 | No active role proven | none | P4 |
| `/assets/tvei-flyer-03.jpg` | image/png | 1,058,151 | 1080x1080 | design gallery: TVEI Opening Event | `src/content.js` | P2 |
| `/assets/tvei-flyer-03.webp` | image/webp | 59,886 | 1080x1080 | No active role proven | none | P4 |
| `/assets/tvei-flyer-04.avif` | image/heif | 35,280 | 1080x1080 | No active role proven | none | P4 |
| `/assets/tvei-flyer-04.jpg` | image/png | 1,075,047 | 1080x1080 | design gallery: TVEI Opening Event | `src/content.js` | P2 |
| `/assets/tvei-flyer-04.webp` | image/webp | 62,860 | 1080x1080 | No active role proven | none | P4 |
| `/assets/tvei-flyer-05.avif` | image/heif | 39,869 | 1080x1080 | No active role proven | none | P4 |
| `/assets/tvei-flyer-05.jpg` | image/png | 1,079,562 | 1080x1080 | design gallery: TVEI Opening Event | `src/content.js` | P2 |
| `/assets/tvei-flyer-05.webp` | image/webp | 64,198 | 1080x1080 | No active role proven | none | P4 |
| `/assets/tvei-flyer-06.avif` | image/heif | 45,699 | 1080x1080 | No active role proven | none | P4 |
| `/assets/tvei-flyer-06.jpg` | image/png | 1,099,480 | 1080x1080 | design gallery: TVEI Opening Event | `src/content.js` | P2 |
| `/assets/tvei-flyer-06.webp` | image/webp | 72,528 | 1080x1080 | No active role proven | none | P4 |
| `/assets/tvei-flyers.avif` | image/heif | 293 | 1x1 | No active role proven | none | P4 |
| `/assets/tvei-flyers.jpg` | image/jpeg | 106 | 1x1 | No active role proven | none | P4 |
| `/assets/tvei-flyers.webp` | image/webp | 44 | 1x1 | No active role proven | none | P4 |
| `/assets/tvei-opening.avif` | image/heif | 61,314 | 1080x1080 | No active role proven | none | P4 |
| `/assets/tvei-opening.jpg` | image/jpeg | 291,496 | 1080x1080 | design card: TVEI Opening Event | `src/content.js` | P2 |
| `/assets/tvei-opening.webp` | image/webp | 94,146 | 1080x1080 | No active role proven | none | P4 |
| `/assets/tvei-shot.avif` | image/heif | 39,360 | 1906x994 | No active role proven | none | P4 |
| `/assets/tvei-shot.jpg` | image/jpeg | 93,864 | 1200x626 | website thumbnail: The Village Economy Indaba | `src/content/websites.json`, `src/content.js` | P2 |
| `/assets/tvei-shot.webp` | image/webp | 58,414 | 1906x994 | No active role proven | none | P4 |
| `/assets/tvei-social.avif` | image/heif | 32,715 | 1127x597 | No active role proven | none | P4 |
| `/assets/tvei-social.jpg` | image/png | 408,487 | 1127x597 | social management thumbnail: The Village Economy Indaba | `src/content.js` | P2 |
| `/assets/tvei-social.webp` | image/webp | 43,980 | 1127x597 | No active role proven | none | P4 |
| `/assets/tvei-vine-bottle.avif` | image/heif | 64,716 | 800x1131 | No active role proven | none | P4 |
| `/assets/tvei-vine-bottle.jpg` | image/jpeg | 283,782 | 800x1131 | design card: Vine to Bottle — Masterclass Poster | `src/content.js` | P2 |
| `/assets/tvei-vine-bottle.webp` | image/webp | 92,334 | 800x1131 | No active role proven | none | P4 |
| `/assets/vlc-brand-brief.pdf` | document/pdf | 385,943 | ? | logo slide PDF: VLC Brand Brief | `src/content.js` | P1 |
| `/assets/vlc-brief-cover.avif` | image/heif | 17,392 | 1920x1080 | No active role proven | none | P4 |
| `/assets/vlc-brief-cover.jpg` | image/png | 138,602 | 1920x1080 | logo thumbnail: VLC Brand Brief | `src/content.js` | P2 |
| `/assets/vlc-brief-cover.webp` | image/webp | 34,248 | 1920x1080 | No active role proven | none | P4 |
| `/assets/vlc-shot.avif` | image/heif | 40,894 | 1901x993 | No active role proven | none | P4 |
| `/assets/vlc-shot.jpg` | image/png | 511,180 | 1901x993 | website thumbnail: VLC Construction | `src/content/websites.json`, `src/content.js` | P2 |
| `/assets/vlc-shot.webp` | image/webp | 50,430 | 1901x993 | No active role proven | none | P4 |
| `/media/learning-journey-intro.mp4` | video/h264 | 1,649,090 | 1280x720 | active learning-journey intro video | `src/features/modern/ProjectCarousel.jsx` | P2 |

## Interpretation

?Potentially unused? means only that no active baseline render/metadata use was proven. It does not authorize deletion. Dynamic references, legacy code, format migration intent, and future responsive variants remain possible; every P4 file requires explicit human approval.
