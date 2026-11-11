import { notFound } from 'next/navigation';
import NewsletterForm from '@/components/forms/NewsletterForm';
import { Breadcrumbs, Container, Section } from '@/components/ui';
import { renderMarkdown } from '@/lib/markdown';
import { newsletterArchive } from '@/lib/server/data';
import { meta } from '@/lib/seo';

export const revalidate = 300;
const load = async (slug: string) => (await newsletterArchive()).find((i) => i.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const i = await load((await params).slug);
  return i ? meta({ title: i.subject, description: i.preview || i.subject, path: `/newsletter/archive/${i.slug}`, kicker: 'Newsletter', type: 'article', publishedTime: i.sentAt }) : {};
}

export default async function Issue({ params }: { params: Promise<{ slug: string }> }) {
  const i = await load((await params).slug);
  if (!i) notFound();
  return (
    <Section className="pt-[calc(7rem+var(--bar,0px))]">
      <Container className="max-w-3xl !px-0">
        <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Newsletter archive', path: '/newsletter/archive' }, { name: i.subject, path: `/newsletter/archive/${i.slug}` }]} />
        <time className="text-xs font-black uppercase tracking-widest text-gold" dateTime={i.sentAt}>{new Date(i.sentAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</time>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">{i.subject}</h1>
        <div className="prose-ra mt-8" dangerouslySetInnerHTML={{ __html: renderMarkdown(i.body) }} />
        <div className="panel mt-12 p-6"><p className="mb-3 font-black text-white">Get the next issue</p><NewsletterForm source="archive_issue" /></div>
      </Container>
    </Section>
  );
}
