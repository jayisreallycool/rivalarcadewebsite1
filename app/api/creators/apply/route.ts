import { hasDb, sql } from '@/lib/server/db';
import { json, readJson } from '@/lib/server/http';
import { notifyTeam } from '@/lib/server/email';
import { clientIp, email as vEmail, rateLimit, spamCheck, str, url } from '@/lib/server/security';

const PLATFORMS = ['TikTok', 'YouTube', 'Twitch', 'Instagram', 'Kick', 'X', 'Discord', 'Other'];
const SIZES = ['Under 1K', '1K–10K', '10K–50K', '50K–250K', '250K–1M', '1M+'];

export async function POST(req: Request) {
  const b = await readJson(req);
  if (!b) return json({ ok: false, message: 'Invalid request.' }, 400);
  const spam = await spamCheck(b);
  if (spam) return json({ ok: false, message: spam }, 400);
  const platforms = Array.isArray(b.platforms) ? b.platforms.filter((p): p is string => PLATFORMS.includes(p as string)) : [];
  const f = { name: str(b.name, 100), email: vEmail(b.email), handle: str(b.handle, 60), channelUrl: url(b.channelUrl), pitch: str(b.pitch, 3000, { min: 30 }), contentFocus: str(b.contentFocus, 120, { required: false }) };
  const errors: Record<string, string> = {};
  for (const [k, v] of Object.entries(f)) if ('error' in v && v.error) errors[k] = `This field ${v.error}`;
  if (!platforms.length) errors.platforms = 'Pick at least one platform';
  if (!SIZES.includes(String(b.audienceSize))) errors.audienceSize = 'Choose an audience range';
  if (b.agree !== true) errors.agree = 'Please confirm to continue';
  if (Object.keys(errors).length) return json({ ok: false, message: 'Please fix the highlighted fields.', errors }, 400);
  const ip = await clientIp();
  if (!(await rateLimit('creator', ip, 3, 86400)) || !(await rateLimit('creator-email', f.email.value!, 2, 86400))) return json({ ok: false, message: 'We already have your application — we’ll be in touch.' }, 429);
  if (!hasDb()) return json({ ok: false, message: 'Applications open soon. Please try again shortly.' }, 503);
  await sql()`insert into creator_applications (name, email, handle, platforms, channel_url, audience_size, content_focus, pitch, ip)
    values (${f.name.value!}, ${f.email.value!}, ${f.handle.value!}, ${platforms}, ${f.channelUrl.value!}, ${String(b.audienceSize)}, ${f.contentFocus.value || null}, ${f.pitch.value!}, ${ip})`;
  await notifyTeam('New creator application', [`Handle: ${f.handle.value}`, `Platforms: ${platforms.join(', ')}`, `Audience: ${b.audienceSize}`]).catch(() => {});
  return json({ ok: true, message: 'Thanks for applying! We review every application and reply by email, usually within a week.' });
}
