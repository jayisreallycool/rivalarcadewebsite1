'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; raTrack?: (type: string, label?: string) => void }
}

const ATTR_KEY = 'ra_attr';
type Attr = { utm_source?: string; utm_medium?: string; utm_campaign?: string; ref?: string };

function readAttr(): Attr {
  try { return JSON.parse(sessionStorage.getItem(ATTR_KEY) || '{}'); } catch { return {}; }
}
const device = () => (matchMedia('(max-width: 767px)').matches ? 'mobile' : matchMedia('(max-width: 1023px)').matches ? 'tablet' : 'desktop');

function send(type: string, extra: Record<string, string | undefined> = {}) {
  const a = readAttr();
  const body = JSON.stringify({ type, path: location.pathname, device: device(), utm_source: a.utm_source, utm_medium: a.utm_medium, utm_campaign: a.utm_campaign, ...extra });
  try {
    if (!navigator.sendBeacon?.('/api/track', new Blob([body], { type: 'application/json' }))) fetch('/api/track', { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } });
  } catch {}
}

/**
 * First-party, cookieless measurement + GA4 events:
 *  - keeps the visitor's incoming UTM/ref for the session so app links credit the real channel
 *  - counts page views, CTA clicks and outbound clicks to the game
 *  - rewrites game links at click time with the session's attribution (utm_content stays the placement)
 */
export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const incoming: Attr = {};
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'ref'] as const) { const v = q.get(k); if (v) incoming[k] = v.slice(0, 80); }
    if (Object.keys(incoming).length) sessionStorage.setItem(ATTR_KEY, JSON.stringify({ ...readAttr(), ...incoming }));
    const first = !sessionStorage.getItem('ra_seen');
    sessionStorage.setItem('ra_seen', '1');
    let referrer: string | undefined;
    try { if (first && document.referrer && new URL(document.referrer).host !== location.host) referrer = new URL(document.referrer).host; } catch {}
    send('pageview', { referrer });
  }, [pathname]);

  useEffect(() => {
    window.raTrack = (type, label) => { send(type, { label }); window.gtag?.('event', type, { label }); };
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('a[href], [data-track]');
      if (!el) return;
      const a = el as HTMLAnchorElement;
      if (a.href && a.href.includes('rivalarcade.vercel.app')) {
        const placement = el.dataset.appLink || 'link';
        const attr = readAttr();
        try {
          const u = new URL(a.href);
          if (attr.utm_source) { u.searchParams.set('utm_source', attr.utm_source); u.searchParams.set('utm_medium', attr.utm_medium || 'referral'); if (attr.utm_campaign) u.searchParams.set('utm_campaign', attr.utm_campaign); }
          if (attr.ref && !u.searchParams.get('ref')) u.searchParams.set('ref', attr.ref);
          u.searchParams.set('utm_content', placement);
          a.href = u.toString();
        } catch {}
        send('app_click', { label: placement });
        window.gtag?.('event', 'app_outbound_click', { placement, link_url: a.href });
        return;
      }
      if (el.dataset.track) {
        send('cta_click', { label: el.dataset.track });
        window.gtag?.('event', 'cta_click', { label: el.dataset.track });
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
