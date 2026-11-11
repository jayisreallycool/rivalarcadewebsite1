import Link from 'next/link';
import NewsletterForm from '@/components/forms/NewsletterForm';
import { Container, Section } from '@/components/ui';
import { newsletterArchive } from '@/lib/server/data';
import { metaFor } from '@/lib/seo';

export const revalidate = 300;
export const generateMetadata = () => metaFor({ title: 'Newsletter Archive', description: 'Past issues of the RivalArcade newsletter: cup announcements, new games and feature updates.', path: '/newsletter/archive', kicker: 'Newsletter archive' });

export default async function Archive() {
  const issues = await newsletterArchive();
  return (
    <>
      <header className="border-b border-line pb-10 pt-[calc(7rem+var(--bar,0px))] sm:pt-[calc(8.5rem+var(--bar,0px))]">
        <Container><p className="kicker mb-3">Newsletter</p><h1 className="font-display text-5xl text-white">Archive</h1><p className="mt-3 text-mist">Every issue we’ve sent, in one place.</p></Container>
      </header>
      <Section>
        {issues.length ? (
          <ul className="divide-y divide-line rounded-2xl border border-line">
            {issues.map((i) => (
              <li key={i.slug}><Link href={`/newsletter/archive/${i.slug}`} className="block p-5 hover:bg-white/[0.02]"><time className="text-xs font-black uppercase tracking-widest text-gold" dateTime={i.sentAt}>{new Date(i.sentAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</time><p className="mt-1 text-lg font-black text-white">{i.subject}</p>{i.preview && <p className="text-mist">{i.preview}</p>}</Link></li>
            ))}
          </ul>
        ) : (
          <div className="panel mx-auto max-w-xl p-8 text-center">
            <p className="font-display text-2xl text-white">The first issue is on its way</p>
            <p className="mt-2 text-mist">Subscribe to get it the day it’s sent.</p>
            <div className="mt-6 text-left"><NewsletterForm source="archive_empty" /></div>
          </div>
        )}
      </Section>
    </>
  );
}
