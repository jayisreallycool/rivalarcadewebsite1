import Link from 'next/link';
import type { Post } from '@/lib/server/posts';
import { categorySlug, tagSlug } from '@/lib/server/posts';
import { Icon } from './Icons';

export function BlogSearch({ q = '' }: { q?: string }) {
  return (
    <form action="/blog/search" method="get" role="search" className="relative w-full max-w-md">
      <label htmlFor="blog-q" className="sr-only">Search articles</label>
      <Icon name="search" size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mist" />
      <input id="blog-q" name="q" defaultValue={q} type="search" maxLength={80} placeholder="Search guides, news and updates" className="input !pl-11" />
    </form>
  );
}

export function TaxonomyBar({ posts, active }: { posts: Post[]; active?: string }) {
  const cats = [...new Set(posts.map((p) => p.category))].sort();
  return (
    <nav aria-label="Categories" className="flex flex-wrap gap-2">
      <Link href="/blog" className={`chip ${!active ? '!border-gold !text-gold' : ''}`}>All</Link>
      {cats.map((c) => (
        <Link key={c} href={`/blog/category/${categorySlug(c)}`} className={`chip ${active === categorySlug(c) ? '!border-gold !text-gold' : ''}`}>{c}</Link>
      ))}
    </nav>
  );
}

export function TagCloud({ posts }: { posts: Post[] }) {
  const counts = new Map<string, number>();
  posts.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
  const tags = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 24);
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(([t, n]) => <Link key={t} href={`/blog/tag/${tagSlug(t)}`} className="chip hover:!text-gold">#{t} <span className="text-mist">{n}</span></Link>)}
    </div>
  );
}
