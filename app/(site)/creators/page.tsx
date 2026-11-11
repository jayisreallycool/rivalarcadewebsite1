import { GameCard } from '@/components/cards';
import { Icon } from '@/components/Icons';
import CreatorForm from '@/components/forms/CreatorForm';
import { Feature, Heading, JsonLd, LinkButton, PageHero, PlayButton, RelatedLinks, Section } from '@/components/ui';
import { GAMES } from '@/lib/content';
import { breadcrumbLd, faqLd, metaFor } from '@/lib/seo';

export const generateMetadata = () => metaFor({ title: 'Creator Partnerships — Stream, Host Cups, Grow', description: 'Creators: partner with RivalArcade. Host sponsored 1v1s and cups, get tracked referral links and promo codes, and join exclusive creator campaigns. Apply in two minutes.', path: '/creators', kicker: 'Creator partnerships' });

const FAQ = [
  { q: 'Do I need a big audience?', a: 'No. We review every application. Consistent, original gaming content matters more than follower count.' },
  { q: 'How do referral links work?', a: 'Approved creators get a unique tracked link and code. Visits and app clicks from your link are attributed to you. Any referral reward is granted and verified inside the RivalArcade app — this website never shows or holds balances.' },
  { q: 'Is sponsored content disclosed?', a: 'Yes, always. Paid or sponsored content must follow your platform’s disclosure rules (#ad, paid partnership label) and applicable advertising law.' },
  { q: 'Can I host a tournament for my community?', a: 'That’s the idea behind sponsored creator cups. Tell us about it in your application.' },
];

export default function Creators() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Creators', path: '/creators' }]), faqLd(FAQ)]} />
      <PageHero kicker="Creator partnerships" title={<>Your audience. <span className="gold-text">Your arena.</span></>} sub="RivalArcade is built for content: rounds last about a minute, every match is a head-to-head on the same seed, and your viewers can play from a link in seconds — no download." art={<div className="grid grid-cols-3 gap-3">{GAMES.slice(0, 6).map((g) => <GameCard key={g.id} game={g} />)}</div>}>
        <a href="#apply" className="btn btn-gold btn-lg" data-track="creators_hero_apply"><Icon name="video" size={18} /> Apply now</a>
        <PlayButton placement="creators_hero" size="lg" variant="ghost" label="Try the games" />
      </PageHero>
      <Section>
        <Heading kicker="What RivalArcade is" title="Twelve 3D skill games, built to compete" sub="Dunk Rush, Brick Blitz, Canopy Swing, FightNight and eight more — with same-seed 1v1 duels, five-player arenas, scheduled cups, the RivalRank ladder and 74 cosmetics. Free to play in any browser." />
        <Heading kicker="Why creators promote it" title="Made for clips and community" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Feature icon="timer" title="Short rounds">Timed games last 60 seconds — perfect for Shorts, Reels, TikToks and stream segments.</Feature>
          <Feature icon="swords" title="Viewer challenges">Your viewers play the same seed you did. Beat the creator is a built-in format.</Feature>
          <Feature icon="link" title="Zero friction">A link in bio opens the game in seconds — no app store, no install.</Feature>
          <Feature icon="flame" title="Clip-ready moments">Flame-ball swishes, clutch ×2 finishes and last-row Brick Blitz saves.</Feature>
          <Feature icon="shield-check" title="Brand-safe">No gambling, no cash play, no pay-to-win. Safe to recommend to any audience.</Feature>
          <Feature icon="trending-up" title="Tracked results">Every creator link is UTM-tracked, so you can see the visits and clicks you drive.</Feature>
        </div>
      </Section>
      <Section className="bg-charcoal/60">
        <Heading kicker="Partnership opportunities" title="Ways to partner" />
        <div className="grid gap-5 md:grid-cols-2">
          {[
            ['trophy', 'Sponsored gaming competitions', 'Host a creator cup or a 1v1 series for your community, with a custom name and prize.'],
            ['link', 'Creator referral links', 'A unique tracked link for your bio, descriptions and pinned comments.'],
            ['tag', 'Promotional codes', 'A memorable code tied to your channel for campaigns and giveaways — validated in the app.'],
            ['sparkles', 'Exclusive creator campaigns', 'Early access to new games and features, and launch-day content opportunities.'],
          ].map(([icon, t, d]) => (
            <div key={t} className="panel reveal flex gap-4 p-6"><span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold text-ink"><Icon name={icon} size={22} /></span><span><span className="block text-lg font-black text-white">{t}</span><span className="text-mist">{d}</span></span></div>
          ))}
        </div>
        <p className="mt-6 text-sm text-mist">We’re building the creator programme now. We don’t list creators or partnerships on this site until they’ve agreed to it.</p>
      </Section>
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <Heading kicker="Apply" title="Join the creator programme" sub="Two minutes. We review every application and reply by email." />
            <div className="space-y-5">
              {FAQ.map((f) => <div key={f.q}><h3 className="font-black text-white">{f.q}</h3><p className="mt-1 text-mist">{f.a}</p></div>)}
            </div>
            <LinkButton href="/press" className="mt-8" track="creators_press">Download the press kit</LinkButton>
          </div>
          <CreatorForm />
        </div>
      </Section>
      <RelatedLinks links={[{ href: '/sponsorships', label: 'Sponsored cups', text: 'How sponsored competitions work.' }, { href: '/invite', label: 'Invite links', text: 'Shareable links with tracking.' }, { href: '/games', label: 'All games', text: 'Pick your content game.' }]} />
    </>
  );
}
