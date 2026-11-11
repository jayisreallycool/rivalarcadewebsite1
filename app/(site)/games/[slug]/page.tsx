import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GameCard } from '@/components/cards';
import { Icon } from '@/components/Icons';
import ShareButtons from '@/components/ShareButtons';
import { Breadcrumbs, Container, CtaBand, JsonLd, LinkButton, PlayButton, Section } from '@/components/ui';
import { GAMES, MODES, gameById } from '@/lib/content';
import { breadcrumbLd, metaFor } from '@/lib/seo';
import { absolute, APP_URL } from '@/lib/site';

export const dynamicParams = false;
export const generateStaticParams = () => GAMES.map((g) => ({ slug: g.id }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const g = gameById((await params).slug);
  if (!g) return {};
  return metaFor({ title: `${g.title} — Free ${g.genre} Game`, description: `${g.blurb} Play ${g.title} free in your browser on RivalArcade: practice solo, then take on real players in 1v1 duels and live arenas on the same seed.`, path: `/games/${g.id}`, image: `/games/${g.id}.webp` });
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const g = gameById((await params).slug);
  if (!g) notFound();
  const others = GAMES.filter((x) => x.id !== g.id && x.tags.some((t) => g.tags.includes(t))).slice(0, 4);
  return (
    <>
      <JsonLd data={[
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Games', path: '/games' }, { name: g.title, path: `/games/${g.id}` }]),
        { '@context': 'https://schema.org', '@type': 'VideoGame', name: g.title, genre: g.genre, description: g.blurb, url: absolute(`/games/${g.id}`), image: absolute(`/games/${g.id}.webp`), gamePlatform: 'Web browser', playMode: ['SinglePlayer', 'MultiPlayer'], isPartOf: { '@type': 'VideoGame', name: 'RivalArcade', url: APP_URL }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      ]} />
      <header className="relative overflow-hidden border-b border-line pb-14 pt-[calc(7rem+var(--bar,0px))] sm:pt-[calc(8.5rem+var(--bar,0px))]">
        <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: `radial-gradient(ellipse at 70% 20%, ${g.color}, transparent 60%)` }} />
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <Container className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Games', path: '/games' }, { name: g.title, path: `/games/${g.id}` }]} />
            <p className="kicker mb-3" style={{ color: g.color }}>{g.genre}</p>
            <h1 className="font-display text-5xl leading-none text-white sm:text-7xl">{g.title}</h1>
            <p className="mt-5 max-w-xl text-xl leading-relaxed text-mist">{g.blurb}</p>
            <div className="mt-5 flex flex-wrap gap-2">{g.tags.map((t) => <span key={t} className="chip">{t}</span>)}<span className="chip">Free</span><span className="chip">1v1 · Arena · Practice</span></div>
            <div className="mt-8 flex flex-wrap gap-3">
              <PlayButton placement={`game_${g.id}_hero`} label={`Play ${g.title}`} size="lg" className="animate-pulse-ring" />
              <LinkButton href="/competitions" size="lg" track={`game_${g.id}_modes`}>Match modes</LinkButton>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[340px] rotate-2 overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
            <Image src={`/games/${g.id}.webp`} alt={`${g.title} cover art`} width={600} height={860} priority sizes="340px" className="h-auto w-full" />
          </div>
        </Container>
      </header>
      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="panel p-6 lg:col-span-2">
            <p className="kicker mb-3">How to play</p>
            <p className="font-display text-2xl text-white sm:text-3xl">{g.goal}</p>
            <h2 className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-mist">Controls</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-3">
              {g.controls.map((c, i) => (
                <li key={c} className="rounded-xl border border-line bg-black/30 p-4"><span className="font-display text-2xl text-gold">{i + 1}</span><p className="mt-1 font-bold text-white">{c}</p></li>
              ))}
            </ul>
            <h2 className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-mist">Round</h2>
            <p className="mt-2 text-white/85">{g.ends}</p>
          </div>
          <div className="panel p-6">
            <h2 className="kicker mb-4">Points</h2>
            <dl className="divide-y divide-line">
              {g.points.map((p) => (
                <div key={p.label} className="flex items-center justify-between gap-4 py-3"><dt className="text-mist">{p.label}</dt><dd className="font-display text-xl text-white">{p.value}</dd></div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-mist">Plus RivalArcade’s shared multipliers: ON FIRE ×2 for five in a row{g.ends.includes('60') ? ', CLUTCH ×2 in the last ten seconds' : ''}.</p>
          </div>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="panel gold-border p-6">
            <p className="kicker mb-2">Pro tip</p>
            <p className="text-lg text-white/90">{g.tip}</p>
          </div>
          {g.cup ? (
            <div className="panel p-6">
              <p className="kicker mb-2">Scheduled cup · {g.cup.badge}</p>
              <p className="font-display text-2xl text-white">{g.cup.title}</p>
              <p className="mt-2 text-mist">{g.cup.description}</p>
              <p className="mt-3 flex items-center gap-2 font-bold text-white"><Icon name="trophy" size={16} className="text-gold" /> {g.cup.prize}</p>
            </div>
          ) : (
            <div className="panel p-6">
              <p className="kicker mb-2">Compete</p>
              <p className="text-mist">{g.title} is available for {MODES.filter((m) => m.id !== 'cup').map((m) => m.title).join(', ')}. Every competitive entrant plays the identical seed.</p>
              <Link href="/competitions" className="mt-3 inline-flex items-center gap-1 font-bold text-gold">Competition formats <Icon name="arrow-right" size={16} /></Link>
            </div>
          )}
        </div>
        <div className="mt-8"><ShareButtons url={absolute(`/games/${g.id}`)} title={`${g.title} on RivalArcade — ${g.blurb}`} /></div>
      </Section>
      {others.length > 0 && (
        <Section className="bg-charcoal/60">
          <h2 className="mb-6 font-display text-3xl text-white">If you like {g.title}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">{others.map((o) => <GameCard key={o.id} game={o} />)}</div>
        </Section>
      )}
      <CtaBand placement={`game_${g.id}_band`} title={`Ready for ${g.title}?`} />
    </>
  );
}
