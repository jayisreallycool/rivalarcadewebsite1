import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Container } from '@/components/ui';
import { hasDb } from '@/lib/server/db';
import { unsubscribe } from '@/lib/server/newsletter';
import { meta } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const metadata = meta({ title: 'Unsubscribe', description: 'Unsubscribe from RivalArcade emails.', path: '/newsletter/unsubscribe', noindex: true });

async function doUnsubscribe(formData: FormData) {
  'use server';
  const token = String(formData.get('token') || '').slice(0, 100);
  const ok = token && hasDb() ? await unsubscribe(token).catch(() => false) : false;
  redirect(`/newsletter/unsubscribe?done=${ok ? '1' : '0'}`);
}

/** Two-step unsubscribe (button press) so link scanners and prefetchers can't unsubscribe people. */
export default async function Unsubscribe({ searchParams }: { searchParams: Promise<{ token?: string; done?: string }> }) {
  const sp = await searchParams;
  return (
    <section className="pb-24 pt-[calc(8rem+var(--bar,0px))]">
      <Container className="max-w-xl text-center">
        {sp.done === '1' ? (
          <><h1 className="font-display text-5xl text-white">You’re unsubscribed</h1><p className="mt-4 text-mist">You won’t get any more newsletters from RivalArcade. Changed your mind? <Link href="/newsletter" className="text-gold underline">Resubscribe</Link>.</p></>
        ) : sp.done === '0' ? (
          <><h1 className="font-display text-4xl text-white">We couldn’t find that subscription</h1><p className="mt-4 text-mist">The link may be incomplete. Try the unsubscribe link in a recent email, or <Link href="/contact" className="text-gold underline">contact us</Link>.</p></>
        ) : sp.token ? (
          <form action={doUnsubscribe}>
            <input type="hidden" name="token" value={sp.token} />
            <h1 className="font-display text-5xl text-white">Unsubscribe?</h1>
            <p className="mt-4 text-mist">You’ll stop receiving the RivalArcade newsletter.</p>
            <button type="submit" className="btn btn-gold btn-lg mt-8">Yes, unsubscribe me</button>
          </form>
        ) : (
          <><h1 className="font-display text-4xl text-white">Unsubscribe</h1><p className="mt-4 text-mist">Use the unsubscribe link at the bottom of any RivalArcade email.</p></>
        )}
      </Container>
    </section>
  );
}
