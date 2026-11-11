import { hasDb } from '@/lib/server/db';
import { json, readJson } from '@/lib/server/http';
import { subscribe } from '@/lib/server/newsletter';
import { notifyTeam } from '@/lib/server/email';
import { clientIp, email as vEmail, rateLimit, spamCheck } from '@/lib/server/security';

export async function POST(req: Request) {
  const b = await readJson(req);
  if (!b) return json({ ok: false, message: 'Invalid request.' }, 400);
  const spam = await spamCheck(b);
  if (spam) return json({ ok: false, message: spam }, 400);
  const e = vEmail(b.email);
  if (e.error) return json({ ok: false, message: 'Please enter a valid email address.' }, 400);
  if (b.consent !== true) return json({ ok: false, message: 'Please tick the box to agree to receive emails.' }, 400);
  const ip = await clientIp();
  if (!(await rateLimit('nl-ip', ip, 5, 3600)) || !(await rateLimit('nl-email', e.value!, 3, 86400))) return json({ ok: false, message: 'Too many attempts — please try again later.' }, 429);
  if (!hasDb()) return json({ ok: false, message: 'Newsletter sign-up opens soon. Please check back shortly.' }, 503);
  const ref = req.headers.get('referer');
  const utm: Record<string, string> = {};
  try { if (ref) new URL(ref).searchParams.forEach((v, k) => { if (k.startsWith('utm_')) utm[k] = v.slice(0, 80); }); } catch {}
  const r = await subscribe(e.value!, { source: String(b.source || 'site').slice(0, 40), ip, utm });
  if (!r.already) await notifyTeam('New newsletter sign-up (pending confirmation)', [`Source: ${String(b.source || 'site').slice(0, 40)}`]).catch(() => {});
  return json({ ok: true, message: r.already ? 'You’re already subscribed — thanks!' : 'Almost there — check your inbox and tap the link to confirm.' });
}
