// Google Analytics 4 integration for ndu-portfolio
// Measurement ID: G-2ZPD8342CY (main site); the Upwork build uses its own (vite.config.js)

const DEBUG = import.meta.env.DEV; // Enable debug mode in development

/**
 * Initialize Google Analytics
 * This should be called once when the app loads
 */
export function initGA() {
  if (typeof window === 'undefined') return;

  // Check if gtag is already loaded
  if (window.gtag) {
    if (DEBUG) console.log('GA4 already initialized');
    return;
  }

  // Load gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + import.meta.env.VITE_GA_ID;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  // Configure GA4
  window.gtag('js', new Date());
  window.gtag('config', import.meta.env.VITE_GA_ID, {
    send_page_view: false, // We'll handle page views manually for SPA
  });

  if (DEBUG) console.log('GA4 initialized');
}

/**
 * Track a page view
 * @param {string} path - The page path (e.g., '/about', '/#about')
 * @param {string} title - Optional page title
 */
export function trackPageView(path, title) {
  if (typeof window === 'undefined' || !window.gtag) return;

  const pageLocation = window.location.origin + path;
  const pagePath = path;
  const pageTitle = title || document.title;

  window.gtag('event', 'page_view', {
    page_location: pageLocation,
    page_path: pagePath,
    page_title: pageTitle,
  });

  if (DEBUG) console.log('GA4 page_view:', { pageLocation, pagePath, pageTitle });
}

/**
 * Track a custom event
 * @param {string} eventName - The name of the event
 * @param {object} eventParams - Additional parameters for the event
 */
export function trackEvent(eventName, eventParams = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  // Add default parameters
  const params = {
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.hash,
    ...eventParams,
  };

  window.gtag('event', eventName, params);
  if (DEBUG) console.log('GA4 event:', eventName, params);
}

// ===== Specific Event Trackers =====

// Hero CTA events
export function trackGetInTouchClick() {
  trackEvent('cta_get_in_touch_click', {
    label: 'Hero Get in Touch button',
  });
}

export function trackViewWorkClick() {
  trackEvent('cta_view_work_click', {
    label: 'Hero View Work button',
  });
}

// Navigation events
export function trackNavClick(section) {
  const eventMap = {
    'about': 'nav_about_click',
    'websites': 'nav_websites_click',
    'graphics': 'nav_graphics_click',
    'social': 'nav_social_click',
    'projects': 'nav_projects_click',
    'contact': 'nav_contact_click',
  };

  const eventName = eventMap[section] || 'nav_click';
  trackEvent(eventName, {
    label: `Navigation to ${section}`,
  });
}

// Contact & Social events
export function trackWhatsAppClick() {
  trackEvent('contact_whatsapp_click', {
    label: 'WhatsApp contact',
  });
}

export function trackEmailClick() {
  trackEvent('contact_email_click', {
    label: 'Email contact',
  });
}

export function trackLinkedInClick(context = 'general') {
  trackEvent('contact_linkedin_click', {
    label: `LinkedIn - ${context}`,
  });
}

export function trackECardClick() {
  trackEvent('ecard_link_click', {
    label: 'E-card QR code',
  });
}

// Portfolio & Gallery events
export function trackWebProjectClick(projectName) {
  trackEvent('web_project_view_click', {
    label: projectName || 'Unknown project',
  });
}

export function trackGraphicsSlidesClick(itemName) {
  trackEvent('graphics_slides_view_click', {
    label: itemName || 'Unknown item',
  });
}

export function trackSocialProfileClick(platform, brand) {
  trackEvent('social_profile_click', {
    label: `${brand} - ${platform}`,
    platform: platform,
    brand: brand,
  });
}
