import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container, JsonLd } from './ui';
import { breadcrumbLd } from '@/lib/seo';

export default function LegalPage({ title, path, updated, toc, children }: { title: string; path: string; updated: string; toc: { id: string; label: string }[]; children: ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: title, path }])} />
      <section className="pb-24 pt-[calc(7rem+var(--bar,0px))] sm:pt-[calc(8.5rem+var(--bar,0px))]">
        <Container className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label="Sections" className="hidden lg:block"><ul className="sticky top-28 space-y-2 text-sm">{toc.map((t) => <li key={t.id}><a href={`#${t.id}`} className="text-white/65 hover:text-gold">{t.label}</a></li>)}</ul></nav>
          <article className="max-w-3xl">
            <p className="kicker mb-3">Legal</p>
            <h1 className="font-display text-5xl text-white">{title}</h1>
            <p className="mt-3 text-sm text-mist">Last updated {updated}. This page covers this website. The RivalArcade game has its own policies at <a href="https://rivalarcade.vercel.app/privacy" className="text-gold underline" data-app-link="legal_app_policies">rivalarcade.vercel.app</a>.</p>
            <div className="prose-ra mt-10">{children}</div>
            <p className="mt-12 text-sm text-mist">Questions? <Link href="/contact" className="text-gold underline">Contact us</Link>.</p>
          </article>
        </Container>
      </section>
    </>
  );
}
