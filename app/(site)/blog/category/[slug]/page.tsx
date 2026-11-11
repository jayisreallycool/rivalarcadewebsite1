import { notFound } from 'next/navigation';
import { PostCard } from '@/components/cards';
import { BlogSearch, TaxonomyBar } from '@/components/BlogChrome';
import { Breadcrumbs, Container, JsonLd, Section } from '@/components/ui';
import { categorySlug, listPosts } from '@/lib/server/posts';
import { breadcrumbLd, metaFor } from '@/lib/seo';

export const revalidate = 300;
export async function generateStaticParams() {
  return [...new Set((await listPosts()).map((p) => categorySlug(p.category)))].map((slug) => ({ slug }));
}
async function load(slug: string) {
  const all = await listPosts();
  const posts = all.filter((p) => categorySlug(p.category) === slug);
  return { all, posts, name: posts[0]?.category };
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { name, posts } = await load(slug);
  if (!name) return {};
  return metaFor({ title: `${name} — RivalArcade Blog`, description: `${posts.length} RivalArcade articles in ${name}: ${posts.slice(0, 3).map((p) => p.title).join('; ')}.`, path: `/blog/category/${slug}`, kicker: 'Blog category' });
}
export default async function Category({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { all, posts, name } = await load(slug);
  if (!name) notFound();
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name, path: `/blog/category/${slug}` }];
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <header className="border-b border-line pb-10 pt-[calc(7rem+var(--bar,0px))] sm:pt-[calc(8.5rem+var(--bar,0px))]">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 className="font-display text-5xl text-white">{name}</h1>
          <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><TaxonomyBar posts={all} active={slug} /><BlogSearch /></div>
        </Container>
      </header>
      <Section><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div></Section>
    </>
  );
}
