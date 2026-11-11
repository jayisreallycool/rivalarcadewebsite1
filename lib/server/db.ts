import 'server-only';
import postgres from 'postgres';

/**
 * One pooled Postgres client per server instance. On Vercel use a pooled connection string
 * (Neon "-pooler" host, Supabase port 6543, etc.). Without DATABASE_URL the site still renders
 * using the bundled seed content, and every write reports "not configured".
 */
const g = globalThis as unknown as { __raSql?: postgres.Sql };

export const hasDb = () => Boolean(process.env.DATABASE_URL);

export function sql() {
  if (!process.env.DATABASE_URL) throw new DbNotConfigured();
  if (!g.__raSql) {
    const url = process.env.DATABASE_URL;
    const local = /localhost|127\.0\.0\.1/.test(url);
    g.__raSql = postgres(url, {
      max: Number(process.env.DATABASE_POOL_MAX || 5),
      idle_timeout: 20,
      ssl: local || process.env.DATABASE_SSL === 'disable' ? false : 'require',
      prepare: !/pooler|:6543/.test(url),
    });
  }
  return g.__raSql;
}

export class DbNotConfigured extends Error {
  constructor() {
    super('DATABASE_URL is not set');
  }
}

/** Run a read that falls back when there is no database (or it is unreachable). */
export async function readOr<T>(fallback: T, fn: (db: postgres.Sql) => Promise<T>): Promise<T> {
  if (!hasDb()) return fallback;
  try {
    return await fn(sql());
  } catch (e) {
    console.error('[db] read failed, using fallback:', (e as Error).message);
    return fallback;
  }
}
