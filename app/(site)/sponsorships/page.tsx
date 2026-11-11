import { Icon } from '@/components/Icons';
import InquiryForm from '@/components/forms/InquiryForm';
import { Heading, JsonLd, LinkButton, PageHero, RelatedLinks, Section } from '@/components/ui';
import { ECONOMY } from '@/lib/content';
import { getSettings } from '@/lib/server/settings';
import { breadcrumbLd, metaFor } from '@/lib/seo';

export const revalidate = 300;
export const generateMetadata = () => metaFor({ title: 'Sponsorship Opportunities — Sponsored Cups & Events', description: 'Sponsor a RivalArcade cup or competitive event: custom cup naming, a branded cosmetic concept, announcements and a results summary. Fair-play rules apply.', path: '/sponsorships', kicker: 'Sponsorships' });

const STEPS = [
  ['Brief', 'Tell us your audience, goals, dates and budget range.'],
  ['Format', 'We pick the game and format — a flash cup, a weekly major or a creator-hosted showdown.'],
  ['Prize', 'Agree the cup name and prize — Rival Coins and an optional branded cosmetic concept.'],
  ['Launch', 'Announcement on the news page, newsletter and social, with tracked links.'],
  ['Report', 'Entries, results and tracked visits once the cup settles.'],
];

export default async function Sponsorships() {
  const { sponsorship } = await getSettings();
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Sponsorships', path: '/sponsorships' }])} />
      <PageHero kicker="Sponsorship opportunities" title={<>Sponsor a <span className="gold-text">cup</span>.</>} sub={`Cups are RivalArcade’s tournaments: one run each on a shared seed, a leaderboard, and a champion. A sponsored cup puts your name on all of it.`}>
        <a href="#inquire" className="btn btn-gold btn-lg" data-track="sponsor_hero_inquire">Enquire about a cup</a>
        <LinkButton href="/tournaments" size="lg" track="sponsor_cups">How cups work</LinkButton>
      </PageHero>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="prose-ra">
            <h2>What a sponsored cup includes</h2>
            <ul>
              <li>A named cup on the game of your choice, shown in the app’s cup list</li>
              <li>A prize: Rival Coins for the top seven (the standard cup pool is {ECONOMY.cupPool} RC) and a champion cosmetic</li>
              <li>An optional branded cosmetic concept, designed to RivalArcade’s rarity system and reviewed before release</li>
              <li>A launch post on the news page, a newsletter feature and social posts</li>
              <li>A results summary once the cup settles</li>
            </ul>
            <h2>Ground rules</h2>
            <p>Sponsored cups follow the same fair-play rules as every cup: identical seeds, one run each, server-side judging. Prizes are cosmetic and in Rival Coins — no cash prizes, no purchase required to enter, and no gambling or age-restricted brands.</p>
          </div>
          <ol className="space-y-3">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="panel flex gap-4 p-5"><span className="font-display text-3xl text-gold">{i + 1}</span><span><span className="block font-black text-white">{t}</span><span className="text-mist">{d}</span></span></li>
            ))}
          </ol>
        </div>
      </Section>
      <Section className="bg-charcoal/60">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Heading kicker="Get started" title="Tell us about your event" sub="We reply with format options and a quote." />
            <p className="flex items-center gap-2 text-mist"><Icon name="lock" size={16} className="text-gold" /> Details are used only to respond to your enquiry.</p>
          </div>
          <div id="inquire" className="scroll-mt-28"><InquiryForm defaultKind="sponsorship" kinds={['sponsorship']} showCompany packages={sponsorship.packages.map((p) => p.name)} source="sponsorships" /></div>
        </div>
      </Section>
      <RelatedLinks links={[{ href: '/advertise', label: 'Advertise', text: 'All placements and packages.' }, { href: '/partnerships', label: 'Brand partnerships', text: 'Longer-term collaborations.' }, { href: '/creators', label: 'Creators', text: 'Creator-hosted competitions.' }]} />
    </>
  );
}
