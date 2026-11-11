import { CosmeticCard, PhoneFrame } from '@/components/cards';
import { CtaBand, Heading, JsonLd, LinkButton, PageHero, PlayButton, RelatedLinks, Section } from '@/components/ui';
import { COLLECTIONS, COSMETICS, RARITY, RARITY_ORDER, cosmetic } from '@/lib/content';
import { breadcrumbLd, metaFor } from '@/lib/seo';

export const generateMetadata = () => metaFor({ title: 'Rewards & Cosmetics — 74 Items, Six Rarity Tiers', description: 'Collect 74 RivalArcade cosmetics across ten slots and six rarities — from Common snapbacks to the Mythic Aurora Holo Coat. Featured collections, cup-exclusive prizes and 3D try-on.', path: '/rewards', kicker: 'Rewards & cosmetics' });

export default function Rewards() {
  const mythic = COSMETICS.filter((c) => c.rarity === 'mythic');
  const legendary = COSMETICS.filter((c) => c.rarity === 'legendary');
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Rewards & cosmetics', path: '/rewards' }])} />
      <PageHero kicker="Rewards & cosmetics" title={<>Dress like you <span className="gold-text">earned it</span>.</>} sub={`${COSMETICS.length} cosmetics across hair, tops, bottoms, shoes, headwear, eyewear, back gear, trails, emotes and banners. Every item has its own 3D model and every one is purely cosmetic.`} art={<PhoneFrame src="/screens/mythic-vault.webp" alt="The Mythic Vault in the RivalArcade store" priority />}>
        <PlayButton placement="rewards_hero" size="lg" label="Open the store" />
        <LinkButton href="/rival-coins" size="lg" track="rewards_coins">Earning Rival Coins</LinkButton>
      </PageHero>
      <Section>
        <Heading kicker="Rarity" title="Six tiers, six finishes" sub="Higher rarities climb the finish ladder from matte to holographic and get stronger glows and frame effects in the store." />
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {RARITY_ORDER.map((r) => (
            <div key={r} className="panel p-4" style={{ borderColor: RARITY[r].color + '55' }}>
              <p className="font-display text-xl" style={{ color: RARITY[r].color }}>{RARITY[r].label}</p>
              <p className="mt-1 text-sm text-white">{RARITY[r].finish} finish</p>
              <p className="text-xs text-mist">{RARITY[r].price[0].toLocaleString()}–{RARITY[r].price[1].toLocaleString()} RC</p>
              <p className="mt-2 text-xs text-mist">{COSMETICS.filter((c) => c.rarity === r).length} items</p>
            </div>
          ))}
        </div>
      </Section>
      <Section className="bg-charcoal/60">
        <Heading kicker="The Mythic Vault" title={<span className="text-[#f472b6]">Mythic</span>} sub="The rarest items in RivalArcade, with holographic finishes and animated aurora frames." />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">{mythic.map((c) => <CosmeticCard key={c.id} item={c} />)}</div>
        <h3 className="mb-5 mt-14 font-display text-3xl text-[#fbbf24]">Legendary</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">{legendary.map((c) => <CosmeticCard key={c.id} item={c} />)}</div>
      </Section>
      <Section>
        <Heading kicker="Collections" title="Themed sets" sub="One collection is featured in the store each week." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COLLECTIONS.map((col) => (
            <div key={col.name} className="panel reveal p-5">
              <h3 className="font-display text-2xl text-white">{col.name}</h3>
              <p className="text-sm text-mist">{col.tagline}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">{col.items.map((id) => <CosmeticCard key={id} item={cosmetic(id)} />)}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section className="bg-charcoal/60">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="prose-ra">
            <h2>How the store works</h2>
            <ul>
              <li><strong>Daily picks</strong> change every day at 00:00 UTC.</li>
              <li><strong>A weekly collection</strong>, best sellers, rarity filters and sorting.</li>
              <li><strong>Try before you buy</strong> — the On you view shows any item on your 3D avatar.</li>
              <li><strong>Previews never equip.</strong> Locked items show as previews until you own them.</li>
              <li><strong>Purchase confirmation</strong> on every buy, and owned items equip instantly.</li>
              <li><strong>Cup exclusives</strong> — some items are won by taking a cup.</li>
            </ul>
            <h2>Season pass</h2>
            <p>The season pass has a free track and a VIP track, unlocked with season XP from practice runs and tournaments. Early tiers include Rival Coins, the Skater Slouch Beanie, the Champion Flex emote — and on VIP, the Mythic Plasma Light Wings at tier 5.</p>
          </div>
          <PhoneFrame src="/screens/season-pass.webp" alt="The RivalArcade season pass" />
        </div>
      </Section>
      <RelatedLinks links={[
        { href: '/blog/cosmetic-rarity-tiers-explained', label: 'Rarity tiers explained', text: 'What separates Common from Mythic.' },
        { href: '/tournaments', label: 'Cup prizes', text: 'Cosmetics you can only win.' },
        { href: '/progression', label: 'Progression', text: 'Levels, challenges and the season pass.' },
      ]} />
      <CtaBand placement="rewards_band" title="Your first fit is waiting." />
    </>
  );
}
