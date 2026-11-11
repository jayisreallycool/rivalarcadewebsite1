'use client';

import Link from 'next/link';
import { useState } from 'react';
import { postJson, useSpamGuard } from './useSpamGuard';

export default function NewsletterForm({ source, compact = false }: { source: string; compact?: boolean }) {
  const guard = useSpamGuard();
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setState('busy');
    const r = await postJson('/api/newsletter/subscribe', { email: fd.get('email'), consent: fd.get('consent') === 'on', source, ...guard.fields(form) });
    if (r.ok) {
      setState('done');
      setMsg(r.message || 'Check your inbox to confirm your subscription.');
      window.raTrack?.('newsletter_signup', source);
      form.reset();
    } else {
      setState('error');
      setMsg(r.message || 'Something went wrong. Please try again.');
      guard.reset();
    }
  }

  if (state === 'done') return <p role="status" className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm font-bold text-emerald-200">{msg}</p>;

  return (
    <form onSubmit={onSubmit} className="relative" noValidate={false}>
      <div className={compact ? 'flex gap-2' : 'flex flex-col gap-3 sm:flex-row'}>
        <label className="sr-only" htmlFor={`nl-${source}`}>Email address</label>
        <input id={`nl-${source}`} name="email" type="email" required autoComplete="email" maxLength={254} placeholder="you@example.com" className="input" />
        <button type="submit" disabled={state === 'busy'} className={`btn btn-gold shrink-0 ${compact ? 'btn-sm min-h-12' : ''}`}>
          {state === 'busy' ? 'Sending…' : 'Subscribe'}
        </button>
      </div>
      <label className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-white/60">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-[#e9b949]" />
        <span>Email me RivalArcade news, cup announcements and feature updates. Unsubscribe any time. See the <Link href="/privacy#newsletter" className="underline">privacy policy</Link>.</span>
      </label>
      {guard.ui}
      {state === 'error' && <p role="alert" className="mt-2 text-sm font-bold text-crimson">{msg}</p>}
    </form>
  );
}
