import 'server-only';
import { cache } from 'react';
import { readOr } from './db';

export const SOCIAL_KEYS = ['tiktok', 'instagram', 'youtube', 'discord', 'reddit', 'facebook', 'x'] as const;
export type SocialKey = (typeof SOCIAL_KEYS)[number];
export const SOCIAL_LABEL: Record<SocialKey, string> = { tiktok: 'TikTok', instagram: 'Instagram', youtube: 'YouTube', discord: 'Discord', reddit: 'Reddit', facebook: 'Facebook', x: 'X' };

export interface SponsorPackage { name: string; summary: string; includes: string[]; price: string }

export interface Settings {
  social: Record<SocialKey, string>;
  homepage: {
    heroKicker: string;
    heroHeadline: string;
    heroSub: string;
    featuredGames: string[];
    hiddenSections: string[];
    videoYoutubeId: string;
    videoTitle: string;
  };
  promoBanner: { enabled: boolean; title: string; text: string; ctaLabel: string; ctaUrl: string; image: string };
  seo: Record<string, { title?: string; description?: string; ogImage?: string }>;
  sponsorship: { packages: SponsorPackage[]; mediaKitNote: string };
}

/** Defaults: honest, no invented links, prices or statistics. Everything is editable in /admin. */
export const DEFAULT_SETTINGS: Settings = {
  social: { tiktok: '', instagram: '', youtube: '', discord: '', reddit: '', facebook: '', x: '' },
  homepage: {
    heroKicker: '12 free competitive skill games',
    heroHeadline: 'ENTER THE ARENA. COMPETE. WIN.',
    heroSub: 'RivalArcade is a free competitive arcade in your browser. Play 3D skill games, challenge real players to 1v1 duels on the exact same seed, climb RivalRank and collect Mythic gear for your avatar. No downloads. No pay-to-win.',
    featuredGames: ['dunk-rush', 'brick-blitz', 'canopy-swing', 'fight-night', 'neon-dash', 'gem-surge'],
    hiddenSections: [],
    videoYoutubeId: '',
    videoTitle: 'RivalArcade gameplay',
  },
  promoBanner: { enabled: false, title: '', text: '', ctaLabel: 'Play now', ctaUrl: '', image: '' },
  seo: {},
  sponsorship: {
    packages: [
      { name: 'Sponsored Cup', summary: 'Put your brand on a scheduled RivalArcade cup — a fixed seed, one run each, a ranked field.', includes: ['Cup naming and in-app cup card', 'Branded cosmetic prize design (subject to review)', 'Announcement on the RivalArcade news page and newsletter', 'Post-event summary of entries and results'], price: 'Custom quote' },
      { name: 'Creator Showdown', summary: 'A creator-hosted competition built around your campaign, with tracked links and promo codes.', includes: ['Co-branded landing page with tracked links', 'Creator-hosted 1v1 or cup format', 'Campaign tracking report (visits and app clicks)', 'Optional custom cosmetic concept'], price: 'Custom quote' },
      { name: 'Brand Partnership', summary: 'Longer-term placements across RivalArcade’s site, newsletter and social channels.', includes: ['Homepage promotional banner slot', 'Newsletter feature', 'Social content collaboration', 'Quarterly performance review'], price: 'Custom quote' },
    ],
    mediaKitNote: 'Audience and performance figures are shared directly with qualified partners on request and are always taken from live analytics — never estimates.',
  },
};

function merge<T>(base: T, over: unknown): T {
  if (!over || typeof over !== 'object' || Array.isArray(base)) return (over as T) ?? base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(over as Record<string, unknown>)) {
    const b = (base as Record<string, unknown>)[k];
    out[k] = b && typeof b === 'object' && !Array.isArray(b) ? merge(b, v) : v;
  }
  return out as T;
}

export const getSettings = cache(async (): Promise<Settings> =>
  readOr(DEFAULT_SETTINGS, async (db) => {
    const rows = await db<{ key: string; value: unknown }[]>`select key, value from settings`;
    let s = DEFAULT_SETTINGS;
    for (const r of rows) if (r.key in s) s = { ...s, [r.key]: merge((s as never)[r.key], r.value) };
    return s;
  }),
);
