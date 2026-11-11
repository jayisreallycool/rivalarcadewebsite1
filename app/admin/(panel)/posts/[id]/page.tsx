import { notFound } from 'next/navigation';
import { sql } from '@/lib/server/db';
import { deletePost, savePost } from '@/lib/server/admin-actions';
import AdminForm from '../../../AdminForm';

const local = (d: Date | null) => (d ? d.toISOString().slice(0, 16) : '');

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === 'new';
  const [p] = isNew ? [null] : await sql()`select * from posts where id = ${Number(id) || 0}`;
  if (!isNew && !p) notFound();
  const v = p ?? { id: '', slug: '', kind: 'blog', title: '', excerpt: '', body: '', category: 'Guides', tags: [], cover_image: '', cover_alt: '', author: 'RivalArcade Team', status: 'draft', featured: false, publish_at: null, seo_title: '', seo_description: '' };
  return (
    <>
      <h1>{isNew ? 'New post' : 'Edit post'}</h1>
      <AdminForm action={savePost}>
        <input type="hidden" name="id" defaultValue={v.id} />
        <div className="row">
          <div><label>Title</label><input name="title" defaultValue={v.title} required maxLength={160} /></div>
          <div><label>Slug (URL)</label><input name="slug" defaultValue={v.slug} placeholder="auto from title" /></div>
          <div><label>Type</label><select name="kind" defaultValue={v.kind}><option value="blog">Blog</option><option value="news">News</option></select></div>
          <div><label>Category</label><input name="category" defaultValue={v.category} /></div>
        </div>
        <label>Excerpt (shown in cards and search results)</label><textarea name="excerpt" defaultValue={v.excerpt} style={{ minHeight: 70 }} maxLength={400} />
        <label>Body (Markdown; raw HTML is escaped)</label><textarea name="body" defaultValue={v.body} style={{ minHeight: 360 }} />
        <div className="row">
          <div><label>Tags (comma separated)</label><input name="tags" defaultValue={v.tags.join(', ')} /></div>
          <div><label>Author</label><input name="author" defaultValue={v.author} /></div>
          <div><label>Cover image URL (e.g. /media/12)</label><input name="cover_image" defaultValue={v.cover_image ?? ''} /></div>
          <div><label>Cover alt text</label><input name="cover_alt" defaultValue={v.cover_alt} /></div>
        </div>
        <div className="row">
          <div><label>Status</label><select name="status" defaultValue={v.status}><option value="draft">Draft</option><option value="published">Published</option></select></div>
          <div><label>Publish at (UTC) — future date = scheduled</label><input type="datetime-local" name="publish_at" defaultValue={local(v.publish_at)} /></div>
          <div><label><input type="checkbox" name="featured" defaultChecked={v.featured} />Featured</label></div>
        </div>
        <div className="row">
          <div><label>SEO title (≤70)</label><input name="seo_title" defaultValue={v.seo_title ?? ''} maxLength={70} /></div>
          <div><label>SEO description (≤170)</label><input name="seo_description" defaultValue={v.seo_description ?? ''} maxLength={170} /></div>
        </div>
      </AdminForm>
      {!isNew && (
        <form action={deletePost} style={{ marginTop: '2rem' }}>
          <input type="hidden" name="id" value={v.id} /><button className="danger">Delete post</button>
        </form>
      )}
    </>
  );
}
