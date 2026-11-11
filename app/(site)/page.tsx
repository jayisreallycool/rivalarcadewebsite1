import Image from 'next/image';
import Link from 'next/link';
import { Coin, Mark, RankBadge } from '@/components/Brand';
import { CosmeticCard, GameCard, PhoneFrame, PostCard } from '@/components/cards';
import { Icon, SocialIcon } from '@/components/Icons';
import LiteYouTube from '@/components/LiteYouTube';
import NewsletterForm from '@/components/forms/NewsletterForm';
import { Container, Feature, Heading, JsonLd, LinkButton, PlayButton, Section } from '@/components/ui';
import { COSMETICS, ECONOMY, FAQ, GAMES, MODES, RANK_TIERS, RARITY, RARITY_ORDER, cosmetic, gameById, type Game } from '@/lib/content';
import { listPosts } from '@/lib/server/posts';
import { getSettings, SOCIAL_KEYS, SOCIAL_LABEL } from '@/lib/server/settings';
import { appLd, faqLd, metaFor } from '@/lib/seo';
import { appLink } from '@/lib/site';

export const revalidate = 300;

export async function generateMetadata() {
  return metaFor({
    title: 'RivalArcade — Free Competitive Skill Games in Your Browser',
    absoluteTitle: true,
    description: 'Enter the arena. Play 12 free 3D skill games in your browser, duel real players on the exact same seed, climb RivalRank and collect Mythic cosmetics. No downloads, no pay-to-win.',
    path: '/',
    kicker: 'Enter the arena',
  });
}

const STEPS = [
  { n: '01', icon: 'smartphone', title: 'Open it in your browser', text: 'No download, no install. RivalArcade runs on your phone or desktop — add it to your home screen if you like.' },
  { n: '02', icon: 'target', title: 'Practice for free', text: 'Every game has unlimited free practice on random seeds, with an animated How to Play card before each run.' },
  { n: '03', icon: 'swords', title: 'Challenge real players', text: '1v1 duels, five-player live arenas and scheduled cups — everyone plays the identical seed, one run each.' },
  { n: '04', icon: 'crown', title: 'Climb, earn and collect', text: 'Move up RivalRank, earn Rival Coins and XP, and unlock gear for your 3D avatar.' },
];

const CUP_GAMES = GAMES.filter((g) => g.cup);
const SHOWCASE = ['shirt_aurora_holo', 'headwear_crown', 'back_cyber_wings', 'shoes_void_walkers', 'back_ember_wings', 'shirt_champion_jacket', 'headwear_seraph_halo', 'trail_rainbow_rush'].map(cosmetic);

const WHY = [
  { icon: 'shield-check', title: 'Fair by design', text: 'Identical seeds for every player in a contest, server-timed runs and server-side scoring. Impossible scores are rejected.' },
  { icon: 'gem', title: 'No pay-to-win', text: 'Rival Coins only buy cosmetics. Nothing in the store changes hitboxes, speed or scoring.' },
  { icon: 'zap', title: 'Fast to play', text: 'Rounds last about a minute. Perfect for a quick duel on the bus or a cup run on your break.' },
  { icon: 'globe', title: 'Plays anywhere', text: 'Built for the phone browser with full 3D, and lighter graphics automatically kick in on older devices.' },
  { icon: 'user-plus', title: 'One account per person', text: 'Every account verifies a phone number, which keeps smurfs and multi-accounts out of ranked play.' },
  { icon: 'heart', title: 'Free, all of it', text: 'Every game, every mode, every cup. Rival Coin contests are free to enter and the house pays the prizes.' },
];

