import Link from 'next/link';
import { sql } from '@/lib/server/db';

export default async function Newsletters() {
  const rows = await sql()`select id, subject, status, sent_at, sent_count from newsletters order by created_at desc`;
  return (
    <>
      <h1>Newsletters</h1>
      <p><Link className="btn" href="/admin/newsletters/new">New issue</Link></p>
      <table><thead><tr><th>Subject</th><th>Status</th><th>Sent</th></tr></thead><tbody>
        {rows.map((r) => <tr key={r.id}><td><Link href={`/admin/newsletters/${r.id}`}>{r.subject}</Link></td><td>{r.status}</td><td>{r.sent_at ? `${r.sent_at.toISOString().slice(0, 10)} · ${r.sent_count} recipients` : '—'}</td></tr>)}
      </tbody></table>
    </>
  );
}
