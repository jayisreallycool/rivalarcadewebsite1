import { hasDb, sql } from '@/lib/server/db';
import { json, readJson } from '@/lib/server/http';
import { notifyTeam } from '@/lib/server/email';
import { clientIp, email as vEmail, rateLimit, spamCheck, str } from '@/lib/server/security';

const KINDS = ['general', 'support', 'advertising', 'sponsorship', 'partnership', 'media'] as const;

export async function POST(req: Request) {
  const b = await readJson(req);
  if (!b) return json({ ok: false, message: 'Invalid request.' }, 400);
  const spam = await spamCheck(b);
  if (spam) return json({ ok: false, message: spam }, 400);
  const kind = KINDS.includes(b.kind as never) ? (b.kind as (typeof KINDS)[number]) : 'general';
  const f = { name: str(b.name, 100), email: vEmail(b.email), company: str(b.company, 120, { required: false }), subject: str(b.subject, 150), message: str(b.message, 5000, { min: 10 }) };
  const errors = Object.fromEntries(Object.entries(f).filter(([, v]) => 'error' in v && v.error).map(([k, v]) => [k, `${k[0].toUpperCase() + k.slice(1)} ${(v as { error: string }).error}`]));
  if (Object.keys(errors).length) return json({ ok: false, message: 'Please fix the highlighted fields.', errors }, 400);
  const ip = await clientIp();
  if (!(await rateLimit('inquiry', ip, 5, 3600))) return json({ ok: false, message: 'You’ve sent several messages already — please try again in an hour.' }, 429);
  if (!hasDb()) return json({ ok: false, message: 'Our inbox isn’t connected yet. Please try again soon.' }, 503);
  const meta = Object.fromEntries(['budget', 'package', 'timeline', 'source'].map((k) => [k, typeof b[k] === 'string' ? (b[k] as string).slice(0, 120) : '']));
  await sql()`insert into inquiries (kind, name, email, company, subject, message, meta, ip)
    values (${kind}, ${f.name.value!}, ${f.email.value!}, ${f.company.value || null}, ${f.subject.value!}, ${f.message.value!}, ${sql().json(meta)}, ${ip})`;
  await notifyTeam(`New ${kind} inquiry`, [`From: ${f.name.value} ${f.company.value ? `(${f.company.value})` : ''}`, `Subject: ${f.subject.value}`]).catch(() => {});
  return json({ ok: true, message: 'Thanks — your message is in. We reply by email, usually within two business days.' });
}
