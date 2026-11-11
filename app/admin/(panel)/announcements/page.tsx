import { sql } from '@/lib/server/db';
import { deleteAnnouncement, saveAnnouncement, toggleAnnouncement } from '@/lib/server/admin-actions';
import AdminForm from '../../AdminForm';

export default async function Announcements() {
  const rows = await sql()`select * from announcements order by created_at desc limit 50`;
  return (
    <>
      <h1>Announcements</h1>
      <p className="muted">Up to three active announcements show in the bar above the header, inside their start/end window.</p>
      <div className="adm-card"><AdminForm action={saveAnnouncement} submit="Add announcement">
        <label>Message</label><input name="message" maxLength={200} required />
        <div className="row"><div><label>Link URL</label><input name="link_url" /></div><div><label>Link label</label><input name="link_label" /></div>
          <div><label>Tone</label><select name="tone"><option value="gold">Gold</option><option value="electric">Electric</option><option value="neutral">Neutral</option></select></div></div>
        <div className="row"><div><label>Starts (UTC, optional)</label><input type="datetime-local" name="starts_at" /></div><div><label>Ends (UTC, optional)</label><input type="datetime-local" name="ends_at" /></div></div>
      </AdminForm></div>
      <table><thead><tr><th>Message</th><th>Window</th><th>State</th><th></th></tr></thead><tbody>
        {rows.map((r) => <tr key={r.id}><td>{r.message}</td><td className="muted">{r.starts_at?.toISOString().slice(0, 16) ?? '—'} → {r.ends_at?.toISOString().slice(0, 16) ?? '—'}</td><td>{r.active ? 'Active' : 'Off'}</td>
          <td style={{ whiteSpace: 'nowrap' }}><form action={toggleAnnouncement} style={{ display: 'inline' }}><input type="hidden" name="id" value={r.id} /><button className="ghost">{r.active ? 'Turn off' : 'Turn on'}</button></form>{' '}
            <form action={deleteAnnouncement} style={{ display: 'inline' }}><input type="hidden" name="id" value={r.id} /><button className="danger">Delete</button></form></td></tr>)}
      </tbody></table>
    </>
  );
}
