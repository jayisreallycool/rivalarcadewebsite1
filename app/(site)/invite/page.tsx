import { Icon } from '@/components/Icons';
import InviteBuilder from '@/components/InviteBuilder';
import { Container, CtaBand, Feature, Heading, JsonLd, PlayButton, Section } from '@/components/ui';
import { ECONOMY } from '@/lib/content';
import { breadcrumbLd, meta } from '@/lib/seo';
import { appLink, SITE_URL } from '@/lib/site';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const ref = String((await searchParams).ref || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 24);
  return meta({
    title: ref ? `${ref} challenged you to RivalArcade` : 'Invite Friends — Bring Your Rivals to RivalArcade',
    description: ref ? `${ref} invited you to RivalArcade: free 3D skill games, same-seed 1v1 duels and cups. Play free in your browser.` : 'Create a shareable invite link and challenge your friends to RivalArcade — free same-seed 1v1 duels in the browser.',
    path: '/invite', kicker: 'Invite a friend',
  });
}

export default async function Invite({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const ref = String((await searchParams).ref || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 24);
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Invite friends', path: '/invite' }])} />
      {ref && (
        <section className="relative overflow-hidden border-b border-line pb-14 pt-[calc(7rem+var(--bar,0px))] text-center sm:pt-[calc(9rem+var(--bar,0px))]">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]" />
          <Container className="relative">
            <p className="kicker mb-4 justify-center">You’ve been challenged</p>
            <h1 className="font-display text-5xl text-white sm:text-7xl"><span className="gold-text">{ref}</span> wants a rematch.</h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-mist">RivalArcade is free: twelve 3D skill games, 1v1 duels on the exact same seed and a {ECONOMY.signupBonus.toLocaleString()} RC welcome grant when you sign up. Find {ref} in the app’s player search and add them as a friend.</p>
            <div className="mt-8 flex justify-center">
              <a href={appLink('invite_landing', { ref, campaign: 'invite_a_friend', medium: 'referral', source: 'player_invite' })} data-app-link="invite_landing" target="_blank" rel="noopener" className="btn btn-gold btn-lg animate-pulse-ring"><Icon name="play" size={20} fill="currentColor" strokeWidth={0} /> Accept the challenge</a>
            </div>
          </Container>
        </section>
      )}
      <section className={`relative ${ref ? 'py-16' : 'pb-16 pt-[calc(7rem+var(--bar,0px))] sm:pt-[calc(9rem+var(--bar,0px))]'}`}>
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <Container className="relative grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="kicker mb-4">Invite a friend</p>
            {ref ? <h2 className="font-display text-4xl text-white sm:text-5xl">Make your own invite link</h2> : <h1 className="font-display text-5xl leading-[1.02] text-white sm:text-6xl">Bring your <span className="gold-text">rivals</span>.</h1>}
            <p className="mt-5 text-lg text-mist">Every duel is better against someone you know. Create a link, send it to your group chat and settle it on the same seed.</p>
            <ul className="mt-8 space-y-3 text-white/85">
              {['Your friend opens RivalArcade straight from your link — no download.', `They get the standard ${ECONOMY.signupBonus.toLocaleString()} RC welcome grant when they sign up.`, 'Add each other in the app and compare on the friends leaderboard.'].map((t) => <li key={t} className="flex gap-2"><Icon name="check" className="mt-0.5 shrink-0 text-gold" />{t}</li>)}
            </ul>
            <p className="mt-8 rounded-xl border border-line bg-white/[0.02] p-4 text-sm text-mist"><strong className="text-white">About invite rewards:</strong> referral rewards aren’t part of RivalArcade yet. If they launch, they’ll be verified and granted inside the app only — this website never shows, holds or promises balances.</p>
          </div>
          <InviteBuilder siteUrl={SITE_URL} />
        </Container>
      </section>
      <Section className="bg-charcoal/60">
        <Heading kicker="Recruit your squad" title="Ways to play together" center />
        <div className="grid gap-5 md:grid-cols-3">
          <Feature icon="swords" title="Settle it 1v1">Same seed, one run each. No excuses.</Feature>
          <Feature icon="users" title="Fill a Live Arena">Up to five players on one seed — top three take the pool.</Feature>
          <Feature icon="chart-column" title="Friends leaderboard">A league table just for your crew.</Feature>
        </div>
        <div className="mt-10 text-center"><PlayButton placement="invite_section" campaign="invite_a_friend" /></div>
      </Section>
      <CtaBand placement="invite_band" title="Who’s your rival?" />
    </>
  );
}
