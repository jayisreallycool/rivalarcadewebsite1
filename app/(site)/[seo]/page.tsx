import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GameCard } from '@/components/cards';
import { Icon } from '@/components/Icons';
import { Breadcrumbs, Container, CtaBand, JsonLd, LinkButton, PlayButton, Section } from '@/components/ui';
import { gameById, type Game } from '@/lib/content';
import { SEO_PAGES, seoPage } from '@/lib/seo-pages';
import { appLd, breadcrumbLd, faqLd, metaFor } from '@/lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => SEO_PAGES.map((p) => ({ seo: p.slug }));

const LABELS: Record<string, string> = {
  '/competitions': 'Competition formats', '/how-it-works': 'How RivalArcade works', '/tournaments': 'Tournaments & cups', '/games': 'All 12 games', '/about': 'About RivalArcade',
  '/rival-coins': 'Rival Coins', '/rewards': 'Rewards & cosmetics', '/progression': 'Player progression', '/community': 'Community', '/invite': 'Invite friends', '/creators': 'Creator partnerships', '/faq': 'FAQ', '/gaming-leaderboards': 'Leaderboards',
};

export async function generateMetadata({ params }: { params: Promise<{ seo: string }> }) {
  const p = seoPage((await params).seo);
  if (!p) return {};
  return metaFor({ title: p.title, description: p.description, path: `/${p.slug}`, kicker: p.kicker });
}

export default async function SeoLanding({ params }: { params: Promise<{ seo: string }> }) {
  const p = seoPage((await params).seo);
  if (!p) notFound();
  const games = p.highlightGames.map(gameById).filter(Boolean) as Game[];
  const label = (href: string) => LABELS[href] || SEO_PAGES.find((s) => `/${s.slug}` === href)?.kicker || href;
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: p.kicker, path: `/${p.slug}` }]), faqLd(p.faq), appLd()]} />
      <header className="relative overflow-hidden border-b border-line pb-14 pt-[calc(7rem+var(--bar,0px))] sm:pt-[calc(9rem+var(--bar,0px))]">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[700px] rounded-full bg-gold/10 blur-[120px]" />
        <Container className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: p.kicker, path: `/${p.slug}` }]} />
            <p className="kicker mb-4">{p.kicker}</p>
            <h1 className="font-display text-4xl leading-[1.02] text-white sm:text-6xl">{p.h1}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">{p.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PlayButton placement={`seo_${p.slug}_hero`} campaign={`seo_${p.slug}`} size="lg" label="Play free now" />
              <LinkButton href="/how-it-works" size="lg" track={`seo_${p.slug}_how`}>How it works</LinkButton>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">{games.map((g) => <GameCard key={g.id} game={g} />)}</div>
        </Container>
      </header>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="prose-ra max-w-3xl">
            {p.sections.map((s) => (
              <section key={s.h}>
                <h2>{s.h}</h2>
                {s.p.map((t, i) => <p key={i}>{t}</p>)}
                {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
              </section>
            ))}
            <h2>Frequently asked</h2>
            {p.faq.map((f) => (
              <div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
            ))}
          </div>
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="panel gold-border p-6">
              <p className="font-display text-2xl text-white">Play free in your browser</p>
              <p className="mt-2 text-sm text-mist">12 games · 1v1s · arenas · cups · no download</p>
              <PlayButton placement={`seo_${p.slug}_sidebar`} campaign={`seo_${p.slug}`} className="mt-5 w-full" />
            </div>
            <nav aria-label="Related" className="panel p-6">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-gold">Related</p>
              <ul className="space-y-2">
                {p.related.map((r) => (
                  <li key={r}><Link href={r} className="flex items-center justify-between gap-2 font-bold text-white/85 hover:text-gold">{label(r)} <Icon name="arrow-right" size={16} /></Link></li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </Section>
      <CtaBand placement={`seo_${p.slug}_band`} />
    </>
  );
}
