import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import { parseFrontmatter } from '@/lib/frontmatter';
import { readOr } from './db';

export interface Post {
  id?: number;
  slug: string;
  kind: 'blog' | 'news';
  title: string;
  excerpt: string;
  body: string;
  category: string;
  tags: string[];
  coverImage: string | null;
  coverAlt: string;
  author: string;
  status: 'draft' | 'published';
  featured: boolean;
  publishAt: string;
  updatedAt: string;
  seoTitle: string | null;
  seoDescription: string | null;
}

/** Bundled launch articles (content/posts/*.md). Used when no database is configured and to seed it. */
export const seedPosts = cache((): Post[] => {
  const dir = path.join(process.cwd(), 'content/posts');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => {
    const { data, body } = parseFrontmatter(fs.readFileSync(path.join(dir, f), 'utf8'));
    const date = new Date(String(data.date) + 'T16:00:00Z').toISOString();
    return {
      slug: f.replace(/\.md$/, ''),
      kind: data.kind === 'news' ? 'news' : 'blog',
      title: String(data.title),
      excerpt: String(data.excerpt || ''),
      body,
      category: String(data.category || 'Guides'),
      tags: (data.tags as string[]) || [],
      coverImage: (data.cover as string) || null,
      coverAlt: String(data.coverAlt || ''),
      author: 'RivalArcade Team',
      status: 'published',
      featured: data.featured === true,
      publishAt: date,
      updatedAt: date,
      seoTitle: null,
      seoDescription: null,
    } satisfies Post;
  }).sort((a, b) => b.publishAt.localeCompare(a.publishAt));
});

type Row = { id: number; slug: string; kind: 'blog' | 'news'; title: string; excerpt: string; body: string; category: string; tags: string[]; cover_image: string | null; cover_alt: string; author: string; status: 'draft' | 'published'; featured: boolean; publish_at: Date | null; updated_at: Date; seo_title: string | null; seo_description: string | null };
export const fromRow = (r: Row): Post => ({
  id: r.id, slug: r.slug, kind: r.kind, title: r.title, excerpt: r.excerpt, body: r.body, category: r.category, tags: r.tags,
  coverImage: r.cover_image, coverAlt: r.cover_alt, author: r.author, status: r.status, featured: r.featured,
  publishAt: (r.publish_at ?? r.updated_at).toISOString(), updatedAt: r.updated_at.toISOString(), seoTitle: r.seo_title, seoDescription: r.seo_description,
});

/** Published posts whose publish time has passed (scheduling = a future publish_at). */
export const listPosts = cache(async (opts: { kind?: 'blog' | 'news' } = {}): Promise<Post[]> => {
  const all = await readOr(seedPosts(), async (db) => {
    const rows = await db<Row[]>`select * from posts where status = 'published' and (publish_at is null or publish_at <= now()) order by coalesce(publish_at, updated_at) desc limit 500`;
    return rows.map(fromRow);
  });
  return opts.kind ? all.filter((p) => p.kind === opts.kind) : all;
});

export async function getPost(slug: string) {
  return (await listPosts()).find((p) => p.slug === slug) ?? null;
}

export function relatedPosts(post: Post, all: Post[], n = 3) {
  return all
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: (p.category === post.category ? 2 : 0) + p.tags.filter((t) => post.tags.includes(t)).length + (p.kind === post.kind ? 0.5 : 0) }))
    .sort((a, b) => b.score - a.score || b.p.publishAt.localeCompare(a.p.publishAt))
    .slice(0, n)
    .map((x) => x.p);
}

export const tagSlug = (t: string) => t.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');
export const categorySlug = tagSlug;

export function searchPosts(all: Post[], q: string) {
  const terms = q.toLowerCase().split(/\s+/).filter((t) => t.length > 1).slice(0, 8);
  if (!terms.length) return [];
  return all
    .map((p) => {
      const hay = { title: p.title.toLowerCase(), meta: (p.excerpt + ' ' + p.tags.join(' ') + ' ' + p.category).toLowerCase(), body: p.body.toLowerCase() };
      let score = 0;
      for (const t of terms) score += (hay.title.includes(t) ? 5 : 0) + (hay.meta.includes(t) ? 3 : 0) + (hay.body.includes(t) ? 1 : 0);
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}
