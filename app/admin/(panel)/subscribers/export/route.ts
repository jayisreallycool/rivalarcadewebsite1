import { currentAdmin } from '@/lib/server/auth';
import { sql } from '@/lib/server/db';

const cell = (v: unknown) => { let s = String(v ?? ''); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return `"${s.replace(/"/g, '""')}"`; };

export async function GET() {
  if (!(await currentAdmin())) return new Response('Unauthorized', { status: 401 });
  const rows = await sql()`select email, source, confirmed_at from subscribers where status='confirmed' order by confirmed_at`;
  const csv = ['email,source,confirmed_at', ...rows.map((r) => [r.email, r.source, r.confirmed_at?.toISOString()].map(cell).join(','))].join('\n');
  return new Response(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="subscribers.csv"', 'Cache-Control': 'no-store' } });
}
