import { Icon } from '@/components/Icons';
import { CtaBand, JsonLd, LinkButton, PageHero, PlayButton, Section } from '@/components/ui';
import { FAQ } from '@/lib/content';
import { breadcrumbLd, faqLd, metaFor } from '@/lib/seo';

export const generateMetadata = () => metaFor({ title: 'FAQ — RivalArcade Questions Answered', description: 'Answers to common RivalArcade questions: is it free, how matches stay fair, what Rival Coins are, how cups and RivalRank work, and what to do if the 3D games won’t load.', path: '/faq', kicker: 'FAQ' });

export default function FaqPage() {
  const groups = [...new Set(FAQ.map((f) => f.group))];
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }]), faqLd(FAQ)]} />
      <PageHero kicker="Help" title="Frequently asked questions" sub="Everything players ask about RivalArcade. Can’t find your answer? Contact us and we’ll help.">
        <LinkButton href="/contact" size="lg" track="faq_contact">Contact support</LinkButton>
        <PlayButton placement="faq_hero" size="lg" variant="ghost" />
      </PageHero>
      <Section>
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <nav aria-label="FAQ sections" className="hidden lg:block"><ul className="sticky top-28 space-y-2">{groups.map((g) => <li key={g}><a href={`#${g.toLowerCase().replace(/\s+/g, '-')}`} className="font-bold text-white/70 hover:text-gold">{g}</a></li>)}</ul></nav>
          <div className="space-y-12">
            {groups.map((g) => (
              <section key={g} id={g.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-28">
                <h2 className="mb-4 font-display text-3xl text-white">{g}</h2>
                <div className="divide-y divide-line rounded-2xl border border-line">
                  {FAQ.filter((f) => f.group === g).map((f) => (
                    <details key={f.q} className="group p-5">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-black text-white">{f.q}<Icon name="chevron-down" className="shrink-0 text-gold transition group-open:rotate-180" /></summary>
                      <p className="mt-3 leading-relaxed text-mist">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Section>
      <CtaBand placement="faq_band" title="Questions answered. Time to play." />
    </>
  );
}
