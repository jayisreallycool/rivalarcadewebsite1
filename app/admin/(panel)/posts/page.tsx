import Link from 'next/link';
import { sql } from '@/lib/server/db';

export default async function Posts() {
  const rows = await sql()`select id, title, kind, status, publish_at, updated_at from posts order by coalesce(publish_at, updated_at) desc`;
  const state = (r: any) => (r.status === 'draft' ? 'Draft' : r.publish_at && r.publish_at > new Date() ? `Scheduled ${r.publish_at.toISOString().slice(0, 16).replace('T', ' ')} UTC` : 'Live');
  return (
    <>
      <h1>Posts</h1>
      <p><Link className="btn" href="/admin/posts/new">New post</Link></p>
      <table><thead><tr><th>Title</th><th>Type</th><th>Status</th><th>Updated</th></tr></thead><tbody>
        {rows.map((r) => <tr key={r.id}><td><Link href={`/admin/posts/${r.id}`}>{r.title}</Link></td><td>{r.kind}</td><td>{state(r)}</td><td>{r.updated_at.toISOString().slice(0, 10)}</td></tr>)}
        {!rows.length && <tr><td colSpan={4} className="muted">No database posts yet. Run <code>npm run db:seed</code> to import the launch articles.</td></tr>}
      </tbody></table>
    </>
  );
}
