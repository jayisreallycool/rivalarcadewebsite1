import { hasDb, sql } from '@/lib/server/db';

/** Images uploaded in the admin, served from Postgres with long-lived caching. URL: /media/<id>-<name> */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = Number.parseInt((await params).id, 10);
  if (!hasDb() || !Number.isFinite(id)) return new Response('Not found', { status: 404 });
  const [row] = await sql()`select content_type, bytes from media where id = ${id}`;
  if (!row) return new Response('Not found', { status: 404 });
  return new Response(new Uint8Array(row.bytes as Buffer), {
    headers: { 'Content-Type': row.content_type, 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'" },
  });
}
