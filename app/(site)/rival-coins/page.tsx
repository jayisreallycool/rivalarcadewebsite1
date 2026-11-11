import { Coin } from '@/components/Brand';
import { PhoneFrame } from '@/components/cards';
import { Icon } from '@/components/Icons';
import { CtaBand, Heading, JsonLd, LinkButton, PageHero, PlayButton, RelatedLinks, Section } from '@/components/ui';
import { ECONOMY, RARITY, RARITY_ORDER, WEEKLY_CHALLENGES } from '@/lib/content';
import { breadcrumbLd, faqLd, metaFor } from '@/lib/seo';

export const generateMetadata = () => metaFor({ title: 'Rival Coins — How to Earn RC and What It Buys', description: 'Rival Coins (RC) are RivalArcade’s cosmetic-only currency. Earn them from logins, challenges, achievements, duels, arenas and cups — never buy them. Daily cap, prices and rules explained.', path: '/rival-coins', kicker: 'Rival Coins' });

const EARN = [
  ['Welcome grant', `${ECONOMY.signupBonus.toLocaleString()} RC once`, 'gift'],
  ['Daily login', `${ECONOMY.login.base} RC + ${ECONOMY.login.perStreakDay}/streak day, max ${ECONOMY.login.max}`, 'calendar'],
  ['Practice run', `${ECONOMY.practice.min}–${ECONOMY.practice.max} RC, up to ${ECONOMY.practice.dailyCap}/day`, 'target'],
  ['1v1 duel', `Win ${ECONOMY.duel.win} · tie ${ECONOMY.duel.tie} · played ${ECONOMY.duel.played}`, 'swords'],
  ['Live Arena', `${ECONOMY.arenaSplit.join(' / ')} RC for the top 3`, 'users'],
  ['Cup', `${ECONOMY.cupPool} RC across the top 7 + champion cosmetic`, 'trophy'],
  ['Daily challenges', 'A fresh set every day', 'zap'],
  ['Weekly challenges', '400–600 RC each, reset Mondays 00:00 UTC', 'layers'],
  ['Achievements', '29 achievements, 50 to 2,000 RC', 'medal'],
] as const;

const FAQ = [
  { q: 'Can I buy Rival Coins?', a: 'No. Rival Coins can only be earned by playing. There is no way to purchase them.' },
  { q: 'Can I cash out Rival Coins?', a: 'No. Rival Coins have no cash value and can’t be withdrawn, sold or exchanged.' },
  { q: 'Can I send Rival Coins to a friend?', a: 'No. There are no player-to-player transfers.' },
  { q: 'Do I risk coins when I enter a match?', a: 'No. Rival Coins are never staked. Every Rival Coin contest is free to enter and the house pays the prizes.' },
  { q: 'Why is there a daily cap?', a: `Gameplay rewards are capped at ${ECONOMY.dailyCap.toLocaleString()} RC per UTC day so the economy stays fair and rare items stay rare. The welcome grant doesn’t count toward the cap.` },
];

export default function RivalCoins() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Rival Coins', path: '/rival-coins' }]), faqLd(FAQ)]} />
      <PageHero kicker="Rival Coins · RC" title={<>The coin you can only <span className="gold-text">earn</span>.</>} sub="Rival Coins are RivalArcade’s cosmetic currency. You earn them by playing and spend them on gear for your avatar and the season pass VIP track. They can’t be bought, withdrawn or transferred — and they’re never staked." art={<div className="flex justify-center"><Coin size={260} id="rcHero" className="animate-float drop-shadow-[0_30px_60px_rgba(233,185,73,0.35)]" /></div>}>
        <PlayButton placement="coins_hero" size="lg" label={`Claim ${ECONOMY.signupBonus.toLocaleString()} RC`} />
        <LinkButton href="/rewards" size="lg" track="coins_rewards">What coins buy</LinkButton>
      </PageHero>
      <Section>
        <Heading kicker="Every way to earn" title="Play more, earn more — fairly" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EARN.map(([t, v, icon]) => (
            <div key={t} className="panel reveal flex items-start gap-4 p-5">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold"><Icon name={icon} size={22} /></span>
              <div><h3 className="font-black text-white">{t}</h3><p className="mt-1 text-mist">{v}</p></div>
            </div>
          ))}
        </div>
        <div className="mt-6 panel gold-border flex flex-wrap items-center justify-between gap-4 p-6">
          <p className="text-lg text-white"><strong className="text-gold">Daily cap:</strong> gameplay rewards top out at {ECONOMY.dailyCap.toLocaleString()} RC per UTC day.</p>
          <p className="text-sm text-mist">Same-opponent rewards are limited to {ECONOMY.sameOpponentDaily} matches a day.</p>
        </div>
      </Section>
      <Section className="bg-charcoal/60">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_280px]">
          <div>
            <Heading kicker="Weekly challenges" title="Big goals, big payouts" sub="Weekly challenges reset every Monday at 00:00 UTC." />
            <div className="grid gap-3 sm:grid-cols-2">
              {WEEKLY_CHALLENGES.map((w) => (
                <div key={w.title} className="flex items-center justify-between gap-3 rounded-xl border border-line p-4">
                  <div><p className="font-black text-white">{w.title}</p><p className="text-sm text-mist">{w.text}</p></div>
                  <span className="flex shrink-0 items-center gap-1 font-display text-lg text-gold"><Coin size={18} id={`w${w.title}`} /> {w.reward}</span>
                </div>
              ))}
            </div>
          </div>
          <PhoneFrame src="/screens/daily-challenges.webp" alt="Daily challenges and the daily earning meter in RivalArcade" />
        </div>
      </Section>
      <Section>
        <Heading kicker="What coins buy" title="Prices by rarity" sub="By RivalArcade’s own economy model, a Mythic takes roughly seven to eight weeks of regular, active play." />
        <div className="panel overflow-x-auto">
          <table className="w-full min-w-[520px] text-left">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.15em] text-gold"><tr><th className="p-4">Rarity</th><th className="p-4">Price</th><th className="p-4">Availability</th></tr></thead>
            <tbody className="divide-y divide-line">
              {RARITY_ORDER.map((r) => (
                <tr key={r}><td className="p-4 font-black" style={{ color: RARITY[r].color }}>{RARITY[r].label}</td><td className="p-4 text-white">{RARITY[r].price[0].toLocaleString()}–{RARITY[r].price[1].toLocaleString()} RC</td><td className="p-4 text-mist">{RARITY[r].availability}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-mist">The season pass VIP track costs {ECONOMY.vipCost.toLocaleString()} RC.</p>
      </Section>
      <Section className="bg-charcoal/60">
        <Heading kicker="Rules" title="Rival Coin FAQ" />
        <div className="divide-y divide-line rounded-2xl border border-line">
          {FAQ.map((f) => <details key={f.q} className="group p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-white">{f.q}<Icon name="chevron-down" className="shrink-0 text-gold transition group-open:rotate-180" /></summary><p className="mt-3 text-mist">{f.a}</p></details>)}
        </div>
      </Section>
      <RelatedLinks links={[
        { href: '/blog/how-to-earn-rival-coins', label: 'Guide: earning Rival Coins', text: 'Tips for hitting the daily cap.' },
        { href: '/rewards', label: 'Rewards & cosmetics', text: 'All six rarity tiers and collections.' },
        { href: '/gaming-rewards', label: 'Gaming rewards', text: 'Rewards you earn, not buy.' },
      ]} />
      <CtaBand placement="coins_band" title="Start your coin streak today." />
    </>
  );
}
