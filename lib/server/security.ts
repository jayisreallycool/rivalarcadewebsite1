import 'server-only';
import crypto from 'node:crypto';
import { headers } from 'next/headers';
import { hasDb, sql } from './db';

export const randomToken = (bytes = 32) => crypto.randomBytes(bytes).toString('base64url');
export const sha256 = (s: string) => crypto.createHash('sha256').update(s).digest('hex');

/* ------------------------------------------------------------- passwords (scrypt, no deps) */
const N = 16384, R = 8, P = 1, KEYLEN = 64;
export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(password, salt, KEYLEN, { N, r: R, p: P });
  return `scrypt$${N}$${R}$${P}$${salt.toString('base64')}$${key.toString('base64')}`;
}
export function verifyPassword(password: string, stored: string) {
  const [alg, n, r, p, salt, key] = stored.split('$');
  if (alg !== 'scrypt') return false;
  const expected = Buffer.from(key, 'base64');
  const got = crypto.scryptSync(password, Buffer.from(salt, 'base64'), expected.length, { N: +n, r: +r, p: +p });
  return crypto.timingSafeEqual(expected, got);
}
export function safeEqual(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

/* ------------------------------------------------------------- request info */
export async function clientIp() {
  const h = await headers();
  return (h.get('x-forwarded-for')?.split(',')[0] || h.get('x-real-ip') || '0.0.0.0').trim();
}
export async function userAgent() {
  return (await headers()).get('user-agent') || '';
}

/* ------------------------------------------------------------- rate limiting */
const mem = new Map<string, { start: number; count: number }>();

/**
 * Fixed-window limiter. Uses Postgres when available so limits hold across serverless instances;
 * falls back to per-instance memory otherwise. Returns true when the request is allowed.
 */
export async function rateLimit(bucket: string, id: string, limit: number, windowSec: number) {
  const key = `${bucket}:${sha256(id).slice(0, 32)}`;
  if (hasDb()) {
    try {
      const [row] = await sql()`
        insert into rate_limits (key, window_start, count) values (${key}, now(), 1)
        on conflict (key) do update set
          count = case when rate_limits.window_start < now() - make_interval(secs => ${windowSec}) then 1 else rate_limits.count + 1 end,
          window_start = case when rate_limits.window_start < now() - make_interval(secs => ${windowSec}) then now() else rate_limits.window_start end
        returning count`;
      return row.count <= limit;
    } catch (e) {
      console.error('[ratelimit] db error, using memory', (e as Error).message);
    }
  }
  const now = Date.now();
  const cur = mem.get(key);
  if (!cur || now - cur.start > windowSec * 1000) {
    mem.set(key, { start: now, count: 1 });
    return true;
  }
  cur.count += 1;
  return cur.count <= limit;
}

/* ------------------------------------------------------------- spam protection */
/**
 * Three layers: a honeypot field bots fill in, a minimum time-on-form, and Cloudflare Turnstile
 * when TURNSTILE_SECRET_KEY is set. Returns an error message or null.
 */
export async function spamCheck(body: Record<string, unknown>) {
  if (typeof body.website === 'string' && body.website.trim() !== '') return 'Submission rejected.';
  const started = Number(body.startedAt);
  if (!started || Date.now() - started < 2500) return 'That was quick — please take a moment and try again.';
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    const token = String(body.turnstileToken || '');
    if (!token) return 'Please complete the verification check.';
    try {
      const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: new URLSearchParams({ secret, response: token, remoteip: await clientIp() }),
      });
      const data = (await res.json()) as { success: boolean };
      if (!data.success) return 'Verification failed — please try again.';
    } catch {
      return 'Verification is unavailable right now — please try again shortly.';
    }
  }
  return null;
}

/* ------------------------------------------------------------- validation */
export const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]{1,64}@[a-z0-9.-]{1,190}\.[a-z]{2,24}$/i;
export function str(v: unknown, max: number, { required = true, min = 1 } = {}) {
  const s = typeof v === 'string' ? v.trim().replace(/\u0000/g, '') : '';
  if (!s) return required ? { error: 'is required' } : { value: '' };
  if (s.length < min) return { error: `must be at least ${min} characters` };
  if (s.length > max) return { error: `must be ${max} characters or fewer` };
  return { value: s };
}
export function email(v: unknown) {
  const s = typeof v === 'string' ? v.trim().toLowerCase() : '';
  return EMAIL_RE.test(s) ? { value: s } : { error: 'must be a valid email address' };
}
export function url(v: unknown, { required = true } = {}) {
  const s = typeof v === 'string' ? v.trim() : '';
  if (!s) return required ? { error: 'is required' } : { value: '' };
  try {
    const u = new URL(s.startsWith('http') ? s : 'https://' + s);
    if (!['http:', 'https:'].includes(u.protocol) || s.length > 300) throw 0;
    return { value: u.toString() };
  } catch {
    return { error: 'must be a valid link' };
  }
}
export function slugify(s: string) {
  return s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').slice(0, 80);
}
