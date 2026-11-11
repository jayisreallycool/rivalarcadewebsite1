import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  const production = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : true;
  return {
    rules: production ? [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/blog/search', '/newsletter/confirm', '/newsletter/unsubscribe'] }] : [{ userAgent: '*', disallow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
