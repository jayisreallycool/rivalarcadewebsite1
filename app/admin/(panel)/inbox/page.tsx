import { sql } from '@/lib/server/db';
import { setCreatorStatus, setInquiryStatus } from '@/lib/server/admin-actions';

export default async function Inbox() {
  const inq = await sql()`select * from inquiries order by (status='new') desc, created_at desc limit 200`;
  const cre = await sql()`select * from creator_applications order by (status='new') desc, created_at desc limit 200`;
  return (
    <>
      <h1>Inbox</h1>
      <h2>Contact, advertising, sponsorship &amp; media ({inq.length})</h2>
      {inq.map((r) => (
        <div className="adm-card" key={r.id}>
          <p style={{ margin: 0 }}><strong>{r.name}</strong> · <a href={`mailto:${r.email}`}>{r.email}</a>{r.company ? ` · ${r.company}` : ''} · <span className="muted">{r.kind} · {r.created_at.toISOString().slice(0, 16).replace('T', ' ')}</span></p>
          {r.subject && <p style={{ margin: '.3rem 0' }}><em>{r.subject}</em></p>}
          <p style={{ whiteSpace: 'pre-wrap' }}>{r.message}</p>
          {Object.keys(r.meta ?? {}).length > 0 && <p className="muted" style={{ fontSize: 12 }}>{JSON.stringify(r.meta)}</p>}
          <form action={setInquiryStatus} style={{ display: 'flex', gap: 8 }}><input type="hidden" name="id" value={r.id} />
            <select name="status" defaultValue={r.status} style={{ width: 'auto' }}><option value="new">New</option><option value="in_progress">In progress</option><option value="closed">Closed</option></select><button className="ghost">Update</button></form>
        </div>
      ))}
      {!inq.length && <p className="muted">Nothing yet.</p>}
      <h2>Creator applications ({cre.length})</h2>
      {cre.map((r) => (
        <div className="adm-card" key={r.id}>
          <p style={{ margin: 0 }}><strong>{r.name}</strong> ({r.handle}) · <a href={`mailto:${r.email}`}>{r.email}</a> · <a href={r.channel_url} target="_blank" rel="noreferrer noopener">channel ↗</a></p>
          <p className="muted" style={{ margin: '.2rem 0' }}>{r.platforms.join(', ')} · audience: {r.audience_size || 'n/a'} · focus: {r.content_focus || 'n/a'} · {r.created_at.toISOString().slice(0, 10)}</p>
          <p style={{ whiteSpace: 'pre-wrap' }}>{r.pitch}</p>
          <form action={setCreatorStatus}><input type="hidden" name="id" value={r.id} />
            <div className="row"><div><label>Status</label><select name="status" defaultValue={r.status}><option value="new">New</option><option value="reviewing">Reviewing</option><option value="approved">Approved</option><option value="declined">Declined</option></select></div>
              <div><label>Referral code (for tracked links)</label><input name="referral_code" defaultValue={r.referral_code ?? ''} /></div></div>
            <label>Notes</label><textarea name="notes" defaultValue={r.notes ?? ''} style={{ minHeight: 60 }} /><p><button className="ghost">Save</button></p></form>
        </div>
      ))}
      {!cre.length && <p className="muted">No applications yet.</p>}
    </>
  );
}
