import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const config: NextConfig = {
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  experimental: { serverActions: { bodySizeLimit: '4mb' } },
  outputFileTracingIncludes: { '/og': ['./app/fonts/lilita-one.woff'], '/**': ['./content/**/*'] },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/(games|items|brand)/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },
  async redirects() {
    return [
      { source: '/play', destination: 'https://rivalarcade.vercel.app/?utm_source=rivalarcade_site&utm_medium=redirect&utm_campaign=play_shortlink', permanent: false },
      { source: '/press-kit', destination: '/press', permanent: true },
      { source: '/faqs', destination: '/faq', permanent: true },
      { source: '/media-inquiries', destination: '/press#media-inquiries', permanent: true },
      { source: '/social', destination: '/community#social', permanent: true },
      { source: '/referral', destination: '/invite', permanent: true },
    ];
  },
};

export default config;
