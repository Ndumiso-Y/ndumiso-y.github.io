// src/content.js
export const content = {
  // ===== THEME =====
  brandColor: "#48aab7",
  // (optional) fine-tune global colors; safe to remove if not used
  palette: {
    // ink:   "#0f172a",
    // paper: "#ffffff",
    // canvas:"#f8fafc",
  },
  // short blurbs shown under section headings
  sectionIntros: {
    websites:
      "A selection of client and personal builds focused on clarity, speed, and conversion. Each site is built for accessibility and performance with simple, goal-driven UX.",
    graphics:
      "Logo and brand work designed to scale cleanly across digital and print. Clear geometry, readable typography, and flexible color systems.",
    social:
      "End-to-end social management—planning, design, copywriting, scheduling, and reporting—tailored to brand voice and audience growth.",
    projects:
      "Eight Treehouse projects demonstrating front-end fundamentals: responsive layouts, forms, Sass, galleries, games, dashboards, APIs, and modals.",
    upcoming:
      "Current projects in development—new client websites, branding work, and family business launches. Watch progress unfold with live previews.",
    badges:
      "Recognitions and programs I'm part of. They reflect craft, delivery, and continuous learning across design and engineering."
  },

  // --- Hero ---
  hero: {
    name: "Ndumiso Yedwa",
    role: "Web Designer & Front-End Developer",
    tagline:
      "Founder of Embark Digitals — building fast, modern websites, branding, and digital assets.",
    portrait: "/assets/ndu-portrait.jpg",
  },

  // --- About ---
  about: {
    name: "Ndumiso Yedwa",
    title: "Web Designer & Front-End Developer",
    bio:
      "Founder of Embark Digitals. I design and build fast, modern websites and brand assets for SMEs—combining clean UI, conversion-focused messaging, and reliable delivery.",
    headshot: "/assets/ndu-headshot.jpg",
    stats: { years: 3, activeClients: 4 },
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Tailwind",
      "Canva",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe InDesign",
      "Claude Code",
      "Lovable",
    ],
  },

  // --- Website Design ---
  websites: [
    {
      name: "Being Dr Benzi",
      brief:
        "Personal brand site for Dr. Benzi — clear messaging, modern UI, and fast performance.",
      thumb: "/assets/benzi-shot.jpg",
      url: "https://www.drbmfnkabinde.com/",
      repo: "",
    },
    {
      name: "Being VLC Construction",
      brief:
        "Corporate website for a construction firm — services, portfolio, and contact funnels.",
      thumb: "/assets/vlc-shot.jpg",
      url: "https://ndumiso-y.github.io/vlc-website/",
      repo: "",
    },
    {
      name: "The Village Economy Indaba",
      brief:
        "Program hub for TVEI — highlights, sectors, gallery, and donation call-to-action.",
      thumb: "/assets/tvei-shot.jpg",
      url: "https://ndumisoyedwa.wixstudio.com/my-site-14",
      repo: "",
    },
    {
      name: "Embark Digitals",
      brief:
        "Agency site for Embark Digitals — services, case studies, and contact.",
      thumb: "/assets/embark-shot.jpg",
      url: "https://www.embarkdigitals.com",
      repo: "",
    },
  ],

  // --- Logo Designs (3 cards) ---
  logos: [
    {
      name: "Filament Logo",
      client: "Filament",
      year: "2025",
      cover: "/assets/filament-ppt-thumb.jpg",
      note: "Clean, modern wordmark focusing on clarity and scalability.",
      download: "/assets/filament-ppt.pdf",
    },
    {
      name: "Liaisons Logo",
      client: "Liaisons",
      year: "2025",
      cover: "/assets/liaisons-ppt-thumb.jpg",
      note: "Refined mark emphasizing connection and trust.",
      download: "/assets/liaisons-ppt.pdf",
    },
    {
      name: "VLC Brand Brief",
      client: "VLC Construction",
      year: "2025",
      cover: "/assets/vlc-brief-cover.jpg", // ensure this exists
      note: "Brand brief with logo usage, color, and type.",
      download: "/assets/vlc-brief.pdf",    // ensure this exists
    },
  ],

  // --- Projects (Treehouse 8) ---
  projects: [
    {
      name: "01 — Personal Profile Page",
      thumb: "/assets/p1-thumb.jpg",
      url: "https://ndumiso-y.github.io/Project-1--Personal-Profile-Page/",
      audio: "/assets/p1.mp3",
      audioDesc: "What this project is about",
      desc:
`For my first project, I practiced web design skills by customizing a web page to create my personal profile. I modified the code for a basic web page by adding graphics, custom text, and a stylish design. This was a great way for me to practice HTML and CSS skills. It also gave me a web page I could use as a personal online calling card to advertise my experience, skills, and goals, and to provide links to my social media accounts on Twitter, LinkedIn, and GitHub.

I also practiced using GitHub, an important tool used by millions of developers to share code and work collaboratively on programming projects. Creating and using a GitHub account was a great way for me to share my work with potential employers.`,
    },
    {
      name: "02 — Mobile-first Layout",
      thumb: "/assets/p2-thumb.jpg",
      url: "https://ndumiso-y.github.io/Project2--MobileFirstResponsiveLayout/",
      audio: "/assets/p2.mp3",
      audioDesc: "Mobile-first responsive layout",
      // exact preview ends after “…large screen sizes.”
      preview:
"In this project, I built a responsive, mobile-first layout using HTML and CSS. The layout demonstrates my understanding of responsive design by adjusting to accommodate small, medium, and large screen sizes.",
      desc:
`In this project, I built a responsive, mobile-first layout using HTML and CSS. The layout demonstrates my understanding of responsive design by adjusting to accommodate small, medium, and large screen sizes.

I wrote CSS to style the page for a small mobile device first. Then, using min-width media queries, I added breakpoints to adjust the layout for wider tablet and desktop screens.

To complete each part of this project, I used ONLY the concepts and techniques listed in the project instructions and what we covered in the courses so far.`,
    },
    {
      name: "03 — Interactive Registration Form",
      thumb: "/assets/p3-thumb.jpg",
      url: "https://ndumiso-y.github.io/Project-3/",
      audio: "/assets/p3.mp3",
      audioDesc: "Responsive form & inputs",
      desc:
`In this project, I built a responsive, mobile-friendly registration form using a wide variety of HTML form input types and attributes. Using the supplied mockup files, I created mobile and desktop versions of the form using media queries and a "mobile-first" approach.

To complete each part of this project, I used ONLY the concepts and techniques listed in the project instructions and what we covered in the courses so far.`,
    },
    {
      name: "04 — Web Style Guide (Sass)",
      thumb: "/assets/p4-thumb.jpg",
      url: "https://ndumiso-y.github.io/Project4---Web/",
      audio: "/assets/p4.mp3",
      audioDesc: "Sass variables & partials",
      desc:
`In this project, I worked with provided index.html and styles.css files. I converted the CSS into Sass by splitting the code into several Sass partial files. I also identified repeated values (length units, colors, etc.) throughout the CSS and stored them in Sass variables. After completing the project, I created a useful Sass micro-framework to quickly prototype other websites.`,
    },
    {
      name: "05 — Photo Gallery",
      thumb: "/assets/p5-thumb.jpg",
      url: "https://ndumiso-y.github.io/Project5--photogallery/",
      audio: "/assets/p5.mp3",
      audioDesc: "JS lightbox & search",
      desc:
`In this project, I created an interactive photo gallery using JavaScript and CSS Grid Layout. I used provided thumbnails and photos with descriptions. At the top of the page, I included a search area where photos hide and show based on my input. When I clicked on a thumbnail, the photo displayed in a lightbox. I also added "back" and "previous" arrows to cycle through photos.`,
    },
    {
      name: "06 — Game Show App",
      thumb: "/assets/p6-thumb.jpg",
      url: "https://ndumiso-y.github.io/Project6--GameShowApp/",
      audio: "/assets/p6.mp3",
      audioDesc: "Word guessing game",
      // Preview ends EXACTLY after “random phrase.”
      preview:
"In this project, I created a browser version of “Wheel of Success,” a word-guessing game where I clicked letters from an onscreen keyboard to try to guess a random phrase.",
      desc:
`In this project, I created a browser version of “Wheel of Success,” a word-guessing game where I clicked letters from an onscreen keyboard to try to guess a random phrase.

Using JavaScript, I created an array of phrases and wrote functions to choose a random phrase from that array, split the phrase into letters, and put those letters onto the game board.

Each time I guessed a letter, I compared the letter I chose with the random phrase. If the letter was in the phrase, I updated the game board with the chosen letters.

I could keep choosing letters until I made five incorrect guesses. If I completed the phrase before running out of guesses, a winning screen displayed. If I guessed incorrectly five times, a losing screen displayed.

I could guess a letter only once. After I guessed a letter, my programming disabled that letter.`,
    },
    {
      name: "07 — Web App Dashboard",
      thumb: "/assets/p7-thumb.jpg",
      url: "https://ndumiso-y.github.io/Project7--WebAppDashBoard/", // update if different
      audio: "/assets/p7.mp3",
      audioDesc: "Charts & forms",
      desc:
`In this project, I took a mockup and a few icons and built a beautiful web dashboard complete with JavaScript-driven charts and graphs. I focused on creating the HTML, CSS, and JavaScript functionality for this single page, without needing to create other pages or build any backend or database functionality.`,
    },
    {
      name: "08 — API Employee Directory",
      thumb: "/assets/p8-thumb.jpg",
      url: "https://ndumiso-y.github.io/Project-8--API--Employee---Directory/",
      audio: "/assets/p8.mp3",
      audioDesc: "Fetch API & modals",
      desc:
`In this project, I used the Random User Generator API to grab information for 12 random “employees” and built a prototype for an Awesome Startup employee directory. I requested a JSON object from the API using fetch and parsed the data to list 12 employees in a grid, displaying their thumbnail image, full name, email, and location. When I clicked an employee’s card, a modal window opened with more detailed information, such as the employee’s birthday and address.`,
    },
  ],

  // --- TVEI Showcase (Design Work items) ---
  tvei: {
    items: [
      {
        src: "/assets/tvei-opening.jpg",
        title: "TVEI Opening Event",
        copy:
          "Creative direction and visual rollout for the opening event assets.",
        gallery: [
          "/assets/tvei-flyer-01.jpg",
          "/assets/tvei-flyer-02.jpg",
          "/assets/tvei-flyer-03.jpg",
          "/assets/tvei-flyer-04.jpg",
          "/assets/tvei-flyer-05.jpg",
          "/assets/tvei-flyer-06.jpg",
        ],
        galleryTitle: "TVEI / Launch Flyers",
      },
      {
        src: "/assets/tvei-vine-bottle.jpg",
        title: "Vine to Bottle — Masterclass Poster",
        copy:
          'Designed poster for "Vine to Bottle" wine masterclass, promoting wine education and entrepreneurship.',
      },
      {
        src: "/assets/hakem-banner.jpg",
        title: "Banner & Executive Banner — Hakem",
        copy:
          "Designed a wall banner for Hakem Energies and an executive banner for formal engagements.",
      },
      {
        src: "/assets/hakem-bike.jpg",
        title: "Bicycle Design — Hakem Energies",
        copy:
          "Applied brand assets across a bicycle concept for high-visibility outdoor presence.",
      },
    ],
  },

  // --- Social Media ---
  socialThumbs: {
    tvei: "/assets/tvei-social.jpg",
    easy: "/assets/easy-docs-social.jpg",
  },
  social: [
    {
      brand: "The Village Economy Indaba",
      desc:
        "Embark Digitals manages The Village Economy Indaba’s Facebook and LinkedIn presence — creating event-driven content and growing a community around entrepreneurship.",
      platforms: ["Facebook", "LinkedIn"],
      links: [
        {
          type: "facebook",
          url: "https://www.facebook.com/villageeconomyindaba",
        },
        {
          type: "linkedin",
          url: "https://www.linkedin.com/company/thevillageeconomyindaba/",
        },
      ],
      thumb: "/assets/tvei-social.jpg"
    },
    {
      brand: "Easy Documents",
      desc:
        "For Easy Documents we manage Facebook and Instagram — concise, trust-building posts and quick updates that drive enquiries for document services.",
      platforms: ["Facebook", "Instagram"],
      links: [
        {
          type: "facebook",
          url: "https://www.facebook.com/profile.php?id=61578253415232",
        },
        { type: "instagram", url: "https://www.instagram.com/your-easy-docs-handle" },
      ],
      thumb: "/assets/easy-docs-social.jpg"
    },
  ],

  // --- Upcoming Projects (incl. Ntombi Fashions video) ---
  upcoming: [
    {
      name: "Makweleng Butchery",
      note: "New client (#5). Full website build underway.",
      details:
        "Makweleng Butchery is joining our roster as client #5. I'm building a clean, informative site that highlights product quality, weekly specials, and conversions.",
      tags: ["New Client", "Website Build"],
      video: {
        poster: "/assets/graphic-1.jpg", // Placeholder until real poster
      },
    },
    {
      name: "Funeka Placements",
      note: "Website + Social Media Management",
      details:
        "End-to-end digital setup for a recruitment brand — website build for trust and clarity, plus ongoing social media management to drive awareness and leads.",
      tags: ["Website", "Social Management"],
      video: {
        poster: "/assets/graphic-2.jpg", // Placeholder until real poster
      },
    },
    {
      name: "Ntombi Fashions",
      note: "Family business — Logo, Social, E-commerce + promo video",
      details:
        "Ntombi Fashions is a Yedwa family business. I'm grateful to use my digital marketing skills to craft their logo, run their social channels, and launch their e-commerce store.",
      tags: ["Family Business", "Logo", "Social", "E-commerce", "Video"],
      video: {
        poster: "/assets/ntombis-thumb.jpg",
        mp4: "/assets/ntombis-1080.mp4",
        webm: "/assets/ntombis-1080.webm",
      },
    },
  ],

  // --- Badges & Recognition ---
  badges: [
    {
      key: "black-umbrellas",
      name: "Black Umbrellas",
      url: "https://blackumbrellas.org/",
      img: "/assets/black-umbrellas.jpg",                 // card thumbnail
      snippet: "Accepted into the Black Umbrellas Enterprise Supplier Development Programme.",
      snippetImg: "/assets/bu-letter-snippet.jpg",        // cropped screenshot ONLY
      note: "Acceptance — ESD Programme",
    },
    {
      key: "treehouse",
      name: "Treehouse – Awarded to study Front-End Web Dev",
      post: "https://www.linkedin.com/posts/treehouse-island-inc-_treehouse-is-delighted-to-showcase-the-seven-activity-7224036065089568769-WYI9?utm_source=share&utm_medium=member_desktop&rcm=ACoAAA8QhccB0R82FWW4D7H_Xjk0eGCD2T6BvcM",
      img: "/assets/treehouse-with-ndu.jpg",              // grid thumbnail
      modalImg: "/assets/treehouse-with-ndu-large.jpg",   // higher-res for zoom
      zoom: true,
      note: "Next: UI/UX → Full-Stack",
      aspect: "4/3"
    }
  ],

  // --- Contact ---
  contact: {
    name: "Ndumiso Yedwa",
    email: "contact@embarkdigitals.com",
    phone: "+27 00 000 0000",
    whatsapp: "https://wa.me/27XXXXXXXXX",
    linkedin: "https://www.linkedin.com/in/your-handle",
    location: "Johannesburg, South Africa",
    icon: "/assets/ndu-icon.png",                 // navbar/footer logo
    ecard: "https://www.embarkdigitals.com/ecard" // e-card button
  },
};
