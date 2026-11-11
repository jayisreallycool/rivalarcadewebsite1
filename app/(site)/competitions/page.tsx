import { Icon } from '@/components/Icons';
import { CtaBand, Heading, JsonLd, LinkButton, PageHero, PlayButton, RelatedLinks, Section } from '@/components/ui';
import { ECONOMY } from '@/lib/content';
import { breadcrumbLd, metaFor } from '@/lib/seo';

export const generateMetadata = () => metaFor({ title: 'Competitions — 1v1 Duels, Live Arenas & Cups', description: 'RivalArcade competition formats: same-seed 1v1 duels, five-player Live Arenas and scheduled cups. Free to enter, prizes paid in Rival Coins, crowns and RivalRank on the line.', path: '/competitions', kicker: 'Compete' });

const FORMATS = [
  { icon: 'swords', name: '1v1 Duel', who: '2 players', prize: `${ECONOMY.duel.win} RC to the winner · +1 crown`, rules: ['You play your run now; your rival plays the identical seed.', 'Higher score wins. A tie pays each player 10 RC.', 'A loser who finishes the run still earns 3 RC.', 'Rated duels move your RivalRank.', 'No opponent within 24 hours? The challenge closes.'] },
  { icon: 'users', name: 'Live Arena', who: 'Up to 5 players', prize: `${ECONOMY.arenaPool} RC pool · ${ECONOMY.arenaSplit.join(' / ')} RC`, rules: ['Up to five players on one seed.', '1st, 2nd and 3rd split the pool 50 / 30 / 20.', '1st earns +2 crowns, 2nd +1.', 'Tied places share the prize for those places.'] },
  { icon: 'trophy', name: 'Cup', who: 'A whole field', prize: `${ECONOMY.cupPool} RC pool · top 7 · champion cosmetic`, rules: ['Scheduled windows, from 3-hour flash cups to 24-hour majors.', 'One run each on the cup seed.', 'The top seven share the pool; the champion takes the cup’s cosmetic.', 'Top three earn +3 / +2 / +1 crowns.'] },
];

export default function Competitions() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Competitions', path: '/competitions' }])} />
      <PageHero kicker="Competitive gaming" title={<>Pick your <span className="gold-text">format</span>.</>} sub="Three ways to compete, one rule that matters: every player in a contest plays the identical seed, one run each. All Rival Coin contests are free to enter and the prizes are paid by the house.">
        <PlayButton placement="competitions_hero" size="lg" label="Find a match" />
        <LinkButton href="/tournaments" size="lg" track="competitions_cups">Cup schedule</LinkButton>
      </PageHero>
      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {FORMATS.map((f) => (
            <article key={f.name} className="panel panel-hover reveal flex flex-col p-7">
              <div className="flex items-center justify-between"><Icon name={f.icon} size={30} className="text-gold" /><span className="chip">{f.who}</span></div>
              <h2 className="mt-5 font-display text-3xl text-white">{f.name}</h2>
              <p className="mt-2 font-bold text-gold">{f.prize}</p>
              <ul className="mt-5 space-y-2.5 text-mist">{f.rules.map((r) => <li key={r} className="flex gap-2"><Icon name="check" size={18} className="mt-0.5 shrink-0 text-gold" />{r}</li>)}</ul>
            </article>
          ))}
        </div>
      </Section>
      <Section className="bg-charcoal/60">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Heading kicker="Crowns & leagues" title="Results that stack up" sub="Competitive finishes earn crowns, which move you through six leagues: Bronze, Silver, Gold, Platinum, Diamond and Champion. Separately, rated 1v1s move your RivalRank rating." />
            <LinkButton href="/progression" track="competitions_progression">How RivalRank works</LinkButton>
          </div>
          <div className="panel overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.15em] text-gold"><tr><th className="p-4">League</th><th className="p-4">Crowns</th></tr></thead>
              <tbody className="divide-y divide-line">
                {[['Bronze', 0], ['Silver', 10], ['Gold', 25], ['Platinum', 50], ['Diamond', 90], ['Champion', 150]].map(([n, c]) => <tr key={n}><td className="p-4 font-black text-white">{n}</td><td className="p-4 text-mist">{c}+</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </Section>
      <Section>
        <Heading kicker="Integrity" title="Why results can be trusted" />
        <div className="grid gap-4 md:grid-cols-3">
          {[['Identical seeds', 'Same board, same pattern, same targets for every entrant.'], ['Server-side judging', 'Runs are timed by the server; impossible scores are rejected and big jumps reviewed.'], ['No win-trading', `Rewards from the same opponent are capped at ${ECONOMY.sameOpponentDaily} matches a day.`]].map(([t, d]) => (
            <div key={t} className="panel p-6"><h3 className="font-black text-white">{t}</h3><p className="mt-2 text-mist">{d}</p></div>
          ))}
        </div>
      </Section>
      <RelatedLinks links={[
        { href: '/tournaments', label: 'Tournaments', text: 'Cups, prizes and the rotation.' },
        { href: '/online-gaming-competitions', label: 'Online gaming competitions', text: 'Enter a competition right now.' },
        { href: '/gaming-leaderboards', label: 'Leaderboards', text: 'Every way players are ranked.' },
      ]} />
      <CtaBand placement="competitions_band" title="One seed. One run. Your move." />
    </>
  );
}
