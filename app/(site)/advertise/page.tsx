import Packages from '@/components/Packages';
import InquiryForm from '@/components/forms/InquiryForm';
import { Feature, Heading, JsonLd, LinkButton, PageHero, RelatedLinks, Section } from '@/components/ui';
import { getSettings } from '@/lib/server/settings';
import { breadcrumbLd, metaFor } from '@/lib/seo';

export const revalidate = 300;
export const generateMetadata = () => metaFor({ title: 'Advertise With RivalArcade', description: 'Reach competitive mobile and browser gamers with RivalArcade: sponsored cups, creator showdowns, homepage and newsletter placements. Brand-safe, no fabricated metrics — request the media kit.', path: '/advertise', kicker: 'Advertise' });

export default async function Advertise() {
  const { sponsorship } = await getSettings();
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Advertise', path: '/advertise' }])} />
      <PageHero kicker="Advertise with RivalArcade" title={<>Put your brand <span className="gold-text">in the arena</span>.</>} sub="RivalArcade players come to compete. Native placements — a sponsored cup, a branded cosmetic concept, a creator showdown — reach them in the moments they care about, without interrupting play.">
        <a href="#inquire" className="btn btn-gold btn-lg" data-track="advertise_hero_inquire">Start a conversation</a>
        <LinkButton href="/press" size="lg" track="advertise_press">Brand assets</LinkButton>
      </PageHero>
      <Section>
        <Heading kicker="Why RivalArcade" title="Native, brand-safe placements" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Feature icon="trophy" title="Competition-native">Sponsor the thing players already chase: a cup, its prize and its leaderboard.</Feature>
          <Feature icon="palette" title="Cosmetic concepts">Branded items designed to RivalArcade’s rarity and quality bar, reviewed before release.</Feature>
          <Feature icon="shield-check" title="Brand-safe">No gambling, no cash play, no pay-to-win. Fair-play rules apply to every sponsored event.</Feature>
          <Feature icon="chart-column" title="Measured honestly">Every campaign gets UTM-tracked links and a report built from live analytics.</Feature>
        </div>
      </Section>
      <Section className="bg-charcoal/60">
        <Heading kicker="Packages" title="Ways to work together" sub="Every package is scoped to your goals. Rates are quoted per campaign." />
        <Packages packages={sponsorship.packages} />
      </Section>
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Heading kicker="Media kit" title="Audience & performance data" sub={sponsorship.mediaKitNote} />
            <ul className="space-y-3 text-white/85">
              <li>• Platform overview, brand guidelines and logo files — <a href="/press" className="text-gold underline">press kit</a></li>
              <li>• Campaign tracking: UTM links per channel, outbound app clicks and newsletter sign-ups</li>
              <li>• Placements: homepage banner, news feature, newsletter, cups and creator events</li>
            </ul>
          </div>
          <div id="inquire" className="scroll-mt-28"><InquiryForm defaultKind="advertising" kinds={['advertising', 'sponsorship', 'partnership', 'media']} showCompany packages={sponsorship.packages.map((p) => p.name)} source="advertise" /></div>
        </div>
      </Section>
      <RelatedLinks links={[
        { href: '/sponsorships', label: 'Sponsorship opportunities', text: 'Sponsored cups and events.' },
        { href: '/partnerships', label: 'Brand partnerships', text: 'Long-term collaborations.' },
        { href: '/creators', label: 'Gaming creators', text: 'Creator campaigns and codes.' },
      ]} />
    </>
  );
}
