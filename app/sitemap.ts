import type { MetadataRoute } from 'next';
import { GAMES } from '@/lib/content';
import { SEO_PAGES } from '@/lib/seo-pages';
import { liveLandingPages } from '@/lib/server/data';
import { categorySlug, listPosts, tagSlug } from '@/lib/server/posts';
import { absolute } from '@/lib/site';

export const revalidate = 3600;

const STATIC: [string, number, MetadataRoute.Sitemap[number]['changeFrequency']][] = [
  ['/', 1, 'daily'], ['/games', 0.9, 'weekly'], ['/how-it-works', 0.8, 'monthly'], ['/competitions', 0.8, 'monthly'], ['/tournaments', 0.8, 'weekly'],
  ['/rival-coins', 0.7, 'monthly'], ['/rewards', 0.7, 'weekly'], ['/progression', 0.7, 'monthly'], ['/community', 0.6, 'weekly'], ['/news', 0.8, 'daily'], ['/blog', 0.8, 'daily'],
  ['/faq', 0.6, 'monthly'], ['/about', 0.5, 'monthly'], ['/contact', 0.4, 'yearly'], ['/advertise', 0.5, 'monthly'], ['/sponsorships', 0.5, 'monthly'], ['/partnerships', 0.4, 'monthly'],
  ['/creators', 0.6, 'monthly'], ['/press', 0.5, 'monthly'], ['/invite', 0.6, 'monthly'], ['/newsletter', 0.5, 'monthly'], ['/newsletter/archive', 0.4, 'weekly'], ['/privacy', 0.2, 'yearly'], ['/terms', 0.2, 'yearly'],
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, promos] = await Promise.all([listPosts(), liveLandingPages()]);
  const latest = posts[0]?.updatedAt ? new Date(posts[0].updatedAt) : new Date();
  const tagCounts = new Map<string, number>();
  posts.forEach((p) => p.tags.forEach((t) => tagCounts.set(tagSlug(t), (tagCounts.get(tagSlug(t)) || 0) + 1)));
  return [
    ...STATIC.map(([path, priority, changeFrequency]) => ({ url: absolute(path), priority, changeFrequency, lastModified: ['/', '/news', '/blog'].includes(path) ? latest : undefined })),
    ...GAMES.map((g) => ({ url: absolute(`/games/${g.id}`), priority: 0.8, changeFrequency: 'monthly' as const, images: [absolute(`/games/${g.id}.webp`)] })),
    ...SEO_PAGES.map((p) => ({ url: absolute(`/${p.slug}`), priority: 0.7, changeFrequency: 'monthly' as const })),
    ...posts.map((p) => ({ url: absolute(`/blog/${p.slug}`), lastModified: new Date(p.updatedAt), priority: 0.7, changeFrequency: 'monthly' as const, images: p.coverImage ? [absolute(p.coverImage)] : undefined })),
    ...[...new Set(posts.map((p) => categorySlug(p.category)))].map((c) => ({ url: absolute(`/blog/category/${c}`), priority: 0.4, changeFrequency: 'weekly' as const })),
    ...[...tagCounts.entries()].filter(([, n]) => n >= 2).map(([t]) => ({ url: absolute(`/blog/tag/${t}`), priority: 0.3, changeFrequency: 'weekly' as const })),
    ...promos.map((p) => ({ url: absolute(`/promo/${p.slug}`), lastModified: new Date(p.updatedAt), priority: 0.6, changeFrequency: 'weekly' as const })),
  ];
}
