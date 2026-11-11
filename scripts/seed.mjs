// Seeds the launch articles from content/posts into the database (skips slugs that already exist).
import fs from 'node:fs';
import path from 'node:path';
import postgres from 'postgres';

const url = process.env.DATABASE_URL;
if (!url) { console.error('Set DATABASE_URL first.'); process.exit(1); }
const local = /localhost|127\.0\.0\.1/.test(url);
const sql = postgres(url, { ssl: local || process.env.DATABASE_SSL === 'disable' ? false : 'require', max: 1 });

function parse(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const data = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':'); if (i < 0) continue;
    const k = line.slice(0, i).trim(); let v = line.slice(i + 1).trim();
    if (v.startsWith('[') && v.endsWith(']')) data[k] = v.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean);
    else if (v === 'true' || v === 'false') data[k] = v === 'true';
    else { if (/^(["']).*\1$/.test(v)) v = v.slice(1, -1); data[k] = v; }
  }
  return { data, body: m[2].trim() };
}

const dir = new URL('../content/posts/', import.meta.url);
let added = 0;
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const { data, body } = parse(fs.readFileSync(new URL(f, dir), 'utf8'));
  const slug = path.basename(f, '.md');
  const at = new Date(`${data.date}T16:00:00Z`);
  const r = await sql`insert into posts (slug, kind, title, excerpt, body, category, tags, cover_image, cover_alt, status, featured, publish_at, created_at, updated_at)
    values (${slug}, ${data.kind === 'news' ? 'news' : 'blog'}, ${data.title}, ${data.excerpt || ''}, ${body}, ${data.category || 'Guides'}, ${data.tags || []}, ${data.cover || null}, ${data.coverAlt || ''}, 'published', ${data.featured === true}, ${at}, ${at}, ${at})
    on conflict (slug) do nothing returning id`;
  added += r.length;
}
console.log(`Seeded ${added} new post(s).`);
await sql.end();
