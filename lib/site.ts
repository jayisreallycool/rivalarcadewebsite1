/** Marketing site address (set NEXT_PUBLIC_SITE_URL once a custom domain is live). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL : 'http://localhost:3000')).replace(/\/$/, '');
/** The game itself. Every Play CTA opens this. */
export const APP_URL = 'https://rivalarcade.vercel.app';
export const SITE_NAME = 'RivalArcade';
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || '';

/**
 * Build an app link carrying UTM parameters so GA4 (and the app's own analytics) can tell
 * which placement and channel produced the visit. `placement` becomes utm_content.
 */
export function appLink(placement: string, opts: { campaign?: string; medium?: string; source?: string; ref?: string } = {}) {
  const u = new URL(APP_URL + '/');
  u.searchParams.set('utm_source', opts.source || 'rivalarcade_site');
  u.searchParams.set('utm_medium', opts.medium || 'cta');
  u.searchParams.set('utm_campaign', opts.campaign || 'site_evergreen');
  u.searchParams.set('utm_content', placement);
  if (opts.ref) u.searchParams.set('ref', opts.ref);
  return u.toString();
}

export const absolute = (path: string) => (path.startsWith('http') ? path : SITE_URL + (path.startsWith('/') ? path : '/' + path));
