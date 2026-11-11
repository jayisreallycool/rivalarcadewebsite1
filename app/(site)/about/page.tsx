import { Mark } from '@/components/Brand';
import { PhoneFrame } from '@/components/cards';
import { CtaBand, Feature, Heading, JsonLd, LinkButton, PageHero, PlayButton, RelatedLinks, Section } from '@/components/ui';
import { COSMETICS, GAMES } from '@/lib/content';
import { breadcrumbLd, metaFor } from '@/lib/seo';

export const generateMetadata = () => metaFor({ title: 'About RivalArcade', description: 'RivalArcade is a free competitive arcade for the phone browser: 12 3D skill games, same-seed 1v1 duels, live arenas, cups, RivalRank and cosmetic-only rewards. Here’s what we’re building and why.', path: '/about', kicker: 'About' });

export default function About() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />
      <PageHero kicker="About RivalArcade" title={<>Competitive gaming, <span className="gold-text">without the catch</span>.</>} sub="RivalArcade is a free competitive arcade that runs in your browser. We build short, skill-based 3D games and wrap them in fair formats — so the better player wins, every time." art={<PhoneFrame src="/screens/profile-3d-avatar.webp" alt="A RivalArcade profile with a 3D avatar" priority />}>
        <PlayButton placement="about_hero" size="lg" />
        <LinkButton href="/press" size="lg" track="about_press">Press kit</LinkButton>
      </PageHero>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="prose-ra">
            <h2>What RivalArcade is</h2>
            <p>RivalArcade is a collection of {GAMES.length} quick 3D arcade games — Dunk Rush, Brick Blitz, Canopy Swing, FightNight, Sky Stack, Axe Spin, Beat Tiles, Slice Storm, Prism Hop, Neon Dash, Cyber Reflex and Gem Surge — built for head-to-head competition. Practice solo for free, then challenge real players in 1v1 duels, five-player live arenas and scheduled cups.</p>
            <p>Around the games sits a full platform: the RivalRank ladder, levels, daily and weekly challenges, 29 achievements, a season pass, friends, leaderboards and a store of {COSMETICS.length} cosmetics for your 3D avatar.</p>
            <h2>What we believe</h2>
            <p><strong>Skill should decide results.</strong> That’s why every player in a contest gets the identical game seed, and why the server — not your device — times every run and computes every score.</p>
            <p><strong>Free should mean free.</strong> Every game and every mode is free. Rival Coins are earned by playing, never bought, and only unlock cosmetics.</p>
            <p><strong>Simple beats inflated.</strong> One point per action in every game, with specials labelled on screen. You should be able to see exactly why you won or lost.</p>
          </div>
          <div className="grid content-start gap-5 sm:grid-cols-2">
            <Feature icon="shield-check" title="Server-judged">The app sends a run token and a score — never a balance or a result. Impossible scores are rejected.</Feature>
            <Feature icon="user-plus" title="One player, one account">Every account verifies a mobile number, one account per number.</Feature>
            <Feature icon="gem" title="Cosmetic-only economy">No cash value, no transfers, no staking. Nothing you unlock changes gameplay.</Feature>
            <Feature icon="smartphone" title="Browser-first">Full 3D on the phone you already have. Graphics adapt to your device automatically.</Feature>
          </div>
        </div>
      </Section>
      <Section className="bg-charcoal/60">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
          <Mark size={140} id="about" className="mx-auto" />
          <div>
            <Heading kicker="The brand" title="The crest" sub="The RivalArcade mark is a gold crown over a faceted shield carrying an interlocked RA monogram — the R’s leg runs on as the A’s first stroke. The same monogram is stamped on every Rival Coin." />
            <LinkButton href="/press" track="about_brand_assets">Download brand assets</LinkButton>
          </div>
        </div>
      </Section>
      <RelatedLinks links={[
        { href: '/how-it-works', label: 'How it works', text: 'From first tap to ranked play.' },
        { href: '/games', label: 'The games', text: 'All twelve, with controls and scoring.' },
        { href: '/contact', label: 'Contact', text: 'Questions, support and partnerships.' },
      ]} />
      <CtaBand placement="about_band" />
    </>
  );
}
