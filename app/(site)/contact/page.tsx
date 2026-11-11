import Link from 'next/link';
import { Icon } from '@/components/Icons';
import InquiryForm from '@/components/forms/InquiryForm';
import { Container, JsonLd } from '@/components/ui';
import { breadcrumbLd, metaFor } from '@/lib/seo';
import { APP_URL } from '@/lib/site';

export const generateMetadata = () => metaFor({ title: 'Contact RivalArcade', description: 'Contact the RivalArcade team about player support, partnerships, advertising, sponsorship or press. We reply by email.', path: '/contact', kicker: 'Contact' });

export default function Contact() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]), { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact RivalArcade' }]} />
      <section className="relative pb-20 pt-[calc(7rem+var(--bar,0px))] sm:pt-[calc(8.5rem+var(--bar,0px))]">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <Container className="relative grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="kicker mb-3">Contact</p>
            <h1 className="font-display text-5xl text-white sm:text-6xl">Talk to <span className="gold-text">the team</span></h1>
            <p className="mt-4 text-lg text-mist">Questions, feedback, partnerships or press — send us a message and we’ll reply by email.</p>
            <ul className="mt-8 space-y-4">
              {[
                ['circle-help', 'Account or match problem?', <>For account, match-result, privacy and deletion requests, use the in-app contact page at <a href={`${APP_URL}/contact`} className="text-gold underline" target="_blank" rel="noopener" data-app-link="contact_support">rivalarcade.vercel.app/contact</a> so we can find your account.</>],
                ['megaphone', 'Advertising & sponsorship', <>See <Link href="/advertise" className="text-gold underline">Advertise</Link> and <Link href="/sponsorships" className="text-gold underline">Sponsorships</Link>.</>],
                ['video', 'Creators', <>Apply on the <Link href="/creators" className="text-gold underline">creator partnerships</Link> page.</>],
                ['newspaper', 'Press', <>Grab assets from the <Link href="/press" className="text-gold underline">press kit</Link>.</>],
              ].map(([icon, t, d]) => (
                <li key={t as string} className="flex gap-3"><span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold"><Icon name={icon as string} size={20} /></span><span><span className="block font-black text-white">{t}</span><span className="text-mist">{d}</span></span></li>
              ))}
            </ul>
          </div>
          <InquiryForm source="contact" />
        </Container>
      </section>
    </>
  );
}
