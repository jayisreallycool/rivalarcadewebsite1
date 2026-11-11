import { revalidatePath } from 'next/cache';
import { hasDb, sql } from '@/lib/server/db';
import { safeEqual } from '@/lib/server/security';

/**
 * Daily cron (vercel.json). Refreshes listings so scheduled posts and landing pages go live, and
 * applies the retention rules in the privacy policy.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get('authorization') || '';
  if (!secret || !safeEqual(auth, `Bearer ${secret}`)) return new Response('Unauthorized', { status: 401 });
  for (const p of ['/', '/blog', '/news', '/sitemap.xml', '/feed.xml']) revalidatePath(p);
  revalidatePath('/blog/[slug]', 'page');
  revalidatePath('/promo/[slug]', 'page');
  if (hasDb()) {
    const db = sql();
    await db`delete from subscribers where status = 'pending' and created_at < now() - interval '30 days'`;
    await db`delete from events where created_at < now() - interval '25 months'`;
    await db`delete from rate_limits where window_start < now() - interval '2 days'`;
    await db`delete from admin_sessions where expires_at < now()`;
  }
  return Response.json({ ok: true });
}
