import Image from 'next/image';
import { Logo, Mark } from '@/components/Brand';
import { Icon } from '@/components/Icons';
import InquiryForm from '@/components/forms/InquiryForm';
import { Container, Heading, JsonLd, PageHero, Section } from '@/components/ui';
import { COSMETICS, GAMES } from '@/lib/content';
import { breadcrumbLd, metaFor } from '@/lib/seo';
import { APP_URL } from '@/lib/site';

export const generateMetadata = () => metaFor({ title: 'Press Kit & Media Inquiries', description: 'Download the RivalArcade press kit — logos, brand description, promotional graphics, game art and screenshots — or send a media inquiry.', path: '/press', kicker: 'Press kit' });

const SCREENS = [
  ['game-library', 'Game library'], ['match-modes', 'Match modes (Brick Blitz)'], ['mythic-vault', 'Mythic Vault store'], ['wardrobe', '3D avatar wardrobe'], ['profile-3d-avatar', 'Player profile'], ['season-pass', 'Season pass'], ['daily-challenges', 'Daily challenges'],
];
const COLORS = [['Ink', '#07070A'], ['Charcoal', '#101014'], ['Gold', '#E9B949'], ['Gold highlight', '#FDE7A1'], ['Gold shadow', '#9A6A12'], ['Electric', '#38E8FF']];

export default function Press() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Press kit', path: '/press' }])} />
      <PageHero kicker="Press kit" title={<>Everything you need to <span className="gold-text">cover RivalArcade</span>.</>} sub="Logos, brand description, promotional graphics, game art, screenshots and platform facts. Free to use for editorial coverage of RivalArcade.">
        <a href="/press/rivalarcade-press-kit.zip" download className="btn btn-gold btn-lg" data-track="press_kit_download"><Icon name="download" size={18} /> Download press kit (.zip)</a>
        <a href="#media-inquiries" className="btn btn-ghost btn-lg" data-track="press_media_form">Media inquiries</a>
      </PageHero>
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="prose-ra">
            <h2>Brand description</h2>
            <p><strong>Short (25 words):</strong> RivalArcade is a free competitive arcade in the browser — 3D skill games, same-seed 1v1 duels, live arenas, cups and cosmetic rewards. No pay-to-win.</p>
            <p><strong>Long:</strong> RivalArcade is a free-to-play competitive gaming platform that runs in any modern phone or desktop browser. It offers {GAMES.length} short 3D skill games — including Dunk Rush, Brick Blitz, Canopy Swing and FightNight — playable as free practice, 1v1 duels, five-player live arenas and scheduled cups. Every player in a contest plays the identical game seed, and all scoring is computed on the server. Players climb an eight-tier ranked ladder (RivalRank), complete daily and weekly challenges, and earn Rival Coins, a cosmetic-only currency with no cash value, to unlock {COSMETICS.length} cosmetics for their 3D avatar.</p>
            <h2>Platform facts</h2>
            <ul>
              <li><strong>Name:</strong> RivalArcade (one word, capital R and A)</li>
              <li><strong>Play:</strong> <a href={APP_URL}>rivalarcade.vercel.app</a></li>
              <li><strong>Platform:</strong> Web browser (iOS Safari, Android Chrome, desktop browsers)</li>
              <li><strong>Price:</strong> Free to play; no purchases required</li>
              <li><strong>Games:</strong> {GAMES.map((g) => g.title).join(', ')}</li>
              <li><strong>Modes:</strong> Practice, 1v1 duels, Live Arena (up to 5), scheduled cups</li>
              <li><strong>Progression:</strong> RivalRank (8 tiers), levels, daily & weekly challenges, 29 achievements, season pass</li>
              <li><strong>Economy:</strong> Rival Coins — cosmetic-only, earned not bought, no cash value</li>
            </ul>
          </div>
          <div className="space-y-6">
            <div className="panel p-6">
              <h2 className="mb-4 font-display text-2xl text-white">Logo</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-line bg-ink"><Logo size={44} id="press1" /></div>
                <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-line bg-gradient-to-br from-[#1c1a16] to-ink"><Mark size={110} id="press2" /></div>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2 text-sm">
                <li><a href="/brand/icon.svg" download className="chip hover:!text-gold">App icon SVG</a></li>
                <li><a href="/brand/icon-512.png" download className="chip hover:!text-gold">App icon PNG 512</a></li>
                <li><a href="/press/rivalarcade-mark.svg" download className="chip hover:!text-gold">Crest SVG</a></li>
                <li><a href="/press/rivalarcade-wordmark.png" download className="chip hover:!text-gold">Wordmark PNG</a></li>
              </ul>
              <p className="mt-4 text-sm text-mist">Please don’t recolour, stretch, outline or rotate the crest, or place it on busy backgrounds without contrast. Keep clear space equal to the crown’s height.</p>
            </div>
            <div className="panel p-6">
              <h2 className="mb-4 font-display text-2xl text-white">Colours & type</h2>
              <div className="grid grid-cols-3 gap-3">
                {COLORS.map(([n, hex]) => <div key={n}><div className="h-14 rounded-lg border border-line" style={{ background: hex }} /><p className="mt-1 text-xs font-bold text-white">{n}</p><p className="text-xs text-mist">{hex}</p></div>)}
              </div>
              <p className="mt-4 text-sm text-mist">Display: Lilita One. Body: Nunito. Both are open-source (SIL Open Font License).</p>
            </div>
          </div>
        </div>
      </Section>
      <Section className="bg-charcoal/60">
        <Heading kicker="Screenshots" title="In-app screenshots" sub="Captured from the live RivalArcade build on a 390 × 844 phone viewport. Full-resolution PNGs are in the zip." />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {SCREENS.map(([f, t]) => (
            <a key={f} href={`/screens/${f}.webp`} download className="group block">
              <Image src={`/screens/${f}.webp`} alt={t} width={585} height={1266} sizes="200px" className="h-auto w-full rounded-xl border border-line transition group-hover:border-gold/60" />
              <span className="mt-2 block text-xs font-bold text-white/80">{t}</span>
            </a>
          ))}
        </div>
      </Section>
      <Section>
        <Heading kicker="Game art" title="Cover art" sub="Original RivalArcade mascots and cover art for every game." />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {GAMES.map((g) => <a key={g.id} href={`/games/${g.id}.webp`} download className="block"><Image src={`/games/${g.id}-sm.webp`} alt={`${g.title} cover`} width={300} height={430} className="h-auto w-full rounded-xl border border-line hover:border-gold/60" /></a>)}
        </div>
      </Section>
      <Section id="media-inquiries" className="scroll-mt-20 bg-charcoal/60">
        <Container className="!px-0">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Heading kicker="Media inquiries" title="Writing about RivalArcade?" sub="Interview requests, review access, fact checks and asset requests. We reply by email." />
              <p className="text-mist">Partnership contact: use the form and choose the topic that fits — media, sponsorship or brand partnership — and it goes to the right person.</p>
            </div>
            <InquiryForm defaultKind="media" kinds={['media', 'partnership', 'sponsorship']} showCompany source="press" />
          </div>
        </Container>
      </Section>
    </>
  );
}
