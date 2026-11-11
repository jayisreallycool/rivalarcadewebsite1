'use client';

import { useMemo, useState } from 'react';
import { Icon, SocialIcon } from './Icons';

const clean = (s: string) => s.trim().replace(/^@/, '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 24);

/** Builds a shareable invite link: <site>/invite?ref=<name>. Rewards (if any) are handled by the app. */
export default function InviteBuilder({ siteUrl }: { siteUrl: string }) {
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);
  const ref = clean(name);
  const link = useMemo(() => {
    if (ref.length < 2) return '';
    const u = new URL(siteUrl + '/invite');
    u.searchParams.set('ref', ref);
    u.searchParams.set('utm_source', 'player_invite');
    u.searchParams.set('utm_medium', 'referral');
    u.searchParams.set('utm_campaign', 'invite_a_friend');
    return u.toString();
  }, [ref, siteUrl]);
  const text = 'Think you can beat me? Same seed, one run, winner takes it. Play RivalArcade free:';
  const e = encodeURIComponent;

  const copy = async () => {
    try { await navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
    window.raTrack?.('invite_link_created', 'copy');
  };
  const share = async () => {
    window.raTrack?.('invite_link_created', 'native');
    try { await navigator.share({ title: 'RivalArcade', text, url: link }); } catch {}
  };

  return (
    <div className="panel gold-border p-6 sm:p-8">
      <label className="field">
        <span>Your RivalArcade player name</span>
        <input value={name} onChange={(ev) => setName(ev.target.value)} maxLength={30} placeholder="e.g. NeonQueen" className="input" autoComplete="nickname" />
      </label>
      <p className="mt-2 text-xs text-mist">Letters, numbers, - and _ only. This is just a label in your link — it doesn’t sign you in.</p>
      {link ? (
        <div className="mt-6">
          <p className="mb-2 text-sm font-black text-white">Your invite link</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input readOnly value={link} className="input font-mono text-xs" onFocus={(ev) => ev.currentTarget.select()} aria-label="Invite link" />
            <button type="button" onClick={copy} className="btn btn-gold shrink-0"><Icon name={copied ? 'check' : 'copy'} size={18} /> {copied ? 'Copied' : 'Copy'}</button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a className="btn btn-ghost btn-sm" target="_blank" rel="noopener" href={`https://wa.me/?text=${e(text + ' ' + link)}`} data-track="invite_whatsapp"><Icon name="message-circle" size={16} /> WhatsApp</a>
            <a className="btn btn-ghost btn-sm" target="_blank" rel="noopener" href={`sms:?&body=${e(text + ' ' + link)}`} data-track="invite_sms"><Icon name="smartphone" size={16} /> Text</a>
            <a className="btn btn-ghost btn-sm" target="_blank" rel="noopener" href={`https://x.com/intent/post?text=${e(text)}&url=${e(link)}`} data-track="invite_x"><SocialIcon name="x" size={14} /> Post</a>
            <a className="btn btn-ghost btn-sm" target="_blank" rel="noopener" href={`https://www.reddit.com/submit?url=${e(link)}&title=${e('Come play RivalArcade with me')}`} data-track="invite_reddit"><SocialIcon name="reddit" size={14} /> Reddit</a>
            <button type="button" onClick={share} className="btn btn-ghost btn-sm sm:hidden"><Icon name="share-2" size={16} /> More</button>
          </div>
        </div>
      ) : (
        <p className="mt-6 rounded-xl border border-dashed border-white/15 p-4 text-sm text-mist">Enter your name to generate a link you can share anywhere.</p>
      )}
    </div>
  );
}
