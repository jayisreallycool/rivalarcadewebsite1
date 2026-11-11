import { PostCard } from '@/components/cards';
import { BlogSearch } from '@/components/BlogChrome';
import { Container, Section } from '@/components/ui';
import { listPosts, searchPosts } from '@/lib/server/posts';
import { meta } from '@/lib/seo';

export const metadata = meta({ title: 'Search the blog', description: 'Search RivalArcade guides, news and updates.', path: '/blog/search', noindex: true });

export default async function Search({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = String((await searchParams).q || '').slice(0, 80);
  const results = q ? searchPosts(await listPosts(), q) : [];
  return (
    <>
      <header className="border-b border-line pb-10 pt-[calc(7rem+var(--bar,0px))] sm:pt-[calc(8.5rem+var(--bar,0px))]">
        <Container>
          <p className="kicker mb-3">Search</p>
          <h1 className="font-display text-4xl text-white sm:text-5xl">{q ? <>Results for “{q}”</> : 'Search articles'}</h1>
          <div className="mt-6"><BlogSearch q={q} /></div>
        </Container>
      </header>
      <Section>
        {q && <p className="mb-6 text-mist" role="status">{results.length} {results.length === 1 ? 'article' : 'articles'} found</p>}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{results.map((p) => <PostCard key={p.slug} post={p} />)}</div>
      </Section>
    </>
  );
}
