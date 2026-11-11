import InquiryForm from '@/components/forms/InquiryForm';
import { Feature, Heading, JsonLd, PageHero, RelatedLinks, Section } from '@/components/ui';
import { breadcrumbLd, metaFor } from '@/lib/seo';

export const generateMetadata = () => metaFor({ title: 'Brand Partnerships', description: 'Partner with RivalArcade on co-branded competitions, cosmetic collaborations, content series and cross-promotion. Built around fair play and honest measurement.', path: '/partnerships', kicker: 'Brand partnerships' });

export default function Partnerships() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Brand partnerships', path: '/partnerships' }])} />
      <PageHero kicker="Brand partnerships" title={<>Build something <span className="gold-text">together</span>.</>} sub="Longer-term collaborations for brands, gaming communities, schools and esports organisations that want to reach competitive players — built on fair play and measured honestly.">
        <a href="#inquire" className="btn btn-gold btn-lg" data-track="partner_hero_inquire">Propose a partnership</a>
      </PageHero>
      <Section>
        <Heading kicker="Partnership types" title="What we can build" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Feature icon="trophy" title="Recurring cup series">A named cup that returns on a schedule, with seasonal prizes and leaderboards.</Feature>
          <Feature icon="palette" title="Cosmetic collaborations">A themed collection designed to RivalArcade’s rarity tiers and finish ladder.</Feature>
          <Feature icon="video" title="Content series">Guides, challenges or creator showdowns co-produced for your channels and ours.</Feature>
          <Feature icon="users" title="Community programmes">Clubs, campuses and gaming groups running their own friendly competitions.</Feature>
          <Feature icon="megaphone" title="Cross-promotion">Newsletter swaps, co-branded landing pages and tracked campaign links.</Feature>
          <Feature icon="handshake" title="Something else?">Tell us the idea. If it’s fair to players, we’re interested.</Feature>
        </div>
      </Section>
      <Section className="bg-charcoal/60">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="prose-ra">
            <h2>How we work</h2>
            <p>We start with a short call to understand your audience and goals, then send a written proposal with scope, timeline and cost. Every campaign gets dedicated tracking links so results are measured from real visits and clicks.</p>
            <h2>What we won’t do</h2>
            <p>We don’t run cash-prize or gambling promotions, sell player data, or announce partnerships before they’re signed. Any partner named on this site has agreed to it in writing.</p>
          </div>
          <div id="inquire" className="scroll-mt-28"><InquiryForm defaultKind="partnership" kinds={['partnership']} showCompany source="partnerships" /></div>
        </div>
      </Section>
      <RelatedLinks links={[{ href: '/advertise', label: 'Advertise', text: 'Placements and packages.' }, { href: '/sponsorships', label: 'Sponsored cups', text: 'Put your name on a tournament.' }, { href: '/press', label: 'Press kit', text: 'Logos and brand guidelines.' }]} />
    </>
  );
}
