import Link from 'next/link';
import { Container } from '@/components/ui';
import { PlayButton } from '@/components/ui';
import { hasDb } from '@/lib/server/db';
import { confirm } from '@/lib/server/newsletter';
import { meta } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const metadata = meta({ title: 'Confirm subscription', description: 'Confirm your RivalArcade newsletter subscription.', path: '/newsletter/confirm', noindex: true });

export default async function Confirm({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const token = String((await searchParams).token || '').slice(0, 100);
  const email = token && hasDb() ? await confirm(token).catch(() => undefined) : undefined;
  return (
    <section className="pb-24 pt-[calc(8rem+var(--bar,0px))]">
      <Container className="max-w-xl text-center">
        {email ? (
          <>
            <p className="kicker mb-3 justify-center">Subscribed</p>
            <h1 className="font-display text-5xl text-white">You’re in!</h1>
            <p className="mt-4 text-lg text-mist">We’ll email you about new cups, games and features. You can unsubscribe from any email in one click.</p>
            <div className="mt-8 flex justify-center"><PlayButton placement="newsletter_confirmed" campaign="newsletter_confirm" size="lg" /></div>
          </>
        ) : (
          <>
            <h1 className="font-display text-4xl text-white">This link has expired or was already used</h1>
            <p className="mt-4 text-mist">If you’ve already confirmed, you’re all set. Otherwise, <Link href="/newsletter" className="text-gold underline">subscribe again</Link> to get a fresh link.</p>
          </>
        )}
      </Container>
    </section>
  );
}
