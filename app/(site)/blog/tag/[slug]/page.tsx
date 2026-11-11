import { notFound } from 'next/navigation';
import { PostCard } from '@/components/cards';
import { Breadcrumbs, Container, JsonLd, Section } from '@/components/ui';
import { listPosts, tagSlug } from '@/lib/server/posts';
import { breadcrumbLd, metaFor } from '@/lib/seo';

export const revalidate = 300;
export async function generateStaticParams() {
  return [...new Set((await listPosts()).flatMap((p) => p.tags.map(tagSlug)))].map((slug) => ({ slug }));
}
async function load(slug: string) {
  const posts = (await listPosts()).filter((p) => p.tags.some((t) => tagSlug(t) === slug));
  return { posts, name: posts[0]?.tags.find((t) => tagSlug(t) === slug) };
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { name, posts } = await load(slug);
  if (!name) return {};
  // Thin tag pages (a single article) are kept out of the index to avoid duplicate content.
  return metaFor({ title: `#${name} — RivalArcade Blog`, description: `Guides, news and updates from the RivalArcade blog tagged ${name}: free competitive skill games, RivalRank and cosmetics.`, path: `/blog/tag/${slug}`, kicker: 'Blog tag', noindex: posts.length < 2 });
}
export default async function Tag({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { posts, name } = await load(slug);
  if (!name) notFound();
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: `#${name}`, path: `/blog/tag/${slug}` }];
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <header className="border-b border-line pb-10 pt-[calc(7rem+var(--bar,0px))] sm:pt-[calc(8.5rem+var(--bar,0px))]">
        <Container><Breadcrumbs items={crumbs} /><h1 className="font-display text-5xl text-white">#{name}</h1><p className="mt-3 text-mist">{posts.length} {posts.length === 1 ? 'article' : 'articles'}</p></Container>
      </header>
      <Section><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div></Section>
    </>
  );
}
