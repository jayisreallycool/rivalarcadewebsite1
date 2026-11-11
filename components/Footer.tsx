import Link from 'next/link';
import { FOOTER_GROUPS } from '@/lib/content';
import { appLink } from '@/lib/site';
import { getSettings, SOCIAL_KEYS, SOCIAL_LABEL } from '@/lib/server/settings';
import { CookieSettingsButton } from './Analytics';
import { Logo } from './Brand';
import { Icon, SocialIcon } from './Icons';
import NewsletterForm from './forms/NewsletterForm';

export default async function Footer() {
  const { social } = await getSettings();
  const live = SOCIAL_KEYS.filter((k) => social[k]);
  return (
    <footer className="relative border-t border-line bg-charcoal">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo size={40} id="ftr" />
          <p className="mt-4 max-w-sm leading-relaxed text-mist">
            Free competitive skill games in your browser. Same seed, fair fight, no pay-to-win.
          </p>
          <div className="mt-6 max-w-sm">
            <p className="mb-2 text-sm font-black text-white">Get updates and cup announcements</p>
            <NewsletterForm source="footer" compact />
          </div>
          {live.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="RivalArcade on social media">
              {live.map((k) => (
                <li key={k}>
                  <a href={social[k]} target="_blank" rel="noopener me" data-track={`social_${k}_footer`} aria-label={`RivalArcade on ${SOCIAL_LABEL[k]}`} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/80 transition hover:border-gold/50 hover:text-gold">
                    <SocialIcon name={k} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {FOOTER_GROUPS.map((g) => (
            <div key={g.title}>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gold">{g.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.href}><Link href={l.href} className="text-sm text-white/70 hover:text-white">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} RivalArcade. Rival Coins are a cosmetic currency with no cash value.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <CookieSettingsButton />
            <a href={appLink('footer_bar')} data-app-link="footer_bar" target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-bold text-gold hover:text-gold-hi">
              Open the game <Icon name="external-link" size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
