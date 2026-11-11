import Link from 'next/link';
import { sql } from '@/lib/server/db';

export default async function Landing() {
  const rows = await sql()`select id, slug, title, status, publish_at from landing_pages order by updated_at desc`;
  return (
    <>
      <h1>Campaign landing pages</h1>
      <p className="muted">Published at <code>/promo/&lt;slug&gt;</code>. Every Play button on them carries the campaign’s UTM tag.</p>
      <p><Link className="btn" href="/admin/landing/new">New landing page</Link></p>
      <table><thead><tr><th>Title</th><th>URL</th><th>Status</th></tr></thead><tbody>
        {rows.map((r) => <tr key={r.id}><td><Link href={`/admin/landing/${r.id}`}>{r.title}</Link></td><td>/promo/{r.slug}</td><td>{r.status}{r.publish_at ? ` · ${r.publish_at.toISOString().slice(0, 16)}` : ''}</td></tr>)}
      </tbody></table>
    </>
  );
}
