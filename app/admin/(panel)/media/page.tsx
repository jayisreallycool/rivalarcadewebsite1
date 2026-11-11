import { sql } from '@/lib/server/db';
import { deleteMedia, uploadMedia } from '@/lib/server/admin-actions';
import AdminForm from '../../AdminForm';

export default async function Media() {
  const rows = await sql()`select id, filename, size, alt from media order by id desc limit 100`;
  return (
    <>
      <h1>Media</h1>
      <div className="adm-card">
        <AdminForm action={uploadMedia} submit="Upload">
          <label>Image (PNG, JPEG, WebP, GIF · max 4 MB)</label><input type="file" name="file" accept="image/png,image/jpeg,image/webp,image/gif" required />
          <label>Alt text</label><input name="alt" maxLength={200} />
        </AdminForm>
      </div>
      <div className="row">
        {rows.map((m) => (
          <div className="adm-card" key={m.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/media/${m.id}`} alt={m.alt} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }} />
            <p style={{ margin: '.5rem 0 0' }}><code>/media/{m.id}</code></p>
            <p className="muted" style={{ margin: 0, fontSize: 12 }}>{m.filename} · {(m.size / 1024).toFixed(0)} KB</p>
            <form action={deleteMedia}><input type="hidden" name="id" value={m.id} /><button className="ghost" style={{ marginTop: 6 }}>Delete</button></form>
          </div>
        ))}
      </div>
    </>
  );
}