export default async function Home() {
  const [settings, posts] = await Promise.all([getSettings(), listPosts()]);
  const h = settings.homepage;
  const show = (id: string) => !h.hiddenSections.includes(id);
  const featured = h.featuredGames.map(gameById).filter(Boolean) as Game[];
  const liveSocial = SOCIAL_KEYS.filter((k) => settings.social[k]);
  const promo = settings.promoBanner;

  return (
    <>
      <JsonLd data={[appLd(), faqLd(FAQ.slice(0, 6))]} />

      {/* ------------------------------------------------------------------ HERO */}
      <section className="relative overflow-hidden pt-[calc(6rem+var(--bar,0px))] sm:pt-[calc(7.5rem+var(--bar,0px))]">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -top-48 left-1/2 h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-gold/12 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 right-[-10%] h-[420px] w-[520px] rounded-full bg-electric/10 blur-[130px]" />
        <Container className="relative grid items-center gap-12 pb-16 lg:grid-cols-[1.15fr_1fr] lg:pb-24">
          <div>
            <p className="kicker mb-5">{h.heroKicker}</p>
            <h1 className="font-display text-[3.1rem] leading-[0.95] text-white sm:text-7xl xl:text-[5.6rem]">
              {h.heroHeadline.split('. ').map((part, i, arr) => (
                <span key={i} className={`block ${i === arr.length - 1 ? 'gold-text' : ''}`}>{part.replace(/\.$/, '')}{'.'}</span>
              ))}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist sm:text-xl">{h.heroSub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PlayButton placement="hero_primary" size="lg" className="animate-pulse-ring" />
              <LinkButton href="/how-it-works" size="lg" track="hero_explore">
                Explore the platform <Icon name="arrow-right" size={18} />
              </LinkButton>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-white/70">
              <li className="flex items-center gap-2"><Icon name="check" size={16} className="text-gold" /> 12 free 3D games</li>
              <li className="flex items-center gap-2"><Icon name="check" size={16} className="text-gold" /> Same seed for every rival</li>
              <li className="flex items-center gap-2"><Icon name="check" size={16} className="text-gold" /> No pay-to-win</li>
            </ul>
          </div>
          <div className="relative mx-auto h-[520px] w-full max-w-[520px] sm:h-[600px]">
            <div className="absolute left-0 top-10 w-[34%] rotate-[-8deg] animate-float [--r:-8deg] [animation-delay:-2s]">
              <Image src="/games/dunk-rush-sm.webp" alt="" width={300} height={430} className="rounded-2xl border border-white/10 shadow-2xl" priority />
            </div>
            <div className="absolute bottom-6 left-[2%] w-[30%] rotate-[6deg] animate-float [--r:6deg] [animation-delay:-4s]">
              <Image src="/games/brick-blitz-sm.webp" alt="" width={300} height={430} className="rounded-2xl border border-white/10 shadow-2xl" />
            </div>
            <div className="absolute right-0 top-4 w-[31%] rotate-[9deg] animate-float [--r:9deg] [animation-delay:-1s]">
              <Image src="/games/fight-night-sm.webp" alt="" width={300} height={430} className="rounded-2xl border border-white/10 shadow-2xl" />
            </div>
            <div className="absolute bottom-10 right-[1%] w-[30%] rotate-[-5deg] animate-float [--r:-5deg] [animation-delay:-5s]">
              <Image src="/games/canopy-swing-sm.webp" alt="" width={300} height={430} className="rounded-2xl border border-white/10 shadow-2xl" />
            </div>
            <div className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2">
              <PhoneFrame src="/screens/game-library.webp" alt="The RivalArcade game library on a phone" priority />
            </div>
            <div className="absolute right-[8%] top-[46%] flex items-center gap-2 rounded-2xl border border-gold/30 bg-ink/90 px-3 py-2 shadow-xl backdrop-blur">
              <Coin size={30} id="hero" />
              <div className="leading-tight"><p className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-gold">Welcome grant</p><p className="font-display text-lg text-white">{ECONOMY.signupBonus.toLocaleString()} RC</p></div>
            </div>
          </div>
        </Container>
        {/* Marquee */}
        <div className="relative border-y border-line bg-charcoal/60 py-4" aria-hidden="true">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
            {[...GAMES, ...GAMES].map((g, i) => (
              <span key={i} className="flex items-center gap-3 font-display text-xl text-white/60">
                <Mark size={20} id={`mq${i}`} /> {g.title.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ 1 FEATURED */}
      {show('featured') && (
        <Section id="featured">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading kicker="Featured games" title={<>Twelve games. <span className="gold-text">One arena.</span></>} sub="Short, sharp 3D skill games built for head-to-head play — from flick basketball and boxing to match-3 and rhythm. Every one uses the same simple scoring." />
            <LinkButton href="/games" className="mb-10" track="featured_all_games">All 12 games <Icon name="arrow-right" size={18} /></LinkButton>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {featured.map((g) => <GameCard key={g.id} game={g} />)}
          </div>
          {promo.enabled && promo.title && (
            <div className="gold-border reveal mt-10 grid items-center gap-6 overflow-hidden rounded-[1.5rem] bg-panel p-6 sm:grid-cols-[1fr_auto] sm:p-8">
              <div>
                <p className="kicker mb-2">Featured</p>
                <h3 className="font-display text-3xl text-white">{promo.title}</h3>
                {promo.text && <p className="mt-2 max-w-2xl text-mist">{promo.text}</p>}
              </div>
              {promo.ctaUrl?.startsWith('/') ? (
                <LinkButton href={promo.ctaUrl} variant="gold" track="promo_banner">{promo.ctaLabel || 'Learn more'}</LinkButton>
              ) : (
                <a href={promo.ctaUrl || appLink('promo_banner')} data-app-link="promo_banner" target="_blank" rel="noopener" className="btn btn-gold">{promo.ctaLabel || 'Play now'}</a>
              )}
            </div>
          )}
          <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
            <div className="reveal">
              {h.videoYoutubeId ? (
                <LiteYouTube id={h.videoYoutubeId} title={h.videoTitle} />
              ) : (
                <div className="flex justify-center gap-4">
                  <PhoneFrame src="/screens/match-modes.webp" alt="Choosing 1v1, Live Arena or Practice for Brick Blitz" className="!max-w-[220px] translate-y-6" />
                  <PhoneFrame src="/screens/wardrobe.webp" alt="The 3D avatar wardrobe in RivalArcade" className="!max-w-[220px]" />
                </div>
              )}
            </div>
            <div>
              <p className="kicker mb-3">Gameplay highlights</p>
              <h3 className="font-display text-3xl text-white sm:text-4xl">Pick a game. Pick a mode. Play.</h3>
              <p className="mt-4 leading-relaxed text-mist">Every game opens with a ready card: an animated How to Play guide, colour-coded point chips and your choice of 1v1, Live Arena or free Practice. Your 3D avatar comes with you into first-person games — your sleeves, your colours.</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {['1 point per action — specials say so', 'ON FIRE ×2 for five in a row', 'CLUTCH ×2 in the last ten seconds', 'Results that add up line by line'].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-white/85"><Icon name="zap" size={18} className="mt-0.5 shrink-0 text-gold" /> {t}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      )}

      {/* ------------------------------------------------------------------ 2 HOW IT WORKS */}
      {show('how') && (
        <Section id="how" className="bg-charcoal/60">
          <Heading kicker="How RivalArcade works" title="From first tap to the top of the ladder" center />
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <li key={s.n} className="panel reveal relative overflow-hidden p-6">
                <span className="absolute -right-2 -top-4 font-display text-8xl text-white/[0.04]">{s.n}</span>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-ink"><Icon name={s.icon} size={24} /></div>
                <h3 className="text-lg font-black text-white">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-mist">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center"><LinkButton href="/how-it-works" track="how_more">See the full guide <Icon name="arrow-right" size={18} /></LinkButton></div>
        </Section>
      )}

      {/* ------------------------------------------------------------------ 3 COMPETE */}
      {show('compete') && (
        <Section id="compete">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Heading kicker="Competitive play" title={<>Same seed. <span className="electric-text">Fair fight.</span></>} sub="Every player in a contest plays the identical game seed — the same bricks, the same fruit, the same nodes. When you lose, you lost on the same board. When you win, you earned it." />
              <div className="flex flex-wrap gap-3">
                <PlayButton placement="compete_section" label="Start a 1v1" />
                <LinkButton href="/competitions" track="compete_more">Competition formats</LinkButton>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {MODES.map((m, i) => (
                <div key={m.id} className="panel panel-hover reveal p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-display text-2xl text-white">{m.title}</h3>
                    <Icon name={['target', 'swords', 'users', 'trophy'][i]} size={22} className="text-gold" />
                  </div>
                  <p className="leading-relaxed text-mist">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ------------------------------------------------------------------ 4 RIVAL COINS */}
      {show('coins') && (
        <Section id="coins" className="overflow-hidden bg-charcoal/60">
          <div className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[120px]" />
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div className="panel gold-border p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <Coin size={64} id="coins" className="animate-float" />
                  <div><p className="font-display text-3xl text-white">Rival Coins</p><p className="text-sm font-black uppercase tracking-[0.2em] text-gold">RC · cosmetic currency</p></div>
                </div>
                <dl className="mt-6 divide-y divide-line">
                  {[
                    ['Welcome grant', `${ECONOMY.signupBonus.toLocaleString()} RC`],
                    ['Daily login', `${ECONOMY.login.base}–${ECONOMY.login.max} RC`],
                    ['1v1 win', `${ECONOMY.duel.win} RC`],
                    ['Live Arena top 3', ECONOMY.arenaSplit.map((n) => `${n}`).join(' / ') + ' RC'],
                    ['Cup pool (top 7)', `${ECONOMY.cupPool} RC + cosmetic`],
                    ['Daily earning cap', `${ECONOMY.dailyCap.toLocaleString()} RC`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between py-3"><dt className="text-mist">{k}</dt><dd className="font-black text-white">{v}</dd></div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Heading kicker="Rival Coins & rewards" title={<>Earn it by <span className="gold-text">playing</span>.</>} sub="Rival Coins come from logins, challenges, achievements and matches — never from your wallet. They can’t be bought, withdrawn or transferred, and they’re never staked: every contest is free to enter." />
              <div className="flex flex-wrap gap-3">
                <LinkButton href="/rival-coins" track="coins_more">How Rival Coins work</LinkButton>
                <PlayButton placement="coins_section" label="Claim 1,000 RC" variant="ghost" />
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* ------------------------------------------------------------------ 5 COSMETICS */}
      {show('cosmetics') && (
        <Section id="cosmetics">
          <Heading kicker="Rare cosmetic collections" title={<>From Common to <span className="text-[#f472b6]">Mythic</span></>} sub={`${COSMETICS.length} items across ten slots — outfits, crowns, wings, trails, emotes and banners. Every item has its own 3D model, and rarity decides its finish, from matte to holographic.`} />
          <div className="mb-8 flex flex-wrap gap-2">
            {RARITY_ORDER.map((r) => (
              <span key={r} className="chip" style={{ color: RARITY[r].color, borderColor: RARITY[r].color + '55' }}>{RARITY[r].label} · {RARITY[r].finish}</span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SHOWCASE.map((c) => <CosmeticCard key={c.id} item={c} />)}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <LinkButton href="/rewards" track="cosmetics_more">Browse collections <Icon name="arrow-right" size={18} /></LinkButton>
          </div>
        </Section>
      )}

      {/* ------------------------------------------------------------------ 6 PROGRESSION */}
      {show('progression') && (
        <Section id="progression" className="bg-charcoal/60">
          <Heading kicker="Player progression" title="Always something to climb" sub="Levels, a season pass, daily and weekly challenges, 29 achievements and the eight-tier RivalRank ladder." center />
          <div className="panel reveal mb-6 overflow-x-auto p-6">
            <ol className="flex min-w-[720px] items-end justify-between gap-2">
              {RANK_TIERS.map((t, i) => (
                <li key={t.name} className="flex flex-1 flex-col items-center text-center">
                  <RankBadge color={t.color} size={36 + i * 4} label={`${t.name} tier`} />
                  <span className="mt-2 text-xs font-black uppercase tracking-wider" style={{ color: t.color }}>{t.name}</span>
                  <span className="text-[0.7rem] text-mist">{t.min ? `${t.min}+` : 'Start'}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <Feature icon="trending-up" title="Levels & XP">Every run earns XP — more for cups and competitive matches. Levels 10, 25, 50 and 100 unlock achievement rewards.</Feature>
            <Feature icon="calendar" title="Daily & weekly challenges">New daily challenges every day, bigger weekly goals every Monday, and a login streak worth up to 100 RC a day.</Feature>
            <Feature icon="medal" title="Season pass">A free track and a VIP track of coins and cosmetics, unlocked with season XP from practice and tournaments.</Feature>
          </div>
          <div className="mt-10 text-center"><LinkButton href="/progression" track="progression_more">Explore progression <Icon name="arrow-right" size={18} /></LinkButton></div>
        </Section>
      )}

      {/* ------------------------------------------------------------------ 7 CUPS */}
      {show('cups') && (
        <Section id="cups">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading kicker="Featured competitions" title="The cup schedule" sub="Scheduled score-attack cups run on rotating games. One run each on the cup seed; the top seven share the coin pool and the champion takes an exclusive cosmetic." />
            <LinkButton href="/tournaments" className="mb-10" track="cups_more">How cups work</LinkButton>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CUP_GAMES.map((g) => (
              <article key={g.id} className="panel panel-hover reveal relative overflow-hidden">
                <div className="relative h-36 overflow-hidden">
                  <Image src={`/games/${g.id}-sm.webp`} alt="" fill sizes="400px" className="object-cover object-[50%_30%] opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-panel to-transparent" />
                  <span className="chip absolute left-4 top-4 !bg-black/70 !text-gold">{g.cup!.badge}</span>
                </div>
                <div className="p-6 pt-2">
                  <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: g.color }}>{g.title}</p>
                  <h3 className="mt-1 font-display text-2xl text-white">{g.cup!.title}</h3>
                  <p className="mt-2 text-mist">{g.cup!.description}</p>
                  <p className="mt-4 flex items-center gap-2 text-sm font-bold text-white"><Icon name="trophy" size={16} className="text-gold" /> Champion prize: {g.cup!.prize}</p>
                </div>
              </article>
            ))}
            <article className="panel reveal flex flex-col justify-center p-6 text-center">
              <Icon name="trophy" size={36} className="mx-auto text-gold" />
              <h3 className="mt-3 font-display text-2xl text-white">Cup times live in the app</h3>
              <p className="mt-2 text-mist">Cups open on their own schedule. Open the Leagues tab in RivalArcade to see what’s running now.</p>
              <div className="mt-5"><PlayButton placement="cups_card" label="See live cups" size="sm" /></div>
            </article>
          </div>
        </Section>
      )}

      {/* ------------------------------------------------------------------ 8 COMMUNITY */}
      {show('community') && (
        <Section id="community" className="bg-charcoal/60">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Heading kicker="Community features" title="Play with your people" sub="Find players, add friends, compare on the friends leaderboard and see every rival’s profile, rank and look." />
              <ul className="grid gap-4 sm:grid-cols-2">
                {[
                  ['users', 'Friends & search', 'Search players, send requests, accept, remove or block.'],
                  ['chart-column', 'Leaderboards', 'Season rating, all-time peak, wins, streaks, XP, weekly, monthly and per game.'],
                  ['bell', 'Notifications', 'Match results, friend requests, level-ups and rank changes in one inbox.'],
                  ['shield-check', 'Safe by default', 'Private profiles, blocking and rate-limited reports reviewed by the team.'],
                ].map(([icon, t, d]) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold"><Icon name={icon} size={18} /></span>
                    <span><span className="block font-black text-white">{t}</span><span className="text-sm text-mist">{d}</span></span>
                  </li>
                ))}
              </ul>
              <div className="mt-8"><LinkButton href="/community" track="community_more">Join the community <Icon name="arrow-right" size={18} /></LinkButton></div>
            </div>
            <div className="flex justify-center gap-4">
              <PhoneFrame src="/screens/profile-3d-avatar.webp" alt="A player profile with a 3D avatar, rank and stats" className="!max-w-[240px]" />
              <PhoneFrame src="/screens/daily-challenges.webp" alt="Daily challenges and login streak" className="!max-w-[240px] translate-y-10" />
            </div>
          </div>
        </Section>
      )}

      {/* ------------------------------------------------------------------ 9 WHY */}
      {show('why') && (
        <Section id="why">
          <Heading kicker="Why players join" title="Built for competition, not for your wallet" center />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w) => <Feature key={w.title} icon={w.icon} title={w.title}>{w.text}</Feature>)}
          </div>
        </Section>
      )}

      {/* ------------------------------------------------------------------ 10 NEWS */}
      {show('news') && posts.length > 0 && (
        <Section id="news" className="bg-charcoal/60">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading kicker="Latest news" title="Updates & announcements" />
            <LinkButton href="/news" className="mb-10" track="news_more">All news</LinkButton>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </Section>
      )}

      {/* ------------------------------------------------------------------ 11 FAQ */}
      {show('faq') && (
        <Section id="faq">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            <Heading kicker="FAQ" title="Questions, answered" sub={<>Still curious? Read the <Link href="/faq" className="text-gold underline underline-offset-4">full FAQ</Link> or <Link href="/contact" className="text-gold underline underline-offset-4">get in touch</Link>.</>} />
            <div className="divide-y divide-line rounded-2xl border border-line">
              {FAQ.slice(0, 6).map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-white">
                    {f.q}
                    <Icon name="chevron-down" size={20} className="shrink-0 text-gold transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 leading-relaxed text-mist">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ------------------------------------------------------------------ 12 SOCIAL */}
      {show('social') && (
        <Section id="social" className="bg-charcoal/60">
          <Heading kicker="Follow RivalArcade" title="Clips, cups and drops" sub="Gameplay highlights, competition announcements, featured cosmetics and community updates." center />
          <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {SOCIAL_KEYS.map((k) => (
              <li key={k}>
                {settings.social[k] ? (
                  <a href={settings.social[k]} target="_blank" rel="noopener me" data-track={`social_${k}_home`} className="panel panel-hover flex flex-col items-center gap-2 px-3 py-5 text-white">
                    <SocialIcon name={k} size={26} /><span className="text-sm font-black">{SOCIAL_LABEL[k]}</span>
                  </a>
                ) : (
                  <div className="panel flex flex-col items-center gap-2 px-3 py-5 text-white/35" aria-label={`${SOCIAL_LABEL[k]} — coming soon`}>
                    <SocialIcon name={k} size={26} /><span className="text-sm font-black">{SOCIAL_LABEL[k]}</span><span className="text-[0.6rem] font-black uppercase tracking-widest">Soon</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {liveSocial.length === 0 && <p className="mt-6 text-center text-sm text-mist">Official channels are launching. Subscribe below to hear first.</p>}
        </Section>
      )}

      {/* ------------------------------------------------------------------ 13 FINAL CTA */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/12 blur-[140px]" />
        <Container className="relative text-center">
          <Mark size={84} id="final" className="mx-auto animate-float" />
          <h2 className="mt-6 font-display text-5xl leading-[0.95] text-white sm:text-7xl">Your rival is <span className="gold-text">waiting.</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-mist">Sign up free with your phone number, claim your {ECONOMY.signupBonus.toLocaleString()} RC welcome grant and play your first duel.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <PlayButton placement="final_cta" label="Create free account" size="lg" className="animate-pulse-ring" />
            <LinkButton href="/invite" size="lg" track="final_invite">Invite a friend</LinkButton>
          </div>
          <div className="mx-auto mt-12 max-w-lg text-left">
            <p className="mb-3 text-center text-sm font-black text-white">Not ready yet? Get cup announcements by email.</p>
            <NewsletterForm source="home_final" />
          </div>
        </Container>
      </section>
    </>
  );
}
