import { PostCard } from '@/components/cards';
import { BlogSearch, TagCloud, TaxonomyBar } from '@/components/BlogChrome';
import { Container, CtaBand, JsonLd, Section } from '@/components/ui';
import { listPosts } from '@/lib/server/posts';
import { breadcrumbLd, metaFor } from '@/lib/seo';

export const revalidate = 300;
export const generateMetadata = () => metaFor({ title: 'Gaming Blog — Guides, Strategy & Competitive Tips', description: 'The RivalArcade gaming blog: game guides, ranked strategy, Rival Coin tips, cosmetics, fair-play deep dives and competitive gaming features.', path: '/blog', kicker: 'Gaming blog' });

export default async function Blog() {
  const all = await listPosts();
  const posts = all.filter((p) => p.kind === 'blog');
  const [lead, ...rest] = [...posts.filter((p) => p.featured), ...posts.filter((p) => !p.featured)];
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }])} />
      <header className="relative border-b border-line pb-10 pt-[calc(7rem+var(--bar,0px))] sm:pt-[calc(8.5rem+var(--bar,0px))]">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <Container className="relative">
          <p className="kicker mb-3">The RivalArcade blog</p>
          <h1 className="font-display text-5xl text-white sm:text-6xl">Guides & <span className="gold-text">strategy</span></h1>
          <p className="mt-4 max-w-2xl text-lg text-mist">Game guides, ranked strategy, economy deep-dives and competitive gaming features from the RivalArcade team.</p>
          <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><TaxonomyBar posts={all} /><BlogSearch /></div>
        </Container>
      </header>
      <Section>
        {lead && <div className="mb-8"><PostCard post={lead} large /></div>}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{rest.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        <div className="mt-14"><h2 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-gold">Topics</h2><TagCloud posts={all} /></div>
      </Section>
      <CtaBand placement="blog_band" title="Put the guide to work." />
    </>
  );
}
