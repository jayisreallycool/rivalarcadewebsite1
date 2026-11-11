import 'server-only';
import { cache } from 'react';
import { readOr } from './db';

export interface Announcement { id: number; message: string; linkUrl: string | null; linkLabel: string | null; tone: 'gold' | 'electric' | 'neutral' }
export const activeAnnouncements = cache(async (): Promise<Announcement[]> =>
  readOr([], async (db) => {
    const rows = await db`select id, message, link_url, link_label, tone from announcements
      where active and (starts_at is null or starts_at <= now()) and (ends_at is null or ends_at > now()) order by created_at desc limit 3`;
    return rows.map((r) => ({ id: r.id, message: r.message, linkUrl: r.link_url, linkLabel: r.link_label, tone: r.tone }));
  }),
);

export interface LandingPage { slug: string; title: string; headline: string; subheadline: string; body: string; ctaLabel: string; utmCampaign: string; heroImage: string | null; seoTitle: string | null; seoDescription: string | null; updatedAt: string }
const lp = (r: Record<string, any>): LandingPage => ({ slug: r.slug, title: r.title, headline: r.headline, subheadline: r.subheadline, body: r.body, ctaLabel: r.cta_label, utmCampaign: r.utm_campaign, heroImage: r.hero_image, seoTitle: r.seo_title, seoDescription: r.seo_description, updatedAt: (r.updated_at as Date).toISOString() });
export const liveLandingPages = cache(async (): Promise<LandingPage[]> =>
  readOr([], async (db) => (await db`select * from landing_pages where status = 'published' and (publish_at is null or publish_at <= now()) order by updated_at desc`).map(lp)),
);
export async function getLandingPage(slug: string) {
  return (await liveLandingPages()).find((p) => p.slug === slug) ?? null;
}

export interface Issue { slug: string; subject: string; preview: string; body: string; sentAt: string }
export const newsletterArchive = cache(async (): Promise<Issue[]> =>
  readOr([], async (db) =>
    (await db`select slug, subject, preview, body, sent_at from newsletters where status = 'sent' and public order by sent_at desc`).map((r) => ({ slug: r.slug, subject: r.subject, preview: r.preview, body: r.body, sentAt: (r.sent_at as Date).toISOString() })),
  ),
);
