'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV } from '@/lib/content';
import { appLink } from '@/lib/site';
import { Logo } from './Brand';
import { Icon } from './Icons';

const MORE = [
  { href: '/tournaments', label: 'Tournaments' },
  { href: '/rival-coins', label: 'Rival Coins' },
  { href: '/progression', label: 'Progression' },
  { href: '/blog', label: 'Gaming blog' },
  { href: '/invite', label: 'Invite friends' },
  { href: '/creators', label: 'Creators' },
  { href: '/advertise', label: 'Advertise' },
  { href: '/faq', label: 'FAQ' },
];

export interface Bar { message: string; linkUrl: string | null; linkLabel: string | null; tone: 'gold' | 'electric' | 'neutral' }

export default function Header({ bar }: { bar?: Bar | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  const active = (href: string) => path === href || path.startsWith(href + '/');

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? 'border-b border-line bg-ink/85 backdrop-blur-xl' : 'bg-transparent'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-gold focus:px-3 focus:py-2 focus:text-ink">Skip to content</a>
      {bar && (
        <div className={`flex h-9 items-center justify-center gap-2 overflow-hidden px-4 text-center text-xs font-extrabold sm:text-sm ${bar.tone === 'electric' ? 'bg-electric text-ink' : bar.tone === 'neutral' ? 'bg-panel-2 text-white' : 'bg-gold text-ink'}`}>
          <span className="truncate">{bar.message}</span>
          {bar.linkUrl && (
            bar.linkUrl.startsWith('/') ? <Link href={bar.linkUrl} className="shrink-0 underline underline-offset-2">{bar.linkLabel || 'Learn more'}</Link>
            : <a href={bar.linkUrl} data-app-link="announcement_bar" target="_blank" rel="noopener" className="shrink-0 underline underline-offset-2">{bar.linkLabel || 'Learn more'}</a>
          )}
        </div>
      )}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:h-[72px] sm:px-8">
        <Link href="/" aria-label="RivalArcade home" className="shrink-0">
          <Logo size={34} id="hdr" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? 'page' : undefined} className={`rounded-lg px-3 py-2 text-sm font-extrabold transition ${active(n.href) ? 'text-gold' : 'text-white/75 hover:text-white'}`}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={appLink('header')} data-app-link="header" target="_blank" rel="noopener" className="btn btn-gold btn-sm">
            <Icon name="play" size={16} fill="currentColor" strokeWidth={0} /> Play now
          </a>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white lg:hidden">
            <Icon name={open ? 'x' : 'menu'} size={20} />
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-nav" className="h-[calc(100dvh-64px-var(--bar,0px))] overflow-y-auto border-t border-line bg-ink px-5 pb-10 pt-4 lg:hidden">
          <nav aria-label="Mobile" className="grid gap-1">
            {[{ href: '/', label: 'Home' }, ...NAV, ...MORE].map((n) => (
              <Link key={n.href} href={n.href} className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-extrabold ${active(n.href) && n.href !== '/' ? 'bg-white/5 text-gold' : 'text-white'}`}>
                {n.label}
                <Icon name="chevron-right" size={18} className="opacity-40" />
              </Link>
            ))}
          </nav>
          <a href={appLink('mobile_menu')} data-app-link="mobile_menu" target="_blank" rel="noopener" className="btn btn-gold btn-lg mt-6 w-full">
            <Icon name="play" size={18} fill="currentColor" strokeWidth={0} /> Play RivalArcade
          </a>
        </div>
      )}
    </header>
  );
}
