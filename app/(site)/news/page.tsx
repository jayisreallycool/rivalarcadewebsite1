import Link from 'next/link';
import { PostCard } from '@/components/cards';
import NewsletterForm from '@/components/forms/NewsletterForm';
import { Container, CtaBand, JsonLd, Section } from '@/components/ui';
import { listPosts } from '@/lib/server/posts';
import { breadcrumbLd, metaFor } from '@/lib/seo';

export const revalidate = 300;
export const generateMetadata = () => metaFor({ title: 'News & Announcements', description: 'The latest RivalArcade news: new games, game updates, feature launches, competition announcements and patch notes.', path: '/news', kicker: 'News' });

export default async function News() {
  const posts = await listPosts({ kind: 'news' });
  const [lead, ...rest] = posts;
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'News', path: '/news' }])} />
      <header className="relative border-b border-line pb-10 pt-[calc(7rem+var(--bar,0px))] sm:pt-[calc(8.5rem+var(--bar,0px))]">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <Container className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="kicker mb-3">Newsroom</p>
            <h1 className="font-display text-5xl text-white sm:text-6xl">News & <span className="gold-text">announcements</span></h1>
            <p className="mt-4 max-w-2xl text-lg text-mist">New games, updates, launches and competition news. For guides and strategy, visit the <Link href="/blog" className="text-gold underline underline-offset-4">gaming blog</Link>.</p>
          </div>
          <div className="panel p-5"><p className="mb-3 text-sm font-black text-white">Get announcements by email</p><NewsletterForm source="news" compact /></div>
        </Container>
      </header>
      <Section>
        {lead ? <div className="mb-8"><PostCard post={lead} large /></div> : <p className="text-mist">No announcements yet.</p>}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{rest.map((p) => <PostCard key={p.slug} post={p} />)}</div>
      </Section>
      <CtaBand placement="news_band" title="Try what’s new." />
    </>
  );
}
