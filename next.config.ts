import type { NextConfig } from "next";

const securityHeaders = [
  // Enables DNS prefetching to improve performance
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  // Enforce HTTPS for 2 years, including subdomains
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // Prevent the page from being embedded in iframes on other origins
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Send origin only on same-origin requests; send no referrer on downgrade
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  // Disable access to sensitive browser features
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
