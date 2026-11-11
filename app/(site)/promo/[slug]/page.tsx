import Image from 'next/image';
import { notFound } from 'next/navigation';
import ShareButtons from '@/components/ShareButtons';
import { Container, CtaBand, PlayButton, Section } from '@/components/ui';
import { renderMarkdown } from '@/lib/markdown';
import { getLandingPage, liveLandingPages } from '@/lib/server/data';
import { slugify } from '@/lib/server/security';
import { meta } from '@/lib/seo';
import { absolute } from '@/lib/site';

export const revalidate = 300;
export async function generateStaticParams() {
  return (await liveLandingPages()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = await getLandingPage((await params).slug);
  if (!p) return {};
  return meta({ title: p.seoTitle || p.title, description: p.seoDescription || p.subheadline || p.headline, path: `/promo/${p.slug}`, image: p.heroImage || undefined, kicker: 'Campaign' });
}

/** Campaign landing pages created in the admin (launches, recruitment drives, creator campaigns). */
export default async function Promo({ params }: { params: Promise<{ slug: string }> }) {
  const p = await getLandingPage((await params).slug);
  if (!p) notFound();
  const campaign = p.utmCampaign || `promo_${slugify(p.slug)}`;
  return (
    <>
      <header className="relative overflow-hidden border-b border-line pb-16 pt-[calc(7rem+var(--bar,0px))] sm:pt-[calc(9rem+var(--bar,0px))]">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gold/15 blur-[130px]" />
        <Container className={`relative ${p.heroImage ? 'grid items-center gap-10 lg:grid-cols-2' : 'text-center'}`}>
          <div>
            <p className={`kicker mb-4 ${p.heroImage ? '' : 'justify-center'}`}>{p.title}</p>
            <h1 className="font-display text-5xl leading-[1.02] text-white sm:text-7xl">{p.headline}</h1>
            {p.subheadline && <p className={`mt-5 max-w-2xl text-xl text-mist ${p.heroImage ? '' : 'mx-auto'}`}>{p.subheadline}</p>}
            <div className={`mt-8 flex flex-wrap gap-3 ${p.heroImage ? '' : 'justify-center'}`}><PlayButton placement={`promo_${p.slug}_hero`} campaign={campaign} label={p.ctaLabel} size="lg" className="animate-pulse-ring" /></div>
          </div>
          {p.heroImage && <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-line"><Image src={p.heroImage} alt="" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>}
        </Container>
      </header>
      {p.body && (
        <Section>
          <div className="prose-ra mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.body) }} />
          <div className="mx-auto mt-10 max-w-3xl border-t border-line pt-6"><ShareButtons url={absolute(`/promo/${p.slug}`)} title={p.headline} /></div>
        </Section>
      )}
      <CtaBand placement={`promo_${p.slug}_band`} />
    </>
  );
}
