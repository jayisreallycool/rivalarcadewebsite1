import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PostCard } from '@/components/cards';
import { Icon } from '@/components/Icons';
import ShareButtons from '@/components/ShareButtons';
import NewsletterForm from '@/components/forms/NewsletterForm';
import { Breadcrumbs, Container, CtaBand, JsonLd, PlayButton, Section } from '@/components/ui';
import { headingsOf, readingMinutes, renderMarkdown } from '@/lib/markdown';
import { categorySlug, getPost, listPosts, relatedPosts, tagSlug } from '@/lib/server/posts';
import { articleLd, breadcrumbLd, meta } from '@/lib/seo';
import { absolute } from '@/lib/site';

export const revalidate = 300;
export async function generateStaticParams() {
  return (await listPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = await getPost((await params).slug);
  if (!p) return {};
  return meta({ title: p.seoTitle || p.title, description: p.seoDescription || p.excerpt, path: `/blog/${p.slug}`, type: 'article', publishedTime: p.publishAt, modifiedTime: p.updatedAt, tags: p.tags, kicker: p.kind === 'news' ? 'News' : p.category });
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const p = await getPost((await params).slug);
  if (!p) notFound();
  const related = relatedPosts(p, await listPosts());
  const toc = headingsOf(p.body);
  const section = p.kind === 'news' ? { name: 'News', path: '/news' } : { name: 'Blog', path: '/blog' };
  const crumbs = [{ name: 'Home', path: '/' }, section, { name: p.title, path: `/blog/${p.slug}` }];
  const date = new Date(p.publishAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <>
      <JsonLd data={[articleLd(p), breadcrumbLd(crumbs)]} />
      <article>
        <header className="relative overflow-hidden border-b border-line pb-10 pt-[calc(7rem+var(--bar,0px))] sm:pt-[calc(8.5rem+var(--bar,0px))]">
          <div className="grid-bg pointer-events-none absolute inset-0" />
          <Container className="relative max-w-4xl">
            <Breadcrumbs items={crumbs} />
            <div className="flex flex-wrap items-center gap-2 text-sm text-mist">
              <Link href={p.kind === 'news' ? '/news' : `/blog/category/${categorySlug(p.category)}`} className="chip !text-gold">{p.kind === 'news' ? 'News' : p.category}</Link>
              <time dateTime={p.publishAt}>{date}</time><span aria-hidden="true">·</span><span>{readingMinutes(p.body)} min read</span><span aria-hidden="true">·</span><span>{p.author}</span>
            </div>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] text-white sm:text-6xl">{p.title}</h1>
            <p className="mt-5 text-xl leading-relaxed text-mist">{p.excerpt}</p>
          </Container>
        </header>
        {p.coverImage && (
          <Container className="max-w-5xl">
            <div className="relative -mt-0 mt-8 aspect-[16/9] overflow-hidden rounded-[1.5rem] border border-line bg-black">
              <Image src={p.coverImage} alt={p.coverAlt || p.title} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-contain" />
            </div>
          </Container>
        )}
        <Section className="!pt-12">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_280px]">
            <div className="min-w-0">
              <div className="prose-ra" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.body) }} />
              <div className="mt-10 flex flex-wrap gap-2">{p.tags.map((t) => <Link key={t} href={`/blog/tag/${tagSlug(t)}`} className="chip hover:!text-gold">#{t}</Link>)}</div>
              <div className="mt-6 border-t border-line pt-6"><ShareButtons url={absolute(`/blog/${p.slug}`)} title={p.title} label="Share this article" /></div>
            </div>
            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              {toc.length > 2 && (
                <nav aria-label="On this page" className="panel p-5">
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-gold">On this page</p>
                  <ol className="space-y-2 text-sm">{toc.map((h) => <li key={h.id}><a href={`#${h.id}`} className="text-white/75 hover:text-white">{h.text}</a></li>)}</ol>
                </nav>
              )}
              <div className="panel gold-border p-5">
                <p className="font-display text-xl text-white">Play it now</p>
                <p className="mt-1 text-sm text-mist">Free in your browser. No download.</p>
                <PlayButton placement={`article_${p.slug}`} campaign="blog" size="sm" className="mt-4 w-full" />
              </div>
              <div className="panel p-5"><p className="mb-3 text-sm font-black text-white">Get new guides by email</p><NewsletterForm source={`article_${p.slug}`.slice(0, 40)} compact /></div>
            </aside>
          </div>
        </Section>
      </article>
      {related.length > 0 && (
        <Section className="bg-charcoal/60">
          <h2 className="mb-6 flex items-center gap-2 font-display text-3xl text-white"><Icon name="book-open" className="text-gold" /> Related articles</h2>
          <div className="grid gap-6 md:grid-cols-3">{related.map((r) => <PostCard key={r.slug} post={r} />)}</div>
        </Section>
      )}
      <CtaBand placement={`article_${p.slug}_band`} />
    </>
  );
}
