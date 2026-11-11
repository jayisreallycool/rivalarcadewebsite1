import { notFound } from 'next/navigation';
import { sql } from '@/lib/server/db';
import { deleteLanding, saveLanding } from '@/lib/server/admin-actions';
import AdminForm from '../../../AdminForm';

export default async function EditLanding({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === 'new';
  const [p] = isNew ? [null] : await sql()`select * from landing_pages where id = ${Number(id) || 0}`;
  if (!isNew && !p) notFound();
  const v = p ?? { id: '', slug: '', title: '', headline: '', subheadline: '', body: '', cta_label: 'Play RivalArcade', utm_campaign: '', hero_image: '', status: 'draft', publish_at: null, seo_title: '', seo_description: '' };
  return (
    <>
      <h1>{isNew ? 'New landing page' : 'Edit landing page'}</h1>
      <AdminForm action={saveLanding}>
        <input type="hidden" name="id" defaultValue={v.id} />
        <div className="row"><div><label>Internal title</label><input name="title" defaultValue={v.title} required /></div><div><label>Slug</label><input name="slug" defaultValue={v.slug} /></div><div><label>UTM campaign</label><input name="utm_campaign" defaultValue={v.utm_campaign} placeholder="e.g. summer_cup" /></div></div>
        <label>Headline</label><input name="headline" defaultValue={v.headline} />
        <label>Sub-headline</label><input name="subheadline" defaultValue={v.subheadline} />
        <label>Body (Markdown)</label><textarea name="body" defaultValue={v.body} style={{ minHeight: 260 }} />
        <div className="row"><div><label>Button label</label><input name="cta_label" defaultValue={v.cta_label} /></div><div><label>Hero image URL</label><input name="hero_image" defaultValue={v.hero_image ?? ''} /></div>
          <div><label>Status</label><select name="status" defaultValue={v.status}><option value="draft">Draft</option><option value="published">Published</option></select></div>
          <div><label>Publish at (UTC)</label><input type="datetime-local" name="publish_at" defaultValue={v.publish_at ? v.publish_at.toISOString().slice(0, 16) : ''} /></div></div>
        <div className="row"><div><label>SEO title</label><input name="seo_title" defaultValue={v.seo_title ?? ''} /></div><div><label>SEO description</label><input name="seo_description" defaultValue={v.seo_description ?? ''} /></div></div>
      </AdminForm>
      {!isNew && <form action={deleteLanding} style={{ marginTop: '2rem' }}><input type="hidden" name="id" value={v.id} /><button className="danger">Delete page</button></form>}
    </>
  );
}
