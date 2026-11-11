import { RankBadge } from '@/components/Brand';
import { PhoneFrame } from '@/components/cards';
import { CtaBand, Feature, Heading, JsonLd, PageHero, PlayButton, LinkButton, RelatedLinks, Section } from '@/components/ui';
import { ACHIEVEMENT_GROUPS, RANK_TIERS, SEASON_PASS, xpForLevel } from '@/lib/content';
import { breadcrumbLd, metaFor } from '@/lib/seo';

export const generateMetadata = () => metaFor({ title: 'Player Progression — RivalRank, Levels, Season Pass', description: 'How progression works in RivalArcade: the eight-tier RivalRank ladder, quarterly seasons, levels and XP, daily and weekly challenges, 29 achievements and a free + VIP season pass.', path: '/progression', kicker: 'Progression' });

export default function Progression() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Progression', path: '/progression' }])} />
      <PageHero kicker="Player progression" title={<>Every run <span className="gold-text">counts</span>.</>} sub="RivalRank for competitive skill, levels for time played, challenges for daily goals, achievements for milestones and a season pass for the long haul." art={<PhoneFrame src="/screens/season-pass.webp" alt="RivalArcade season pass progression" priority />}>
        <PlayButton placement="progression_hero" size="lg" />
        <LinkButton href="/blog/rivalrank-explained" size="lg" track="progression_guide">RivalRank guide</LinkButton>
      </PageHero>
      <Section>
        <Heading kicker="RivalRank" title="Eight tiers from Bronze to Rival Elite" sub="An Elo-style rating that starts at 1200 and moves with rated 1v1 results. Five placement matches, per-game ratings and quarterly seasons with a soft reset halfway back toward 1200." />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {RANK_TIERS.map((t) => (
            <div key={t.name} className="panel reveal flex items-center gap-4 p-4">
              <RankBadge color={t.color} size={48} label={`${t.name} tier`} />
              <div><p className="font-display text-xl" style={{ color: t.color }}>{t.name}</p><p className="text-sm text-mist">{t.min ? `${t.min}+ rating` : 'Starting tier'}</p></div>
            </div>
          ))}
        </div>
      </Section>
      <Section className="bg-charcoal/60">
        <div className="grid gap-6 md:grid-cols-3">
          <Feature icon="trending-up" title="Levels & XP">Practice runs earn 30 XP, competitive matches 40 and cup runs 60. Each level costs a little more: level 1 → 2 takes {xpForLevel(1)} XP, level 10 → 11 takes {xpForLevel(10)}.</Feature>
          <Feature icon="calendar" title="Daily challenges">A fresh set every day, plus a login streak worth 50 RC rising to 100 RC.</Feature>
          <Feature icon="layers" title="Weekly challenges">Duelist, Competitor, Cup Run, Regular, Taskmaster and Grinder — reset Mondays 00:00 UTC.</Feature>
        </div>
      </Section>
      <Section>
        <Heading kicker="Season pass" title="Free track and VIP track" sub="Season XP from practice and tournaments unlocks tiers. Here are the opening tiers of the current season." />
        <div className="panel overflow-x-auto">
          <table className="w-full min-w-[560px] text-left">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.15em] text-gold"><tr><th className="p-4">Tier</th><th className="p-4">Season XP</th><th className="p-4">Free reward</th><th className="p-4">VIP reward</th></tr></thead>
            <tbody className="divide-y divide-line">{SEASON_PASS.map((t) => <tr key={t.tier}><td className="p-4 font-display text-xl text-white">{t.tier}</td><td className="p-4 text-mist">{t.xp}</td><td className="p-4 text-white">{t.free}</td><td className="p-4 text-gold">{t.vip}</td></tr>)}</tbody>
          </table>
        </div>
      </Section>
      <Section className="bg-charcoal/60">
        <Heading kicker="Achievements" title="29 milestones" sub="From your first victory to Rival Elite, each pays Rival Coins." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACHIEVEMENT_GROUPS.map((g) => (
            <div key={g.group} className="panel p-5"><p className="kicker mb-3">{g.group}</p><ul className="space-y-1.5 text-white/85">{g.items.map((i) => <li key={i}>{i}</li>)}</ul></div>
          ))}
        </div>
      </Section>
      <RelatedLinks links={[
        { href: '/gaming-leaderboards', label: 'Leaderboards', text: 'Season, peak, streaks, weekly and per game.' },
        { href: '/rival-coins', label: 'Rival Coins', text: 'What achievements and challenges pay.' },
        { href: '/competitions', label: 'Competitions', text: 'Where rating is won and lost.' },
      ]} />
      <CtaBand placement="progression_band" title="Start your placement matches." />
    </>
  );
}
