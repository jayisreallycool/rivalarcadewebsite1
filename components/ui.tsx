import Link from 'next/link';
import type { ReactNode } from 'react';
import { appLink } from '@/lib/site';
import { Icon } from './Icons';

/** Primary CTA: always opens the RivalArcade app with UTM attribution for the placement. */
export function PlayButton({ placement, label = 'Play RivalArcade', size = 'md', variant = 'gold', campaign, className = '' }: { placement: string; label?: string; size?: 'sm' | 'md' | 'lg'; variant?: 'gold' | 'ghost'; campaign?: string; className?: string }) {
  return (
    <a href={appLink(placement, { campaign })} data-app-link={placement} target="_blank" rel="noopener" className={`btn btn-${variant} ${size !== 'md' ? `btn-${size}` : ''} ${className}`}>
      <Icon name="play" size={size === 'lg' ? 20 : 18} fill="currentColor" strokeWidth={0} />
      {label}
      <span className="sr-only"> (opens the game in a new tab)</span>
    </a>
  );
}

export function LinkButton({ href, children, variant = 'ghost', size = 'md', track, className = '' }: { href: string; children: ReactNode; variant?: 'gold' | 'ghost'; size?: 'sm' | 'md' | 'lg'; track?: string; className?: string }) {
  return (
    <Link href={href} data-track={track} className={`btn btn-${variant} ${size !== 'md' ? `btn-${size}` : ''} ${className}`}>
      {children}
    </Link>
  );
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({ children, className = '', id, ...rest }: { children: ReactNode; className?: string; id?: string } & Record<string, unknown>) {
  return (
    <section id={id} className={`relative py-16 sm:py-24 ${className}`} {...rest}>
      <Container>{children}</Container>
    </section>
  );
}

export function Heading({ kicker, title, sub, center = false, as: As = 'h2' }: { kicker?: string; title: ReactNode; sub?: ReactNode; center?: boolean; as?: 'h1' | 'h2' }) {
  return (
    <div className={`reveal mb-10 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {kicker && <p className="kicker mb-3">{kicker}</p>}
      <As className="font-display text-3xl leading-[1.05] text-white sm:text-5xl">{title}</As>
      {sub && <p className="mt-4 text-lg leading-relaxed text-mist">{sub}</p>}
    </div>
  );
}

export function PageHero({ kicker, title, sub, children, art }: { kicker: string; title: ReactNode; sub: ReactNode; children?: ReactNode; art?: ReactNode }) {
  return (
    <header className="relative overflow-hidden border-b border-line pb-14 pt-[calc(7rem+var(--bar,0px))] sm:pb-20 sm:pt-[calc(9rem+var(--bar,0px))]">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <Container className="relative">
        <div className={art ? 'grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]' : ''}>
          <div>
            <p className="kicker mb-4">{kicker}</p>
            <h1 className="font-display text-4xl leading-[1.02] text-white sm:text-6xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">{sub}</p>
            {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
          </div>
          {art && <div className="relative">{art}</div>}
        </div>
      </Container>
    </header>
  );
}

export function CtaBand({ title = 'Your rival is waiting.', sub = 'Free to play in your browser. Practice solo, then take on real players on the exact same seed.', placement }: { title?: string; sub?: string; placement: string }) {
  return (
    <section className="relative py-16 sm:py-24">
      <Container>
        <div className="gold-border relative overflow-hidden rounded-[2rem] bg-[radial-gradient(ellipse_at_top,rgba(233,185,73,0.18),transparent_60%),linear-gradient(180deg,#15151c,#0d0d12)] px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative">
            <h2 className="font-display text-4xl text-white sm:text-6xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-mist">{sub}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <PlayButton placement={placement} size="lg" className="animate-pulse-ring" />
              <LinkButton href="/how-it-works" size="lg" track={`${placement}_how`}>How it works</LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 text-sm text-mist">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1.5">
            {i > 0 && <Icon name="chevron-right" size={14} className="opacity-50" />}
            {i < items.length - 1 ? <Link href={it.path} className="hover:text-white">{it.name}</Link> : <span aria-current="page" className="text-white/80">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Feature({ icon, title, children }: { icon: string; title: string; children: ReactNode }) {
  return (
    <div className="panel panel-hover reveal p-6">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/25">
        <Icon name={icon} size={22} />
      </div>
      <h3 className="text-lg font-black text-white">{title}</h3>
      <div className="mt-2 leading-relaxed text-mist">{children}</div>
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="panel px-5 py-4">
      <div className="font-display text-3xl text-white">{value}</div>
      <div className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-mist">{label}</div>
    </div>
  );
}

export function RelatedLinks({ links, title = 'Keep exploring' }: { links: { href: string; label: string; text: string }[]; title?: string }) {
  return (
    <Section className="pt-0">
      <h2 className="mb-6 font-display text-2xl text-white">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="panel panel-hover group flex items-start justify-between gap-4 p-5">
            <span>
              <span className="block font-black text-white">{l.label}</span>
              <span className="mt-1 block text-sm text-mist">{l.text}</span>
            </span>
            <Icon name="arrow-right" className="mt-1 shrink-0 text-gold transition group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </Section>
  );
}
