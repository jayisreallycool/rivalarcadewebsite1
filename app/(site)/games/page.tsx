import { GameCard } from '@/components/cards';
import { CtaBand, Heading, JsonLd, PageHero, PlayButton, Section, LinkButton } from '@/components/ui';
import { GAMES, SCORING_RULES } from '@/lib/content';
import { breadcrumbLd, metaFor } from '@/lib/seo';
import { absolute } from '@/lib/site';

export const generateMetadata = () => metaFor({
  title: 'All 12 Games — Free 3D Skill Games',
  description: 'Every RivalArcade game: Dunk Rush, Brick Blitz, Canopy Swing, FightNight, Sky Stack, Axe Spin, Beat Tiles, Slice Storm, Prism Hop, Neon Dash, Cyber Reflex and Gem Surge. Free to play in your browser.',
  path: '/games', kicker: 'The game library',
});

export default function GamesPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Games', path: '/games' }]), { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: GAMES.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: absolute(`/games/${g.id}`), name: g.title })) }]} />
      <PageHero kicker="The game library" title={<>Twelve games. <span className="gold-text">One scoring language.</span></>} sub="Short, sharp 3D skill games built for competition. Each takes seconds to learn and much longer to master — and every one works with 1v1 duels, live arenas and free practice.">
        <PlayButton placement="games_hero" size="lg" />
        <LinkButton href="/how-it-works" size="lg" track="games_how">How matches work</LinkButton>
      </PageHero>
      <Section>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {GAMES.map((g, i) => <GameCard key={g.id} game={g} priority={i < 4} />)}
        </div>
      </Section>
      <Section className="bg-charcoal/60">
        <Heading kicker="Scoring" title="The same rules in every game" sub="Switch games and the points still mean the same thing. Results breakdowns read from the same scoring book as the game, so they always add up." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SCORING_RULES.map((r) => (
            <div key={r.title} className="panel reveal p-6"><h3 className="font-display text-2xl text-gold">{r.title}</h3><p className="mt-2 text-mist">{r.text}</p></div>
          ))}
        </div>
      </Section>
      <CtaBand placement="games_band" title="Pick a game. Find a rival." />
    </>
  );
}
