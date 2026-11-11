import type { Metadata } from 'next';
import { APP_URL, SITE_NAME, SITE_URL, absolute } from './site';

export const ogImage = (title: string, kicker = '') => `/og?title=${encodeURIComponent(title)}${kicker ? `&kicker=${encodeURIComponent(kicker)}` : ''}`;

interface MetaInput { title: string; description: string; path: string; kicker?: string; image?: string; type?: 'website' | 'article'; publishedTime?: string; modifiedTime?: string; tags?: string[]; noindex?: boolean; absoluteTitle?: boolean }

/** Canonical URL, Open Graph and Twitter tags for a page. Admin SEO overrides are applied by `withOverrides`. */
export function meta(m: MetaInput): Metadata {
  const image = m.image ? absolute(m.image) : absolute(ogImage(m.title, m.kicker));
  return {
    title: m.absoluteTitle ? { absolute: m.title } : m.title,
    description: m.description,
    alternates: { canonical: m.path, types: { 'application/rss+xml': `${SITE_URL}/feed.xml` } },
    robots: m.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: m.title,
      description: m.description,
      url: absolute(m.path),
      siteName: SITE_NAME,
      type: m.type || 'website',
      images: [{ url: image, width: 1200, height: 630, alt: m.title }],
      ...(m.type === 'article' ? { publishedTime: m.publishedTime, modifiedTime: m.modifiedTime, tags: m.tags } : {}),
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: [image] },
  };
}

export async function metaFor(m: MetaInput): Promise<Metadata> {
  const { getSettings } = await import('./server/settings');
  const o = (await getSettings()).seo[m.path];
  return meta({ ...m, title: o?.title || m.title, description: o?.description || m.description, image: o?.ogImage || m.image });
}

/* ---------------------------------------------------------------- structured data */
export const orgLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: absolute('/brand/icon-512.png'),
});

export const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/blog/search?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
});

export const appLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: SITE_NAME,
  url: APP_URL,
  description: 'Free competitive 3D skill games in the browser: 1v1 duels on identical seeds, live arenas, scheduled cups, the RivalRank ladder and collectible cosmetics. No pay-to-win.',
  genre: ['Arcade', 'Competitive', 'Casual'],
  gamePlatform: ['Web browser', 'iOS Safari', 'Android Chrome'],
  applicationCategory: 'GameApplication',
  operatingSystem: 'Any (web browser)',
  playMode: ['SinglePlayer', 'MultiPlayer'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  image: absolute('/brand/icon-512.png'),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absolute(it.path) })),
});

export const faqLd = (faq: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const articleLd = (p: { title: string; excerpt: string; slug: string; publishAt: string; updatedAt: string; coverImage: string | null; author: string; kind: string }) => ({
  '@context': 'https://schema.org',
  '@type': p.kind === 'news' ? 'NewsArticle' : 'BlogPosting',
  headline: p.title,
  description: p.excerpt,
  datePublished: p.publishAt,
  dateModified: p.updatedAt,
  image: [absolute(p.coverImage || ogImage(p.title))],
  author: { '@type': 'Organization', name: p.author },
  publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: absolute('/brand/icon-512.png') } },
  mainEntityOfPage: absolute(`/blog/${p.slug}`),
});
