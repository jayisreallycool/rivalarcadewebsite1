import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { hasDb, sql } from './db';
import { clientIp, hashPassword, randomToken, rateLimit, safeEqual, sha256, userAgent, verifyPassword } from './security';

export const SESSION_COOKIE = 'ra_admin';
const SESSION_DAYS = 7;

export interface Admin { id: number; email: string; name: string; role: 'owner' | 'editor' }

/**
 * Sign in. The very first login can use ADMIN_EMAIL + ADMIN_PASSWORD from the environment:
 * when no admin accounts exist yet, that pair creates the owner account (password stored as an
 * scrypt hash). After that the env password is ignored and accounts live in the database.
 */
export async function login(emailRaw: string, password: string): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!hasDb()) return { ok: false, error: 'The database is not configured yet (DATABASE_URL).' };
  const email = emailRaw.trim().toLowerCase();
  const ip = await clientIp();
  if (!(await rateLimit('login-ip', ip, 10, 900)) || !(await rateLimit('login-email', email, 6, 900))) {
    return { ok: false, error: 'Too many attempts. Wait 15 minutes and try again.' };
  }
  const db = sql();
  let [user] = await db<{ id: number; password_hash: string; active: boolean }[]>`select id, password_hash, active from admin_users where email = ${email}`;
  if (!user) {
    const [{ count }] = await db<{ count: number }[]>`select count(*)::int as count from admin_users`;
    const envEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const envPass = process.env.ADMIN_PASSWORD || '';
    if (count === 0 && envEmail && envPass.length >= 12 && email === envEmail && safeEqual(password, envPass)) {
      [user] = await db<{ id: number; password_hash: string; active: boolean }[]>`insert into admin_users (email, name, password_hash, role) values (${email}, 'Owner', ${hashPassword(password)}, 'owner') returning id, password_hash, active`;
    } else {
      hashPassword(password); // equalise timing
      return { ok: false, error: 'Email or password is incorrect.' };
    }
  } else if (!user.active || !verifyPassword(password, user.password_hash)) {
    return { ok: false, error: 'Email or password is incorrect.' };
  }
  const token = randomToken();
  await db`insert into admin_sessions (token_hash, user_id, expires_at, ip, user_agent)
    values (${sha256(token)}, ${user.id}, now() + make_interval(days => ${SESSION_DAYS}), ${ip}, ${(await userAgent()).slice(0, 300)})`;
  await db`update admin_users set last_login_at = now() where id = ${user.id}`;
  await db`delete from admin_sessions where expires_at < now()`;
  (await cookies()).set(SESSION_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: SESSION_DAYS * 86400 });
  return { ok: true };
}

export async function logout() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token && hasDb()) await sql()`delete from admin_sessions where token_hash = ${sha256(token)}`;
  jar.delete(SESSION_COOKIE);
}

export const currentAdmin = cache(async (): Promise<Admin | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || !hasDb()) return null;
  try {
    const [row] = await sql()<Admin[]>`
      select u.id, u.email, u.name, u.role from admin_sessions s join admin_users u on u.id = s.user_id
      where s.token_hash = ${sha256(token)} and s.expires_at > now() and u.active`;
    return row ?? null;
  } catch {
    return null;
  }
});

/** Guard for admin pages and server actions. */
export async function requireAdmin(role: 'editor' | 'owner' = 'editor') {
  const admin = await currentAdmin();
  if (!admin) redirect('/admin/login');
  if (role === 'owner' && admin.role !== 'owner') throw new Error('Only the owner can do that.');
  return admin;
}
