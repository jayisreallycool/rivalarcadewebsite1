import { notFound } from 'next/navigation';
import { sql } from '@/lib/server/db';
import { deleteIssue, saveIssue, sendIssue, sendTest } from '@/lib/server/admin-actions';
import { requireAdmin } from '@/lib/server/auth';
import { renderMarkdown } from '@/lib/markdown';
import AdminForm from '../../../AdminForm';

export default async function Issue({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const me = await requireAdmin();
  const isNew = id === 'new';
  const [n] = isNew ? [null] : await sql()`select * from newsletters where id = ${Number(id) || 0}`;
  if (!isNew && !n) notFound();
  const [{ count }] = await sql()`select count(*)::int count from subscribers where status='confirmed'`;
  const v = n ?? { id: '', slug: '', subject: '', preview: '', body: '', public: true, status: 'draft' };
  const sent = v.status === 'sent';
  return (
    <>
      <h1>{isNew ? 'New issue' : sent ? 'Sent issue' : 'Edit draft'}</h1>
      {sent ? (
        <div className="adm-card"><h2>{v.subject}</h2><div dangerouslySetInnerHTML={{ __html: renderMarkdown(v.body) }} /></div>
      ) : (
        <>
          <AdminForm action={saveIssue} submit="Save draft">
            <input type="hidden" name="id" defaultValue={v.id} />
            <div className="row"><div><label>Subject</label><input name="subject" defaultValue={v.subject} required /></div><div><label>Archive slug</label><input name="slug" defaultValue={v.slug} /></div></div>
            <label>Preview text</label><input name="preview" defaultValue={v.preview} />
            <label>Body (Markdown). The unsubscribe link is added automatically.</label><textarea name="body" defaultValue={v.body} style={{ minHeight: 320 }} />
            <label><input type="checkbox" name="public" defaultChecked={v.public} />Publish in the public archive after sending</label>
          </AdminForm>
          {!isNew && (
            <>
              <div className="adm-card"><h2>Send a test to {me.email}</h2><AdminForm action={sendTest} submit="Send test"><input type="hidden" name="id" value={v.id} /></AdminForm></div>
              {me.role === 'owner' && (
                <div className="adm-card"><h2>Send to {count} confirmed subscribers</h2><p className="muted">Only confirmed (double opt-in) subscribers receive it. This cannot be undone.</p>
                  <AdminForm action={sendIssue} submit="Send now"><input type="hidden" name="id" value={v.id} /><label>Type SEND to confirm</label><input name="confirm" autoComplete="off" /></AdminForm></div>
              )}
              <form action={deleteIssue}><input type="hidden" name="id" value={v.id} /><button className="danger">Delete draft</button></form>
            </>
          )}
        </>
      )}
    </>
  );
}
