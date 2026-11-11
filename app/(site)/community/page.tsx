import { PhoneFrame, PostCard } from '@/components/cards';
import { Icon, SocialIcon } from '@/components/Icons';
import LiteYouTube from '@/components/LiteYouTube';
import NewsletterForm from '@/components/forms/NewsletterForm';
import { CtaBand, Feature, Heading, JsonLd, LinkButton, PageHero, PlayButton, Section } from '@/components/ui';
import { listPosts } from '@/lib/server/posts';
import { getSettings, SOCIAL_KEYS, SOCIAL_LABEL, type SocialKey } from '@/lib/server/settings';
import { breadcrumbLd, metaFor } from '@/lib/seo';

export const revalidate = 300;
export const generateMetadata = () => metaFor({ title: 'Community — Friends, Leaderboards & Social', description: 'Join the RivalArcade community: add friends, climb the friends leaderboard, follow RivalArcade on TikTok, YouTube, Discord and more, and share your best runs with #RivalArcade.', path: '/community', kicker: 'Community' });

const BLURB: Record<SocialKey, string> = {
  tiktok: 'Short clips, clutch finishes and new-game first looks.',
  instagram: 'Featured cosmetics, drops and community spotlights.',
  youtube: 'Gameplay highlights, guides and patch breakdowns.',
  discord: 'Chat, find rivals and hear about cups first.',
  reddit: 'Discussion, feedback and strategy threads.',
  facebook: 'Announcements and community updates.',
  x: 'Live updates, cup results and quick news.',
};

export default async function Community() {
  const [s, posts] = await Promise.all([getSettings(), listPosts({ kind: 'news' })]);
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Community', path: '/community' }])} />
      <PageHero kicker="Community" title={<>Find your <span className="gold-text">rivals</span>.</>} sub="Add friends, compare on the friends leaderboard and see every player’s profile, rank and 3D look. Then follow RivalArcade for clips, cups and drops." art={<PhoneFrame src="/screens/profile-3d-avatar.webp" alt="A RivalArcade player profile" priority />}>
        <PlayButton placement="community_hero" size="lg" label="Find friends in the app" />
        <LinkButton href="/invite" size="lg" track="community_invite">Invite a friend</LinkButton>
      </PageHero>
      <Section>
        <Heading kicker="In the app" title="Social features" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Feature icon="search" title="Player search">Find anyone by name and send a friend request.</Feature>
          <Feature icon="users" title="Friends">Accept, decline, remove or block — your list, your rules.</Feature>
          <Feature icon="chart-column" title="Friends leaderboard">See exactly where you stand against the people you know.</Feature>
          <Feature icon="bell" title="Notifications">Match results, friend requests, level-ups and rank changes.</Feature>
          <Feature icon="eye" title="Private profiles">Choose who can see your profile and stats.</Feature>
          <Feature icon="shield-check" title="Reports & moderation">Rate-limited reports reviewed by the team; banned players vanish from leaderboards.</Feature>
        </div>
      </Section>
      <Section id="social" className="bg-charcoal/60">
        <Heading kicker="Follow us" title="RivalArcade on social" sub="Gameplay highlights, competition announcements, featured cosmetics, community updates and player achievements." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SOCIAL_KEYS.map((k) => s.social[k] ? (
            <a key={k} href={s.social[k]} target="_blank" rel="noopener me" data-track={`social_${k}_community`} className="panel panel-hover flex items-start gap-4 p-5">
              <SocialIcon name={k} size={28} className="shrink-0 text-white" />
              <span><span className="flex items-center gap-1 font-black text-white">{SOCIAL_LABEL[k]} <Icon name="external-link" size={14} /></span><span className="text-sm text-mist">{BLURB[k]}</span></span>
            </a>
          ) : (
            <div key={k} className="panel flex items-start gap-4 p-5 opacity-50">
              <SocialIcon name={k} size={28} className="shrink-0 text-white" />
              <span><span className="font-black text-white">{SOCIAL_LABEL[k]}</span> <span className="chip ml-1 !py-0">Soon</span><span className="block text-sm text-mist">{BLURB[k]}</span></span>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Heading kicker="Promotional video" title="See it in motion" sub="Twelve games, one arena. Watch the gameplay, then play it yourself." />
            <PlayButton placement="community_video" />
          </div>
          {s.homepage.videoYoutubeId ? <LiteYouTube id={s.homepage.videoYoutubeId} title={s.homepage.videoTitle} /> : (
            <div className="flex justify-center gap-4"><PhoneFrame src="/screens/match-modes.webp" alt="Brick Blitz mode select" className="!max-w-[210px]" /><PhoneFrame src="/screens/wardrobe.webp" alt="The 3D avatar wardrobe" className="!max-w-[210px] translate-y-8" /></div>
          )}
        </div>
      </Section>
      <Section className="bg-charcoal/60">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Heading kicker="Player achievements" title="Share your best runs" sub="Hit a personal best, win a cup or unlock a Mythic? Clip it and tag #RivalArcade — we feature community highlights in the newsletter and on our channels (with your permission)." />
            <div className="flex flex-wrap gap-2">{['#RivalArcade', '#SameSeed', '#RivalRank'].map((t) => <span key={t} className="chip !text-gold">{t}</span>)}</div>
          </div>
          <div>
            <h3 className="mb-4 font-display text-2xl text-white">Community updates</h3>
            <div className="grid gap-5 md:grid-cols-2">{posts.slice(0, 2).map((p) => <PostCard key={p.slug} post={p} />)}</div>
          </div>
        </div>
      </Section>
      <Section>
        <div className="panel gold-border mx-auto max-w-2xl p-8 text-center">
          <h2 className="font-display text-3xl text-white">Hear about cups first</h2>
          <p className="mt-2 text-mist">Tournament announcements, new games and feature drops — straight to your inbox.</p>
          <div className="mt-6 text-left"><NewsletterForm source="community" /></div>
        </div>
      </Section>
      <CtaBand placement="community_band" />
    </>
  );
}
