import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icons';
import ShareButtons from '@/components/ShareButtons';
import { CtaBand, Heading, JsonLd, LinkButton, PageHero, PlayButton, RelatedLinks, Section } from '@/components/ui';
import { ECONOMY, GAMES, COSMETICS, RARITY } from '@/lib/content';
import { breadcrumbLd, metaFor } from '@/lib/seo';
import { absolute } from '@/lib/site';

export const generateMetadata = () => metaFor({ title: 'Tournaments — Free Cups With Exclusive Prizes', description: 'RivalArcade cups are free score-attack tournaments: one run on the cup seed, a 600 RC pool for the top seven and an exclusive cosmetic for the champion. See the current cup rotation.', path: '/tournaments', kicker: 'Tournaments' });

export default function Tournaments() {
  const cups = GAMES.filter((g) => g.cup);
  const prize = (name: string) => COSMETICS.find((c) => name.startsWith(c.name));
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Tournaments', path: '/tournaments' }])} />
      <PageHero kicker="Tournaments" title={<>Cups: one run to <span className="gold-text">take the crown</span>.</>} sub={`Free score-attack tournaments on a shared seed. Play once during the window; when it closes, the top seven share ${ECONOMY.cupPool} RC and the champion takes the cup’s exclusive cosmetic.`}>
        <PlayButton placement="tournaments_hero" size="lg" label="See live cups" />
        <LinkButton href="/competitions" size="lg" track="tournaments_formats">All formats</LinkButton>
      </PageHero>
      <Section>
        <Heading kicker="The rotation" title="Current cups" sub="Cups open on their own schedule in the app’s Leagues tab. These are the cups in the current rotation and their champion prizes." />
        <div className="grid gap-6 md:grid-cols-2">
          {cups.map((g) => {
            const item = prize(g.cup!.prize);
            return (
              <article key={g.id} id={g.id} className="panel panel-hover reveal grid overflow-hidden sm:grid-cols-[160px_1fr]">
                <div className="relative min-h-40"><Image src={`/games/${g.id}-sm.webp`} alt={`${g.title} cover art`} fill sizes="160px" className="object-cover" /></div>
                <div className="p-6">
                  <span className="chip !text-gold">{g.cup!.badge}</span>
                  <h2 className="mt-3 font-display text-2xl text-white">{g.cup!.title}</h2>
                  <p className="mt-1 text-sm font-bold" style={{ color: g.color }}>{g.title}</p>
                  <p className="mt-3 text-mist">{g.cup!.description}</p>
                  <div className="mt-4 flex items-center gap-3">
                    {item && <Image src={`/items/${item.id}.webp`} alt={item.name} width={48} height={48} className="rounded-lg border" style={{ borderColor: RARITY[item.rarity].color }} />}
                    <p className="text-sm"><span className="block text-xs font-black uppercase tracking-wider text-mist">Champion prize</span><span className="font-bold text-white">{g.cup!.prize}</span>{item && <span className="ml-1" style={{ color: RARITY[item.rarity].color }}>· {RARITY[item.rarity].label}</span>}</p>
                  </div>
                  <Link href={`/games/${g.id}`} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-gold">Practise {g.title} <Icon name="arrow-right" size={14} /></Link>
                </div>
              </article>
            );
          })}
        </div>
      </Section>
      <Section className="bg-charcoal/60">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="prose-ra">
            <h2>How a cup works</h2>
            <ol>
              <li>Open the Leagues tab in RivalArcade and pick an open cup.</li>
              <li>Join — cups are free to enter.</li>
              <li>Play your one run on the cup seed. Everyone in the cup gets the same seed.</li>
              <li>Watch the cup leaderboard until the window closes.</li>
              <li>The cup settles automatically: the top seven share the {ECONOMY.cupPool} RC pool and the champion receives the cosmetic (or 300 RC if they already own it).</li>
            </ol>
            <h2>What’s not here yet</h2>
            <p>Today’s cups are score-attack. Bracket formats (single or double elimination, round robin) and private or custom competitions aren’t built yet. We’ll announce them on the <Link href="/news">news page</Link> and in the <Link href="/newsletter">newsletter</Link> when they are.</p>
          </div>
          <div className="panel gold-border self-start p-7">
            <h2 className="font-display text-2xl text-white">Want to sponsor a cup?</h2>
            <p className="mt-2 text-mist">Brands and creators can host a sponsored cup with a custom name, cosmetic concept and announcement.</p>
            <LinkButton href="/sponsorships" variant="gold" className="mt-5" track="tournaments_sponsor">Sponsorship opportunities</LinkButton>
            <div className="mt-6 border-t border-line pt-5"><ShareButtons url={absolute('/tournaments')} title="Free RivalArcade cups — one run on the same seed, exclusive cosmetic for the champion" label="Share cups" /></div>
          </div>
        </div>
      </Section>
      <RelatedLinks links={[
        { href: '/online-gaming-tournaments', label: 'Online gaming tournaments', text: 'Why one-run cups are the fairest format.' },
        { href: '/rewards', label: 'Rewards & cosmetics', text: 'The items cups pay out.' },
        { href: '/blog/dunk-rush-guide', label: 'Dunk Rush guide', text: 'Prep for the Sub-Zero 3-Point Shootout.' },
      ]} />
      <CtaBand placement="tournaments_band" title="The next cup is open." />
    </>
  );
}
