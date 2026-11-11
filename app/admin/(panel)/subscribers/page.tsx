import { sql } from '@/lib/server/db';
import { removeSubscriber } from '@/lib/server/admin-actions';

export default async function Subscribers() {
  const rows = await sql()`select id, email, status, source, created_at, confirmed_at from subscribers order by created_at desc limit 500`;
  const [c] = await sql()`select count(*) filter (where status='confirmed') ok, count(*) filter (where status='pending') pend, count(*) filter (where status='unsubscribed') gone from subscribers`;
  return (
    <>
      <h1>Subscribers</h1>
      <p>{c.ok} confirmed · {c.pend} pending · {c.gone} unsubscribed · <a href="/admin/subscribers/export">Export confirmed CSV</a></p>
      <table><thead><tr><th>Email</th><th>Status</th><th>Source</th><th>Signed up</th><th></th></tr></thead><tbody>
        {rows.map((r) => <tr key={r.id}><td>{r.email}</td><td>{r.status}</td><td className="muted">{r.source}</td><td>{r.created_at.toISOString().slice(0, 10)}</td>
          <td><form action={removeSubscriber}><input type="hidden" name="id" value={r.id} /><button className="ghost">Delete</button></form></td></tr>)}
      </tbody></table>
    </>
  );
}
