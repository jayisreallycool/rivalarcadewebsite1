import { Icon } from './Icons';
import type { SponsorPackage } from '@/lib/server/settings';

export default function Packages({ packages }: { packages: SponsorPackage[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {packages.map((p, i) => (
        <article key={p.name} className={`panel reveal flex flex-col p-7 ${i === 0 ? 'gold-border' : ''}`}>
          <h3 className="font-display text-2xl text-white">{p.name}</h3>
          <p className="mt-2 text-mist">{p.summary}</p>
          <ul className="mt-5 flex-1 space-y-2.5">{p.includes.map((x) => <li key={x} className="flex gap-2 text-white/85"><Icon name="check" size={18} className="mt-0.5 shrink-0 text-gold" />{x}</li>)}</ul>
          <p className="mt-6 border-t border-line pt-4 font-black text-gold">{p.price || 'Custom quote'}</p>
        </article>
      ))}
    </div>
  );
}
