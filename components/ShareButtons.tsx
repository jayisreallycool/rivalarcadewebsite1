'use client';

import { useState } from 'react';
import { Icon, SocialIcon } from './Icons';

/** Share links for articles, competitions and campaign pages. Uses the native share sheet on phones. */
export default function ShareButtons({ url, title, label = 'Share' }: { url: string; title: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const u = (src: string) => { const x = new URL(url); x.searchParams.set('utm_source', src); x.searchParams.set('utm_medium', 'social_share'); return x.toString(); };
  const e = encodeURIComponent;
  const links = [
    { k: 'x', name: 'X', href: `https://x.com/intent/post?text=${e(title)}&url=${e(u('x'))}` },
    { k: 'facebook', name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${e(u('facebook'))}` },
    { k: 'reddit', name: 'Reddit', href: `https://www.reddit.com/submit?url=${e(u('reddit'))}&title=${e(title)}` },
  ];
  const native = async () => {
    window.raTrack?.('share', 'native');
    try { await navigator.share({ title, url: u('native_share') }); } catch {}
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(u('copy_link')); setCopied(true); setTimeout(() => setCopied(false), 1800); window.raTrack?.('share', 'copy'); } catch {}
  };
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-black uppercase tracking-[0.18em] text-mist">{label}</span>
      {links.map((l) => (
        <a key={l.k} href={l.href} target="_blank" rel="noopener" data-track={`share_${l.k}`} aria-label={`Share on ${l.name}`} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/80 hover:border-gold/50 hover:text-gold">
          <SocialIcon name={l.k} size={16} />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 px-3 text-sm font-bold text-white/80 hover:border-gold/50 hover:text-gold">
        <Icon name={copied ? 'check' : 'link'} size={16} /> {copied ? 'Copied' : 'Copy link'}
      </button>
      <button type="button" onClick={native} aria-label="More sharing options" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/80 hover:border-gold/50 hover:text-gold sm:hidden">
        <Icon name="share-2" size={16} />
      </button>
    </div>
  );
}
