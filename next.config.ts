import type { NextConfig } from "next";

// ── Security headers applied to every response ────────────────────────────
// See: https://owasp.org/www-project-secure-headers/
const securityHeaders = [
  // Prevent browsers from MIME-sniffing a response away from its declared content-type
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  // Prevent clickjacking — this page must not be embedded in an <iframe>
  { key: 'X-Frame-Options', value: 'DENY' },

  // Stop legacy IE from rendering the page in Compatibility View
  { key: 'X-UA-Compatible', value: 'IE=edge' },

  // Restrict how much referrer info is sent to third parties
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

  // Limit which browser features this page can use
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',       // no camera access
      'microphone=(self)', // microphone only for own origin (audio recording feature)
      'geolocation=()',  // no geolocation
      'interest-cohort=()', // opt out of FLoC/Topics
      'payment=()',
    ].join(', '),
  },

  // Force HTTPS for 2 years once first visited (only meaningful on HTTPS deployments)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },

  // Content-Security-Policy
  // Notes:
  //   • 'unsafe-inline' on script-src is required by Next.js (inline hydration scripts)
  //     and the theme-flash prevention script in layout.tsx.
  //   • 'unsafe-eval' is required by Next.js dev mode only; prod builds don't need it
  //     but keeping it here avoids a broken dev experience.
  //   • frame-ancestors 'none' duplicates X-Frame-Options for modern browsers.
  //   • connect-src includes Supabase domains for auth + storage + DB.
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // GTM + GA4 + Meta Pixel script sources
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://ssl.google-analytics.com https://connect.facebook.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      // Supabase project URL for storage, auth and realtime + GA4 + Meta Pixel
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.facebook.com https://connect.facebook.net",
      // Images: own domain + Supabase storage + data URIs + blob (canvas) + GA4 + Meta Pixel
      "img-src 'self' data: blob: https://*.supabase.co https://lh3.googleusercontent.com https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com",
      // GTM noscript iframe
      "frame-src https://www.googletagmanager.com",
      // Audio/video from own server + Supabase storage + blob (MediaRecorder)
      "media-src 'self' blob: https://*.supabase.co",
      // Worker scripts (Next.js service worker / audio worklets)
      "worker-src 'self' blob:",
      // No <object> or <embed>
      "object-src 'none'",
      // Forms only submit to own origin
      "form-action 'self'",
      // Prevent this page from being framed (clickjacking)
      "frame-ancestors 'none'",
      // Upgrade any accidental http:// requests to https://
      "upgrade-insecure-requests",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  // Remove the X-Powered-By: Next.js response header (minor security improvement)
  poweredByHeader: false,

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
