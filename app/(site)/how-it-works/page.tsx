import { PhoneFrame } from '@/components/cards';
import { Icon } from '@/components/Icons';
import { CtaBand, Heading, JsonLd, LinkButton, PageHero, PlayButton, RelatedLinks, Section } from '@/components/ui';
import { ECONOMY, MODES, SCORING_RULES } from '@/lib/content';
import { breadcrumbLd, metaFor } from '@/lib/seo';

export const generateMetadata = () => metaFor({ title: 'How RivalArcade Works — Sign Up, Practice, Compete', description: 'How RivalArcade works: sign up with a phone number, learn any game with free practice, then compete in same-seed 1v1 duels, live arenas and cups. Scoring, fairness and rewards explained.', path: '/how-it-works', kicker: 'How it works' });

const STEPS = [
  { title: 'Open RivalArcade', icon: 'globe', text: 'Go to rivalarcade.vercel.app in Safari, Chrome, Edge or Firefox. There’s nothing to download. Tip: add it to your home screen for a full-screen, app-like experience.', screen: '/screens/game-library.webp', alt: 'The RivalArcade game library' },
  { title: 'Create your account', icon: 'user-plus', text: 'Sign in with a phone code or Google, then verify your mobile number — one account per number keeps matches fair. New accounts receive a 1,000 RC welcome grant.', screen: '/screens/profile-3d-avatar.webp', alt: 'A new RivalArcade profile' },
  { title: 'Learn a game for free', icon: 'target', text: 'Every game opens with an animated How to Play card: gesture demos, the goal in one line, colour-coded point chips and how the round ends. Practice is unlimited and free on random seeds.', screen: '/screens/match-modes.webp', alt: 'A game ready card with 1v1, Live Arena and Practice options' },
  { title: 'Compete on the same seed', icon: 'swords', text: 'Choose a 1v1 duel, a five-player Live Arena or a scheduled cup. Every entrant plays the identical seed with one run each. The server times the run and judges the score.', screen: null, alt: '' },
  { title: 'Earn, level up and collect', icon: 'gift', text: 'Matches, challenges and achievements pay Rival Coins and XP. Climb RivalRank, progress the season pass and spend coins on cosmetics for your 3D avatar.', screen: '/screens/wardrobe.webp', alt: 'The avatar wardrobe' },
];

export default function HowItWorks() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'How it works', path: '/how-it-works' }]), { '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to start playing RivalArcade', step: STEPS.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.text })) }]} />
      <PageHero kicker="How it works" title={<>From first tap to <span className="gold-text">ranked</span>.</>} sub="Everything you need to know to start playing, competing and earning — in five steps.">
        <PlayButton placement="how_hero" size="lg" label="Start now" />
        <LinkButton href="/faq" size="lg" track="how_faq">Read the FAQ</LinkButton>
      </PageHero>
      <Section>
        <ol className="space-y-6">
          {STEPS.map((s, i) => (
            <li key={s.title} className="panel reveal grid items-center gap-8 overflow-hidden p-6 sm:p-10 lg:grid-cols-[1fr_260px]">
              <div>
                <div className="flex items-center gap-4">
                  <span className="font-display text-5xl text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/25"><Icon name={s.icon} size={22} /></span>
                </div>
                <h2 className="mt-4 font-display text-3xl text-white">{s.title}</h2>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-mist">{s.text}</p>
                {i === 3 && (
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {MODES.map((m) => <div key={m.id} className="rounded-xl border border-line bg-black/30 p-4"><p className="font-black text-white">{m.title}</p><p className="mt-1 text-sm text-mist">{m.text}</p></div>)}
                  </div>
                )}
              </div>
              {s.screen && <PhoneFrame src={s.screen} alt={s.alt} className="!max-w-[220px]" />}
            </li>
          ))}
        </ol>
      </Section>
      <Section className="bg-charcoal/60">
        <Heading kicker="Scoring" title="How points work" sub="One scoring language across all twelve games." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SCORING_RULES.map((r) => <div key={r.title} className="panel p-6"><h3 className="font-display text-2xl text-gold">{r.title}</h3><p className="mt-2 text-mist">{r.text}</p></div>)}
        </div>
      </Section>
      <Section>
        <Heading kicker="Fair play" title="What keeps it fair" />
        <ul className="grid gap-4 md:grid-cols-2">
          {[
            'Identical seeds: every contest entrant plays exactly the same game.',
            'Server authority: all scoring, rewards, purchases and ranks are computed on the server.',
            'Score checks: scores faster or higher than a game allows are rejected; large jumps are reviewed.',
            'One run per entry: closing mid-run keeps the score you had.',
            'Verified phones: one account per mobile number.',
            `Win-trading limits: rewards from the same opponent are capped at ${ECONOMY.sameOpponentDaily} matches a day.`,
          ].map((t) => <li key={t} className="flex gap-3 rounded-xl border border-line p-4 text-white/85"><Icon name="shield-check" className="mt-0.5 shrink-0 text-gold" /> {t}</li>)}
        </ul>
      </Section>
      <RelatedLinks links={[
        { href: '/competitions', label: 'Competition formats', text: 'Duels, arenas and cups in detail.' },
        { href: '/rival-coins', label: 'Rival Coins', text: 'Every way to earn, and the daily cap.' },
        { href: '/progression', label: 'Progression', text: 'Levels, ranks, challenges and the season pass.' },
      ]} />
      <CtaBand placement="how_band" />
    </>
  );
}
