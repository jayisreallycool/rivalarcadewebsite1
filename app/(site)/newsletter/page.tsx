import Link from 'next/link';
import { Icon } from '@/components/Icons';
import NewsletterForm from '@/components/forms/NewsletterForm';
import { Container, JsonLd } from '@/components/ui';
import { breadcrumbLd, metaFor } from '@/lib/seo';

export const generateMetadata = () => metaFor({ title: 'Newsletter — Cups, Drops & Game Updates', description: 'Subscribe to the RivalArcade newsletter for tournament announcements, new games, feature launches and gaming news. Double opt-in, unsubscribe any time.', path: '/newsletter', kicker: 'Newsletter' });

export default function Newsletter() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Newsletter', path: '/newsletter' }])} />
      <section className="relative overflow-hidden pb-24 pt-[calc(7rem+var(--bar,0px))] sm:pt-[calc(9rem+var(--bar,0px))]">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-gold/12 blur-[120px]" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="kicker mb-4">The RivalArcade newsletter</p>
            <h1 className="font-display text-5xl leading-[1.02] text-white sm:text-6xl">Never miss <span className="gold-text">a cup</span>.</h1>
            <p className="mt-5 text-lg text-mist">Occasional emails, only when there’s something worth knowing:</p>
            <ul className="mt-5 space-y-3">
              {[['trophy', 'Tournament announcements', 'New cups, sponsored events and prizes.'], ['sparkles', 'New feature announcements', 'New games, modes and updates as they ship.'], ['gem', 'Promotional announcements', 'Featured collections and limited store windows.'], ['newspaper', 'Gaming news', 'Guides and highlights from the blog.']].map(([i, t, d]) => (
                <li key={t} className="flex gap-3"><Icon name={i} className="mt-0.5 shrink-0 text-gold" /><span><span className="font-black text-white">{t}</span> <span className="text-mist">— {d}</span></span></li>
              ))}
            </ul>
          </div>
          <div className="panel gold-border p-6 sm:p-8">
            <h2 className="font-display text-2xl text-white">Subscribe</h2>
            <p className="mb-5 mt-1 text-sm text-mist">We’ll send a confirmation email first (double opt-in). Every email has a one-click unsubscribe link.</p>
            <NewsletterForm source="newsletter_page" />
            <p className="mt-6 text-sm text-mist">Past issues: <Link href="/newsletter/archive" className="text-gold underline">newsletter archive</Link></p>
          </div>
        </Container>
      </section>
    </>
  );
}
