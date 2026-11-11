import { hasDb, sql } from '@/lib/server/db';
import { clientIp, sha256 } from '@/lib/server/security';
import { readJson } from '@/lib/server/http';

const TYPES = new Set(['pageview', 'cta_click', 'app_click', 'newsletter_signup', 'contact_submit', 'business_inquiry', 'creator_application', 'share', 'invite_link_created']);
const clip = (v: unknown, n: number) => (typeof v === 'string' && v ? v.slice(0, n) : null);
const BOT = /bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit|embedly/i;

/** Cookieless first-party event collector. Visitor hash = sha256(daily salt + IP + UA), rotated daily. */
export async function POST(req: Request) {
  if (!hasDb()) return new Response(null, { status: 204 });
  const ua = req.headers.get('user-agent') || '';
  if (BOT.test(ua)) return new Response(null, { status: 204 });
  const b = await readJson(req, 4096);
  if (!b || !TYPES.has(String(b.type))) return new Response(null, { status: 204 });
  if (String(b.path || '').startsWith('/admin')) return new Response(null, { status: 204 });
  const ip = await clientIp();
  const day = new Date().toISOString().slice(0, 10);
  const visitor = sha256(`${process.env.ANALYTICS_SALT || 'ra'}:${day}:${ip}:${ua}`).slice(0, 32);
  try {
    // Simple flood guard: at most 300 events per visitor per day.
    const [{ n }] = await sql()`select count(*)::int as n from events where visitor_hash = ${visitor} and created_at > now() - interval '1 day'`;
    if (n < 300) {
      await sql()`insert into events (type, path, label, referrer, utm_source, utm_medium, utm_campaign, device, visitor_hash)
        values (${String(b.type)}, ${clip(b.path, 300) || '/'}, ${clip(b.label, 120)}, ${clip(b.referrer, 200)}, ${clip(b.utm_source, 80)}, ${clip(b.utm_medium, 80)}, ${clip(b.utm_campaign, 120)}, ${['mobile', 'tablet', 'desktop'].includes(String(b.device)) ? String(b.device) : null}, ${visitor})`;
    }
  } catch (e) {
    console.error('[track]', (e as Error).message);
  }
  return new Response(null, { status: 204 });
}
